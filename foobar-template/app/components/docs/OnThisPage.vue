<script setup lang="ts">
    interface DocsSectionLink {
        id: string;
        title: string;
    }

    const props = defineProps<{
        sections: DocsSectionLink[];
    }>();

    const activeSectionId = ref(props.sections[0]?.id ?? '');

    onMounted(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    activeSectionId.value = entry.target.id;
                }
            },
            {
                rootMargin: '-20% 0px -70% 0px',
            }
        );

        props.sections.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
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

                <InputsButton slim class="w-full" :outline="activeSectionId != section.id"
                    :color="activeSectionId === section.id ? 'primary' : 'neutral'">
                    <div class="flex-full justify-between items-center">

                        <span class="flex items-center gap-2">
                            <span class="size-1.5 rounded-full transition-300"
                                :class="activeSectionId === section.id
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