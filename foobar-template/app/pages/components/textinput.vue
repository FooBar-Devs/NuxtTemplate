<script lang="ts" setup>
    import { Input } from 'postcss';
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
    const onkeypress = (event: KeyboardEvent) => {
        if (event.key >= '0' && event.key <= '9') {
            event.preventDefault();
        }
    };
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
            property: 'placeholder',  
            description: 'Placeholder text shown when empty.',         
            type: 'string', 
            default: '',
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
        { id: 'props', title: 'Props' },
    ];

    const schema = Yup.object({
        name: Yup.string().required("Ime je obavezno!"),
    });

    const onSubmit = async () => {}
    const onInvalidSubmit = async () => {}
</script>

<template>
    <div class="flex gap-4">
        <DocsArticle title="InputsText">
            
            <template #header>                
                <b>InputsText</b> is the standard single-line input for short form values. It wraps the
                shared field styling used across the app and wires the control into <b>vee-validate</b>, so
                labels, descriptions, errors, icons, and model updates remain consistent wherever the
                component is used.
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
                    description="A typical setup combines a unique field name, a bound value, and optional presentation props. Validation stays attached to the same component, which keeps forms predictable when the field moves between pages, settings panels, and denser control groups.">
                    <span class="block"><span class="text-TBD-primary-light dark:text-TBD-primary-dark">&lt;InputsText</span></span>
                    <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">v-model</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"textValue"</span></span>
                    <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">name</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"Username"</span></span>
                    <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">label</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"Username"</span></span>
                    <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">description</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"Only letters and numbers are allowed."</span></span>
                    <span class="block pl-3"><span class="text-TBD-secondary-light dark:text-TBD-secondary-dark">placeholder</span>=<span class="text-TBD-confirm-light dark:text-TBD-confirm-dark">"FooBar"</span></span>
                    <span class="block"><span class="text-TBD-primary-light dark:text-TBD-primary-dark">/&gt;</span></span>
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
                    The following example allows you to interactively change the props of the component and see how it behaves. You can also test validation by submitting the form.
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
                            </div>

                            <div class="grid gap-2 grid-cols-2">
                                <InputsCheckBox slim v-model="required" label="Required"/>
                                <InputsCheckBox slim v-model="disabled" label="Disabled"/>
                                <InputsCheckBox slim v-model="readonly" label="Readonly"/>
                                <InputsCheckBox slim v-model="slim" label="Slim"/>
                                <InputsCheckBox slim v-model="errorAbsolute" label="Error Absolute" class="col-span-2"/>
                            </div>
                        </div>
                    </DocsPanel>

                    <DocsPanel icon="tabler:test-pipe" eyebrow="Preview" title="Rendered Field" body-class="p-4" class="col-span-2">
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