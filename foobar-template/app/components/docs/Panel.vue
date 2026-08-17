<script setup lang="ts">
    type DocsPanelTone = 'primary' | 'contrast';

    const props = withDefaults(defineProps<{
        icon?: string;
        eyebrow: string;
        title: string;
        tone?: DocsPanelTone;
        sticky?: boolean;
        bodyClass?: string;
    }>(), {
        icon: '',
        tone: 'primary',
        sticky: false,
        bodyClass: 'p-4',
    });

    const headerClass = computed(() => props.tone === 'primary'
        ? 'bg-TBD-primary-light text-TBD-text-light dark:bg-TBD-primary-dark dark:text-TBD-text-dark'
        : 'dark:bg-TBD-bg-dark bg-TBD-bg-light dark:text-TBD-text-light text-TBD-text-dark');
</script>

<template>
    <section class="relative overflow-hidden rounded-lg border border-TBD-bg-dark/10 shadow-dark dark:border-TBD-bg-light/10 dark:shadow-light"
        :class="sticky ? 'sticky top-4 self-start' : ''">
        
        <TextBGEffect/>

        <div class="flex items-center justify-between gap-2 border-b border-TBD-bg-dark/10 px-4 py-2 dark:border-TBD-bg-light/10 transition-300"
            :class="headerClass">

            <slot name="header-left"/>

            <div v-if="eyebrow && title" class="flex items-center gap-4">
                <Icon v-if="icon" :name="icon" class="text-lg"/>
                <div>
                    <p class="text-eyebrow uppercase opacity-75">
                        {{ eyebrow }}
                    </p>
                    <p class="text-base font-bold leading-5">
                        {{ title }}
                    </p>
                </div>
            </div>

            <slot name="header-right"/>
        </div>

        <div :class="bodyClass">
            <slot/>
        </div>

    </section>
</template>