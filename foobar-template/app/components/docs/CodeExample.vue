<script setup lang="ts">
    defineProps<{
        eyebrow: string;
        title: string;
        description: string;
        sticky?: boolean;
    }>();
</script>

<template>
    <DocsPanel :eyebrow="eyebrow" :title="title" tone="primary" :sticky="sticky" body-class="p-0">
        <template #header-right>
            <div class="flex items-center gap-3 text-[11px] opacity-70">
                <span class="size-3 ring-1 ring-TBD-bg-light dark:ring-TBD-bg-dark  rounded-full bg-TBD-error-light dark:bg-TBD-error-dark"/>
                <span class="size-3 ring-1 ring-TBD-bg-light dark:ring-TBD-bg-dark rounded-full bg-TBD-warning-light dark:bg-TBD-warning-dark"/>
                <span class="size-3 ring-1 ring-TBD-bg-light dark:ring-TBD-bg-dark rounded-full bg-TBD-confirm-light dark:bg-TBD-confirm-dark"/>
            </div>
        </template>

        <div class="border-b border-TBD-bg-dark/10 bg-TBD-bg-light/90 px-4 py-3 text-xs leading-5 text-TBD-text-dark dark:border-TBD-bg-light/10 dark:bg-TBD-bg-dark/90 dark:text-TBD-text-light">
            {{ description }}
        </div>

        <pre class="overflow-x-auto bg-TBD-bg-light/50 px-4 py-3 text-xs leading-6 text-TBD-text-dark dark:bg-TBD-bg-dark/50 dark:text-TBD-text-light"><code><slot/></code></pre>
    </DocsPanel>
</template>