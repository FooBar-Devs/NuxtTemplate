<script lang="ts" setup>
    import * as Yup from 'yup';

    const checkedBasic = ref(false);
    const checkedExample = ref(false);
    const required = ref(false);
    const slim = ref(false);
    const disabled = ref(false);
    const readonly = ref(false);
    const label = ref('Enable option');
    const description = ref('Use this option to enable the feature.');
    const before = ref("");
    const after = ref("");

    const documentedProps = [
        {
            property: 'v-model / modelValue',
            description: 'Current checked state synchronized with the parent component.',
            type: 'boolean',
            default: false,
            required: true,
        },
        {
            property: 'disabled',
            description: 'Disables checkbox interaction.',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'readonly',
            description: 'Prevents checkbox interaction while keeping the field visible.',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'required',
            description: 'Shows the required marker next to the checkbox label.',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'name',
            description: 'Input name and id used for form registration and validation.',
            type: 'string',
            default: 'nameNeeded',
            required: true,
        },
        {
            property: 'label',
            description: 'Checkbox label and input id fallback.',
            type: 'string',
            default: '',
            required: false,
        },
        {
            property: 'description',
            description: 'Optional helper text displayed alongside the label.',
            type: 'string',
            default: '',
            required: false,
        },
        {
            property: 'errorAbsolute',
            description: 'Controls the positioning mode of the validation error.',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'slim',
            description: 'Uses the compact checkbox sizing and spacing.',
            type: 'boolean',
            default: false,
            required: false,
        }
    ];

    const documentedSlots = [
        {
            name: 'before',
            description: 'Custom content displayed before the checkbox label and description.',
        },
        {
            name: 'after',
            description: 'Custom content displayed after the checkbox label and description.',
        }
    ];

    const pageSections = [
        { id: 'overview', title: 'Overview' },
        { id: 'basic-usage', title: 'Basic Usage' },
        { id: 'live-example', title: 'Live Example' },
        { id: 'validation', title: 'Validation' },
        { id: 'slots', title: 'Slots' },
        { id: 'props', title: 'Props' },
    ];    

    const basicExample =
`<InputsCheckBox
    v-model="checked"
    name="checkbox"
    label="Enable option"
    description="Use this option to enable the feature."
/>`;

    const validationExample =
`<script setup lang="ts">
    import * as Yup from 'yup';

    const checked = ref(false);

    const schema = Yup.object({
        checked: Yup.boolean()
            .oneOf([true], 'This option must be enabled.'),
    });

    const onSubmit = () => {
        alert('Form submitted successfully.');
    };

    const onInvalidSubmit = () => {
        alert('Form has validation errors.');
    };
<\/script>

<template>
    <Form
        :validation-schema="schema"
        @submit="onSubmit"
        @invalid-submit="onInvalidSubmit">

        <InputsCheckBox
            v-model="checked"
            name="checked"
            label="Accept terms"
        />

        <InputsButton class="mt-3" slim type="submit">
            Submit
        </InputsButton>
    </Form>
</template>`;

        const customContentCheckboxValue = ref(false);

    const customContentCheckboxExample =
`<InputsCheckBox v-model="checkedValue" 
    name="notificationCheckbox" label="Turn on notifications">

    <template #before>
        <Icon name="tabler:info-circle" class="text-xl -mx-1"/>
    </template>

    <template #after>
        <span class="text-xs opacity-75 absolute left-10 top-6.5 whitespace-nowrap">
            Enable notifications to receive updates and alerts.
        </span>
    </template>

</InputsCheckBox>`;

    const validationSchema = Yup.object({
        checkboxPreview: Yup.boolean()
            .oneOf([true], 'This option must be enabled.'),
    });
    
    const onSubmit = async () => {}
    const onInvalidSubmit = async () => {}

    const validationExampleShema = Yup.object({
        checked: Yup.boolean()
            .oneOf([true], 'This option must be enabled.'),
    });

    const validationExampleCheckboxValue = ref(false);

    const validationExampleOnSubmit = async () => {
        alert('Form submitted successfully with value: ' + validationExampleCheckboxValue.value);
    };
    const validationExampleOnInvalidSubmit = async () => {
        alert('Form has validation errors.');
    };
</script>

