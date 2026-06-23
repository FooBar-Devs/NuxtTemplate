<script lang="ts" setup>
    import * as Yup from 'yup';

    const textValue = ref('');
    /*
        required: { type: Boolean, default: false },
        maxlength: { type: Number, default: 24 },
        name: { type: String, required: true },
        placeholder: { type: String, default: "" },
        label: { type: String, default: "" },
        description: { type: String, default: "" },
        icon: { type: String, default: "" },
        modelValue: { type: [String, Number], default: "" },
        ring: { type: String, default: "" },
        onkeypress: { type: Function as PropType<(event: KeyboardEvent) => void> },
        slim: { type: Boolean, default: false },
        errorAbsolute: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        readonly: { type: Boolean, default: false },
    */
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

    const schema = Yup.object({
        name: Yup.string().required("Ime je obavezno!"),
    });

    const onSubmit = async () => {}
    const onInvalidSubmit = async () => {}
</script>

<template>
    <div class="text-TBD-text-dark dark:text-TBD-text-light min-w-4xl">

        <h1 class="flex items-center gap-4 text-3xl font-bold">
            Text Input Component
            <InputsButton slim outline @click="$router.push('/')" class="my-2">
                Go Back
            </InputsButton>
        </h1>

        <TextLine class="my-4"/>

        <div class="flex gap-8">

            <div class="flex flex-col gap-2">
                <InputsText :maxlength="100" slim label="Label" v-model="label" class="max-w-xs" name="label"/>
                <InputsText :maxlength="100" slim label="Description" v-model="description" class="max-w-xs" name="description"/>
                <InputsText :maxlength="100" slim label="Icon" v-model="icon" class="max-w-xs" name="icon"/>
                <InputsText :maxlength="100" slim label="Placeholder" v-model="placeholder" class="max-w-xs" name="placeholder"/>
                <InputsNumber slim label="Maxlength" v-model="maxlength" class="max-w-xs" name="maxlength"/>
            </div>

            <div class="flex flex-col h-fit gap-9 pt-6.5">
                <InputsCheckBox slim v-model="required" label="Required"/>
                <InputsCheckBox slim v-model="errorAbsolute" label="Error Absolute"/>
                <InputsCheckBox slim v-model="disabled" label="Disabled"/>
                <InputsCheckBox slim v-model="readonly" label="Readonly"/>
                <InputsCheckBox slim v-model="slim" label="Slim"/>
            </div>
            
            <TextLine vertical/>

            <div>
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
                        :onkeypress="onkeypress"
                        :errorAbsolute="errorAbsolute"
                        :disabled="disabled"
                        :readonly="readonly"
                    />

                    <InputsButton class="mt-4" slim>
                        Submit
                    </InputsButton>

                </Form>
            </div>

        </div>

    </div>
</template>