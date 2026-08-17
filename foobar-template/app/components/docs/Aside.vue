<script setup lang="ts">
    const route = useRoute();
    const isActive = (path?: string) => path ? route.path === path : false;
    const statusLabelMap: Record<DocsNavItem['status'], string> = {
        'ready': 'Ready',
        'planned': 'Soon',
        'in-progress': 'In Progress',
        'needs-review': 'Needs Review',
    };
    const getStatusLabel = (status: DocsNavItem['status']) => statusLabelMap[status];
    const getItemClasses = (path?: string) => [
        'relative z-10 block w-full rounded-md border px-2.5 py-2.5 text-left transition-300',
        isActive(path)
            ? 'border-TBD-primary-light/45 bg-TBD-primary-light/10 text-TBD-primary-light dark:border-TBD-primary-dark/45 dark:bg-TBD-primary-dark/15 dark:text-TBD-primary-dark'
            : 'border-TBD-bg-dark/10 bg-TBD-bg-light/25 text-TBD-text-dark hover:border-TBD-text-dark/20 hover:bg-TBD-bg-light/45 dark:border-TBD-bg-light/10 dark:bg-TBD-bg-dark/20 dark:text-TBD-text-light dark:hover:border-TBD-text-light/20 dark:hover:bg-TBD-bg-dark/35',
    ];
    const getStatusColor = (status: DocsNavItem['status']) => {
        switch (status) {
            case 'ready':
                return 'confirm';
            case 'planned':
                return 'warning';
            case 'in-progress':
                return 'primary';
            case 'needs-review':
                return 'error';
        }
    };
</script>

<template>
    <DocsPanel sticky icon="tabler:books" eyebrow="Documentation"
        title="UI Components" tone="primary" body-class="p-0"
        class="min-w-64 w-64 h-[calc(100dvh-2rem)]">

        <div class="px-4 py-2 text-xs text-TBD-text-dark/75 dark:text-TBD-text-light/75">
            Browse components, their props, and usage examples.
        </div>

        <TextLine slim class="my-0!"/>

        <div class="grow p-2 xl:max-h-[calc(100dvh-13rem+72px)] overflow-y-auto scrollbar-size-1.5">
            
            <div v-for="section in docsSections" :key="section.title" class="mb-2 last:mb-0">
                
                <p class="px-1 pb-2 text-eyebrow-bold opacity-60">
                    {{ section.title }}
                </p>

                <div class="flex flex-col gap-1">
                    <template v-for="item in section.items" :key="item.title">
                        <NuxtLink v-if="item.path" :to="item.path">
                            <DocsCard :item="item"/>
                        </NuxtLink>

                        <DocsCard v-else :item="item"/>
                    </template>
                </div>
            </div>
        </div>
    </DocsPanel>
</template>