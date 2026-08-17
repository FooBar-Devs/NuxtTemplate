<script setup lang="ts">
    const themeStore = useThemeStore();

    const props = defineProps({
        color: { type: String as () => keyof typeof backgroundColor, default: "primary" },
        hasOutline: { type: Boolean, default: false, required: false, }
    })

    const backgroundColor = {
        primary: "bg-TBD-primary-light/20 dark:bg-TBD-primary-dark/20 text-TBD-primary-light dark:text-TBD-primary-dark",
        secondary: "bg-TBD-secondary-light/20 dark:bg-TBD-secondary-dark/20 text-TBD-secondary-light dark:text-TBD-secondary-dark",
        error: "bg-TBD-error-light/20 dark:bg-TBD-error-dark/20 text-TBD-error-light dark:text-TBD-error-dark",
        warning: "bg-TBD-warning-light/20 dark:bg-TBD-warning-dark/20 text-TBD-warning-light dark:text-TBD-warning-dark",
        confirm: "bg-TBD-confirm-light/20 dark:bg-TBD-confirm-dark/20 text-TBD-confirm-light dark:text-TBD-confirm-dark",
        neutral: `bg-TBD-bg-dark/10 dark:bg-TBD-bg-light/10 text-TBD-bg-dark/80 dark:text-TBD-bg-light/80`,
    }
    const outlineColor = {
        primary: "ring-TBD-primary-light/50 dark:ring-TBD-primary-dark/50",
        secondary: "ring-TBD-secondary-light/50 dark:ring-TBD-secondary-dark/50",
        error: "ring-TBD-error-light/50 dark:ring-TBD-error-dark/50",
        warning: "ring-TBD-warning-light/50 dark:ring-TBD-warning-dark/50",
        confirm: "ring-TBD-confirm-light/50 dark:ring-TBD-confirm-dark/50",
        neutral: "ring-TBD-bg-dark/25 dark:ring-TBD-bg-light/25"
    }
</script>

<template>
    <span class="flex-center w-fit gap-2 rounded-full px-2 pt-0.5 pb-px text-2xs font-semibold uppercase whitespace-nowrap transition-300"
        :class="[backgroundColor[color], hasOutline ? `${outlineColor[color]} ring-1` : '']">
        <slot/>
    </span>
</template>