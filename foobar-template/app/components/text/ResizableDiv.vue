<script setup lang="ts">
    const props = defineProps({
        minWidth:      { type: Number, default: 0 },
        minHeight:     { type: Number, default: 0 },
        maxWidth:      { type: Number, default: Infinity },
        maxHeight:     { type: Number, default: Infinity },
        initialWidth:  { type: Number, default: null },
        initialHeight: { type: Number, default: null },
        resizeTop:    { type: Boolean, default: false },
        resizeBottom: { type: Boolean, default: false },
        resizeLeft:   { type: Boolean, default: false },
        resizeRight:  { type: Boolean, default: false },
        inverseY:     { type: Boolean, default: false },
        inverseX:     { type: Boolean, default: false },
        hideEdges:    { type: Boolean, default: false },  // hides pill visuals on edges
        hideCorners:  { type: Boolean, default: false },  // hides corner handles entirely
        fullEdge:     { type: Boolean, default: true  },  // true = whole edge strip draggable, false = only pill
    });

    const container = ref<HTMLElement | null>(null);
    const width     = ref<number | null>(props.initialWidth);
    const height    = ref<number | null>(props.initialHeight);
    const offsetTop  = ref(0);
    const offsetLeft = ref(0);

    const containerStyle = computed(() => ({
        width:  width.value  != null ? `${width.value}px`  : undefined,
        height: height.value != null ? `${height.value}px` : undefined,
        top:    offsetTop.value  ? `${offsetTop.value}px`  : undefined,
        left:   offsetLeft.value ? `${offsetLeft.value}px` : undefined,
    }));

    type ResizeDir = 'top' | 'bottom' | 'left' | 'right'
                    | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

    let resizing:  ResizeDir | null = null;
    let startX = 0, startY = 0;
    let startW = 0, startH = 0;
    let startTop = 0, startLeft = 0;

    function onMouseDown(e: MouseEvent, dir: ResizeDir) {
        if (!container.value) return;
        resizing  = dir;
        startX    = e.clientX;
        startY    = e.clientY;
        startW    = container.value.offsetWidth;
        startH    = container.value.offsetHeight;
        startTop  = offsetTop.value;
        startLeft = offsetLeft.value;
        e.preventDefault();
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    }

    function onMouseMove(e: MouseEvent) {
        if (!resizing) return;
        const invY = props.inverseY;
        const invX = props.inverseX;
        const dx  = !invX ? e.clientX - startX : startX - e.clientX;
        const dy  = !invY ? e.clientY - startY : startY - e.clientY;
        const dir = resizing;

        const movesRight  = dir === 'right'  || dir === 'top-right'    || dir === 'bottom-right';
        const movesLeft   = dir === 'left'   || dir === 'top-left'     || dir === 'bottom-left';
        const movesBottom = dir === 'bottom' || dir === 'bottom-left'  || dir === 'bottom-right';
        const movesTop    = dir === 'top'    || dir === 'top-left'     || dir === 'top-right';

        // right handle: normal → grow right; inverse → grow left (anchor right edge)
        if (movesRight && !invX) {
            width.value = Math.min(props.maxWidth, Math.max(props.minWidth, startW + dx));
        } else if (movesRight && invX) {
            const newW = Math.min(props.maxWidth, Math.max(props.minWidth, startW - dx));
            offsetLeft.value = startLeft + (startW - newW);
            width.value = newW;
        }

        // left handle: normal → grow left (anchor right); inverse → grow right
        if (movesLeft && !invY) {
            const newW = Math.min(props.maxWidth, Math.max(props.minWidth, startW - dx));
            offsetLeft.value = startLeft + (startW - newW);
            width.value = newW;
        } else if (movesLeft && invY) {
            width.value = Math.min(props.maxWidth, Math.max(props.minWidth, startW + dx));
        }

        // bottom handle: normal → grow down; inverse → grow up (anchor bottom edge)
        if (movesBottom && !invY) {
            height.value = Math.min(props.maxHeight, Math.max(props.minHeight, startH + dy));
        } else if (movesBottom && invY) {
            const newH = Math.min(props.maxHeight, Math.max(props.minHeight, startH - dy));
            offsetTop.value = startTop + (startH - newH);
            height.value = newH;
        }

        // top handle: normal → grow up (anchor bottom); inverse → grow down
        if (movesTop && !invY) {
            const newH = Math.min(props.maxHeight, Math.max(props.minHeight, startH - dy));
            offsetTop.value = startTop + (startH - newH);
            height.value = newH;
        } else if (movesTop && invY) {
            height.value = Math.min(props.maxHeight, Math.max(props.minHeight, startH + dy));
        }
    }

    function onMouseUp() {
        resizing = null;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    }

    onUnmounted(() => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    });
</script>

