<script setup lang="ts">
    interface DocsSectionLink {
        id: string;
        title: string;
    }

    const props = withDefaults(defineProps<{
        sections: DocsSectionLink[];
        homePath?: string;
        homeLabel?: string;
    }>(), {
        homePath: '/testing',
        homeLabel: 'Back to Docs Home',
    });

    const activeSectionId = ref(props.sections[0]?.id ?? '');

    onMounted(() => {
        const sectionElements = props.sections
            .map((section) => document.getElementById(section.id))
            .filter((element): element is HTMLElement => element instanceof HTMLElement);

        if (!sectionElements.length) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top);

                const nextActiveId = visibleEntries[0]?.target.id;
                if (nextActiveId) {
                    activeSectionId.value = nextActiveId;
                }
            },
            {
                rootMargin: '-15% 0px -70% 0px',
                threshold: [0, 0.2, 0.5, 1],
            }
        );

        sectionElements.forEach((element) => observer.observe(element));

        onBeforeUnmount(() => {
            observer.disconnect();
        });
    });
</script>

<template>
    <div class="space-y-4 sticky top-4 self-start">
        <DocsPanel eyebrow="Page" title="On This Page" tone="contrast" body-class="p-2.5">
            <div class="space-y-2.5">
                <NuxtLink
                    :to="homePath"
                    class="w-full flex items-center justify-between rounded-md border border-TBD-text-dark/5 bg-TBD-bg-dark/5 px-3 py-2 text-xs font-semibold leading-5 text-TBD-text-dark transition-300 hover:border-TBD-bg-dark/35 hover:bg-TBD-bg-light/10 hover:text-TBD-text-dark dark:border-TBD-text-light/10 dark:bg-TBD-bg-light/5 dark:text-TBD-text-light dark:hover:border-TBD-bg-light/35 dark:hover:bg-TBD-bg-light/10 dark:hover:text-TBD-text-dark">
                    <span>{{ homeLabel }}</span>
                    <Icon name="tabler:arrow-left" class="text-sm"/>
                </NuxtLink>

                <nav class="max-h-[calc(100vh-14rem)] space-y-1 overflow-y-auto overscroll-contain">
                <a v-for="section in sections" :key="section.id"
                    :href="`#${section.id}`"
                    class="group block rounded-md border px-3 py-2 text-xs leading-5 transition-300"
                    :class="activeSectionId === section.id
                        ? 'border-TBD-primary-light/40 bg-TBD-primary-light/10 text-TBD-primary-light shadow-dark dark:border-TBD-primary-dark/40 dark:bg-TBD-primary-dark/12 dark:text-TBD-primary-dark dark:shadow-light'
                        : 'border-TBD-text-dark/10 bg-TBD-bg-dark/6 text-TBD-text-dark hover:border-TBD-bg-dark/30 hover:bg-TBD-bg-light/8 hover:text-TBD-text-dark dark:border-TBD-text-light/10 dark:bg-TBD-bg-light/5 dark:text-TBD-text-light dark:hover:border-TBD-bg-light/30 dark:hover:bg-TBD-bg-light/8 dark:hover:text-TBD-text-light'">
                    <span class="flex items-center gap-2">
                        <span class="h-1.5 w-1.5 rounded-full transition-300"
                            :class="activeSectionId === section.id
                                ? 'bg-TBD-primary-light dark:bg-TBD-primary-dark'
                                : 'bg-TBD-text-dark/35 group-hover:bg-TBD-text-dark dark:bg-TBD-text-light/35 dark:group-hover:bg-TBD-text-light'"/>
                        <span>{{ section.title }}</span>
                    </span>
                </a>
                </nav>
            </div>
        </DocsPanel>
    </div>
</template>