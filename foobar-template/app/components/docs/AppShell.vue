<script setup lang="ts">
    import { docsSections } from '~/utils/docs/navigation';
    import type { DocsNavItem } from '~/utils/docs/navigation';
    import darkLogo from '~/assets/images/dark_logo_cirle.svg';
    import lightLogo from '~/assets/images/light_logo_circle.svg';

    withDefaults(defineProps<{
        eyebrow?: string;
        title: string;
        summary?: string;
    }>(), {
        eyebrow: 'Component Docs',
        summary: '',
    });

    const route = useRoute();
    const isActive = (path?: string) => path ? route.path === path : false;
    const statusLabelMap: Record<DocsNavItem['status'], string> = {
        ready: 'Ready',
        planned: 'Soon',
        'in-progress': 'In Progress',
        'needs-review': 'Needs Review',
    };
    const statusClassMap: Record<DocsNavItem['status'], string> = {
        ready: 'bg-TBD-confirm-light/15 text-TBD-confirm-light dark:bg-TBD-confirm-dark/20 dark:text-TBD-confirm-dark',
        planned: 'bg-TBD-warning-light/15 text-TBD-warning-light dark:bg-TBD-warning-dark/20 dark:text-TBD-warning-dark',
        'in-progress': 'bg-TBD-primary-light/15 text-TBD-primary-light dark:bg-TBD-primary-dark/20 dark:text-TBD-primary-dark',
        'needs-review': 'bg-TBD-secondary-light/15 text-TBD-secondary-light dark:bg-TBD-secondary-dark/20 dark:text-TBD-secondary-dark',
    };
    const getStatusLabel = (status: DocsNavItem['status']) => statusLabelMap[status];
    const getStatusClasses = (status: DocsNavItem['status']) => statusClassMap[status];
    const getItemClasses = (path?: string) => [
        'relative z-10 block w-full rounded-md border px-2.5 py-2.5 text-left transition-300',
        isActive(path)
            ? 'border-TBD-primary-light/45 bg-TBD-primary-light/10 text-TBD-primary-light dark:border-TBD-primary-dark/45 dark:bg-TBD-primary-dark/15 dark:text-TBD-primary-dark'
            : 'border-TBD-bg-dark/10 bg-TBD-bg-light/25 text-TBD-text-dark hover:border-TBD-text-dark/20 hover:bg-TBD-bg-light/45 dark:border-TBD-bg-light/10 dark:bg-TBD-bg-dark/20 dark:text-TBD-text-light dark:hover:border-TBD-text-light/20 dark:hover:bg-TBD-bg-dark/35',
    ];
</script>

<template>
    <div class="w-full self-baseline px-4 pt-8 text-TBD-text-dark sm:px-5 lg:px-6 dark:text-TBD-text-light">
        <div class="mx-auto w-full max-w-370">
            <header class="mb-4 flex w-full items-center justify-between rounded-lg border border-TBD-bg-dark/10 bg-TBD-bg-light/35 px-4 py-2.5 dark:border-TBD-bg-light/10 dark:bg-TBD-bg-dark/25">
                <NuxtLink to="/" class="flex items-center gap-2.5 transition-300 hover:opacity-85">
                    <img :src="lightLogo" alt="FooBar logo" class="h-8 w-8 dark:hidden"/>
                    <img :src="darkLogo" alt="FooBar logo" class="hidden h-8 w-8 dark:block"/>
                    <div>
                        <p class="text-[10px] font-semibold uppercase tracking-[0.16em] opacity-60">Docs</p>
                        <p class="text-sm font-bold leading-4">FooBar</p>
                    </div>
                </NuxtLink>

                <p class="text-[11px] uppercase tracking-[0.16em] opacity-55">FooBar UI Components</p>
            </header>

            <div class="xl:grid xl:grid-cols-[250px_minmax(0,1fr)] xl:items-start xl:gap-5">
                <aside class="flex flex-col relative xl:sticky top-4 xl:mb-0 h-[calc(100dvh-2rem)] xl:self-start">
                    <DocsPanel
                        icon="tabler:books"
                        eyebrow="Documentation"
                        title="UI Components"
                        tone="contrast"
                        class="h-full"
                        body-class="p-0">
                        <div class="border-b border-TBD-bg-dark/10 px-4 py-3 text-sm leading-5 text-TBD-text-dark dark:border-TBD-bg-light/10 dark:text-TBD-text-light">
                            Reference pages, examples, and live testing surfaces for the shared input components.
                        </div>

                        <div class="grow pl-2.5 py-2.5 pr-1 xl:max-h-[calc(100dvh-13rem+32px)] overflow-y-auto">
                            <div v-for="section in docsSections" :key="section.title" class="mb-4 last:mb-0">
                                <p class="px-2.5 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] opacity-50 dark:opacity-60">
                                    {{ section.title }}
                                </p>

                                <div class="space-y-1.5">
                                    <template v-for="item in section.items" :key="item.title">
                                        <NuxtLink
                                            v-if="item.path"
                                            :to="item.path"
                                            :class="[...getItemClasses(item.path), 'cursor-pointer']">
                                            <div class="flex items-start justify-between gap-3">
                                                <div>
                                                    <p class="text-sm font-semibold leading-5">{{ item.title }}</p>
                                                    <p class="mt-0.5 text-xs leading-4.5 opacity-75 dark:opacity-80">
                                                        {{ item.description }}
                                                    </p>
                                                </div>

                                                <span class="mt-0.5 whitespace-nowrap absolute top-1 right-1 rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em]"
                                                    :class="getStatusClasses(item.status)">
                                                    {{ getStatusLabel(item.status) }}
                                                </span>
                                            </div>
                                        </NuxtLink>

                                        <div
                                            v-else
                                            :class="[...getItemClasses(item.path), 'opacity-85 cursor-default']">
                                            <div class="flex items-start justify-between gap-3">
                                                <div>
                                                    <p class="text-sm font-semibold leading-5">{{ item.title }}</p>
                                                    <p class="mt-0.5 text-xs leading-4.5 opacity-75 dark:opacity-80">
                                                        {{ item.description }}
                                                    </p>
                                                </div>

                                                <span class="mt-0.5 whitespace-nowrap absolute top-1 right-1 rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em]"
                                                    :class="getStatusClasses(item.status)">
                                                    {{ getStatusLabel(item.status) }}
                                                </span>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </DocsPanel>
                </aside>

                <div class="min-w-0">
                    <main class="min-w-0 xl:pt-1">
                    <div class="mb-6 max-w-4xl space-y-2.5">
                        <p class="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-55">
                            {{ eyebrow }}
                        </p>
                        <h1 class="text-2xl font-bold sm:text-3xl">
                            {{ title }}
                        </h1>
                        <p v-if="summary" class="max-w-3xl text-sm leading-6 opacity-80">
                            {{ summary }}
                        </p>
                    </div>

                    <slot/>
                </main>

                    <footer class="mt-5 mb-4 flex w-full items-center justify-between rounded-lg border border-TBD-bg-dark/10 bg-TBD-bg-light/35 px-4 py-2.5 text-xs dark:border-TBD-bg-light/10 dark:bg-TBD-bg-dark/25">
                        <div class="flex items-center gap-2">
                            <img :src="lightLogo" alt="FooBar logo" class="h-5 w-5 dark:hidden"/>
                            <img :src="darkLogo" alt="FooBar logo" class="hidden h-5 w-5 dark:block"/>
                            <span class="font-semibold">FooBar</span>
                        </div>

                        <span class="opacity-70">Built with coffee and components.</span>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>