<template>
    <div ref="container" :style="containerStyle" class="relative">
        <slot />

        <!-- Edge handles -->
        <!-- When fullEdge=true the whole strip is the drag target; when false only the pill is -->
        <div v-if="resizeTop"
            class="group absolute top-0 left-4 right-4 h-3 flex-center select-none z-10 transition-opacity opacity-40 hover:opacity-100"
            :class="fullEdge ? 'cursor-ns-resize' : 'pointer-events-none'"
            @mousedown.stop="fullEdge && onMouseDown($event, 'top')">
            <div v-if="!hideEdges"
                class="w-10 h-1 rounded-full bg-current transition-all group-hover:w-16"
                :class="!fullEdge ? 'cursor-ns-resize pointer-events-auto' : ''"
                @mousedown.stop="!fullEdge && onMouseDown($event, 'top')" />
        </div>
        <div v-if="resizeBottom"
            class="group absolute bottom-0 left-4 right-4 h-3 flex-center select-none z-10 transition-opacity opacity-40 hover:opacity-100"
            :class="fullEdge ? 'cursor-ns-resize' : 'pointer-events-none'"
            @mousedown.stop="fullEdge && onMouseDown($event, 'bottom')">
            <div v-if="!hideEdges"
                class="w-10 h-1 rounded-full bg-current transition-all group-hover:w-16"
                :class="!fullEdge ? 'cursor-ns-resize pointer-events-auto' : ''"
                @mousedown.stop="!fullEdge && onMouseDown($event, 'bottom')" />
        </div>
        <div v-if="resizeLeft"
            class="group absolute left-0 top-4 bottom-4 w-3 flex-center select-none z-10 transition-opacity opacity-40 hover:opacity-100"
            :class="fullEdge ? 'cursor-ew-resize' : 'pointer-events-none'"
            @mousedown.stop="fullEdge && onMouseDown($event, 'left')">
            <div v-if="!hideEdges"
                class="h-10 w-1 rounded-full bg-current transition-all group-hover:h-16"
                :class="!fullEdge ? 'cursor-ew-resize pointer-events-auto' : ''"
                @mousedown.stop="!fullEdge && onMouseDown($event, 'left')" />
        </div>
        <div v-if="resizeRight"
            class="group absolute right-0 top-4 bottom-4 w-3 flex-center select-none z-10 transition-opacity opacity-40 hover:opacity-100"
            :class="fullEdge ? 'cursor-ew-resize' : 'pointer-events-none'"
            @mousedown.stop="fullEdge && onMouseDown($event, 'right')">
            <div v-if="!hideEdges"
                class="h-10 w-1 rounded-full bg-current transition-all group-hover:h-16"
                :class="!fullEdge ? 'cursor-ew-resize pointer-events-auto' : ''"
                @mousedown.stop="!fullEdge && onMouseDown($event, 'right')" />
        </div>

        <!-- Corner handles (shown when both adjacent edges are enabled) -->
        <div v-if="!hideCorners && resizeTop && resizeLeft"
            class="absolute -top-0.5 -left-0.5 w-5 h-5 cursor-nwse-resize select-none z-11 opacity-70 hover:opacity-100 transition-opacity">
            <div class="absolute top-0 left-0 w-4 h-4 border-l border-t rounded-tl-md 
                border-TBD-text-light dark:border-TBD-text-dark" 
                @mousedown.stop="onMouseDown($event, 'top-left')" />
            <div class="absolute top-1.5 left-1.5 w-2 h-2 border-l border-t rounded-tl-md 
                border-TBD-text-light dark:border-TBD-text-dark" 
                @mousedown.stop="onMouseDown($event, 'top-left')" />
        </div>
        <div v-if="!hideCorners && resizeTop && resizeRight"
            class="absolute -top-0.5 -right-0.5 w-5 h-5 cursor-nesw-resize select-none z-11 opacity-70 hover:opacity-100 transition-opacity">
                <div class="absolute top-2.25 right-2.25 w-1.25 h-1.25 border-r border-t rounded-tr-md
                border-TBD-text-light dark:border-TBD-text-dark"
            @mousedown.stop="onMouseDown($event, 'top-right')" />
            <div class="absolute top-1.5 right-1.5 w-2 h-2 border-r border-t rounded-tr-md
                border-TBD-text-light dark:border-TBD-text-dark"
                @mousedown.stop="onMouseDown($event, 'top-right')" />
        </div>
        <div v-if="!hideCorners && resizeBottom && resizeLeft"
            class="absolute -bottom-0.5 -left-0.5 w-5 h-5 cursor-nesw-resize select-none z-11 opacity-70 hover:opacity-100 transition-opacity">
            <div class="absolute bottom-0 left-0 w-4 h-4 border-l border-b rounded-bl-md
                border-TBD-text-light dark:border-TBD-text-dark"
                @mousedown.stop="onMouseDown($event, 'bottom-left')" />
            <div class="absolute bottom-1.5 left-1.5 w-2 h-2 border-l border-b rounded-bl-md
                border-TBD-text-light dark:border-TBD-text-dark"
                @mousedown.stop="onMouseDown($event, 'bottom-left')" />
        </div>
        <div v-if="!hideCorners && resizeBottom && resizeRight"
            class="absolute -bottom-0.5 -right-0.5 w-5 h-5 cursor-nwse-resize select-none z-11 opacity-70 hover:opacity-100 transition-opacity">
            <div class="absolute bottom-0 right-0 w-4 h-4 border-r border-b rounded-br-md
                border-TBD-text-light dark:border-TBD-text-light"
                @mousedown.stop="onMouseDown($event, 'bottom-right')" />
            <div class="absolute bottom-1.5 right-1.5 w-2 h-2 border-r border-b rounded-br-md
                border-TBD-text-light dark:border-TBD-text-dark"
                @mousedown.stop="onMouseDown($event, 'bottom-right')" />
        </div>
    </div>
</template>
