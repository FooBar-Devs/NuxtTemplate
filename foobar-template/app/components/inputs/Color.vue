<script setup lang="ts">
    const themeStore = useThemeStore();

    const props = defineProps({
        // v-model value
        modelValue:   { type: String, default: 'rgb(255, 255, 255)', required: true }, // Current color value.

        // color picker state
        hoverColor:   { type: Number, default: undefined, required: false },           // Currently active color index.
        hoverVariant: { type: Number, default: undefined, required: false },           // Currently active variant index.

        // color picker position
        i:            { type: Number, default: 0,         required: false },           // Color index within the parent matrix.
        j:            { type: Number, default: 0,         required: false },           // Variant index within the parent matrix.
        property:     { type: String, default: '',        required: true  },           // Unique identifier used for the teleported picker.
    });

    // element references
    const parentRef = ref<HTMLElement | null>(null);
    const childRef = ref<HTMLElement | null>(null);

    // color picker state
    const gadgetStyles = ref({ top: "0px", left: "0px" });
    const color = ref(props.modelValue);
    const active = ref(false);

    // Color picker theme variables
    const colorPickerTheme = computed(() => {
        return themeStore.isDarkMode
            ? {
                '--cp-primary': 'var(--color-TBD-primary-dark)',
                '--cp-container-bg': 'rgba(var(--color-TBD-bg-dark-rgb), .5)',
                '--cp-select-color': 'rgba(var(--color-TBD-primary-dark-rgb), .75)',
                '--cp-range-border': 'var(--color-TBD-text-dark)',
                '--cp-range-shadow': 'var(--color-TBD-primary-dark)',
                '--cp-container-shadow': 'rgba(var(--color-TBD-bg-light-rgb), .25)',
                '--cp-gray-100': 'rgba(var(--color-TBD-text-light-rgb), .25)',
                '--cp-gray-200': 'rgba(var(--color-TBD-text-light-rgb), .25)',
                '--cp-gray-300': 'rgba(var(--color-TBD-text-light-rgb), .5)',
                '--cp-gray-400': 'rgba(var(--color-TBD-text-light-rgb), .5)',
                '--cp-gray-500': 'rgba(var(--color-TBD-text-light-rgb), 1)',
                '--cp-gray-600': 'rgba(var(--color-TBD-text-light-rgb), 1)',
                '--cp-gray-700': 'rgba(var(--color-TBD-text-light-rgb), 1)',
                '--cp-gray-800': 'rgba(var(--color-TBD-text-light-rgb), 1)',
                '--cp-gray-900': 'rgba(var(--color-TBD-text-light-rgb), 1)',
                '--cp-inverse-dark': 'rgba(var(--color-TBD-text-light-rgb), .25)',
                '--cp-inverse-white': 'rgba(var(--color-TBD-text-light-rgb), .5)',
            }
            : {
                '--cp-primary': 'var(--color-TBD-primary-light)',
                '--cp-container-bg': 'rgba(var(--color-TBD-bg-light-rgb), .5)',
                '--cp-select-color': 'rgba(var(--color-TBD-primary-light-rgb), .75)',
                '--cp-range-border': 'var(--color-TBD-bg-light)',
                '--cp-range-shadow': 'var(--color-TBD-primary-light)',
                '--cp-container-shadow': 'rgba(var(--color-TBD-bg-dark-rgb), .25)',
                '--cp-gray-100': 'rgba(var(--color-TBD-text-dark-rgb), .25)',
                '--cp-gray-200': 'rgba(var(--color-TBD-text-dark-rgb), .25)',
                '--cp-gray-300': 'rgba(var(--color-TBD-text-dark-rgb), .5)',
                '--cp-gray-400': 'rgba(var(--color-TBD-text-dark-rgb), .5)',
                '--cp-gray-500': 'rgba(var(--color-TBD-text-dark-rgb), 1)',
                '--cp-gray-600': 'rgba(var(--color-TBD-text-dark-rgb), 1)',
                '--cp-gray-700': 'rgba(var(--color-TBD-text-dark-rgb), 1)',
                '--cp-gray-800': 'rgba(var(--color-TBD-text-dark-rgb), 1)',
                '--cp-gray-900': 'rgba(var(--color-TBD-text-dark-rgb), 1)',
                '--cp-inverse-dark': 'rgba(var(--color-TBD-text-light-rgb), .25)',
                '--cp-inverse-white': 'rgba(var(--color-TBD-text-light-rgb), .5)',
            };
    });

    // Vue event definitions
    const emit = defineEmits<{
        (e: "update:modelValue", value: string): void;
        (e: "leaveColorPicker"): void;
        (e: "clickColor"): void;
    }>();

    // Central update function
    const update = function (value: string) {
        emit("update:modelValue", value);
    }

    // Sync color picker value with v-model
    watch(() => color.value, (newValue) => {
        update(newValue as string);
    });

    // Calculates color picker position relative to the color item
    function calculateGadgetPosition() {
        // Only calculate position if the color item is active or hovered
        if ((props.i != props.hoverColor || props.j != props.hoverVariant) && !active.value) return;

        if (parentRef.value && childRef.value) {
            // Get bounding rectangles of parent and child elements
            const parentRect = parentRef.value.getBoundingClientRect();
            const childRect = childRef.value.getBoundingClientRect();

            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            // Calculate initial position (centered below the parent)
            let left = parentRect.left + parentRect.width / 2 - childRect.width / 2 + window.scrollX;
            let top = parentRect.bottom + window.scrollY;

            // Check if the gadget goes out of the window bounds
            if (left + childRect.width > windowWidth) {
                left = windowWidth - childRect.width;
            } else if (left < 0) {
                left = 0;
            }

            // Check if the gadget goes out of the window bounds vertically
            if (top + childRect.height > windowHeight + window.scrollY) {
                top = parentRect.top + window.scrollY - childRect.height;
            } else if (top < window.scrollY) {
                top = window.scrollY;
            }

            // Ensure the gadget stays within the window bounds
            left = Math.min(windowWidth - childRect.width, Math.max(left, 0));
            top = Math.min(windowHeight + window.scrollY - childRect.height, Math.max(top, window.scrollY));

            // Update the gadget styles with the calculated position
            gadgetStyles.value = {
                top: `${top}px`,
                left: `${left}px`,
            };
        }
    }

    // Handles clicks outside the color picker
    function handleClickOutside(event: MouseEvent) {
        let target = event.target as HTMLElement;

        // Traverse up the DOM tree to check if the click was inside the color picker or color item
        while (target) {
            if (target.classList.contains("ck-cp-container") || target.classList.contains("color")) return;

            target = target.parentElement as HTMLElement;
        }

        emit("leaveColorPicker");
    }

    // ResizeObserver to watch for changes in the color picker size
    const resizeObserver = ref<ResizeObserver | null>(null);

    // Initialize color picker listeners and position
    onMounted(async () => {
        // Get the child element reference based on the unique property and indices
        childRef.value = document.getElementById("color" + props.property + props.i + props.j);

        // If the child element exists, set up the ResizeObserver and event listeners
        if (childRef.value) {
            resizeObserver.value = new ResizeObserver(() => {
                calculateGadgetPosition();
            });

            resizeObserver.value.observe(childRef.value);
        }

        // Add event listeners for window resize, scroll, and document click
        window.addEventListener("resize", calculateGadgetPosition);
        window.addEventListener("scroll", calculateGadgetPosition, true);
        document.addEventListener("click", handleClickOutside);

        calculateGadgetPosition();
    });

    // Clean up listeners and observer
    onUnmounted(() => {
        // Disconnect the ResizeObserver if it exists
        if (resizeObserver.value && childRef.value)
            resizeObserver.value.unobserve(childRef.value);

        // Remove event listeners when the component is unmounted
        window.removeEventListener("resize", calculateGadgetPosition);
        window.removeEventListener("scroll", calculateGadgetPosition, true);
        document.removeEventListener("click", handleClickOutside);
    });
