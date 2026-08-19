<script lang="ts" setup>
    import * as Yup from 'yup';

    const textAreaValueExample = ref('');
    const textAreaValue = ref('');
    const slim = ref(false);
    const maxlength = ref(400);
    const name = ref('description');
    const placeholder = ref('Text area placeholder');
    const label = ref('Text area label');
    const required = ref(true);
    const description = ref('Text area description');
    const height = ref(100);
    const minheight = ref(20);
    const maxheight = ref(200);
    const errorAbsolute = ref(false);
    const disabled = ref(false);
    const readonly = ref(false);
    const showCounter = ref(true);
    const outsideCounter = ref(false);

    const documentedProps = [
        {
            property: 'v-model / modelValue',
            description: 'Textarea value.',
            type: ['String', 'Number'],
            default: '',
            required: true,
        },
        {
            property: 'disabled',
            description: 'Disables textarea interaction.',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'readonly',
            description: '"read-only" mode (no editing).',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'required',
            description: 'Marks field as required.',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'name',
            description: 'Textarea name/id (also used for form + validation).',
            type: 'string',
            default: 'nameNeeded',
            required: true,
        },
        {
            property: 'label',
            description: 'Label text above textarea.',
            type: 'string',
            default: '',
            required: false,
        },
        {
            property: 'description',
            description: 'Helper text under label.',
            type: 'string',
            default: '',
            required: false,
        },
        { 
            property: 'placeholder',  
            description: 'Placeholder text shown when empty.',         
            type: 'string', 
            default: '',
            required: false, 
        },
        {
            property: 'errorAbsolute',
            description: 'Error message positioning mode.',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'showCounter',
            description: 'Show character counter.',
            type: 'boolean',
            default: true,
            required: false,
        },
        {
            property: 'outsideCounter',
            description: 'Show character counter outside input.',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'slim',
            description: 'Alternative compact style.',
            type: 'boolean',
            default: false,
            required: false,
        },
        {
            property: 'height',
            description: 'Explicit starting textarea height.',
            type: 'number',
            default: 140,
            required: false,
        },
        {
            property: 'minheight',
            description: 'Minimum textarea height.',
            type: 'number',
            default: 0,
            required: false,
        },
        {
            property: 'maxheight',
            description: 'Maximum textarea height, -1 = no limit.',
            type: 'number',
            default: -1,
            required: false,
        },
        {
            property: 'maxlength',
            description: 'Maximum allowed textarea length.',
            type: 'number',
            default: 180,
            required: false,
        },
        { 
            property: 'onkeypress',
            description: 'Custom keypress handler.',            
            type: '(event: KeyboardEvent) => void',
            default: '() => {}',
            required: false, 
        },
    ];

    const pageSections = [
        { id: 'overview', title: 'Overview' },
        { id: 'basic-usage', title: 'Basic Usage' },
        { id: 'live-example', title: 'Live Example' },
        { id: 'onKeyPress', title: 'On Key Press' },
        { id: 'validation', title: 'Validation' },
        { id: 'props', title: 'Props' },
    ];

    const schema = Yup.object({
        description: Yup.string().required('Description is required!'),
    });

    const onSubmit = async () => {};
    const onInvalidSubmit = async () => {};

    const basicExample =
`<InputsTextArea
    v-model="textValue"
    name="description"
    label="Description"
    description="Enter a description."
    placeholder="Write something..."
    :maxlength="400"
/>`;

    const validationExample = `<script setup lang="ts">
    import * as Yup from 'yup';
    const textAreaValue = ref('');

    const schema = Yup.object({
        description: Yup.string().required('Description is required!'),
    });

    const onSubmit = async () => {
        alert('Form submitted successfully with value: ' + textAreaValue.value);
    };

    const onInvalidSubmit = async () => {
        alert('Form has validation errors.');
    };
<\/script>
<template>
    <Form :validation-schema="schema" @submit="onSubmit" @invalid-submit="onInvalidSubmit">
        <InputsTextArea v-model="textAreaValue" name="description" label="Description"/>

        <InputsButton class="mt-3" slim>
            Submit
        </InputsButton>
    </Form>
</template>
`;

