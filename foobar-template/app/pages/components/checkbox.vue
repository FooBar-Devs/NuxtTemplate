<script lang="ts" setup>
    const checked = ref(false);
    const warning = ref(false);
    const required = ref(false);
    const slim = ref(false);
    const hideLabel = ref(false);
    const title = ref('Preference');
    const label = ref('Enable option');
    const description = ref('Use this switch for boolean choices in compact forms.');

    const documentedProps = [
        { name: 'v-model / modelValue', type: 'boolean', required: false, description: 'Current checked state synchronized with the parent component.' },
        { name: 'label', type: 'string', required: true, description: 'Primary text shown next to the checkbox and used for input id.' },
        { name: 'title', type: 'string', required: false, description: 'Optional field heading rendered through the shared label component.' },
        { name: 'description', type: 'string', required: false, description: 'Secondary helper text displayed under the title label.' },
        { name: 'required', type: 'boolean', required: false, description: 'Shows the required marker next to the visible checkbox label.' },
        { name: 'warning', type: 'boolean', required: false, description: 'Highlights the control in warning color when unchecked.' },
        { name: 'slim', type: 'boolean', required: false, description: 'Uses denser spacing and smaller control sizing.' },
        { name: 'hideLabel', type: 'boolean', required: false, description: 'Hides the adjacent text label while keeping the checkbox control active.' },
    ];

    const usageNotes = [
        'Use InputsCheckBox for true/false settings where users should immediately see the active state.',
        'Combine warning with unchecked defaults for confirmations that should stand out visually.',
        'Use slim in dense settings panels so checkboxes align with compact text and numeric inputs.',
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
    <div>
        <DocsLayout>
            <template #main>
                <article class="space-y-7 text-sm text-TBD-text-dark dark:text-TBD-text-light">
                    <header id="overview" class="scroll-mt-8 space-y-3">
                        <div class="inline-flex items-center gap-1.5 rounded-full border border-TBD-primary-light/25 bg-TBD-primary-light/8 px-2 py-0.5 text-[10px] font-semibold text-TBD-primary-light dark:border-TBD-primary-dark/30 dark:bg-TBD-primary-dark/12 dark:text-TBD-primary-dark">
                            <Icon name="tabler:checkbox" class="text-xs"/>
                            <span>&lt;InputsCheckBox&gt;</span>
                        </div>

                        <p class="text-sm leading-6 opacity-92">
                            <b>InputsCheckBox</b> handles boolean choices using the shared form look, optional warning state,
                            and compact sizing mode. It is a practical default for toggles where explicit checked or
                            unchecked feedback is required in forms and settings panels.
                        </p>
                    </header>

                    <section id="basic-usage" class="scroll-mt-8 space-y-3 border-t border-TBD-bg-dark/10 pt-6 dark:border-TBD-bg-light/10">
                        <div class="space-y-1.5">
                            <h2 class="text-lg font-bold">Basic Usage</h2>
                            <p class="text-xs leading-5 opacity-85 sm:text-sm">
                                Bind with <b>v-model</b>, pass a unique <b>label</b>, then layer optional props like
                                <b>title</b>, <b>description</b>, <b>warning</b>, and <b>slim</b> to match the context.
                            </p>
                        </div>

                        <DocsCodeExample
                            eyebrow="Example"
                            title="Basic Template"
                            description="Use a label for clear semantics, bind checked state with v-model, and enable warning mode when an unchecked value needs visual emphasis.">
                            <span class="block"><span class="text-TBD-primary-light dark:text-TBD-primary-dark">&lt;InputsCheckBox</span></span>
                            <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">v-model</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"checked"</span></span>
                            <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">label</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"Enable option"</span></span>
                            <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">:warning</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"warning"</span></span>
                            <span class="block"><span class="text-TBD-primary-light dark:text-TBD-primary-dark">/&gt;</span></span>
                        </DocsCodeExample>
                    </section>

                    <section id="when-to-use" class="scroll-mt-8 space-y-3 border-t border-TBD-bg-dark/10 pt-6 dark:border-TBD-bg-light/10">
                        <div class="space-y-1.5">
                            <h2 class="text-lg font-bold">When to Use</h2>
                            <p class="text-xs leading-5 opacity-85 sm:text-sm">
                                Reach for this control when users need to confirm or opt in to a clear on/off state.
                            </p>
                        </div>

                        <div class="grid gap-2.5 md:grid-cols-3">
                            <div v-for="note in usageNotes" :key="note" class="rounded-md input-bg input-ring px-3 py-2.5 text-xs leading-5 sm:text-sm">
                                {{ note }}
                            </div>
                        </div>
                    </section>

                    <section id="live-example" class="scroll-mt-8 space-y-3 border-t border-TBD-bg-dark/10 pt-6 dark:border-TBD-bg-light/10">
                        <div class="space-y-1.5">
                            <h2 class="text-lg font-bold">Live Example</h2>
                            <p class="text-xs leading-5 opacity-85 sm:text-sm">
                                Toggle checkbox props in real time to inspect compact mode, warning emphasis, and label visibility.
                            </p>
                        </div>

                        <div class="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)]">
                            <DocsPanel icon="tabler:adjustments-horizontal" eyebrow="Playground" title="Controls" body-class="p-4">
                                <div class="space-y-4">
                                    <div class="flex flex-col gap-2">
                                        <InputsText :maxlength="60" slim label="Title" v-model="title" name="checkboxTitle"/>
                                        <InputsText :maxlength="60" slim label="Label" v-model="label" name="checkboxLabel"/>
                                        <InputsText :maxlength="120" slim label="Description" v-model="description" name="checkboxDescription"/>
                                    </div>

                                    <div class="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
                                        <InputsCheckBox slim v-model="checked" label="Checked"/>
                                        <InputsCheckBox slim v-model="warning" label="Warning"/>
                                        <InputsCheckBox slim v-model="required" label="Required"/>
                                        <InputsCheckBox slim v-model="hideLabel" label="Hide Label"/>
                                        <InputsCheckBox slim v-model="slim" label="Slim"/>
                                    </div>
                                </div>
                            </DocsPanel>

                            <DocsPanel icon="tabler:beaker" eyebrow="Preview" title="Rendered Field" body-class="p-5">
                                <div class="max-w-xl space-y-3">
                                    <InputsCheckBox
                                        v-model="checked"
                                        :title="title"
                                        :label="label"
                                        :description="description"
                                        :warning="warning"
                                        :required="required"
                                        :hide-label="hideLabel"
                                        :slim="slim"
                                    >
                                        <span class="text-xs opacity-80">Slot content: click this text to toggle as well.</span>
                                    </InputsCheckBox>

                                    <div class="rounded-md border border-TBD-bg-dark/10 bg-TBD-bg-light/35 px-3 py-2 text-xs dark:border-TBD-bg-light/10 dark:bg-TBD-bg-dark/20">
                                        Current value: <b>{{ checked ? 'Checked' : 'Unchecked' }}</b>
                                    </div>
                                </div>
                            </DocsPanel>
                        </div>
                    </section>

                    <section id="props" class="scroll-mt-8 space-y-3 border-t border-TBD-bg-dark/10 pt-6 dark:border-TBD-bg-light/10">
                        <div class="flex items-center justify-between gap-4">
                            <h2 class="text-lg font-bold">Props</h2>
                            <p class="text-[10px] uppercase tracking-[0.14em] opacity-55">API Reference</p>
                        </div>

                        <DocsPropsTable :rows="documentedProps"/>
                    </section>

                    <section class="rounded-md border border-TBD-secondary-light/35 bg-TBD-secondary-light/10 px-3.5 py-3 text-xs leading-5 dark:border-TBD-secondary-dark/40 dark:bg-TBD-secondary-dark/15 sm:text-sm">
                        <p class="font-semibold text-TBD-secondary-light dark:text-TBD-secondary-dark">Testing Notes</p>
                        <p class="mt-1.5 opacity-85">
                            This page helps verify warning visuals, compact spacing, label visibility, and two-way state sync.
                        </p>
                    </section>
                </article>
            </template>

            <template #aside>
                <div class="space-y-4 2xl:sticky 2xl:top-6 2xl:self-start">
                    <DocsOnThisPage :sections="pageSections"/>
                </div>
            </template>
        </DocsLayout>
    </div>
</template>