</script>

<template>
    <div ref="parentRef"
        class="color cursor-pointer rounded-sm ring overflow-hidden group hover:overflow-visible w-4 h-4 hover:scale-125 transition-150"
        :style="i != 0 ? `background-color: ${modelValue};` : `background-color: ${j == 1 ? 'black' : 'white'}; background-image: ${modelValue};`"
        @click="
            $emit('clickColor');
            active = true;
            color = modelValue;
            calculateGadgetPosition();
        ">
        <Teleport to="body">
            <ColorPicker
                v-model="color"
                showColorList
                showEyeDrop
                type="RGB"
                inputType="RGB"
                :class="[
                    i == hoverColor && j == hoverVariant ? 'opacity-100' : 'opacity-0 pointer-events-none',
                    themeStore.isDarkMode ? 'dark' : 'light', 'outline-TBD-bg-dark/5 dark:outline-TBD-bg-light/10'
                ]"
                :showAlpha="i == 0"`
                :mode="i != 0 ? 'solid' : 'gradient'"
                :showPickerMode="false"
                :theme="themeStore.isDarkMode ? 'dark' : 'light'"
                :id="'color' + property + i + j"
                class="fixed transition-opacity duration-300 ease-in-out backdrop-blur-sm"
                :style="{ ...gadgetStyles, ...colorPickerTheme }"
                @blur="
                    $emit('leaveColorPicker');
                    active = false;
                "
            />
        </Teleport>
    </div>
</template>

<style lang="scss">
    .ck-cp-container {
        backdrop-filter: blur(8px);
        .ck-gradient-set-label span {
            position: relative;
            left: 18px;
            &::before {
                position: absolute;
                bottom: -7px;
                left: -22px;
                font-weight: bold;
                font-size: 24px;
            }
        }
        .ck-cp-input-content * {
            transition: all .1s ease-in-out;
        }
        .ck-cp-input-label {
            border-radius: .25rem;
        }
        .ck-cp-input-checkbox-checked {
            min-height: 16px;
            min-width: 16px;
            margin-top: 1px;
        }
        .ck-cp-input-checkbox-unchecked {
            min-height: 16px;
            min-width: 16px;
            margin-top: 1px;
        }
        #cp-btn-eyedropper,
        .cp-main-btn {
            transition: all .1s ease-in-out;
            padding: 4px;
            margin: -4px;
            min-height: 28px;
            min-width: 28px;
            border-radius: .25rem;
            cursor: pointer;
        }
        .cp-btn {
            transition: all .1s ease-in-out;
            background-color: transparent;
            padding: 0 .5rem;
            margin: 0 -.5rem;
            cursor: pointer;
            &:last-child {
                margin-right: 0;
            }
        }
        .ck-cp-color-item {
            transition: all .1s ease-in-out;
            &:hover {
                scale: 1.1;
            }
        }
        .cp-btn-save-color {
            transition: all .1s ease-in-out;
            &:hover {
                scale: 1.1;
            }
        }
    }

    .dark .ck-cp-container {
        background-color: rgba(var(--color-TBD-bg-dark-rgb), 0.5);
        .ck-cp-linear-angle-container input[type="range"] {
            background-color: var(--color-TBD-bg-dark);
            outline: 1px solid rgba(var(--color-TBD-text-light-rgb), 0.25);
        }
        .opacity_slider, .picker-hue-range-slider {
            outline: 1px solid rgba(var(--color-TBD-text-light-rgb), 0.25);
        }
        .ck-cp-input-label, button, input, .ck-gradient-set-label, .cp-btn, .ck-cp-local-color-container * {
            color: var(--color-TBD-text-light);
        }
        * {
            fill: var(--color-TBD-text-light);
            border-color: rgba(var(--color-TBD-bg-light-rgb), 0.25);
        }
        .ck-gradient-set-label span {
            color: var(--color-TBD-primary-dark);
            &::before {
                color: var(--color-TBD-text-light);
            }
        }
        .ck-cp-input-checkbox-checked {
            background-color: var(--color-TBD-primary-dark);
            * {
                fill: var(--color-TBD-text-dark);
            }
        }
        .ck-cp-input-label {
            background-color: var(--color-TBD-bg-dark);
        }
        #cp-btn-eyedropper,
        .cp-main-btn,
        .cp-btn {
            &:hover {
                background-color: rgba(var(--color-TBD-text-light-rgb), .1);
            }
        }
        .ck-cp-color-item {
            border: 1px solid rgba(var(--color-TBD-text-light-rgb), .5);
            &:hover {
                border-color: rgba(var(--color-TBD-text-light-rgb), .75);
            }
        }
        .cp-btn-save-color {
            border: 1px solid rgba(var(--color-TBD-text-light-rgb), .5);
            &:hover {
                background-color: var(--color-TBD-bg-dark);
                border-color: rgba(var(--color-TBD-text-light-rgb), .75);
                color: var(--color-TBD-text-light);
            }
        }
    }

    .light .ck-cp-container {
        background-color: rgba(var(--color-TBD-bg-light-rgb), 0.5);
        .ck-cp-linear-angle-container input[type="range"] {
            background-color: var(--color-TBD-bg-light);
            outline: 1px solid rgba(var(--color-TBD-text-dark-rgb), 0.25);
        }
        .opacity_slider, .picker-hue-range-slider {
            outline: 1px solid rgba(var(--color-TBD-text-dark-rgb), 0.25);
        }
        .ck-cp-input-label, button, input, .ck-gradient-set-label, .cp-btn, .ck-cp-local-color-container * {
            color: var(--color-TBD-text-dark);
        }
        * {
            fill: var(--color-TBD-text-dark);
            border-color: rgba(var(--color-TBD-bg-dark-rgb), 0.25);
        }
        .ck-gradient-set-label span {
            color: var(--color-TBD-primary-light);
            &::before {
                color: var(--color-TBD-text-dark);
            }
        }
        .ck-cp-input-checkbox-checked {
            background-color: var(--color-TBD-primary-light);
            * {
                fill: var(--color-TBD-text-light);
            }
        }
        .ck-cp-input-label {
            background-color: var(--color-TBD-bg-light);
        }
        #cp-btn-eyedropper,
        .cp-main-btn,
        .cp-btn {
            &:hover {
                background-color: rgba(var(--color-TBD-text-dark-rgb), .1);
            }
        }
        .ck-cp-color-item {
            border: 1px solid rgba(var(--color-TBD-text-dark-rgb), .5);
            &:hover {
                border-color: rgba(var(--color-TBD-text-dark-rgb), .75);
            }
        }
        .cp-btn-save-color {
            border: 1px solid rgba(var(--color-TBD-text-dark-rgb), .5);
            &:hover {
                background-color: var(--color-TBD-bg-light);
                border-color: rgba(var(--color-TBD-text-dark-rgb), .75);
                color: var(--color-TBD-text-dark);
            }
        }
    }
</style>