<script setup lang="ts">
    import * as Yup from 'yup';

    const value = ref(8);
    const min = ref(0);
    const max = ref(100);
    const increment = ref(1);
    const round = ref(0);
    const slim = ref(false);
    const label = ref('Quantity');
    const description = ref('Try wheel scrolling and arrow hold');
    const icon = ref('tabler:math');
    const required = ref(false);
    const errorAbsolute = ref(false);
    const disabled = ref(false);
    const readonly = ref(false);

    const schema = Yup.object({
        docsNumberValue: Yup.number()
            .test('is-perfect-square', 'Value must have an integer square root', (value) => {
                if (value === undefined || value === null) return true;
                const rounded = Math.round(value);
                return Number.isInteger(rounded) && Number.isInteger(Math.sqrt(rounded));
            }),
    });

    const onSubmit = async () => {};
    const onInvalidSubmit = async () => {};

    const propsRows = [
        { name: 'name', type: 'string', required: true, description: 'Unique field key used for form registration and validation.' },
        { name: 'modelValue', type: 'number', required: false, description: 'Current numeric value synchronized with the parent component.' },
        { name: 'label', type: 'string', required: false, description: 'Primary label displayed above the field.' },
        { name: 'description', type: 'string', required: false, description: 'Secondary helper text rendered under the label.' },
        { name: 'icon', type: 'string', required: false, description: 'Optional icon rendered inside the field.' },
        { name: 'min / max', type: 'number', required: false, description: 'Lower and upper bounds applied to the component value.' },
        { name: 'increment', type: 'number', required: false, description: 'Step size used by the arrow buttons and wheel interaction.' },
        { name: 'round', type: 'number', required: false, description: 'Rounds the value to a chosen decimal precision.' },
        { name: 'required', type: 'boolean', required: false, description: 'Marks the field as required in the UI and validation flow.' },
        { name: 'slim', type: 'boolean', required: false, description: 'Enables the compact field height used in tighter layouts.' },
        { name: 'disabled / readonly', type: 'boolean', required: false, description: 'Controls whether the field is blocked or only viewable.' },
        { name: 'errorAbsolute', type: 'boolean', required: false, description: 'Changes validation message positioning for constrained layouts.' },
    ];

    const usageNotes = [
        'Use this field for quantities, percentages, and bounded numeric settings.',
        'Set min and max to protect against invalid values at the component level.',
        'Adjust increment and round to match domain precision requirements.',
        'Combine slim with dense layout panels, or use disabled and readonly to test interaction states clearly.',
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
            <article class="space-y-7 text-sm text-TBD-text-dark dark:text-TBD-text-light">
                <header id="overview" class="scroll-mt-8 space-y-3">
                    <div class="inline-flex items-center gap-1.5 rounded-full border border-TBD-primary-light/25 bg-TBD-primary-light/8 px-2 py-0.5 text-[10px] font-semibold text-TBD-primary-light dark:border-TBD-primary-dark/30 dark:bg-TBD-primary-dark/12 dark:text-TBD-primary-dark">
                        <Icon name="tabler:123" class="text-xs"/>
                        <span>&lt;InputsNumber&gt;</span>
                    </div>

                    <p class="text-sm leading-6 opacity-92">
                        <b>InputsNumber</b> is the shared numeric control for bounded values, compact settings panels,
                        and quick value adjustments. It supports typed value updates, hold-to-step behavior, wheel scrolling,
                        and built-in clamping so the component stays predictable even when you push it to edge cases.
                    </p>
                </header>

                <section id="basic-usage" class="scroll-mt-8 space-y-3 border-t border-TBD-bg-dark/10 pt-6 dark:border-TBD-bg-light/10">
                    <div class="space-y-1.5">
                        <h2 class="text-lg font-bold">Basic Usage</h2>
                        <p class="text-xs leading-5 opacity-85 sm:text-sm">
                            Bind the component with <b>v-model</b> and provide a unique <b>name</b>. Add <b>min</b>,
                            <b>max</b>, <b>increment</b>, and <b>round</b> to define the behavior you want for quantity,
                            percentage, or other numeric settings fields.
                        </p>
                    </div>

                    <DocsCodeExample
                        eyebrow="Example"
                        title="Basic Template"
                        description="A typical setup uses bound numeric state plus constraints so the control remains useful in both dense admin panels and form-heavy layouts.">
                        <span class="block"><span class="text-TBD-primary-light dark:text-TBD-primary-dark">&lt;InputsNumber</span></span>
                        <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">v-model</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"quantity"</span></span>
                        <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">:min</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"0"</span></span>
                        <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">:max</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"100"</span></span>
                        <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">:increment</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"1"</span></span>
                        <span class="block"><span class="text-TBD-primary-light dark:text-TBD-primary-dark">/&gt;</span></span>
                    </DocsCodeExample>
                </section>

                <section id="when-to-use" class="scroll-mt-8 space-y-3 border-t border-TBD-bg-dark/10 pt-6 dark:border-TBD-bg-light/10">
                    <div class="space-y-1.5">
                        <h2 class="text-lg font-bold">When to Use</h2>
                        <p class="text-xs leading-5 opacity-85 sm:text-sm">
                            Reach for this control when the user needs to adjust a numeric value quickly, but still wants
                            the component to stay within a valid range and preserve a consistent editing experience.
                        </p>
                    </div>

                    <div class="grid gap-2.5 md:grid-cols-2">
                        <div v-for="note in usageNotes" :key="note" class="rounded-md input-bg input-ring px-3 py-2.5 text-xs leading-5 sm:text-sm">
                            {{ note }}
                        </div>
                    </div>
                </section>

                <section id="live-example" class="scroll-mt-8 space-y-3 border-t border-TBD-bg-dark/10 pt-6 dark:border-TBD-bg-light/10">
                    <div class="space-y-1.5">
                        <h2 class="text-lg font-bold">Live Example</h2>
                        <p class="text-xs leading-5 opacity-85 sm:text-sm">
                            This playground exposes the same props documented below so you can inspect bounds,
                            step size, rounding, state, and compact styling directly in the page.
                        </p>
                    </div>

                    <div class="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)]">
                        <DocsPanel icon="tabler:adjustments-horizontal" eyebrow="Playground" title="Controls" body-class="p-4">
                            <div class="space-y-4">
                                <div class="flex flex-col gap-2">
                                    <InputsNumber slim label="Min" name="docsNumberMin" v-model="min" />
                                    <InputsNumber slim label="Max" name="docsNumberMax" v-model="max" />
                                    <InputsNumber slim label="Increment" name="docsNumberIncrement" v-model="increment" :min="0" :increment="1" :round="8" />
                                    <InputsNumber slim label="Round" name="docsNumberRound" v-model="round" />
                                    <InputsText slim label="Label" v-model="label" name="docsNumberLabel" />
                                    <InputsText slim label="Description" v-model="description" name="docsNumberDescription" />
                                    <InputsText slim label="Icon" v-model="icon" name="docsNumberIcon" />
                                </div>

                                <div class="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
                                    <InputsCheckBox slim v-model="required" label="Required" />
                                    <InputsCheckBox slim v-model="errorAbsolute" label="Error Absolute" />
                                    <InputsCheckBox slim v-model="disabled" label="Disabled" />
                                    <InputsCheckBox slim v-model="readonly" label="Readonly" />
                                    <InputsCheckBox slim v-model="slim" label="Slim" />
                                </div>
                            </div>
                        </DocsPanel>

                        <DocsPanel icon="tabler:beaker" eyebrow="Preview" title="Rendered Field" body-class="p-5">
                            <div class="max-w-xl">
                                <Form :validation-schema="schema" @submit="onSubmit" @invalid-submit="onInvalidSubmit">
                                    <InputsNumber
                                        v-model="value"
                                        :slim="slim"
                                        :required="required"
                                        :name="'docsNumberValue'"
                                        :label="label"
                                        :description="description"
                                        :icon="icon"
                                        :min="min"
                                        :max="max"
                                        :increment="increment"
                                        :round="round"
                                        :errorAbsolute="errorAbsolute"
                                        :disabled="disabled"
                                        :readonly="readonly"
                                    />

                                    <InputsButton class="mt-3" slim>
                                        Submit
                                    </InputsButton>
                                </Form>
                            </div>
                        </DocsPanel>
                    </div>
                </section>

                <section id="props" class="scroll-mt-8 space-y-3 border-t border-TBD-bg-dark/10 pt-6 dark:border-TBD-bg-light/10">
                    <div class="flex items-center justify-between gap-4">
                        <h2 class="text-lg font-bold">Props</h2>
                        <p class="text-[10px] uppercase tracking-[0.14em] opacity-55">API Reference</p>
                    </div>

                    <DocsPropsTable :rows="propsRows" />
                </section>

                <section class="rounded-md border border-TBD-secondary-light/35 bg-TBD-secondary-light/10 px-3.5 py-3 text-xs leading-5 dark:border-TBD-secondary-dark/40 dark:bg-TBD-secondary-dark/15 sm:text-sm">
                    <p class="font-semibold text-TBD-secondary-light dark:text-TBD-secondary-dark">Testing Notes</p>
                    <p class="mt-1.5 opacity-85">
                        Check wheel and hold interactions with boundaries enabled, then compare compact and expanded states
                        to confirm the control stays readable and behaves predictably across disabled, readonly, and error layouts.
                    </p>
                </section>
            </article>
        </template>

        <template #aside>
            <DocsOnThisPage :sections="pageSections" />
        </template>
    </DocsLayout>
</template>