<template>
    <div class="flex gap-4">
        <DocsArticle title="InputsCheckBox">

            <template #header>
                <b>InputsCheckBox</b> is the shared boolean input component used across forms,
                dialogs, and settings. It supports <b>v-model</b>, <b>vee-validate</b>, optional
                titles and descriptions, required indicators, compact sizing, hidden labels,
                disabled and read-only states, and before/after slots.
            </template>

            <!-- Basic usage section -->
            <DocsArticleSection id="basic-usage" title="Basic Usage">
                <template #description>
                    Bind the checkbox with <b>v-model</b> and provide a unique <b>name</b> and
                    <b>label</b>. Add <b>title</b> and <b>description</b> when additional context
                    is needed, then use <b>required</b>, <b>slim</b>, or <b>hideLabel</b> as needed.
                </template>

                <DocsCodeExample eyebrow="Example" title="Basic Template" description="A typical checkbox with a bound boolean value and optional field text.">
                    {{ basicExample }}
                </DocsCodeExample>

                <InputsCheckBox v-model="checkedBasic" name="checkboxBasic" title="Preference" label="Enable option" description="Use this option to enable the feature."/>
            </DocsArticleSection>

            <!-- Live example section -->
            <DocsArticleSection id="live-example" title="Live Example">
                <template #description>
                    Change the checkbox properties below to preview the component interactively.
                </template>

                <div class="grid gap-4 grid-cols-3">
                    <DocsPanel icon="tabler:adjustments-horizontal" eyebrow="Playground" title="Controls" body-class="p-4">
                        <div class="grid gap-2 grid-cols-2">
                            <InputsText :maxlength="60" slim label="Label" v-model="label" name="checkboxLabel" class="col-span-2"/>
                            <InputsText :maxlength="120" slim label="Description" v-model="description" name="checkboxDescription" class="col-span-2"/>
                            <InputsText :maxlength="60" slim label="Before Slot" v-model="before" name="checkboxBefore" class="col-span-2"/>
                            <InputsText :maxlength="60" slim label="After Slot" v-model="after" name="checkboxAfter" class="col-span-2"/>

                            <InputsCheckBox slim v-model="required" label="Required" name="checkboxRequired"/>
                            <InputsCheckBox slim v-model="disabled" label="Disabled" name="checkboxDisabled"/>
                            <InputsCheckBox slim v-model="readonly" label="Readonly" name="checkboxReadonly"/>
                            <InputsCheckBox slim v-model="slim" label="Slim" name="checkboxSlim"/>
                        </div>
                    </DocsPanel>

                    <DocsPanel icon="tabler:test-pipe" eyebrow="Preview" title="Rendered Component" body-class="p-4" class="col-span-2">
                        <Form :validation-schema="validationSchema" @submit="onSubmit" @invalid-submit="onInvalidSubmit">
                            <InputsCheckBox
                                v-model="checkedExample"
                                name="checkboxPreview"
                                :label="label"
                                :description="description"
                                :required="required"
                                :slim="slim"
                                :disabled="disabled"
                                :readonly="readonly">

                                <template #before>
                                    <span class="text-xs opacity-75" v-if="before !== ''">{{ before }}</span>
                                </template>

                                <template #after>
                                    <span class="text-xs opacity-75" v-if="after !== ''">{{ after }}</span>
                                </template>
                            </InputsCheckBox>

                            <InputsButton class="mt-3" slim type="submit">
                                Submit
                            </InputsButton>
                        </Form>
                    </DocsPanel>
                </div>
            </DocsArticleSection>

            <!-- Validation section -->
            <DocsArticleSection id="validation" title="Validation">
                <template #description>
                    The checkbox integrates with
                    <a class="text-link" href="https://vee-validate.logaretm.com/" target="_blank">VeeValidate</a>
                    and
                    <a class="text-link" href="https://github.com/jquense/yup" target="_blank">Yup</a>
                    for validating boolean form values.
                </template>

                <DocsCodeExample title="Validation Example" eyebrow="Example" description="Require the checkbox to be enabled before the form can be submitted.">
                    {{ validationExample }}
                </DocsCodeExample>

                <Form :validation-schema="validationExampleShema" @submit="validationExampleOnSubmit" @invalid-submit="validationExampleOnInvalidSubmit">
                    <InputsCheckBox
                        v-model="validationExampleCheckboxValue"
                        name="checked"
                        title="Terms and Conditions"
                        label="Accept terms"/>

                    <InputsButton class="mt-3" slim type="submit">
                        Submit
                    </InputsButton>
                </Form>
            </DocsArticleSection>


            <!-- Slots section -->
            <DocsArticleSection id="slots" title="Slots">
                <template #description>
                    The checkbox supports <b>before</b> and <b>after</b> slots for adding custom content
                    before or after the label and description.
                </template>

                <DocsCodeExample title="Custom Content Example" eyebrow="Example" description="Add custom content before and after the checkbox label and description.">
                    {{ customContentCheckboxExample }}
                </DocsCodeExample>

                <InputsCheckBox v-model="customContentCheckboxValue" 
                    name="checkboxCustomContent" label="Turn on notifications">

                    <template #before>
                        <Icon name="tabler:info-circle" class="text-xl -mx-1"/>
                    </template>

                    <template #after>
                        <span class="text-xs opacity-75 whitespace-nowrap mt-0.5">
                            | Enable notifications to receive updates and alerts.
                        </span>
                    </template>

                </InputsCheckBox>

                <DocsSlotsTable :rows="documentedSlots" class="mt-6"/>

            </DocsArticleSection>

            <!-- Props section -->
            <DocsArticleSection id="props" title="Props">
                <template #description>
                    The following props are available on the component. The <b>name</b> and
                    <b>label</b> props are required.
                </template>

                <DocsPropsTable :rows="documentedProps" class="mt-6"/>
            </DocsArticleSection>

        </DocsArticle>

        <DocsOnThisPage :sections="pageSections"/>
    </div>
</template>