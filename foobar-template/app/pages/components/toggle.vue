<script setup lang="ts">
    const toggled = ref(false);
    const altAnimation = ref(false);

    const propsRows = [
        { name: 'toggled', type: 'boolean', required: true, description: 'Current on/off state.' },
        { name: 'toggledIcon', type: 'string', required: false, description: 'Icon shown for active state.' },
        { name: 'unToggledIcon', type: 'string', required: false, description: 'Icon shown for inactive state.' },
        { name: 'altAnimation', type: 'boolean', required: false, description: 'Cross-fade icon animation mode.' },
        { name: 'onToggle', type: 'event', required: false, description: 'Emitted on click.' },
    ];

    const usageNotes = [
        'Use InputsToggle for compact binary actions like theme mode switching.',
        'Keep icon pairs semantically opposite so state changes are obvious.',
        'Use altAnimation when visual noise should be reduced in dense panels.',
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
                        <Icon name="tabler:toggle-left" class="text-xs"/>
                        <span>&lt;InputsToggle&gt;</span>
                    </div>
                    <h2 class="text-lg font-bold">InputsToggle</h2>
                    <p class="text-xs leading-5 opacity-85 sm:text-sm">InputsToggle is an icon-first binary switch optimized for compact interfaces. It emits a simple click event while the parent owns and updates the toggled state.</p>
                </section>

                <section id="basic-usage" class="scroll-mt-8 space-y-3 border-t border-TBD-bg-dark/10 pt-5 dark:border-TBD-bg-light/10">
                    <h3 class="text-base font-bold">Basic Usage</h3>
                    <p class="text-xs leading-5 opacity-85 sm:text-sm">Pass current state through `toggled` and listen to `onToggle` to flip that state in the parent. Optionally set custom icons and animation mode.</p>

                    <DocsCodeExample
                        eyebrow="Example"
                        title="Basic Template"
                        description="Keep toggled state in the parent and handle onToggle to update it.">
                        <span class="block"><span class="text-TBD-primary-light dark:text-TBD-primary-dark">&lt;InputsToggle</span></span>
                        <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">:toggled</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"isDark"</span></span>
                        <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">@on-toggle</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"isDark = !isDark"</span></span>
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
                            <InputsCheckBox slim v-model="toggled" label="Toggled" />
                            <InputsCheckBox slim v-model="altAnimation" label="Alt Animation" />
                        </div>

                        <div class="mt-4 flex items-center gap-3">
                            <InputsToggle :toggled="toggled" :alt-animation="altAnimation" @on-toggle="toggled = !toggled" />
                            <span class="text-xs opacity-75">State: {{ toggled ? 'On' : 'Off' }}</span>
                        </div>
                    </DocsPanel>
                </section>

                <section id="props" class="scroll-mt-8 border-t border-TBD-bg-dark/10 pt-5 dark:border-TBD-bg-light/10">
                    <DocsPropsTable :rows="propsRows"/>
                </section>

                <section class="rounded-md border border-TBD-secondary-light/35 bg-TBD-secondary-light/10 px-3.5 py-3 text-xs leading-5 dark:border-TBD-secondary-dark/40 dark:bg-TBD-secondary-dark/15 sm:text-sm">
                    <p class="font-semibold text-TBD-secondary-light dark:text-TBD-secondary-dark">Testing Notes</p>
                    <p class="mt-1.5 opacity-85">Verify icon swap timing for both animation modes and confirm parent-managed toggled state always stays in sync after repeated clicks.</p>
                </section>
            </article>
        </template>

        <template #aside>
            <DocsOnThisPage :sections="pageSections"/>
        </template>
    </DocsLayout>
</template>
