<script setup lang="ts">
    const props = defineProps({
        // v-model value
        modelValue: { type: [Number, null], default: 0, required: true },

        // input interaction props
        disabled: { type: Boolean, default: false, required: false },             // disables input interaction
        readonly: { type: Boolean, default: false, required: false },             // read-only mode (no editing)

        // form field props
        required:      { type: Boolean, default: false,        required: false }, // marks field as required
        name:          { type: String,  default: "nameNeeded", required: true },  // input name/id (also used for form + validation)
        label:         { type: String,  default: "",           required: false }, // label text above input
        description:   { type: String,  default: "",           required: false }, // helper text under label
        placeholder:   { type: String, default: "",            required: false }, // placeholder text shown when empty (null)
        errorAbsolute: { type: Boolean, default: false,        required: false }, // error message positioning mode

        // optional icon & compact mode
        icon: { type: String, default: "", required: false },                     // Iconify icon
        slim: { type: Boolean, default: false, required: false },                 // alternative compact style

        // number input behavior props
        min:         { type: Number, default: null, required: false },            // minimum allowed value
        max:         { type: Number, default: null, required: false },            // maximum allowed value
        increment:   { type: Number, default: 1,    required: false },            // step used for wheel/arrow updates
        round:       { type: Number, default: 2,    required: false },            // decimal precision used when rounding
        preventNull: { type: Boolean, default: true, required: false },           // prevents the input from being empty (null), becomes 0 instead
    });

    // reactive reference to field name
    const name = toRef(props, 'name');

    // Optional form field integration (vee-validate useField)
    const {
        value: inputValue, // reactive input value
        errorMessage,      // validation error message
        handleBlur,        // blur handler for validation trigger
        handleChange,      // change handler for validation sync
    } = useField<number | null>(name, undefined, {
        initialValue: props.modelValue,
    });

    const exit = ref(true); // controls continuous increment/decrement loop
    const speed = ref(200); // current repeat speed for held arrow buttons

    // Wait before starting continuous updates
    const loopDelay = async () => {
        for (let i = 2; i > 0; i--) {
            if (exit.value) return;
            await wait(0.1);
        }
    };

    // Gradually increase update speed while button is held
    const loopSpeedIncrease = async () => {
        while (!exit.value && speed.value > 1) {
            speed.value -= 25;
            await wait(0.25);
        }
    };

    // Handles mouse wheel number updates
    const scroll = (event: WheelEvent) => {
        if (props.disabled || props.readonly) return;
        updateValue(event.deltaY < 0);
    };

    // Starts increment/decrement interaction
    const startUpdate = async (increase: boolean) => {
        if (inputValue.value === null) inputValue.value = 0;

        speed.value = 150;
        exit.value = false;

        updateValue(increase);

        await loopDelay();

        if (increase) incrementLoop();
        else decrementLoop();

        await loopSpeedIncrease();

        speed.value = 1;
    };

    // Calculates and applies the next number value
    const updateValue = (increase: boolean) => {
        if (inputValue.value === null) inputValue.value = 0;

        const newValue = increase
            ? inputValue.value >= props.max && props.max !== null
                ? inputValue.value
                : inputValue.value + props.increment
            : inputValue.value <= props.min && props.min !== null
                ? inputValue.value
                : inputValue.value - props.increment;

        update(newValue);
    };

    // Continuously increments while arrow button is held
    const incrementLoop = async () => {
        while (!exit.value) {
            updateValue(true);
            await wait(speed.value / 1000);
        }
    };

    // Continuously decrements while arrow button is held
    const decrementLoop = async () => {
        while (!exit.value) {
            updateValue(false);
            await wait(speed.value / 1000);
        }
    };

    // Handles native input event
    const handleInput = async (event: Event) => {
        const input = event.target as HTMLInputElement;

        // Allow the field to temporarily be empty
        if (input.value === '' && !props.preventNull) {
            inputValue.value = null;
            emit('update:modelValue', null);
            emit('watch', null);

            handleChange(event);

            await wait(0.01);
            return;
        }

        update(Number(input.value));
        handleChange(event);

        await wait(0.01);
    };

    // Vue v-model emit definition
    const emit = defineEmits<{
        (e: 'update:modelValue', value: number | null): void;
        (e: 'watch', value: number | null): void;
    }>();

    const inputField = ref(); // reference to actual input element

    // Central update function (syncs local + parent state)
    const update = function (value: number | null) {
        // Allow the input to remain empty
        if (value === null) {
            inputValue.value = null;
            emit('update:modelValue', null);
            emit('watch', null);

            if (inputField.value)
                inputField.value.value = '';

            return;
        }

        let newValue = Math.round(
            value * Math.pow(10, props.round)
        ) / Math.pow(10, props.round);

        // enforce maximum value
        if (props.max !== null)
            newValue = Math.min(newValue, props.max);

        // enforce minimum value
        if (props.min !== null)
            newValue = Math.max(newValue, props.min);

        inputValue.value = newValue;
        emit('update:modelValue', newValue);
        emit('watch', newValue);

        // sync native input value
        if (inputField.value)
            inputField.value.value = newValue;
    };

    // Keep internal value in sync if parent changes modelValue externally
    watch(() => props.modelValue, (newValue) => {
        inputValue.value = newValue;
        emit('watch', newValue);
    });

    // Expose method for parent components
    defineExpose({ update });

    // Initialize native input value after mounting
    onMounted(() => {
        update(props.modelValue);
    });
