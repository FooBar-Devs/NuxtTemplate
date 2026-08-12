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
        bodyClass: 'p-5',
    });

    const headerClass = computed(() => props.tone === 'primary'
        ? 'bg-TBD-primary-light text-TBD-text-light dark:bg-TBD-primary-dark dark:text-TBD-text-dark'
        : 'bg-TBD-bg-dark text-TBD-text-light dark:text-TBD-text-dark');
</script>

<template>
    <section class="relative overflow-hidden rounded-lg border border-TBD-bg-dark/10 shadow-dark dark:border-TBD-bg-light/10 dark:shadow-light"
        :class="sticky ? 'xl:sticky xl:top-8 xl:self-start' : ''">
        <TextBGEffect/>

        <div class="relative z-1" :class="tone === 'primary' ? 'flex min-h-full flex-col text-sm' : ''">
            <div class="bg-TBD-primary-light dark:bg-TBD-primary-dark
                flex items-center justify-between gap-2.5 border-b border-TBD-bg-dark/10 px-4 py-2.5 dark:border-TBD-bg-light/10"
                :class="headerClass">
                <div class="flex items-center gap-3">
                    <Icon v-if="icon" :name="icon" class="text-lg"/>
                    <div>
                        <p class="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-75">
                            {{ eyebrow }}
                        </p>
                        <p class="text-base font-bold leading-5">
                            {{ title }}
                        </p>
                    </div>
                </div>

                <slot name="header-right"/>
            </div>

            <div class="text-TBD-text-dark dark:text-TBD-text-light" :class="bodyClass">
                <slot/>
            </div>
        </div>
    </section>
</template>