const onkeypressExampleTextValue = ref('');
const onkeypressExample =
`<script setup lang="ts">
    const textValue = ref('');

    const onkeypress = (event: KeyboardEvent) => { 
        if (event.key < 'a' || event.key > 'z') 
            event.preventDefault(); 
    };
<\/script>
<template>
    <InputsTextArea
        v-model="textValue"
        name="textarea"
        label="Textarea"
        description="Only letters are allowed."
        placeholder="FooBar"
        :onkeypress="onkeypress"
    />
</template>
`;

const onkeypressExampleFun = (event: KeyboardEvent) => {
    if (event.key < 'a' || event.key > 'z') {
        event.preventDefault();
    }
};

</script>

<template>
    <div class="flex gap-4">
        <DocsArticle title="InputsTextArea">

            <template #header>
                <b>InputsTextArea</b> is the shared multiline text input component used across forms,
                dialogs, and setting surfaces. It provides a consistent and reusable interface for
                entering longer text while integrating directly with <b>v-model</b> and
                <b>vee-validate</b>. It supports configurable labels, descriptions, required fields,
                placeholders, maximum input lengths, custom heights, compact sizing, and disabled
                or read-only states. Through <b>vee-validate</b>, the component keeps its internal
                field value synchronized with the form state and automatically handles change, blur,
                and validation error feedback.
            </template>

            <DocsArticleSection id="basic-usage" title="Basic Usage">
                <template #description>
                    Bind the component with <b>v-model</b> and provide a unique <b>name</b>. Add
                    <b>label</b>, <b>description</b>, and <b>placeholder</b> when the textarea needs
                    more context, then use <b>maxlength</b> and <b>height</b> to control its content
                    and layout.
                </template>

                <DocsCodeExample eyebrow="Example" title="Basic Template"
                    description="A typical setup combines a unique field name, a bound value, and optional presentation props.">
                    {{ basicExample }}
                </DocsCodeExample>

                <InputsTextArea
                    v-model="textAreaValueExample"
                    name="description"
                    label="Description"
                    description="Enter a description."
                    placeholder="Write something..."
                    :maxlength="400"
                    :minheight="100"
                />

            </DocsArticleSection>

            <DocsArticleSection id="live-example" title="Live Example">
                <template #description>
                    The following example allows you to interactively change the props of the
                    component and see how the textarea behaves.
                </template>

                <div class="grid gap-4 grid-cols-3">
                    <DocsPanel icon="tabler:adjustments-horizontal" eyebrow="Playground" title="Controls" body-class="p-4">

                        <div class="space-y-4">
                            <div class="grid gap-2 grid-cols-2">
                                <InputsText :maxlength="100" slim label="Label" v-model="label" name="textAreaLabel" class="col-span-2"/>
                                <InputsText :maxlength="100" slim label="Description" v-model="description" name="textAreaDescription" class="col-span-2"/>
                                <InputsText :maxlength="100" slim label="Placeholder" v-model="placeholder" name="textAreaPlaceholder" class="col-span-2"/>

                                <InputsNumber slim label="Max text length" v-model="maxlength" name="textAreaMaxlength" :min="0"/>
                                <InputsNumber slim label="Height" v-model="height" name="textAreaHeight" :min="0"/>
                                <InputsNumber slim label="Min height" v-model="minheight" name="textAreaMinheight" :min="0"/>
                                <InputsNumber slim label="Max height" v-model="maxheight" name="textAreaMaxheight" :min="0"/>

                                <InputsCheckBox slim v-model="required" label="Required" name="textAreaRequired"/>
                                <InputsCheckBox slim v-model="disabled" label="Disabled" name="textAreaDisabled"/>
                                <InputsCheckBox slim v-model="readonly" label="Readonly" name="textAreaReadonly"/>
                                <InputsCheckBox slim v-model="slim" label="Slim" name="textAreaSlim"/>
                                <InputsCheckBox slim v-model="showCounter" label="Show Counter" name="textAreaShowCounter"/>
                                <InputsCheckBox slim v-model="outsideCounter" label="Outside Counter" name="textAreaOutsideCounter"/>
                                <InputsCheckBox slim v-model="errorAbsolute" label="Error Absolute" class="col-span-2" name="textAreaErrorAbsolute"/>
                            </div>
                        </div>
                    </DocsPanel>

                    <DocsPanel icon="tabler:test-pipe" eyebrow="Preview" title="Rendered Textarea" body-class="p-4" class="col-span-2">

                        <Form :validation-schema="schema" @submit="onSubmit" @invalid-submit="onInvalidSubmit">
                            <InputsTextArea
                                v-model="textAreaValue"
                                :slim="slim"
                                :required="required"
                                :maxlength="maxlength"
                                :name="name"
                                :placeholder="placeholder"
                                :label="label"
                                :description="description"
                                :height="height"
                                :minheight="minheight"
                                :maxheight="maxheight"
                                :errorAbsolute="errorAbsolute"
                                :show-counter="showCounter"
                                :outside-counter="outsideCounter"
                                :disabled="disabled"
                                :readonly="readonly"
                            />

                            <InputsButton class="mt-3" slim type="submit">
                                Submit
                            </InputsButton>
                        </Form>
                    </DocsPanel>
                </div>
            </DocsArticleSection>

            <DocsArticleSection id="onKeyPress" title="On Key Press">
                <template #description>
                    The <b>onkeypress</b> prop allows you to provide a custom keypress handler for the textarea field.
                    This can be used to restrict input to certain characters or implement custom behavior when keys are pressed.
                </template>

                <DocsCodeExample
                    eyebrow="Example"
                    title="On Key Press Example"
                    description="This example demonstrates how to use the onkeypress prop to restrict input to letters only.">
                    {{ onkeypressExample }}
                </DocsCodeExample>

                <InputsTextArea
                    v-model="onkeypressExampleTextValue"
                    name="textarea"
                    label="Textarea"
                    description="Only letters are allowed."
                    placeholder="FooBar"
                    :onkeypress="onkeypressExampleFun"/>
            </DocsArticleSection>

            <DocsArticleSection id="validation" title="Validation">
                <template #description>
                    The component integrates with
                    <a class="text-link" href="https://vee-validate.logaretm.com/" target="_blank"> VeeValidate </a>
                    to provide advanced validation capabilities. You can define a validation schema using
                    <a class="text-link" href="https://github.com/jquense/yup" target="_blank"> Yup </a>
                    and bind it to the form. The component automatically handles validation errors and displays them accordingly.
                </template>

                <DocsCodeExample title="Validation Example" eyebrow="Example"
                    description="This example demonstrates how to validate an InputsTextArea field using VeeValidate and Yup.">
                    {{ validationExample }}
                </DocsCodeExample>

                <Form :validation-schema="schema" @submit="onSubmit" @invalid-submit="onInvalidSubmit">
                    <InputsTextArea v-model="textAreaValue" name="description" label="Description"/>

                    <InputsButton class="mt-3" slim type="submit">
                        Submit
                    </InputsButton>
                </Form>
            </DocsArticleSection>

            <DocsArticleSection id="props" title="Props">
                <template #description>
                    The following props are available on the component. All props are optional unless
                    otherwise noted. The <b>name</b> prop is required for validation to work properly.
                </template>

                <DocsPropsTable :rows="documentedProps"/>
            </DocsArticleSection>

        </DocsArticle>

        <DocsOnThisPage :sections="pageSections"/>
    </div>
</template>