</script>

<template>
    <InputsInputWrapper :label="label" :description="description" :required="required"
        :error-message="errorMessage" :error-absolute="errorAbsolute" :slim="slim"
        @wheel.passive.stop="scroll($event)"
        @wheel.stop.prevent>

        <!-- LABEL SLOT -->
        <template #label> <slot name="label"/> </template>
        <template #description> <slot name="description"/> </template>

        <!-- INPUT SLOT -->
        <template #input>
            <div @click="inputField.focus()"
                class="relative flex-center rounded-md outline-none transition-300"
                :class="[
                    slim ? 'h-7 gap-1.5 pl-1.5': 'h-12 gap-2 pl-3',

                    // error vs normal styles
                    !errorMessage
                        ? 'input-bg input-ring input-text focus-within-input-ring focus-within-input-text'
                        : 'input-bg-error input-ring-error input-text-error focus-within-input-ring-error focus-within-input-text-error',

                    // disabled state opacity
                    { 'opacity-25': disabled },

                    // readonly visual state
                    { 'opacity-50': readonly && !disabled },

                    // disable cursor for all children when disabled
                    { 'cursor-not-allowed *:cursor-not-allowed': disabled && !readonly },

                    // force text cursor for readonly input
                    { '[&>input]:cursor-text': readonly },
                ]">


                <!-- OPTIONAL ICON -->
                <div v-if="icon != ''" class="flex-center transition-300"
                    :class="slim ? 'text-xl' : 'text-2xl'">
                    <Icon :name="icon"/>
                </div>


                <!-- NUMBER INPUT FIELD -->
                <input :name="name" :id="name" type="number" ref="inputField"

                    :value="inputValue"
                    :disabled="disabled" :readonly="readonly"

                    @input="handleInput" @blur="handleBlur"

                    class="peer wh-full bg-transparent text-right outline-none placeholder:text-TBD-bg-light mt-px transition-300"
                    :class="[slim ? 'pr-6' : '-mb-px pr-9']"/>

                <!-- PLACEHOLDER -->
                <div v-if="inputValue === null"
                    class="peer-focus:opacity-0 pointer-events-none flex-center absolute opacity-50 z-10
                        whitespace-nowrap mt-0.5 transition-300"
                    :class="[slim ? ' right-6' : ' right-9']">

                    {{ placeholder }}

                </div>


                <!-- NUMBER ARROWS -->
                <div class="absolute right-0 pt-px flex flex-col items-end justify-center transition-300"
                    :class="[
                        { 'pointer-events-none': disabled || readonly },
                        slim ? 'pr-1 gap-0.75 text-base' : 'pr-1.25 gap-1 text-2xl',
                        errorMessage ? '' : 'text-TBD-text-dark/75 dark:text-TBD-text-light/50',
                    ]">

                    <!-- UP ARROW -->
                    <Icon name="material-symbols:chevron-left-rounded"
                        class="rotate-90 -mb-1 cursor-pointer transition-300 hover:text-TBD-primary-light/75 dark:hover:text-TBD-primary-dark"
                        @mousedown="startUpdate(true)"
                        @mouseleave="exit = true"
                        @mouseout="exit = true"
                        @mouseup="exit = true"/>

                    <!-- DOWN ARROW -->
                    <Icon name="material-symbols:chevron-right-rounded"
                        class="rotate-90 -mt-1 cursor-pointer transition-300 hover:text-TBD-primary-light/75 dark:hover:text-TBD-primary-dark"
                        @mousedown="startUpdate(false)"
                        @mouseleave="exit = true"
                        @mouseout="exit = true"
                        @mouseup="exit = true"/>

                </div>

            </div>
        </template>

    </InputsInputWrapper>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    -moz-appearance: textfield;
    appearance: textfield;
}
</style>