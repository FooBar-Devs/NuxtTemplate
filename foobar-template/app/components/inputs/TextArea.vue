<script setup lang="ts">
    const props = defineProps({
        // v-model value
        modelValue:    { type: String, default: "", required: false },

        // input interaction props
        disabled:      { type: Boolean, default: false, required: false },        // disables input interaction
        readonly:      { type: Boolean, default: false, required: false },        // read-only mode (no editing)

        // form field props
        required:      { type: Boolean, default: false,        required: false }, // marks field as required
        name:          { type: String,  default: "nameNeeded", required: true },  // textarea name/id
        label:         { type: String,  default: "",           required: false }, // label text above textarea
        description:   { type: String,  default: "",           required: false }, // helper text under label
        placeholder: { type: String, default: "",  required: false },             // placeholder text shown when empty
        errorAbsolute: { type: Boolean, default: false,        required: false }, // error message positioning mode

        // optional counter & compact mode
        showCounter:    { type: Boolean, default: true,   required: false },      // show character counter
        outsideCounter: { type: Boolean, default: false,  required: false },      // show character counter outside input
        slim:           { type: Boolean, default: false,  required: false },      // alternative compact style

        // textarea sizing props
        height:      { type: Number, default: 100, required: false },             // fixed textarea height
        minheight:   { type: Number, default: 0,  required: false },              // min textarea height
        maxheight:   { type: Number, default: -1,  required: false },             // max textarea height, -1 = no limit

        // textarea behavior props
        maxlength:   { type: Number, default: 300, required: false },             // max allowed input length
        onkeypress:  {                                                            // custom keypress handler
            type: Function as PropType<(event: KeyboardEvent) => void>,
            default: () => {},
            required: false
        },
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

    // Handles native textarea input event
    const handleInput = (event: Event) => {
        handleChange(event); // sync with validation system
        const input = event.target as HTMLTextAreaElement;
        update(input.value); // sync local + parent state
    };

    // Vue v-model emit definition
    const emit = defineEmits<{ (e: 'update:modelValue', value: string): void; }>();

    // Central update function (syncs local + parent state)
    const update = function (value: string) {
        emit('update:modelValue', value); // emit v-model update
        inputValue.value = value;         // update internal form state
    }

    const inputField = ref(); // reference to actual textarea element

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
            <div class="relative">
                <div @click="inputField.focus()"
                    class="relative flex rounded-md rounded-br-none overflow-hidden outline-none transition-colors duration-300 resize-y scrollbar-none"
                    :class="[
                        slim ? 'h-7 gap-1.5' : 'h-12 gap-3',

                        // error vs normal styles
                        !errorMessage
                            ? 'input-bg input-ring input-text focus-within-input-ring focus-within-input-text'
                            : 'input-bg-error input-ring-error input-text-error focus-within-input-ring-error focus-within-input-text-error',

                        // disabled state opacity and cursor
                        { 'opacity-25 cursor-not-allowed' : disabled },

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
                    ]"
                    :style="`min-height: ${minheight}px; height: ${height}px; max-height: ${maxheight > 0 ? maxheight + 'px' : 'none'};`">

                    <!-- MAX LENGTH COUNTER INSIDE -->
                    <div v-if="maxlength > 0 && showCounter && !outsideCounter"
                        class="absolute text-2xs py-px px-1 rounded transition-300 bottom-0.5 right-2 backdrop-blur-sm"
                        :class="[inputValue.length > maxlength * 0.8 ? 'text-TBD-text-error' : '']">
                        <span class="opacity-50">{{ inputValue.length }} / {{ maxlength }}</span>
                    </div>

                    <!-- TEXTAREA FIELD -->
                    <textarea :name="name" :id="name" ref="inputField"

                        :value="inputValue"   :maxlength="maxlength"
                        :disabled="disabled"  :readonly="readonly"

                        @input="handleInput" @blur="handleBlur" @keypress="onkeypress"

                        class="peer min-h-full px-2.5 w-full bg-transparent outline-none text-TBD-text-dark dark:text-TBD-text-light
                            placeholder:text-TBD-bg-light pt-2 transition-300 resize-none disabled:cursor-not-allowed"
                        
                        :class="[
                            slim ? '' : '-mb-px', 
                            !outsideCounter && showCounter ? 'pb-4' : 'pb-2'
                        ]"/>

                    <!-- PLACEHOLDER -->
                    <div v-if="inputValue == ''"
                        class="peer-focus:opacity-0 pointer-events-none flex-center absolute top-1.5 opacity-50 
                            whitespace-nowrap mt-0.5 left-2.5 transition-300">
                        {{ placeholder }}
                    </div>

                </div>

                <!-- MAX LENGTH COUNTER OUTSIDE -->
                <div v-if="maxlength > 0 && showCounter && outsideCounter"
                    class="absolute text-2xs px-1.5 transition-300 right-0 -bottom-4 rounded-b-md input-ring input-bg"
                    :class="[
                        slim ? 'pt-0.5 pb-px' : 'py-px',

                        // error vs normal styles
                        !errorMessage
                            ? 'input-bg input-ring input-text'
                            : 'input-bg-error input-ring-error input-text-error',

                        // disabled state opacity and cursor
                        { 'opacity-25 cursor-not-allowed' : disabled },

                        // disabled state opacity
                        { 'opacity-25' : disabled },

                        // readonly visual state
                        { 'opacity-50' : readonly && !disabled },
                    ]">
                    <span class="opacity-50">{{ inputValue.length }} / {{ maxlength }}</span>
                </div>
            </div>
            
        </template>

    </InputsInputWrapper>
</template>