const popups = reactive<T_Message[]>([]);

/**
 * Pushes a popup message to the queue and optionally updates a Pinia store.
 * 
 * @param {T_Message} popup - The popup message object containing `type` and `message`.
 * @param {boolean | { updating: boolean }} [store=false] - If `false`, nothing; 
 *        if an object, it should be a Pinia store where `updating` will be set to `false` after a delay.
 * @param {number} [time=0] - Delay before updating the store's `updating` property.
 * @param {T_ErrorDetails} [error={ location: '', message: '' }] - Optional error details; if `location` is set, logs the error.
 * @returns {Promise<void>} - A promise that resolves after handling the popup.
 */
async function pushPopup(
    popup: T_Message,
    store: boolean | { updating: boolean } | Ref<boolean> = false,
    time: number = 0,
    error: T_ErrorDetails = { location: '', message: '' }
    ): Promise<void> {
    if (error.location !== '') {
        console.error(error.location, error.message);
    }

    popups.push({
        type: popup!.type,
        message: popup!.message.replace(/\[(.+?)\]/g, '<span>$1</span>'),
    });

    const messageLength = popup!.message.length;
    const duration = Math.max(3000, Math.min(1000 + messageLength * 50, 10000));

    setTimeout(() => {
        popups.splice(0, 1);
    }, duration);

    await wait(time);
    if (typeof store !== 'boolean' && 'updating' in store) {
        store.updating = false;
    } else if (typeof store !== 'boolean' && 'value' in store) {
        store.value = false;
    }
}

export { popups, pushPopup };