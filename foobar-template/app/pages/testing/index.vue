<script setup lang="ts">
    import { docsReadyItems, docsSections } from '~/utils/docs/navigation';

    const featuredItems = docsReadyItems.filter((item) => item.path !== '/testing');
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
                    <p class="max-w-4xl text-xs leading-5 opacity-85 sm:text-sm">
                        Use the sidebar to move between component pages. Each page is meant to combine reference copy,
                        API tables, template snippets, and an interactive playground for checking states in context.
                    </p>

                    <div class="grid gap-3 lg:grid-cols-3">
                        <div class="rounded-md input-bg input-ring px-3 py-3 text-xs leading-5 sm:text-sm">
                            <p class="text-[10px] font-semibold uppercase tracking-[0.14em] opacity-60">Reference</p>
                            <p class="mt-1.5">Overview, usage guidance, and prop documentation for each component.</p>
                        </div>
                        <div class="rounded-md input-bg input-ring px-3 py-3 text-xs leading-5 sm:text-sm">
                            <p class="text-[10px] font-semibold uppercase tracking-[0.14em] opacity-60">Examples</p>
                            <p class="mt-1.5">Pinned code snippets that mirror how the component should be used in the app.</p>
                        </div>
                        <div class="rounded-md input-bg input-ring px-3 py-3 text-xs leading-5 sm:text-sm">
                            <p class="text-[10px] font-semibold uppercase tracking-[0.14em] opacity-60">Playgrounds</p>
                            <p class="mt-1.5">Live controls for testing spacing, validation, icons, and state combinations.</p>
                        </div>
                    </div>
                </div>
            </DocsPanel>

            <div class="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
                <DocsPanel icon="tabler:components" eyebrow="Available Pages" title="Current Docs Pages">
                    <div class="grid gap-3 md:grid-cols-2">
                        <NuxtLink
                            v-for="item in featuredItems"
                            :key="item.title"
                            :to="item.path"
                            class="rounded-md border border-TBD-bg-dark/10 bg-TBD-bg-light/30 px-3 py-3 transition-300 hover:border-TBD-primary-light/35 hover:bg-TBD-bg-light/45 dark:border-TBD-bg-light/10 dark:bg-TBD-bg-dark/20 dark:hover:border-TBD-primary-dark/35 dark:hover:bg-TBD-bg-dark/35">
                            <div class="flex items-start gap-2.5">
                                <Icon :name="item.icon" class="mt-0.5 text-base text-TBD-primary-light dark:text-TBD-primary-dark"/>
                                <div>
                                    <p class="text-sm font-semibold">{{ item.title }}</p>
                                    <p class="mt-1 text-xs leading-5 opacity-75 sm:text-sm">{{ item.description }}</p>
                                </div>
                            </div>
                        </NuxtLink>
                    </div>
                </DocsPanel>

                <DocsPanel icon="tabler:clock-hour-4" eyebrow="Roadmap" title="Queued Components" tone="contrast">
                    <div class="space-y-2.5 text-xs leading-5 sm:text-sm">
                        <div v-for="item in queuedItems" :key="item.title" class="rounded-md border border-TBD-bg-light/10 bg-TBD-bg-dark/25 px-3 py-2.5 dark:border-TBD-bg-dark/10 dark:bg-TBD-bg-light/25">
                            <div class="flex items-center justify-between gap-2">
                                <p class="font-semibold">{{ item.title }}</p>
                                <span class="rounded-full bg-TBD-bg-light/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em]">
                                    {{ getStatusLabel(item.status) }}
                                </span>
                            </div>
                            <p class="mt-1 opacity-75">{{ item.description }}</p>
                        </div>
                    </div>
                </DocsPanel>
            </div>
    </div>
</template>