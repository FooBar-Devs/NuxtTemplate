<script setup lang="ts">
    const themeStore = useThemeStore();

    const props = defineProps({

        // v-model value
        modelValue:   { type: String,  default: 'rgb(255, 255, 255)', required: true },

        // color item indices
        name:         { type: String,  default: '',      required: true  }, // Unique name for the color item
        label:        { type: String,  default: '',      required: false }, // Label for the color item

        // Color picker configuration
        valueType:    { type: String as PropType<'HEX8' | 'RGBA' | 'RGB' | 'HEX'>,        default: 'RGB',   required: false }, // Type of color value returned by the component
        inputType:    { type: String as PropType<'RGB' | 'HSL' | 'HEX' | 'HSV' | 'CMYK'>, default: 'RGB',   required: false }, // Input type of colour values
        mode:         { type: String as PropType<'solid' | 'gradient'>,                   default: 'solid', required: false }, // Color picker mode (solid or gradient)

        // Color picker feature toggles
        showAlpha:      { type: Boolean, default: false, required: false }, // Indicates if the alpha channel should be shown in the color picker
        showColorList:  { type: Boolean, default: true,  required: false }, // Show color list in the color picker
        showEyeDrop:    { type: Boolean, default: true,  required: false }, // Show eyedropper tool in the color picker
        showPickerMode: { type: Boolean, default: true,  required: false }, // Show picker mode toggle in the color picker
        showInputMenu:  { type: Boolean, default: true,  required: false }, // Show input menu in the color picker
        showInputSet:   { type: Boolean, default: true,  required: false }, // Show input set in the color picker

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
                '--cp-container-bg': 'rgba(var(--color-TBD-bg-dark-rgb), .75)',
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
        (e: "leaveColor"): void;
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

        // Only calculate position if the color item is active
        if (!active.value) return;

        if (parentRef.value && childRef.value) {

            // Get bounding rectangles of parent and child elements
            const parentRect = parentRef.value.getBoundingClientRect();
            const childRect = childRef.value.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            // Calculate initial position (centered below the parent)
            let left = parentRect.left + parentRect.width / 2 - childRect.width / 2;
            let top = parentRect.bottom;

            // Check if the gadget goes out of the window bounds
            if (left + childRect.width > windowWidth) {
                left = windowWidth - childRect.width;
            } else if (left < 0) {
                left = 0;
            }

            // Check if the gadget goes out of the window bounds vertically
            if (top + childRect.height > windowHeight) {
                top = parentRect.top - childRect.height;
            } else if (top < 0) {
                top = 0;
            }

            // Ensure the gadget stays within the window bounds
            left = Math.min(windowWidth - childRect.width, Math.max(left, 0));
            top = Math.min(windowHeight - childRect.height, Math.max(top, 0));

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
            if (target.id === `color_${props.name}` || target.id === `parent_color_${props.name}`) {
                return;
            }
            target = target.parentElement as HTMLElement;
        }

        // If the click was outside, deactivate the color picker and emit the leave event
        active.value = false;
        emit("leaveColor");
    }

    // ResizeObserver to watch for changes in the color picker size
    const resizeObserver = ref<ResizeObserver | null>(null);

    // Initialize color picker after v-if renders it
    async function initializeColorPicker() {
        if (!active.value) {
            resizeObserver.value?.disconnect();
            resizeObserver.value = null;
            childRef.value = null;
            return;
        }

        // Wait for v-if to mount the ColorPicker
        await nextTick();

        // Get the child element reference based on the unique property
        childRef.value = document.getElementById(`color_${props.name}`) as HTMLElement | null;

        // If the child element exists, set up the ResizeObserver and calculate position
        if (childRef.value) {
            resizeObserver.value?.disconnect();
            resizeObserver.value = new ResizeObserver(() => { calculateGadgetPosition(); });
            resizeObserver.value.observe(childRef.value);

            // Calculate only after the ColorPicker has been rendered and measured
            calculateGadgetPosition();
        }
    }

    // Watch active so the position is calculated after v-if mounts the ColorPicker
    watch(active, () => {
        initializeColorPicker();
    });

    // Initialize window and document listeners
    onMounted(() => {
        // Add event listeners for window resize, scroll, and document click
        window.addEventListener("resize", calculateGadgetPosition);
        window.addEventListener("scroll", calculateGadgetPosition, true);
        document.addEventListener("click", handleClickOutside);
    });

    // Clean up listeners and observer
    onUnmounted(() => {
        // Disconnect the ResizeObserver if it exists
        resizeObserver.value?.disconnect();
        
        // Remove event listeners when the component is unmounted
        window.removeEventListener("resize", calculateGadgetPosition);
        window.removeEventListener("scroll", calculateGadgetPosition, true);
        document.removeEventListener("click", handleClickOutside);
    });
</script>

<template>
    <div class="flex items-center gap-1.5">
        <div ref="parentRef" :id="`parent_color_${name}`"
            class="color cursor-pointer rounded-sm ring overflow-hidden group hover:overflow-visible w-4 h-4 hover:scale-125 transition-150"
            :style="`background-color: ${modelValue}; background-image: ${modelValue};`"
            @click="
                $emit('clickColor');
                active = true;
                color = modelValue;
            ">
            <Teleport to="body">
                <Transition name="fade" mode="out-in">
                    <ColorPicker v-if="active" v-model="color"
                        :showAlpha="showAlpha"
                        :showColorList="showColorList"
                        :showEyeDrop="showEyeDrop"
                        :showPickerMode="showPickerMode"
                        :showInputMenu="showInputMenu"
                        :showInputSet="showInputSet"
                        :type="valueType"
                        :inputType="inputType"
                        :mode="mode"
                        :theme="themeStore.isDarkMode ? 'dark' : 'light'"
                        :id="`color_${name}`"
                        class="fixed transition-opacity duration-300 ease-in-out backdrop-blur-sm"
                        :class="[
                            themeStore.isDarkMode ? 'dark' : 'light', 'outline-TBD-bg-dark/5 dark:outline-TBD-bg-light/10'
                        ]"
                        :style="{ ...gadgetStyles, ...colorPickerTheme }"
                        @blur="
                            $emit('leaveColor');
                            active = false;
                        "
                    />
                </Transition>
            </Teleport>
        </div>
        <label class="text-xs pt-0.5"> {{ label }} </label>
    </div>
</template>

<style lang="scss">
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.3s ease-in-out;
    }
    .fade-enter-from, .fade-leave-to {
        opacity: 0;
    }
    .fade-enter-to, .fade-leave-from {
        opacity: 1;
    }
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
        background-color: rgba(var(--color-TBD-bg-dark-rgb), 0.75);
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