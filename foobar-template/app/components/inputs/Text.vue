<script setup lang="ts">
    const props = defineProps({
        required:      { type: Boolean, default: false },       // marks field as required
        maxlength:     { type: Number, default: 64 },           // max allowed input length
        name:          { type: String, required: true },        // input name/id (also used for form + validation)
        placeholder:   { type: String, default: "" },           // placeholder text shown when empty
        label:         { type: String, default: "" },           // label text above input
        description:   { type: String, default: "" },           // optional helper text under label
        icon:          { type: String, default: "" },           // optional icon name
        modelValue:    { type: [String, Number], default: "" }, // v-model binding value
        onkeypress:    { type: Function as PropType<(event: KeyboardEvent) => void> }, // custom keypress handler
        slim:          { type: Boolean, default: false },       // compact input variant
        errorAbsolute: { type: Boolean, default: false },       // error message positioning mode
        disabled:      { type: Boolean, default: false },       // disables input interaction
        readonly:      { type: Boolean, default: false },       // read-only mode (no editing)
    });

    // reactive reference to field name
    const name = toRef(props, 'name');

    // Optional form field integration (vee-validate useField)
    const {
        value: inputValue, // reactive input value
        errorMessage,      // validation error message
        handleBlur,        // blur handler for validation trigger
        handleChange,      // change handler for validation sync
    } = useField(name, undefined, {
        initialValue: props.modelValue, // initialize field with v-model value
    });

    // Handles native input event
    const handleInput = (event: Event) => {
        handleChange(event); // sync with validation system
        const input = event.target as HTMLInputElement;
        update(input.value); // sync local + parent state
    };

    // Vue v-model emit definition
    const emit = defineEmits<{ (e: 'update:modelValue', value: string): void; }>();

    // Central update function (syncs local + parent state)
    const update = function (value: string) {         
        emit('update:modelValue', value); // emit v-model update
        inputValue.value = value;         // update internal form state
    }

    const inputField = ref(); // reference to actual input element

    // Keep internal value in sync if parent changes modelValue externally
    watch(() => props.modelValue, (newValue) => inputValue.value = newValue );

    // Expose method for parent components
    defineExpose({ update })
</script>

<template>
    <InputsInputWrapper :label="label" :description="description" :required="required"
        :error-message="errorMessage" :error-absolute="errorAbsolute" :slim="slim">

        <!-- LABEL SLOT -->
        <template #label> <slot name="label"/> </template>
        <template #description> <slot name="description"/> </template>

        <!-- INPUT SLOT -->
        <template #input>
            <div @click="inputField.focus()" 
                class="relative flex-center pr-0.5 pl-1.5 rounded-md overflow-hidden outline-none transition-300"
                :class="[
                    slim ? 'h-7 gap-1.5': 'h-12 gap-2', 

                    // error vs normal styles
                    !errorMessage 
                        ? 'input-bg input-ring input-text focus-within-input-ring focus-within-input-text' 
                        : 'input-bg-error input-ring-error input-text-error focus-within-input-ring-error focus-within-input-text-error',

                    // disabled state opacity
                    { 'opacity-25' : disabled }, 

                    // spacing adjustment when no label exists
                    { 'mb-2' : label == '' || !label },

                    // readonly visual state
                    { 'opacity-50' : readonly && !disabled },

                    // disable cursor for all children when disabled
                    { 'cursor-not-allowed *:cursor-not-allowed' : disabled && !readonly },

                    // force text cursor for readonly input
                    { '[&>input]:cursor-text' : readonly },
                ]">
                

                <!-- OPTIONAL ICON -->
                <div v-if="icon != ''" class="flex-center" 
                    :class="slim ? 'text-xl -ml-1' : 'text-2xl'">
                    <Icon :name="icon"/>
                </div>


                <!-- TEXT INPUT FIELD -->
                <input :name="name" :id="name" type="text" ref="inputField"

                    :value="inputValue"   :maxlength="maxlength"
                    :disabled="disabled"  :readonly="readonly"

                    @input="handleInput" @blur="handleBlur" @keypress="onkeypress"

                    class="peer wh-full bg-transparent outline-none placeholder:text-TBD-bg-light mt-px transition-300" 
                    :class="[!slim ? '-mb-px ml-0.5' : '']"/>


                <!-- PLACEHOLDER -->
                <div v-if="inputValue == ''" 
                    class="peer-focus:opacity-0 pointer-events-none flex-center absolute opacity-75 whitespace-nowrap mt-0.5" 
                    :class="icon != '' ? slim ? 'left-8' : 'left-12' : 'left-3'">

                    {{ placeholder }}

                </div>

            </div>
        </template>

    </InputsInputWrapper>
</template>