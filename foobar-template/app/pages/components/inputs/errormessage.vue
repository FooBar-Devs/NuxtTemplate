<script setup lang="ts">
    const errorMessage = ref('Field is required.');
    const errorAbsolute = ref(false);
    const slim = ref(false);

    const propsRows = [
        { name: 'errorMessage', type: 'string', required: false, description: 'Displayed validation/error text.' },
        { name: 'errorAbsolute', type: 'boolean', required: false, description: 'Use absolute positioning mode.' },
        { name: 'slim', type: 'boolean', required: false, description: 'Adjust vertical offset for compact fields.' },
    ];

    const usageNotes = [
        'Use this component when form fields need a consistent validation feedback style.',
        'Prefer inline mode when surrounding layout should grow with error content.',
        'Use absolute mode for compact overlays where vertical push should be avoided.',
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
                        <Icon name="tabler:alert-circle" class="text-xs"/>
                        <span>&lt;InputsErrorMessage&gt;</span>
                    </div>
                    <h2 class="text-lg font-bold">InputsErrorMessage</h2>
                    <p class="text-xs leading-5 opacity-85 sm:text-sm">InputsErrorMessage standardizes validation feedback across the input library. It supports animated inline expansion and absolute positioning for constrained layouts.</p>
                </section>

                <section id="basic-usage" class="scroll-mt-8 space-y-3 border-t border-TBD-bg-dark/10 pt-5 dark:border-TBD-bg-light/10">
                    <h3 class="text-base font-bold">Basic Usage</h3>
                    <p class="text-xs leading-5 opacity-85 sm:text-sm">Pass the current error text to `errorMessage`. Toggle `errorAbsolute` when you need the message to float without changing parent element height.</p>

                    <DocsCodeExample
                        eyebrow="Example"
                        title="Basic Template"
                        description="Render error feedback in-place and switch to absolute mode when vertical space is constrained.">
                        <span class="block"><span class="text-TBD-primary-light dark:text-TBD-primary-dark">&lt;InputsErrorMessage</span></span>
                        <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">:error-message</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"errorMessage"</span></span>
                        <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">:error-absolute</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"false"</span></span>
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
                            <InputsCheckBox slim v-model="errorAbsolute" label="Absolute" />
                            <InputsCheckBox slim v-model="slim" label="Slim" />
                            <InputsText slim name="docsErrorMessage" label="Message" v-model="errorMessage" />
                        </div>

                        <div class="relative mt-4 max-w-md rounded-md border border-TBD-bg-dark/10 p-3 dark:border-TBD-bg-light/10">
                            <p class="text-xs opacity-70">Demo field container</p>
                            <InputsErrorMessage :error-message="errorMessage" :error-absolute="errorAbsolute" :slim="slim" />
                        </div>
                    </DocsPanel>
                </section>

                <section id="props" class="scroll-mt-8 border-t border-TBD-bg-dark/10 pt-5 dark:border-TBD-bg-light/10">
                    <DocsPropsTable :rows="propsRows"/>
                </section>

                <section class="rounded-md border border-TBD-secondary-light/35 bg-TBD-secondary-light/10 px-3.5 py-3 text-xs leading-5 dark:border-TBD-secondary-dark/40 dark:bg-TBD-secondary-dark/15 sm:text-sm">
                    <p class="font-semibold text-TBD-secondary-light dark:text-TBD-secondary-dark">Testing Notes</p>
                    <p class="mt-1.5 opacity-85">Compare inline and absolute modes with short and long error messages to confirm animation and spacing behave as expected.</p>
                </section>
            </article>
        </template>

        <template #aside>
            <DocsOnThisPage :sections="pageSections"/>
        </template>
    </DocsLayout>
</template>
