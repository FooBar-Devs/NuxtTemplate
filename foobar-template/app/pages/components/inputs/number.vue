<script setup lang="ts">
    import * as Yup from 'yup';

    const exampleValue = ref(50);
    const value = ref(36);
    const min = ref(0);
    const max = ref(100);
    const increment = ref(1);
    const round = ref(0);
    const slim = ref(false);
    const label = ref('Quantity');
    const description = ref('Try wheel scrolling and arrow hold');
    const placeholder = ref('Enter a number');
    const icon = ref('tabler:math');
    const required = ref(false);
    const errorAbsolute = ref(false);
    const disabled = ref(false);
    const readonly = ref(false);
    const preventNull = ref(false);

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

    const documentedProps = [
        {
            property: 'v-model / modelValue',
            description: 'Numeric value synchronized with the parent component.',
            type: ['number', 'null'],
            default: 0,
            required: true,
        },
        {
            property: 'disabled',
            description: 'Disables input interaction.',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'readonly',
            description: 'Read-only mode with no editing.',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'required',
            description: 'Marks the field as required.',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'name',
            description: 'Input name/id used for form registration and validation.',
            type: 'string',
            default: 'nameNeeded',
            required: true,
        },
        {
            property: 'label',
            description: 'Label displayed above the input.',
            type: 'string',
            default: '',
            required: false,
        },
        {
            property: 'description',
            description: 'Helper text displayed under the label.',
            type: 'string',
            default: '',
            required: false,
        },
        { 
            property: 'placeholder',  
            description: 'Placeholder text shown when empty (null).',         
            type: 'string', 
            default: '',
            required: false, 
        },
        {
            property: 'errorAbsolute',
            description: 'Changes the validation error message positioning.',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'icon',
            description: 'Optional Iconify icon displayed inside the input.',
            type: 'string',
            default: '',
            required: false,
        },
        {
            property: 'slim',
            description: 'Enables the compact input style.',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'min',
            description: 'Minimum allowed value.',
            type: 'number',
            default: null,
            required: false,
        },
        {
            property: 'max',
            description: 'Maximum allowed value.',
            type: 'number',
            default: null,
            required: false,
        },
        {
            property: 'increment',
            description: 'Step size used by wheel and arrow interactions.',
            type: 'number',
            default: 1,
            required: false,
        },
        {
            property: 'round',
            description: 'Number of decimal places used when rounding values.',
            type: 'number',
            default: 2,
            required: false,
        },
        {
            property: 'preventNull',
            description: 'Prevents the input from being empty (null). Becomes 0 instead.',
            type: 'boolean',
            default: true,
            required: false,
        },
        {
            property: 'watch',
            description: 'Emitted when the value changes, for parent component watchers.',
            type: 'function',
            default: '(value) => {}',
            required: false,
        }
    ];

    const basicExample =
`<InputsNumber
    v-model="quantity"
    name="quantity"
    label="Quantity"
    :min="0"
    :max="100"
    :increment="1"
/>`;

    const validationExampleValue = ref(4);

    const validationExampleSchema = Yup.object({
        number: Yup.number()
            .min(1, 'Value must be at least 1.')
            .required('Value is required.'),
    });

    const validationExampleOnSubmit = async () => {
        alert('Form submitted successfully with value: ' + validationExampleValue.value);
    };

    const validationExampleOnInvalidSubmit = async () => {
        alert('Form has validation errors.');
    };

    const validationExample =
`<script setup lang="ts">
    import * as Yup from 'yup';

    const numberValue = ref(4);

    const schema = Yup.object({
        number: Yup.number()
            .min(1, 'Value must be at least 1.')
            .required('Value is required.'),
    });

    const onSubmit = async () => {
        alert('Form submitted successfully.');
    };

    const onInvalidSubmit = async () => {
        alert('Form has validation errors.');
    };
<\/script>
<template>
    <Form
        :validation-schema="schema"
        @submit="onSubmit"
        @invalid-submit="onInvalidSubmit"
    >
        <InputsNumber
            v-model="numberValue"
            name="number"
            label="Number"
            :min="1"
            :max="100"
        />

        <InputsButton class="mt-3" slim type="submit">
            Submit
        </InputsButton>
    </Form>
</template>
`;

    const pageSections = [
        { id: 'basic-usage', title: 'Basic Usage' },
        { id: 'live-example', title: 'Live Example' },
        { id: 'validation', title: 'Validation' },
        { id: 'props', title: 'Props' },
    ];
</script>

