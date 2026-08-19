<script setup lang="ts">
    interface DocsSectionLink {
        id: string;
        title: string;
    }

    const props = defineProps<{
        sections: DocsSectionLink[];
    }>();

    const activeSectionIds = ref<Set<string>>(
        new Set(props.sections[0]?.id ? [props.sections[0].id] : [])
    );

    onMounted(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visibleSections = new Set(activeSectionIds.value);

                entries.forEach((entry) => {
                    entry.isIntersecting
                        ? visibleSections.add(entry.target.id)
                        : visibleSections.delete(entry.target.id);
                });

                activeSectionIds.value = visibleSections;
            },
            { rootMargin: '-20% 0px -20% 0px' }
        );

        props.sections.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        const handleScroll = () => {
            const atBottom =
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

            if (atBottom) {
                const lastSection = props.sections.at(-1);

                if (lastSection) {
                    activeSectionIds.value = new Set([lastSection.id]);
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        onUnmounted(() => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        });
    });
</script>

<template>
    <DocsPanel eyebrow="Page" title="On This Page" tone="primary" bodyClass="p-2" class="min-w-48 w-48" sticky>
        <div class="flex flex-col gap-1">
            <NuxtLink to="/components">
                <InputsButton slim class="w-full" color="neutral">
                    <div class="flex-full justify-between items-center">
                        <span>Back to Docs Home</span>
                        <Icon name="tabler:arrow-left" class="text-base"/>
                    </div>
                </InputsButton>
            </NuxtLink>

            <TextLine slim/>

            <a v-for="section in sections" :key="section.id" :href="`#${section.id}`">
                <InputsButton slim class="w-full"
                    :outline="!activeSectionIds.has(section.id)"
                    :color="activeSectionIds.has(section.id) ? 'primary' : 'neutral'">
                    <div class="flex-full justify-between items-center">
                        <span class="flex items-center gap-2">
                            <span class="size-1.5 rounded-full transition-300"
                                :class="activeSectionIds.has(section.id)
                                    ? 'bg-TBD-text-light dark:bg-TBD-text-dark'
                                    : 'bg-TBD-text-dark/50 group-hover:bg-TBD-text-dark/75 dark:bg-TBD-text-light/50 dark:group-hover:bg-TBD-text-light/75'"/>
                            <span>{{ section.title }}</span>
                        </span>
                    </div>
                </InputsButton>
            </a>
        </div>
    </DocsPanel>
</template>