<script lang="ts" setup>
    const props = defineProps({
        vertical: { type: Boolean, default: false },
        thickness: { type: Number, default: 4 },
    });
</script>

<template>
    <div class="relative bg-TBD-bg-dark/25 dark:bg-TBD-bg-light/25 transition-500 ease-out rounded-full"
        :style="[
            { 'min-width': vertical ? `${thickness}px` : '100%' },
            { 'min-height': vertical ? '100%' : `${thickness}px` }
        ]">
    </div>
</template>