<script lang="ts" setup>
    import * as Yup from 'yup';

    const textValue = ref('');
    const slim = ref(false);
    const maxlength = ref(64);
    const name = ref('name');
    const placeholder = ref('Text placeholder');
    const label = ref('Text label');
    const required = ref(true);
    const description = ref('Text description');
    const icon = ref('tabler:user');
    const onkeypress = (event: KeyboardEvent) => {
        if (event.key >= '0' && event.key <= '9') {
            event.preventDefault();
        }
    };
    const errorAbsolute = ref(false);
    const disabled = ref(false);
    const readonly = ref(false);

    const documentedProps = [
        { name: 'name', type: 'string', required: true, description: 'Unique field key used for form registration and validation.' },
        { name: 'v-model / modelValue', type: 'string | number', required: false, description: 'Current input value synchronized with the parent component.' },
        { name: 'label', type: 'string', required: false, description: 'Primary label displayed above the field.' },
        { name: 'description', type: 'string', required: false, description: 'Secondary helper text rendered under the label.' },
        { name: 'placeholder', type: 'string', required: false, description: 'Fallback text shown while the field is empty.' },
        { name: 'maxlength', type: 'number', required: false, description: 'Maximum number of characters accepted by the input.' },
        { name: 'icon', type: 'string', required: false, description: 'Optional icon name rendered inside the field.' },
        { name: 'required', type: 'boolean', required: false, description: 'Marks the field as required in the UI and validation flow.' },
        { name: 'slim', type: 'boolean', required: false, description: 'Enables the compact field height used in tighter layouts.' },
        { name: 'disabled / readonly', type: 'boolean', required: false, description: 'Controls whether the field is blocked or only viewable.' },
        { name: 'errorAbsolute', type: 'boolean', required: false, description: 'Changes validation message positioning for constrained layouts.' },
        { name: 'onkeypress', type: '(event: KeyboardEvent) => void', required: false, description: 'Optional keyboard hook for filtering or reacting to input.' },
    ];

    const usageNotes = [
        'Use this component for short, single-line values such as names, labels, tags, or compact settings fields.',
        'Prefer InputsText when you need built-in vee-validate wiring, shared field styling, and optional icon support.',
        'Switch on slim for dense control panels, and combine readonly or disabled with validation states when testing edge cases.',
    ];

    const pageSections = [
        { id: 'overview', title: 'Overview' },
        { id: 'basic-usage', title: 'Basic Usage' },
        { id: 'when-to-use', title: 'When to Use' },
        { id: 'live-example', title: 'Live Example' },
        { id: 'props', title: 'Props' },
    ];

    const schema = Yup.object({
        name: Yup.string().required("Ime je obavezno!"),
    });

    const onSubmit = async () => {}
    const onInvalidSubmit = async () => {}
</script>

