<script setup lang="ts">
    const label = ref('Display Name');
    const description = ref('Shown under the label as helper text.');
    const required = ref(true);

    const propsRows = [
        { name: 'label', type: 'string', required: false, description: 'Primary label content.' },
        { name: 'description', type: 'string', required: false, description: 'Secondary helper line.' },
        { name: 'required', type: 'boolean', required: false, description: 'Shows required star marker.' },
    ];

    const usageNotes = [
        'Use this for consistent form labeling across custom and built-in inputs.',
        'Display description text when extra context helps reduce input mistakes.',
        'Enable required marker only for truly mandatory fields to avoid visual noise.',
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
            <article class="space-y-6 text-sm text-TBD-text-dark dark:text-TBD-text-light">
                <section id="overview" class="scroll-mt-8 space-y-2">
                    <div class="inline-flex items-center gap-1.5 rounded-full border border-TBD-primary-light/25 bg-TBD-primary-light/8 px-2 py-0.5 text-[10px] font-semibold text-TBD-primary-light dark:border-TBD-primary-dark/30 dark:bg-TBD-primary-dark/12 dark:text-TBD-primary-dark">
                        <Icon name="tabler:abc" class="text-xs"/>
                        <span>&lt;InputsLabel&gt;</span>
                    </div>
                    <h2 class="text-lg font-bold">InputsLabel</h2>
                    <p class="text-xs leading-5 opacity-85 sm:text-sm">InputsLabel standardizes how field titles, helper descriptions, and required indicators are rendered across the input system.</p>
                </section>

                <section id="basic-usage" class="scroll-mt-8 space-y-3 border-t border-TBD-bg-dark/10 pt-5 dark:border-TBD-bg-light/10">
                    <h3 class="text-base font-bold">Basic Usage</h3>
                    <p class="text-xs leading-5 opacity-85 sm:text-sm">Provide `label` and optional `description`, then set `required` when the field must be completed. Use slots for advanced composed label content.</p>

                    <DocsCodeExample
                        eyebrow="Example"
                        title="Basic Template"
                        description="Use InputsLabel as a shared text layer for field titles, helper content, and required indicators.">
                        <span class="block"><span class="text-TBD-primary-light dark:text-TBD-primary-dark">&lt;InputsLabel</span></span>
                        <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">label</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"Display Name"</span></span>
                        <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">:required</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"true"</span></span>
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
                            <InputsText slim name="docsLabelText" label="Label" v-model="label" />
                            <InputsText slim name="docsLabelDescription" label="Description" v-model="description" />
                            <InputsCheckBox slim v-model="required" label="Required" />
                        </div>

                        <div class="mt-4 max-w-md rounded-md border border-TBD-bg-dark/10 p-3 dark:border-TBD-bg-light/10">
                            <InputsLabel :label="label" :description="description" :required="required" />
                        </div>
                    </DocsPanel>
                </section>

                <section id="props" class="scroll-mt-8 border-t border-TBD-bg-dark/10 pt-5 dark:border-TBD-bg-light/10">
                    <DocsPropsTable :rows="propsRows"/>
                </section>

                <section class="rounded-md border border-TBD-secondary-light/35 bg-TBD-secondary-light/10 px-3.5 py-3 text-xs leading-5 dark:border-TBD-secondary-dark/40 dark:bg-TBD-secondary-dark/15 sm:text-sm">
                    <p class="font-semibold text-TBD-secondary-light dark:text-TBD-secondary-dark">Testing Notes</p>
                    <p class="mt-1.5 opacity-85">Verify label fallback behavior with empty title, long description wrapping, and required marker positioning.</p>
                </section>
            </article>
        </template>

        <template #aside>
            <DocsOnThisPage :sections="pageSections"/>
        </template>
    </DocsLayout>
</template>
