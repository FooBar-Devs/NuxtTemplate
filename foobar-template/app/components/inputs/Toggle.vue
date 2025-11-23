<script setup lang="ts">
    const themeStore = useThemeStore();
    const props = withDefaults(defineProps<{
        toggled: boolean
        toggledIcon?: string
        unToggledIcon?: string
        altAnimation?: boolean
    }>(), {
        toggledIcon: 'line-md:sunny-loop',
        unToggledIcon: 'line-md:moon-loop'
    })

    const emit = defineEmits<{
        (e: 'onToggle'): void
    }>()

    const onClick = () => emit('onToggle')
</script>

<template>
        <button @click="onClick"
                class="relative h-8 w-8 flex-center overflow-hidden rounded-full hover:brightness-125 cursor-pointer z-5"
                :class="themeStore.isDarkMode ? 'bg-TBD-bg-light text-TBD-bg-dark' : 'bg-TBD-bg-dark text-TBD-bg-light'">

                <Icon v-if="!props.altAnimation" :name="props.toggledIcon" class="absolute transition-300 scale-130 pointer-events-none" :class="props.toggled ? 'left-12' : 'left-2'"/>
                <Icon v-else :name="props.toggledIcon" class="absolute transition-300 scale-130 pointer-events-none"  :class="props.toggled ? 'opacity-100' : 'opacity-0'"/>
                <Icon v-if="!props.altAnimation" :name="props.unToggledIcon" class="absolute transition-300 scale-130 pointer-events-none" :class="!props.toggled ? 'right-12' : 'right-2'"/>
                <Icon v-else :name="props.unToggledIcon" class="absolute transition-300 scale-130 pointer-events-none"  :class="props.toggled ? 'opacity-0' : 'opacity-100'"/>

        </button>
</template>