<template>
    <div>
        <DocsLayout>
            <template #main>
                <article class="max-w-4xl space-y-7 text-sm text-TBD-text-dark dark:text-TBD-text-light">
                    <header id="overview" class="scroll-mt-8 space-y-3">
                        <div class="inline-flex items-center gap-1.5 rounded-full border border-TBD-primary-light/25 bg-TBD-primary-light/8 px-2 py-0.5 text-[10px] font-semibold text-TBD-primary-light dark:border-TBD-primary-dark/30 dark:bg-TBD-primary-dark/12 dark:text-TBD-primary-dark">
                            <Icon name="tabler:text-size" class="text-xs"/>
                            <span>&lt;InputsText&gt;</span>
                        </div>

                        <p class="text-sm leading-6 opacity-92">
                            <b>InputsText</b> is the standard single-line input for short form values. It wraps the
                            shared field styling used across the app and wires the control into <b>vee-validate</b>, so
                            labels, descriptions, errors, icons, and model updates remain consistent wherever the
                            component is used.
                        </p>
                    </header>

                    <section id="basic-usage" class="scroll-mt-8 space-y-3 border-t border-TBD-bg-dark/10 pt-6 dark:border-TBD-bg-light/10">
                        <div class="space-y-1.5">
                            <h2 class="text-lg font-bold">Basic Usage</h2>
                            <p class="text-xs leading-5 opacity-85 sm:text-sm">
                                Bind the component with <b>v-model</b> and provide a unique <b>name</b>. Add
                                <b>label</b>, <b>description</b>, <b>placeholder</b>, and <b>icon</b> when the field
                                needs more context, then use flags like <b>slim</b>, <b>readonly</b>, or
                                <b>disabled</b> to match the surrounding layout and interaction state.
                            </p>
                        </div>

                        <DocsCodeExample
                            eyebrow="Example"
                            title="Basic Template"
                            description="A typical setup combines a unique field name, a bound value, and optional presentation props. Validation stays attached to the same component, which keeps forms predictable when the field moves between pages, settings panels, and denser control groups.">
                            <span class="block"><span class="text-TBD-primary-light dark:text-TBD-primary-dark">&lt;InputsText</span></span>
                            <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">v-model</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"textValue"</span></span>
                            <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">:name</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"name"</span></span>
                            <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">:label</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"label"</span></span>
                            <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">:description</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"description"</span></span>
                            <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">:placeholder</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"placeholder"</span></span>
                            <span class="block"><span class="text-TBD-primary-light dark:text-TBD-primary-dark">/&gt;</span></span>
                        </DocsCodeExample>
                    </section>

                    <section id="when-to-use" class="scroll-mt-8 space-y-3 border-t border-TBD-bg-dark/10 pt-6 dark:border-TBD-bg-light/10">
                        <div class="space-y-1.5">
                            <h2 class="text-lg font-bold">When to Use</h2>
                            <p class="text-xs leading-5 opacity-85 sm:text-sm">
                                Reach for this component when the user is expected to enter a single line of text and
                                the field should inherit the app's standard form styling and validation behavior.
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
                                Real docs pages keep runnable examples close to the explanation. This playground
                                exposes the same props documented below so you can inspect spacing, icons, validation,
                                and interaction states in place.
                            </p>
                        </div>

                        <div class="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)]">
                            <DocsPanel icon="tabler:adjustments-horizontal" eyebrow="Playground" title="Controls" body-class="p-4">
                                <div class="space-y-4">
                                    <div class="flex flex-col gap-2">
                                        <InputsText :maxlength="100" slim label="Label" v-model="label" name="label"/>
                                        <InputsText :maxlength="100" slim label="Description" v-model="description" name="description"/>
                                        <InputsText :maxlength="100" slim label="Icon" v-model="icon" name="icon"/>
                                        <InputsText :maxlength="100" slim label="Placeholder" v-model="placeholder" name="placeholder"/>
                                        <InputsNumber slim label="Maxlength" v-model="maxlength" name="maxlength"/>
                                    </div>

                                    <div class="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
                                        <InputsCheckBox slim v-model="required" label="Required"/>
                                        <InputsCheckBox slim v-model="errorAbsolute" label="Error Absolute"/>
                                        <InputsCheckBox slim v-model="disabled" label="Disabled"/>
                                        <InputsCheckBox slim v-model="readonly" label="Readonly"/>
                                        <InputsCheckBox slim v-model="slim" label="Slim"/>
                                    </div>
                                </div>
                            </DocsPanel>

                            <DocsPanel icon="tabler:beaker" eyebrow="Preview" title="Rendered Field" body-class="p-5">
                                <Form :validation-schema="schema" @submit="onSubmit" @invalid-submit="onInvalidSubmit">
                                    <div class="max-w-xl">
                                        <InputsText
                                            v-model="textValue"
                                            :slim="slim"
                                            :required="required"
                                            :maxlength="maxlength"
                                            :name="name"
                                            :placeholder="placeholder"
                                            :label="label"
                                            :description="description"
                                            :icon="icon"
                                            :onkeypress="onkeypress"
                                            :errorAbsolute="errorAbsolute"
                                            :disabled="disabled"
                                            :readonly="readonly"
                                        />

                                        <InputsButton class="mt-3" slim>
                                            Submit
                                        </InputsButton>
                                    </div>
                                </Form>
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
                            This page lets you change props live, so you can verify label spacing, icon alignment,
                            maxlength handling, validation placement, and readonly or disabled behavior without leaving
                            the example.
                        </p>
                    </section>
                </article>
            </template>

            <template #aside>
                <DocsOnThisPage :sections="pageSections"/>
            </template>
        </DocsLayout>
    </div>
</template>