<script lang="ts" setup>
    import * as Yup from 'yup';

    const textValueExample = ref('');
    const textValue = ref('');
    const slim = ref(false);
    const maxlength = ref(64);
    const name = ref('name');
    const placeholder = ref('Text placeholder');
    const label = ref('Text label');
    const required = ref(true);
    const description = ref('Text description');
    const icon = ref('tabler:user');
    const errorAbsolute = ref(false);
    const disabled = ref(false);
    const readonly = ref(false);

    const documentedProps = [
        { 
            property: 'v-model / modelValue', 
            description: 'Input value', 
            type: ['String', 'Number'],
            default: '',
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
            description: 'Input name/id (also used for form + validation).',                
            type: 'string',
            default: 'nameNeeded',
            required: true, 
        },
        { 
            property: 'label',     
            description: 'Label text above input.',           
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
            property: 'icon',  
            description: 'Iconify icon.', 
            type: 'string',      
            default: '',
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
            property: 'maxlength',
            description: 'Max allowed input length.',           
            type: 'number', 
            default: 64,
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
        name: Yup.string().required("Ime je obavezno!"),
    });

    const onSubmit = async () => {}
    const onInvalidSubmit = async () => {}

    const basicExample = 
`<InputsText
    v-model="textValue"
    name="'Username'"
    label="Username"
    description="Only letters and numbers are allowed."
    placeholder="FooBar"
/>`

const validationExampleTextValue = ref('');

const validationExampleShema = Yup.object({
    name: Yup.string().required('Name is required!'),
});

const validationExampleOnSubmit = async () => {
    alert('Form submitted successfully with value: ' + validationExampleTextValue.value);
};
const validationExampleOnInvalidSubmit = async () => {
    alert('Form has validation errors.');
};

const validationExample = `<script setup lang="ts">
    import * as Yup from 'yup';
    const textValue = ref('');

    const schema = Yup.object({
        name: Yup.string().required('Name is required!'),
    });

    const onSubmit = async () => {
        alert('Form submitted successfully with value: ' + textValue.value);
    };
    const onInvalidSubmit = async () => {
        alert('Form has validation errors.');
    };
<\/script>
<template>
    <Form :validation-schema="schema" @submit="onSubmit" @invalid-submit="onInvalidSubmit">
        <InputsText v-model="textValue" name="name" label="Name"/>

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
    <InputsText
        v-model="textValue"
        name="'Username'"
        label="Username"
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
        <DocsArticle title="InputsText">

            <template #header>
                <b>InputsText</b> is the shared text input component used across forms, dialogs, and
                setting surfaces. It provides a consistent and reusable interface for entering and
                editing text while integrating directly with <b>v-model</b> and <b>vee-validate</b>.
                It supports configurable labels, descriptions, required fields, placeholders,
                maximum input lengths, optional icons, compact sizing, and custom keypress handling.
                Through <b>vee-validate</b>, the component keeps its internal field value synchronized
                with the form state and automatically handles change, blur, and validation error
                feedback. It also provides dedicated disabled and read-only states, optional absolute
                error positioning, and an exposed <b>update</b> method for programmatic value changes,
                making it suitable for both standard forms and more advanced controlled input
                scenarios.
            </template>

            <DocsArticleSection id="basic-usage" title="Basic Usage">
                <template #description>
                    Bind the component with <b>v-model</b> and provide a unique <b>name</b>. Add
                    <b>label</b>, <b>description</b>, <b>placeholder</b>, and <b>icon</b> when the field
                    needs more context, then use flags like <b>slim</b>, <b>readonly</b>, or
                    <b>disabled</b> to match the surrounding layout and interaction state.
                </template>

                <DocsCodeExample
                    eyebrow="Example"
                    title="Basic Template"
                    description="A typical setup combines a unique field name, a bound value, and optional presentation props.">
                    {{ basicExample }}
                </DocsCodeExample>

                <InputsText
                    v-model="textValueExample"
                    name="'Username'"
                    label="Username"
                    description="Only letters and numbers are allowed."
                    placeholder="FooBar"
                />
            </DocsArticleSection>

            <DocsArticleSection id="live-example" title="Live Example">
                <template #description>
                    The following example allows you to interactively change the props of the component and see how it behaves. 
                    You can also test validation by submitting the form.
                </template>

                <div class="grid gap-4 grid-cols-3">
                    <DocsPanel icon="tabler:adjustments-horizontal" eyebrow="Playground" title="Controls" body-class="p-4">
                        <div class="space-y-4">
                            <div class="grid gap-2 grid-cols-2">
                                <InputsText :maxlength="100" slim label="Label" v-model="label" name="label" class="col-span-2"/>
                                <InputsText :maxlength="100" slim label="Description" v-model="description" name="description" class="col-span-2"/>
                                <InputsText :maxlength="100" slim label="Placeholder" v-model="placeholder" name="placeholder" class="col-span-2"/>
                                <InputsText :maxlength="100" slim label="Icon" v-model="icon" name="icon"/>
                                
                                <InputsNumber slim label="Maxlength" v-model="maxlength" name="maxlength"/>

                                <InputsCheckBox slim v-model="required" label="Required" name="required"/>
                                <InputsCheckBox slim v-model="disabled" label="Disabled" name="disabled"/>
                                <InputsCheckBox slim v-model="readonly" label="Readonly" name="readonly"/>
                                <InputsCheckBox slim v-model="slim" label="Slim" name="slim"/>
                                <InputsCheckBox slim v-model="errorAbsolute" label="Error Absolute" name="errorAbsolute" class="col-span-2"/>
                            </div>
                        </div>
                    </DocsPanel>

                    <DocsPanel icon="tabler:test-pipe" eyebrow="Preview" title="Rendered Component" body-class="p-4" class="col-span-2">
                        <Form :validation-schema="schema" @submit="onSubmit" @invalid-submit="onInvalidSubmit">
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
                                :errorAbsolute="errorAbsolute"
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
                    The <b>onkeypress</b> prop allows you to provide a custom keypress handler for the input field. 
                    This can be used to restrict input to certain characters or implement custom behavior when keys are pressed.
                </template>
                <DocsCodeExample
                    eyebrow="Example"
                    title="On Key Press Example"
                    description="This example demonstrates how to use the onkeypress prop to restrict input to letters only.">
                    {{ onkeypressExample }}
                </DocsCodeExample>
                <InputsText
                    v-model="onkeypressExampleTextValue"
                    name="'Username'"
                    label="Username"
                    description="Only letters are allowed."
                    placeholder="FooBar"
                    :onkeypress="onkeypressExampleFun"/>
            </DocsArticleSection>

            <DocsArticleSection id="validation" title="Validation">
                <template #description>
                    The component integrates with 
                    <a class="text-link" href="https://vee-validate.logaretm.com/" target="_blank">VeeValidate</a> 
                    to provide advanced validation capabilities. You can define a validation schema using 
                    <a class="text-link" href="https://github.com/jquense/yup" target="_blank">Yup</a> and bind it to the form.
                    The component will automatically handle validation errors and display them accordingly.                    
                </template>

                <DocsCodeExample title="Validation Example" eyebrow="Example"
                description="This example demonstrates how to set up validation for the InputsText component using VeeValidate and Yup. The form will display error messages when the input is invalid.">
                    {{ validationExample }}
                </DocsCodeExample>

                <Form :validation-schema="validationExampleShema" @submit="validationExampleOnSubmit" @invalid-submit="validationExampleOnInvalidSubmit">
                    <InputsText v-model="validationExampleTextValue" name="name" label="Name"/>

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