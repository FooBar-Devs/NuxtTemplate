<script lang="ts" setup>
    const props = defineProps({
        vertical: { type: Boolean, default: false },
        thickness: { type: Number, default: 4 },
        slim: { type: Boolean, default: false },
    });
</script>

<template>
    <div class="relative transition-500 ease-out rounded-full"
        :class="slim ? 'bg-TBD-bg-dark/10 dark:bg-TBD-bg-light/10 my-1' : 'bg-TBD-bg-dark/25 dark:bg-TBD-bg-light/25 my-2'"
        :style="[
            { 'min-width': vertical ? `${(slim ? '1' : thickness)}px` : '100%' },
            { 'min-height': vertical ? '100%' : `${(slim ? '1' : thickness)}px` }
        ]">
    </div>
</template>