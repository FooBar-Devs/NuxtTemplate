<script setup lang="ts">
    const colorValue = ref('#22c55e');
    const hoverColor = ref<number | undefined>(1);
    const hoverVariant = ref<number | undefined>(0);

    const propsRows = [
        { name: 'modelValue', type: 'string', required: false, description: 'Current color value.' },
        { name: 'i / j', type: 'number', required: false, description: 'Position identifiers in color matrix.' },
        { name: 'hoverColor / hoverVariant', type: 'number', required: false, description: 'Active picker focus indices.' },
        { name: 'property', type: 'string', required: false, description: 'Unique id fragment for picker node.' },
        { name: 'leaveColorPicker / clickColor', type: 'events', required: false, description: 'Picker interaction events.' },
    ];

    const usageNotes = [
        'Use this component in theme and palette editors where dense swatch grids are needed.',
        'Keep property keys unique so teleported pickers can be targeted correctly.',
        'Handle leaveColorPicker to close or reset picker focus cleanly.',
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
                        <Icon name="tabler:palette" class="text-xs"/>
                        <span>&lt;InputsColor&gt;</span>
                    </div>
                    <h2 class="text-lg font-bold">InputsColor</h2>
                    <p class="text-xs leading-5 opacity-85 sm:text-sm">InputsColor renders a compact swatch that opens an advanced picker through teleport. It is designed for theme tooling where color selection needs to stay fast and spatially aware.</p>
                </section>

                <section id="basic-usage" class="scroll-mt-8 space-y-3 border-t border-TBD-bg-dark/10 pt-5 dark:border-TBD-bg-light/10">
                    <h3 class="text-base font-bold">Basic Usage</h3>
                    <p class="text-xs leading-5 opacity-85 sm:text-sm">Bind `modelValue` to a color string and pass index props (`i`, `j`) plus a unique `property` key. Listen to click and leave events to coordinate picker state in parent containers.</p>

                    <DocsCodeExample
                        eyebrow="Example"
                        title="Basic Template"
                        description="Use InputsColor as a swatch trigger inside palette grids and keep property keys unique.">
                        <span class="block"><span class="text-TBD-primary-light dark:text-TBD-primary-dark">&lt;InputsColor</span></span>
                        <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">v-model</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"colorValue"</span></span>
                        <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">:i</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"1"</span></span>
                        <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">property</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"docsColor"</span></span>
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
                        <div class="flex items-center gap-3">
                            <InputsColor
                                v-model="colorValue"
                                :i="1"
                                :j="0"
                                :hover-color="hoverColor"
                                :hover-variant="hoverVariant"
                                property="docsColor"
                                @click-color="hoverColor = 1; hoverVariant = 0"
                                @leave-color-picker="hoverColor = undefined; hoverVariant = undefined" />
                            <span class="text-xs opacity-75">Current value: {{ colorValue }}</span>
                        </div>
                    </DocsPanel>
                </section>

                <section id="props" class="scroll-mt-8 border-t border-TBD-bg-dark/10 pt-5 dark:border-TBD-bg-light/10">
                    <DocsPropsTable :rows="propsRows"/>
                </section>

                <section class="rounded-md border border-TBD-secondary-light/35 bg-TBD-secondary-light/10 px-3.5 py-3 text-xs leading-5 dark:border-TBD-secondary-dark/40 dark:bg-TBD-secondary-dark/15 sm:text-sm">
                    <p class="font-semibold text-TBD-secondary-light dark:text-TBD-secondary-dark">Testing Notes</p>
                    <p class="mt-1.5 opacity-85">Validate picker placement near viewport edges and confirm events fire correctly when clicking outside the teleported picker.</p>
                </section>
            </article>
        </template>

        <template #aside>
            <DocsOnThisPage :sections="pageSections"/>
        </template>
    </DocsLayout>
</template>
