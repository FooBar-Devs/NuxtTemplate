<script setup lang="ts">
    const props = defineProps({
        // v-model value
        modelValue: { type: Boolean, default: false, required: true },

        // input interaction props
        disabled:  { type: Boolean, default: false, required: false },            // disables input interaction
        readonly:  { type: Boolean, default: false, required: false },            // read-only mode (no editing)

        // checkbox field props
        required:      { type: Boolean, default: false,        required: false }, // marks field as required
        name:          { type: String,  default: "nameNeeded", required: true  }, // checkbox name/id (also used for form + validation)
        label:         { type: String,  default: "",           required: false }, // checkbox label/id
        description:   { type: String,  default: "",           required: false }, // helper text
        errorAbsolute: { type: Boolean, default: false,        required: false }, // error message positioning mode

        // optional label & compact mode
        slim:          { type: Boolean, default: false, required: false },        // alternative compact style
    });

    // Reactive reference to field name
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
        const input = event.target as HTMLInputElement;
        update(input.checked); // sync local + parent state
    };

    // Vue v-model emit definition
    const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void; }>();  

    // Central update function (syncs local + parent state)
    const update = function (value: boolean) {
        inputValue.value = value;
        handleChange(value);
        emit('update:modelValue', value); // emit v-model update
    }

    // Keep internal value in sync if parent changes modelValue externally
    watch(() => props.modelValue, (newValue) => {
        inputValue.value = newValue;
        handleChange(newValue);
    });

    // Expose method for parent components
    defineExpose({ update })
</script>

<template>
    <label class="w-fit" :class="slim ? 'mb-1' : 'mb-2'" :for="name">
        <div class="relative flex items-center"
            :class="[
                slim ? 'gap-1' : 'gap-2',

                // disable cursor for all children when disabled
                { 'cursor-not-allowed *:cursor-not-allowed' : disabled },

                // force text cursor for readonly input
                { '*:cursor-default' : readonly && !disabled },

                // cursor pointer for normal state
                { 'cursor-pointer *:cursor-pointer' : !disabled && !readonly },
            ]">

            <!-- CHECKBOX -->
            <label class="relative flex-center justify-center py-1 pr-1 rounded-full group peer" :for="name">

                <input :id="name" :name="name" type="checkbox" :checked="inputValue" 
                    :disabled="disabled || readonly" :readonly="readonly"
                    @change="handleInput" @blur="handleBlur"
                    class="relative peer aspect-square appearance-none rounded transition-300
                        checked:ring-TBD-primary-light dark:checked:ring-TBD-primary-dark
                        checked:hover:ring-TBD-text-dark dark:checked:hover:ring-TBD-text-light
                        checked:bg-TBD-primary-light dark:checked:bg-TBD-primary-dark/75"
                    :class="[
                        slim ? 'h-4' : 'h-6',

                        // error vs normal styles
                        errorMessage
                            ? 'input-ring-error bg-TBD-error-light/25 dark:bg-TBD-error-light/10'
                            : 'input-ring bg-TBD-bg-light dark:bg-TBD-bg-dark/25',

                        // disabled state opacity
                        { 'opacity-25' : disabled }, 

                        // readonly visual state
                        { 'opacity-50' : readonly && !disabled },

                        // disable cursor for all children when disabled
                        { 'cursor-not-allowed *:cursor-not-allowed' : disabled },

                        // force text cursor for readonly input
                        { '[&>input]:cursor-default' : readonly && !disabled },

                        // cursor pointer for normal state
                        { 'cursor-pointer *:cursor-pointer' : !disabled && !readonly },
                    ]"
                />

                <!-- CHECK ICON -->
                <Icon name="material-symbols:check-rounded"
                    :class="slim ? 'text-lg' : 'text-2xl'"
                    class="peer-not-checked:scale-0 peer-not-checked:opacity-0 transition-300 
                        absolute pointer-events-none text-TBD-text-light dark:text-TBD-text-dark"/>
            </label>

            <!-- SLOT BEFORE-->
            <slot name="before"/>

            <InputsLabel v-if="label || description" :label="label" :for="name"
                :description="description" :required="required" :slim="slim"
                :description-class="
                    description != '' && description
                        ? slim ? 'text-2xs -top-0.25!' : 'text-xs -top-0.5!'
                        : slim ? 'mt-0.5' : 'mt-2'
                "
                description-mark-class="-top-2!"
                class="font-normal mb-0"
                :class="[
                    slim ? '-mb-px' : '-mb-px',
                    { 'text-TBD-error-light' : errorMessage },

                    // disabled state opacity
                    { 'opacity-25' : disabled }, 

                    // readonly visual state
                    { 'opacity-50' : readonly && !disabled },
                ]">
                
                <!-- LABEL SLOT -->
                <template #label> <slot name="label"/> </template>
                <template #description> <slot name="description"/> </template>

            </InputsLabel>

            <!-- SLOT AFTER-->
            <slot name="after"/>

        </div>

        <!-- ERROR MESSAGE -->
        <InputsErrorMessage
            :error-message="errorMessage"
            :error-absolute="errorAbsolute"
            :slim="slim"
        />

    </label>
</template>