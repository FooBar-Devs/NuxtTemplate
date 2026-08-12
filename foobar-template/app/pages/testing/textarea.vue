<script setup lang="ts">
    const value = ref('This is a multiline sample.');
    const slim = ref(false);
    const disabled = ref(false);
    const maxlength = ref(180);

    const propsRows = [
        { name: 'name', type: 'string', required: true, description: 'Form field key.' },
        { name: 'modelValue', type: 'string', required: false, description: 'Current textarea value.' },
        { name: 'maxlength', type: 'number', required: false, description: 'Maximum length.' },
        { name: 'height', type: 'number', required: false, description: 'Explicit starting height.' },
        { name: 'slim', type: 'boolean', required: false, description: 'Compact mode.' },
        { name: 'disabled', type: 'boolean', required: false, description: 'Disables editing.' },
    ];

    const usageNotes = [
        'Use InputsTextArea for comments, notes, and descriptions that exceed one line.',
        'Set maxlength early to align UX expectations and validation feedback.',
        'Use fixed height for predictable layout in cards and settings panels.',
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
                        <Icon name="tabler:align-box-left-stretch" class="text-xs"/>
                        <span>&lt;InputsTextArea&gt;</span>
                    </div>
                    <h2 class="text-lg font-bold">InputsTextArea</h2>
                    <p class="text-xs leading-5 opacity-85 sm:text-sm">InputsTextArea is the multiline companion to InputsText. It keeps the same visual language and validation behavior while supporting longer content and custom height control.</p>
                </section>

                <section id="basic-usage" class="scroll-mt-8 space-y-3 border-t border-TBD-bg-dark/10 pt-5 dark:border-TBD-bg-light/10">
                    <h3 class="text-base font-bold">Basic Usage</h3>
                    <p class="text-xs leading-5 opacity-85 sm:text-sm">Provide `name` and bind with `v-model`, then pass `maxlength`, `placeholder`, and optional `height` for predictable multiline interaction.</p>

                    <DocsCodeExample
                        eyebrow="Example"
                        title="Basic Template"
                        description="Use InputsTextArea for multiline input while keeping shared styling and validation behavior.">
                        <span class="block"><span class="text-TBD-primary-light dark:text-TBD-primary-dark">&lt;InputsTextArea</span></span>
                        <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">v-model</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"description"</span></span>
                        <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">name</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"details"</span></span>
                        <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">:maxlength</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"300"</span></span>
                        <span class="block"><span class="text-TBD-primary-light dark:text-TBD-primary-dark">/&gt;</span></span>
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
                        <div class="grid gap-2 md:grid-cols-2">
                            <InputsCheckBox slim v-model="slim" label="Slim" />
                            <InputsCheckBox slim v-model="disabled" label="Disabled" />
                            <InputsNumber slim label="Maxlength" name="docsTextareaMaxlength" v-model="maxlength" :min="20" />
                        </div>

                        <div class="mt-4 max-w-xl">
                            <InputsTextArea
                                v-model="value"
                                name="docsTextarea"
                                label="Description"
                                description="Multiline content"
                                placeholder="Write a longer message"
                                :maxlength="maxlength"
                                :slim="slim"
                                :disabled="disabled"
                                :height="140"/>
                        </div>
                    </DocsPanel>
                </section>

                <section id="props" class="scroll-mt-8 border-t border-TBD-bg-dark/10 pt-5 dark:border-TBD-bg-light/10">
                    <DocsPropsTable :rows="propsRows"/>
                </section>

                <section class="rounded-md border border-TBD-secondary-light/35 bg-TBD-secondary-light/10 px-3.5 py-3 text-xs leading-5 dark:border-TBD-secondary-dark/40 dark:bg-TBD-secondary-dark/15 sm:text-sm">
                    <p class="font-semibold text-TBD-secondary-light dark:text-TBD-secondary-dark">Testing Notes</p>
                    <p class="mt-1.5 opacity-85">Check placeholder behavior, max length limits, and disabled state opacity to ensure multiline interactions remain predictable.</p>
                </section>
            </article>
        </template>

        <template #aside>
            <DocsOnThisPage :sections="pageSections"/>
        </template>
    </DocsLayout>
</template>
