export function wait(seconds: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
    });
}

export function isNotEmptyObject(obj: Record<string, any> | null | undefined): boolean {
    return obj != null && Object.keys(obj).length > 0;
}

export function JSONIFY(object: any): any {
    return JSON.parse(JSON.stringify(object));
}

export function STRINGIFY(object: any): any {
    return JSON.stringify(object);
}

import type { WatchStopHandle } from 'vue';

let lastExecutionTime: Record<string, number> = {};
let timeoutHandles: Record<string, ReturnType<typeof setTimeout> | null> = {};

function canExecute(key: string): boolean {
    const now = Date.now();
    if (now - (lastExecutionTime[key] || 0) >= 500) {
        lastExecutionTime[key] = now;
        return true;
    }
    lastExecutionTime[key] = now;
    return false;
}

function scheduleExecution(key: string, callback: () => void) {
    if (timeoutHandles[key]) {
        clearTimeout(timeoutHandles[key]!);
    }
    timeoutHandles[key] = setTimeout(() => {
        callback();
        timeoutHandles[key] = null;
    }, 500);
}

export function debouncedWatch<T>(
    getter: () => T,
    callback: (newValue: T, oldValue: T) => Promise<void>,
    key: string
): WatchStopHandle {
    return watch(
        getter,
        async (newValue, oldValue) => {
            if (canExecute(key)) {
                try {
                    await callback(newValue, oldValue);
                } catch (error) {
                    console.error(error);
                }
            } else {
                scheduleExecution(key, async () => {
                    try {
                        await callback(newValue, oldValue);
                    } catch (error) {
                        console.error(error);
                    }
                });
            }
        },
        { deep: true }
    );
}