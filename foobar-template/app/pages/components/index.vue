<script setup lang="ts">
    import { docsReadyItems, docsSections } from '~/utils/docs/navigation';

    const featuredItems = docsReadyItems.filter((item) => item.path !== '/components');
    const queuedItems = docsSections
        .flatMap((section) => section.items)
        .filter((item) => item.status !== 'ready');

    const statusLabelMap = {
        planned: 'Soon',
        'in-progress': 'In Progress',
        'needs-review': 'Needs Review',
    } as const;

    const getStatusLabel = (status: keyof typeof statusLabelMap | 'ready') => {
        if (status === 'ready') {
            return 'Ready';
        }
        return statusLabelMap[status];
    };
</script>

<template>
    <div class="space-y-4">
            <DocsPanel icon="tabler:direction-sign" eyebrow="Overview" title="Documentation Structure">
                <div class="space-y-4 text-sm text-TBD-text-dark dark:text-TBD-text-light">
                    <p class="text-xs leading-5 opacity-85 sm:text-sm">
                        Use the sidebar to move between component pages. Each page is meant to combine reference copy,
                        API tables, template snippets, and an interactive playground for checking states in context.
                    </p>

                    <div class="grid gap-4 grid-cols-3">
                        <div class="rounded-md input-bg input-ring p-4">
                            <p class="text-eyebrow-bold opacity-90">Reference</p>
                            <p class="mt-2">Overview, usage guidance, and prop documentation for each component.</p>
                        </div>
                        <div class="rounded-md input-bg input-ring p-4">
                            <p class="text-eyebrow-bold opacity-90">Examples</p>
                            <p class="mt-2">Pinned code snippets that mirror how the component should be used in the app.</p>
                        </div>
                        <div class="rounded-md input-bg input-ring p-4">
                            <p class="text-eyebrow-bold opacity-90">Playgrounds</p>
                            <p class="mt-2">Live controls for testing spacing, validation, icons, and state combinations.</p>
                        </div>
                    </div>
                </div>
            </DocsPanel>

            <div class="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
                <DocsPanel icon="tabler:components" eyebrow="Available Pages" title="Current Docs Pages">
                    <div class="grid gap-3 grid-cols-2">
                        <NuxtLink v-for="item in featuredItems" :key="item.title" :to="item.path">
                            <DocsCard :item="item" class="h-full"/>
                        </NuxtLink>
                    </div>
                </DocsPanel>

                <DocsPanel icon="tabler:clock-hour-4" eyebrow="Roadmap" title="Queued Components" tone="contrast">
                    <div class="space-y-2">
                        <DocsCard v-for="item in queuedItems" :key="item.title" :item="item"/>
                    </div>
                </DocsPanel>
            </div>
    </div>
</template>