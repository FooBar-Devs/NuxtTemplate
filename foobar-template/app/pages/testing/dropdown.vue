<script setup lang="ts">
    const items = ref([
        { name: 'First', value: 'first' },
        { name: 'Second', value: 'second' },
        { name: 'Third', value: 'third' },
    ]);
    const selected = ref('first');
    const slim = ref(false);
    const required = ref(false);
    const onlyPlaceholder = ref(false);

    const propsRows = [
        { name: 'name', type: 'string', required: true, description: 'Form field key.' },
        { name: 'list', type: 'array', required: false, description: 'Selectable item list.' },
        { name: 'labelName / emitName', type: 'string', required: false, description: 'Object item label and emitted value keys.' },
        { name: 'placeholder', type: 'string', required: false, description: 'Placeholder when no value is selected.' },
        { name: 'onlyPlaceholder', type: 'boolean', required: false, description: 'Always show placeholder text.' },
        { name: 'showItemsAmount', type: 'number', required: false, description: 'Visible items before scrolling.' },
        { name: 'slim', type: 'boolean', required: false, description: 'Compact mode.' },
    ];

    const usageNotes = [
        'Use InputsDropdown for constrained choices where values come from predefined options.',
        'Pass object lists with labelName and emitName when display and payload values differ.',
        'Use onlyPlaceholder to keep neutral UI text until the user commits a selection.',
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
                        <Icon name="tabler:selector" class="text-xs"/>
                        <span>&lt;InputsDropdown&gt;</span>
                    </div>
                    <h2 class="text-lg font-bold">InputsDropdown</h2>
                    <p class="text-xs leading-5 opacity-85 sm:text-sm">InputsDropdown provides a theme-consistent select experience with viewport-aware list placement, optional object mapping, and form validation integration through the shared input stack.</p>
                </section>

                <section id="basic-usage" class="scroll-mt-8 space-y-3 border-t border-TBD-bg-dark/10 pt-5 dark:border-TBD-bg-light/10">
                    <h3 class="text-base font-bold">Basic Usage</h3>
                    <p class="text-xs leading-5 opacity-85 sm:text-sm">Provide a unique `name`, bind value with `v-model`, and pass a `list` array. For object lists, set `labelName` for UI text and `emitName` for emitted values.</p>

                    <DocsCodeExample
                        eyebrow="Example"
                        title="Basic Template"
                        description="Configure a list source, bind the current value, and map object fields when display and emit values differ.">
                        <span class="block"><span class="text-TBD-primary-light dark:text-TBD-primary-dark">&lt;InputsDropdown</span></span>
                        <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">v-model</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"selected"</span></span>
                        <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">name</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"status"</span></span>
                        <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">:list</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"items"</span></span>
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
                            <InputsCheckBox slim v-model="required" label="Required" />
                            <InputsCheckBox slim v-model="slim" label="Slim" />
                            <InputsCheckBox slim v-model="onlyPlaceholder" label="Only placeholder" />
                        </div>

                        <div class="mt-4 max-w-sm">
                            <InputsDropdown
                                v-model="selected"
                                name="docsDropdown"
                                label="Options"
                                description="Choose one option"
                                placeholder="Select an option"
                                label-name="name"
                                emit-name="value"
                                :required="required"
                                :only-placeholder="onlyPlaceholder"
                                :slim="slim"
                                :list="items"/>
                        </div>

                        <p class="mt-3 text-xs opacity-75">Selected value: {{ selected }}</p>
                    </DocsPanel>
                </section>

                <section id="props" class="scroll-mt-8 border-t border-TBD-bg-dark/10 pt-5 dark:border-TBD-bg-light/10">
                    <DocsPropsTable :rows="propsRows"/>
                </section>

                <section class="rounded-md border border-TBD-secondary-light/35 bg-TBD-secondary-light/10 px-3.5 py-3 text-xs leading-5 dark:border-TBD-secondary-dark/40 dark:bg-TBD-secondary-dark/15 sm:text-sm">
                    <p class="font-semibold text-TBD-secondary-light dark:text-TBD-secondary-dark">Testing Notes</p>
                    <p class="mt-1.5 opacity-85">Validate placeholder behavior, object emission mapping, and dropdown placement near viewport edges.</p>
                </section>
            </article>
        </template>

        <template #aside>
            <DocsOnThisPage :sections="pageSections"/>
        </template>
    </DocsLayout>
</template>
