<script setup lang="ts">
    const required = ref(true);
    const slim = ref(false);
    const errorAbsolute = ref(false);
    const errorMessage = ref('Example wrapper error');
    const inputValue = ref('');

    const propsRows = [
        { name: 'label', type: 'string', required: false, description: 'Field label text.' },
        { name: 'description', type: 'string', required: false, description: 'Helper text below label.' },
        { name: 'required', type: 'boolean', required: false, description: 'Shows required marker.' },
        { name: 'slim', type: 'boolean', required: false, description: 'Compact typography spacing.' },
        { name: 'errorMessage', type: 'string', required: false, description: 'Error text passed to InputsErrorMessage.' },
        { name: 'errorAbsolute', type: 'boolean', required: false, description: 'Error absolute positioning mode.' },
    ];

    const usageNotes = [
        'Use InputWrapper when building new field types that should match shared form structure.',
        'Keep label/description logic in the wrapper to avoid repeating accessibility markup.',
        'Inject only the control body through slot to preserve consistent error rendering.',
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
                        <Icon name="tabler:box-padding" class="text-xs"/>
                        <span>&lt;InputsInputWrapper&gt;</span>
                    </div>
                    <h2 class="text-lg font-bold">InputsInputWrapper</h2>
                    <p class="text-xs leading-5 opacity-85 sm:text-sm">InputsInputWrapper is the shared scaffold that composes label, helper text, input slot, and error feedback. It is the recommended base when authoring custom input controls.</p>
                </section>

                <section id="basic-usage" class="scroll-mt-8 space-y-3 border-t border-TBD-bg-dark/10 pt-5 dark:border-TBD-bg-light/10">
                    <h3 class="text-base font-bold">Basic Usage</h3>
                    <p class="text-xs leading-5 opacity-85 sm:text-sm">Pass label-related props directly to the wrapper, then provide your control through the `#input` slot. This keeps metadata and error handling centralized.</p>

                    <DocsCodeExample
                        eyebrow="Example"
                        title="Basic Template"
                        description="Compose a field shell once, then inject the control body through the input slot.">
                        <span class="block"><span class="text-TBD-primary-light dark:text-TBD-primary-dark">&lt;InputsInputWrapper</span></span>
                        <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">label</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"Wrapped Input"</span></span>
                        <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">:error-message</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"errorMessage"</span></span>
                        <span class="block">&gt;...slot content...&lt;/InputsInputWrapper&gt;</span>
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
                            <InputsCheckBox slim v-model="errorAbsolute" label="Error absolute" />
                            <InputsText slim name="docsWrapperError" label="Error message" v-model="errorMessage" />
                        </div>

                        <div class="mt-4 max-w-md">
                            <InputsInputWrapper
                                label="Wrapped Input"
                                description="Input injected via slot"
                                :required="required"
                                :slim="slim"
                                :error-message="errorMessage"
                                :error-absolute="errorAbsolute">
                                <template #input>
                                    <input
                                        v-model="inputValue"
                                        class="h-9 w-full rounded-md input-bg input-ring px-3 outline-none"
                                        placeholder="Type here" />
                                </template>
                            </InputsInputWrapper>
                        </div>
                    </DocsPanel>
                </section>

                <section id="props" class="scroll-mt-8 border-t border-TBD-bg-dark/10 pt-5 dark:border-TBD-bg-light/10">
                    <DocsPropsTable :rows="propsRows"/>
                </section>

                <section class="rounded-md border border-TBD-secondary-light/35 bg-TBD-secondary-light/10 px-3.5 py-3 text-xs leading-5 dark:border-TBD-secondary-dark/40 dark:bg-TBD-secondary-dark/15 sm:text-sm">
                    <p class="font-semibold text-TBD-secondary-light dark:text-TBD-secondary-dark">Testing Notes</p>
                    <p class="mt-1.5 opacity-85">Confirm slot content alignment in both regular and slim modes, then verify error message placement in inline and absolute configurations.</p>
                </section>
            </article>
        </template>

        <template #aside>
            <DocsOnThisPage :sections="pageSections"/>
        </template>
    </DocsLayout>
</template>
