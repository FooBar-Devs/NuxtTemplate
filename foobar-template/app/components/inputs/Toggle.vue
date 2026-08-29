<script setup lang="ts">
    const themeStore = useThemeStore();

    const props = defineProps({
        // v-model value
        modelValue:    { type: Boolean, default: false, required: true },
        manualUpdate:  { type: Boolean, default: false, required: false }, // If true, the toggle will not automatically update the v-model value when clicked. The parent must handle the update manually.

        // toggle icons
        toggledIcon:   { type: String,  default: 'line-md:sunny-loop', required: false }, // Iconify icon shown when toggled
        unToggledIcon: { type: String,  default: 'line-md:moon-loop',  required: false }, // Iconify icon shown when untoggled

        // animation options
        altAnimation:  { type: Boolean, default: false, required: false },
    });

    // Vue v-model emit definition
    const emit = defineEmits<{
        (e: 'update:modelValue', value: boolean): void;
        (e: 'onToggle', value: boolean): void;
    }>();

    // Handles toggle button click
    const onClick = () => {
        const newValue = !props.modelValue;
        if (!props.manualUpdate) 
            emit('update:modelValue', newValue);
        emit('onToggle', newValue);
    };
</script>

<template>
    <button @click="onClick"
        class="relative h-8 w-8 flex-center overflow-hidden rounded-full hover:brightness-125 cursor-pointer z-5"
        :class="themeStore.isDarkMode 
            ? 'bg-TBD-bg-light text-TBD-bg-dark' 
            : 'bg-TBD-bg-dark text-TBD-bg-light'">


        <!-- TOGGLED ICON -->
        <!-- Slides left when the toggle is active -->
        <Icon v-if="!props.altAnimation" 
            :name="props.toggledIcon" 
            class="absolute transition-300 scale-130 pointer-events-none"
            :class="props.modelValue ? 'left-12' : 'left-1/2 -translate-x-1/2'"/>

        <!-- Fades out when the toggle is inactive -->
        <Icon v-else 
            :name="props.toggledIcon" 
            class="absolute transition-300 scale-130 pointer-events-none"
            :class="props.modelValue ? 'opacity-0' : 'opacity-100'"/>


        <!-- UNTOGGLED ICON -->
        <!-- Slides right when the toggle is inactive -->
        <Icon v-if="!props.altAnimation" 
            :name="props.unToggledIcon" 
            class="absolute transition-300 scale-130 pointer-events-none"
            :class="!props.modelValue ? 'right-12' : 'right-1/2 translate-x-1/2'"/>

        <!-- Fades out when the toggle is active -->
        <Icon v-else 
            :name="props.unToggledIcon" 
            class="absolute transition-300 scale-130 pointer-events-none"
            :class="props.modelValue ? 'opacity-100' : 'opacity-0'"/>


    </button>
</template>