<template>
    <div class="flex gap-4">
        <DocsArticle title="InputsNumber">

            <template #header>
                <b>InputsNumber</b> is the shared numeric input component used for quantities,
                bounded values, and other numeric form fields. It supports <b>v-model</b>,
                <b>vee-validate</b>, minimum and maximum values, configurable increments,
                decimal rounding, wheel interaction, hold-to-increment controls, optional icons,
                compact sizing, and disabled or read-only states.
            </template>

            <!-- Basic usage section -->
            <DocsArticleSection id="basic-usage" title="Basic Usage">
                <template #description>
                    Bind the component with <b>v-model</b> and provide a unique <b>name</b>.
                    Use <b>min</b>, <b>max</b>, <b>increment</b>, and <b>round</b> to control
                    how the numeric value behaves.
                </template>

                <DocsCodeExample eyebrow="Example" title="Basic Template" description="A typical numeric field with bounds and a configurable increment.">
                    {{ basicExample }}
                </DocsCodeExample>

                <InputsNumber 
                    v-model="exampleValue" 
                    name="basicNumber" 
                    label="Quantity" 
                    description="Select a value between 0 and 100." 
                    :min="0" 
                    :max="100" 
                    :increment="1"
                />
            </DocsArticleSection>

            <!-- Live example section -->
            <DocsArticleSection id="live-example" title="Live Example">
                <template #description>
                    Use the controls to interactively change the numeric input's configuration
                    and test its bounds, rounding, interaction states, and compact styling.
                </template>

                <div class="grid gap-4 grid-cols-3">
                    <DocsPanel icon="tabler:adjustments-horizontal" eyebrow="Playground" title="Controls" body-class="p-4">
                        <div class="grid gap-2 grid-cols-2">
                            <InputsNumber slim label="Min" v-model="min" name="numberMin"/>
                            <InputsNumber slim label="Max" v-model="max" name="numberMax"/>
                            <InputsNumber slim label="Increment" v-model="increment" name="numberIncrement" :min="0" :round="8"/>
                            <InputsNumber slim label="Round" v-model="round" name="numberRound" :min="0"/>
                            
                            <InputsText slim label="Label" v-model="label" name="numberLabel" class="col-span-2"/>
                            <InputsText slim label="Description" v-model="description" name="numberDescription" class="col-span-2"/>
                            <InputsText slim label="Placeholder" v-model="placeholder" name="numberPlaceholder" class="col-span-2"/>
                            <InputsText slim label="Icon" v-model="icon" name="numberIcon" class="col-span-2"/>
                            
                            <InputsCheckBox slim v-model="required" label="Required" name="numberRequired"/>
                            <InputsCheckBox slim v-model="disabled" label="Disabled" name="numberDisabled"/>
                            <InputsCheckBox slim v-model="readonly" label="Readonly" name="numberReadonly"/>
                            <InputsCheckBox slim v-model="slim" label="Slim" name="numberSlim"/>
                            <InputsCheckBox slim v-model="errorAbsolute" label="Error Absolute" class="col-span-2" name="numberErrorAbsolute"/>
                            <InputsCheckBox slim v-model="preventNull" label="Prevent Null" class="col-span-2" name="numberPreventNull"/>
                        </div>
                    </DocsPanel>

                    <DocsPanel icon="tabler:test-pipe" eyebrow="Preview" title="Rendered Component" body-class="p-4" class="col-span-2">
                        <Form :validation-schema="schema" @submit="onSubmit" @invalid-submit="onInvalidSubmit">
                            <InputsNumber 
                                v-model="value" 
                                :slim="slim" 
                                :required="required" 
                                name="docsNumberValue" 
                                :label="label" 
                                :description="description" 
                                :placeholder="placeholder" 
                                :icon="icon" 
                                :min="min" 
                                :max="max" 
                                :increment="increment" 
                                :round="round" 
                                :errorAbsolute="errorAbsolute" 
                                :disabled="disabled" 
                                :readonly="readonly"
                                :preventNull="preventNull"
                            />
                            <InputsButton class="mt-3" slim type="submit">Submit</InputsButton>
                        </Form>
                    </DocsPanel>
                </div>
            </DocsArticleSection>

            <!-- Validation section -->
            <DocsArticleSection id="validation" title="Validation">
                <template #description>
                    The component integrates with
                    <a class="text-link" href="https://vee-validate.logaretm.com/" target="_blank">VeeValidate</a>
                    and can be validated with
                    <a class="text-link" href="https://github.com/jquense/yup" target="_blank">Yup</a>.
                    Validation errors are automatically displayed by the component.
                </template>

                <DocsCodeExample title="Validation Example" eyebrow="Example" description="This example validates that the numeric value is at least 1.">
                    {{ validationExample }}
                </DocsCodeExample>

                <Form :validation-schema="validationExampleSchema" @submit="validationExampleOnSubmit" @invalid-submit="validationExampleOnInvalidSubmit">
                    <InputsNumber v-model="validationExampleValue" name="number" label="Number" :min="1" :max="100"/>
                    <InputsButton class="mt-3" slim type="submit">Submit</InputsButton>
                </Form>
            </DocsArticleSection>

            <!-- Props section -->
            <DocsArticleSection id="props" title="Props">
                <template #description>
                    The following props are available on the component. The <b>name</b> prop
                    is required for form registration and validation.
                </template>

                <DocsPropsTable :rows="documentedProps"/>
            </DocsArticleSection>

        </DocsArticle>

        <DocsOnThisPage :sections="pageSections"/>
    </div>
</template>