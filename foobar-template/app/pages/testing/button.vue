<script setup lang="ts">
    const slim = ref(false);
    const outline = ref(false);
    const textUnderline = ref(false);
    const colorBackground = ref<'default' | 'error' | 'warning' | 'neutral'>('default');
    const colorHover = ref<'default' | 'error' | 'warning' | 'neutral'>('default');

    const propsRows = [
        { name: 'slim', type: 'boolean', required: false, description: 'Compact button height.' },
        { name: 'outline', type: 'boolean', required: false, description: 'Outline-only visual style.' },
        { name: 'textUnderline', type: 'boolean', required: false, description: 'Underline text on hover.' },
        { name: 'colorBackground', type: "'default' | 'error' | 'warning' | 'neutral'", required: false, description: 'Background style key.' },
        { name: 'colorHover', type: "'default' | 'error' | 'warning' | 'neutral'", required: false, description: 'Hover overlay style key.' },
    ];

    const usageNotes = [
        'Use InputsButton for primary and secondary actions where visual emphasis should match the current theme.',
        'Enable outline for lower-priority actions that should stay readable but less dominant.',
        'Use slim mode inside dense toolbars and compact settings panels.',
    ];

    const pageSections = [
        { id: 'overview', title: 'Overview' },
        { id: 'basic-usage', title: 'Basic Usage' },
        { id: 'when-to-use', title: 'When to Use' },
        { id: 'live-example', title: 'Live Example' },
        { id: 'props', title: 'Props' },
    ];
</script>

<template>
    <DocsLayout>
        <template #main>
            <article class="max-w-4xl space-y-6 text-sm text-TBD-text-dark dark:text-TBD-text-light">
                <section id="overview" class="scroll-mt-8 space-y-2">
                    <div class="inline-flex items-center gap-1.5 rounded-full border border-TBD-primary-light/25 bg-TBD-primary-light/8 px-2 py-0.5 text-[10px] font-semibold text-TBD-primary-light dark:border-TBD-primary-dark/30 dark:bg-TBD-primary-dark/12 dark:text-TBD-primary-dark">
                        <Icon name="tabler:rectangle-rounded-top" class="text-xs"/>
                        <span>&lt;InputsButton&gt;</span>
                    </div>
                    <h2 class="text-lg font-bold">InputsButton</h2>
                    <p class="text-xs leading-5 opacity-85 sm:text-sm">InputsButton is the shared action component used across forms, dialogs, and setting surfaces. It provides themed background variants, optional outline mode, compact sizing, and subtle hover motion while keeping interactions visually consistent.</p>
                </section>

                <section id="basic-usage" class="scroll-mt-8 space-y-3 border-t border-TBD-bg-dark/10 pt-5 dark:border-TBD-bg-light/10">
                    <h3 class="text-base font-bold">Basic Usage</h3>
                    <p class="text-xs leading-5 opacity-85 sm:text-sm">Pass content through the slot and control visual style with `colorBackground`, `colorHover`, and `outline`. Keep labels concise and action-oriented so button intent stays clear in dense layouts.</p>

                    <DocsCodeExample
                        eyebrow="Example"
                        title="Basic Template"
                        description="Use InputsButton for primary actions, then layer style props for visual priority and compactness.">
                        <span class="block"><span class="text-TBD-primary-light dark:text-TBD-primary-dark">&lt;InputsButton</span></span>
                        <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">:slim</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"slim"</span></span>
                        <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">:outline</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"outline"</span></span>
                        <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">:color-background</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"colorBackground"</span></span>
                        <span class="block">&gt;Save Changes&lt;/InputsButton&gt;</span>
                    </DocsCodeExample>
                </section>

                <section id="when-to-use" class="scroll-mt-8 space-y-3 border-t border-TBD-bg-dark/10 pt-5 dark:border-TBD-bg-light/10">
                    <h3 class="text-base font-bold">When to Use</h3>
                    <div class="grid gap-2.5 md:grid-cols-3">
                        <div v-for="note in usageNotes" :key="note" class="rounded-md input-bg input-ring px-3 py-2.5 text-xs leading-5 sm:text-sm">
                            {{ note }}
                        </div>
                    </div>
                </section>

                <section id="live-example" class="scroll-mt-8 space-y-3 border-t border-TBD-bg-dark/10 pt-5 dark:border-TBD-bg-light/10">
                    <DocsPanel icon="tabler:beaker" eyebrow="Preview" title="Live Example" body-class="p-4">
                        <div class="grid gap-3 md:grid-cols-2">
                            <InputsCheckBox slim v-model="slim" label="Slim" />
                            <InputsCheckBox slim v-model="outline" label="Outline" />
                            <InputsCheckBox slim v-model="textUnderline" label="Text underline" />

                            <InputsDropdown
                                slim
                                name="buttonBackground"
                                label="Background"
                                :list="['default', 'error', 'warning', 'neutral']"
                                v-model="colorBackground"
                            />
                            <InputsDropdown
                                slim
                                name="buttonHover"
                                label="Hover"
                                :list="['default', 'error', 'warning', 'neutral']"
                                v-model="colorHover"
                            />
                        </div>

                        <div class="mt-4">
                            <InputsButton
                                :slim="slim"
                                :outline="outline"
                                :text-underline="textUnderline"
                                :color-background="colorBackground"
                                :color-hover="colorHover">
                                Save Changes
                            </InputsButton>
                        </div>
                    </DocsPanel>
                </section>

                <section id="props" class="scroll-mt-8 space-y-3 border-t border-TBD-bg-dark/10 pt-5 dark:border-TBD-bg-light/10">
                    <DocsPropsTable :rows="propsRows"/>
                </section>

                <section class="rounded-md border border-TBD-secondary-light/35 bg-TBD-secondary-light/10 px-3.5 py-3 text-xs leading-5 dark:border-TBD-secondary-dark/40 dark:bg-TBD-secondary-dark/15 sm:text-sm">
                    <p class="font-semibold text-TBD-secondary-light dark:text-TBD-secondary-dark">Testing Notes</p>
                    <p class="mt-1.5 opacity-85">Verify contrast and readability for each background variant, then validate that compact mode still keeps labels legible on smaller screens.</p>
                </section>
            </article>
        </template>

        <template #aside>
            <DocsOnThisPage :sections="pageSections"/>
        </template>
    </DocsLayout>
</template>