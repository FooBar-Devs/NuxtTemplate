<script setup lang="ts">
    const modelValue = ref(false);
    const disable = ref(false);
    const rotate = ref(false);
    const rotateOther = ref(false);

    const propsRows = [
        { name: 'modelValue', type: 'boolean', required: false, description: 'Current collapsed state.' },
        { name: 'disable', type: 'boolean', required: false, description: 'Disables clicking and updates.' },
        { name: 'rotate', type: 'boolean', required: false, description: 'Rotates arrow to vertical variant.' },
        { name: 'rotateOther', type: 'boolean', required: false, description: 'Alternate vertical direction.' },
        { name: 'rounded', type: 'string', required: false, description: 'Rounded utility classes.' },
    ];

    const usageNotes = [
        'Use this control for expandable side panels, accordion rows, and compact dock actions.',
        'Enable disable state when transitions are running to avoid repeated toggles.',
        'Choose rotate variants to match panel direction and visual hierarchy.',
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
                        <Icon name="tabler:chevron-left" class="text-xs"/>
                        <span>&lt;InputsCollapseButton&gt;</span>
                    </div>
                    <h2 class="text-lg font-bold">InputsCollapseButton</h2>
                    <p class="text-xs leading-5 opacity-85 sm:text-sm">InputsCollapseButton is a narrow directional control built for compact UI shells. It supports two rotation modes and a disabled guard so parent containers can coordinate expand/collapse behavior reliably.</p>
                </section>

                <section id="basic-usage" class="scroll-mt-8 space-y-3 border-t border-TBD-bg-dark/10 pt-5 dark:border-TBD-bg-light/10">
                    <h3 class="text-base font-bold">Basic Usage</h3>
                    <p class="text-xs leading-5 opacity-85 sm:text-sm">Bind state with `v-model` and pass optional `rotate` or `rotateOther` when the arrow orientation needs to match panel direction. Use `disable` during loading or animation locks.</p>

                    <DocsCodeExample
                        eyebrow="Example"
                        title="Basic Template"
                        description="Bind collapse state with v-model and pass rotation flags when you need directional variants.">
                        <span class="block"><span class="text-TBD-primary-light dark:text-TBD-primary-dark">&lt;InputsCollapseButton</span></span>
                        <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">v-model</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"isOpen"</span></span>
                        <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">:rotate</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"true"</span></span>
                        <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">:disable</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"loading"</span></span>
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
                            <InputsCheckBox slim v-model="disable" label="Disable" />
                            <InputsCheckBox slim v-model="rotate" label="Rotate" />
                            <InputsCheckBox slim v-model="rotateOther" label="Rotate Other" />
                            <InputsCheckBox slim v-model="modelValue" label="Expanded" />
                        </div>

                        <div class="mt-4 flex items-center gap-3">
                            <InputsCollapseButton
                                v-model="modelValue"
                                :disable="disable"
                                :rotate="rotate"
                                :rotate-other="rotateOther"
                                rounded="rounded-md"/>
                            <span class="text-xs opacity-75">State: {{ modelValue ? 'Open' : 'Closed' }}</span>
                        </div>
                    </DocsPanel>
                </section>

                <section id="props" class="scroll-mt-8 border-t border-TBD-bg-dark/10 pt-5 dark:border-TBD-bg-light/10">
                    <DocsPropsTable :rows="propsRows"/>
                </section>

                <section class="rounded-md border border-TBD-secondary-light/35 bg-TBD-secondary-light/10 px-3.5 py-3 text-xs leading-5 dark:border-TBD-secondary-dark/40 dark:bg-TBD-secondary-dark/15 sm:text-sm">
                    <p class="font-semibold text-TBD-secondary-light dark:text-TBD-secondary-dark">Testing Notes</p>
                    <p class="mt-1.5 opacity-85">Confirm that click interaction is blocked while disabled, and verify arrow orientation remains consistent across both rotate modes.</p>
                </section>
            </article>
        </template>

        <template #aside>
            <DocsOnThisPage :sections="pageSections"/>
        </template>
    </DocsLayout>
</template>
