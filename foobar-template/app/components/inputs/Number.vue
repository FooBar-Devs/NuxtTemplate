<script setup lang="ts">
    const props = defineProps({
        // v-model value
        modelValue:    { type: Number, default: 0 },

        // input interaction props
        disabled:      { type: Boolean, default: false },       // disables input interaction
        readonly:      { type: Boolean, default: false },       // read-only mode (no editing)

        // form field props
        required:      { type: Boolean, default: false },       // marks field as required
        name:          { type: String, required: true },        // input name/id (also used for form + validation)
        label:         { type: String, default: "" },           // label text above input
        description:   { type: String, default: "" },           // optional helper text under label
        errorAbsolute: { type: Boolean, default: false },       // error message positioning mode

        // optional icon & compact mode
        icon:          { type: String, default: "" },
        slim:          { type: Boolean, default: false },
        
        // input behavior props
        min:           { type: Number, default: null },         // minimum allowed value
        max:           { type: Number, default: null },         // maximum allowed value
        increment:     { type: Number, default: 1 },            // step used for wheel/arrow updates
        round:         { type: Number, default: 2 },            // decimal precision used when rounding
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

    const exit = ref(true);
    const speed = ref(200);

    const loopDelay = async () => {
        for (let i = 2; i > 0; i--) {
            if (exit.value) return;
            await wait(0.1);
        }
    };

    const loopSpeedIncrease = async () => {
        while (!exit.value && speed.value > 1) {
            speed.value -= 25;
            await wait(0.25);
        }
    };

    function scroll(e: WheelEvent) {
        if (props.disabled || props.readonly) return;
        updateValue(e.deltaY < 0);
    }

    const startUpdate = async (increase: boolean) => {
        speed.value = 150;
        exit.value = false;
        updateValue(increase);
        await loopDelay();
        if (increase) incrementLoop();
        else decrementLoop();
        await loopSpeedIncrease();
        speed.value = 1;
    };

    const updateValue = (increase: boolean) => {
        const newValue = increase
            ? inputValue.value >= props.max && props.max !== null
                ? inputValue.value
                : inputValue.value + props.increment
            : inputValue.value <= props.min && props.min !== null
                ? inputValue.value
                : inputValue.value - props.increment;
        update(newValue);
    };

    const incrementLoop = async () => {
        while (!exit.value) {
            updateValue(true);
            await wait(speed.value / 1000);
        }
    };

    const decrementLoop = async () => {
        while (!exit.value) {
            updateValue(false);
            await wait(speed.value / 1000);
        }
    };

    // Handles native input event
    const handleInput = async (event: Event) => {
        const input = event.target as HTMLInputElement;
        update(Number(input.value));
        handleChange(event);
        await wait(0.01);
    };

    // Vue v-model emit definition
    const emit = defineEmits<{
        (e: 'update:modelValue', value: number): void;
        (e: 'watch', value: number): void;
    }>();

    const inputField = ref(); // reference to actual input element

    // Central update function (syncs local + parent state)
    function update(value: number) {
        let newValue = Math.round(value * Math.pow(10, props.round)) / Math.pow(10, props.round);
        if (props.max !== null) newValue = Math.min(newValue, props.max);
        if (props.min !== null) newValue = Math.max(newValue, props.min);
        inputValue.value = newValue;
        emit('update:modelValue', newValue);
        emit('watch', newValue);
        inputField.value.value = newValue;
    }

    // Keep internal value in sync if parent changes modelValue externally
    watch(() => props.modelValue, (newValue) => {
        inputValue.value = newValue;
        emit('watch', newValue);
    });

    // Expose method for parent components
    defineExpose({ update });

    onMounted(() => {
        update(props.modelValue);
    });
</script>

<template>
    <div class="relative flex flex-col gap-2"
        :class="{ 'text-xs': slim }"
        @wheel.passive.stop="scroll($event)"
        @wheel.stop.prevent>

        <InputsInputWrapper :label="label" :description="description" :required="required"
            :error-message="errorMessage" :error-absolute="errorAbsolute" :slim="slim">

            <!-- LABEL SLOT -->
            <template #label>
                <slot name="label"/>
            </template>
            <template #description>
                <slot name="description"/>
            </template>

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
                        :disabled="disabled"
                        :readonly="readonly"
                        @input="handleInput"
                        @blur="handleBlur"
                        class="peer wh-full bg-transparent text-right outline-none placeholder:text-TBD-bg-light mt-px transition-300"
                        :class="[slim ? 'pr-6' : '-mb-px pr-9']"
                    />

                    <!-- ARROWS -->
                    <div class="absolute right-0 pt-px flex flex-col items-end justify-center transition-300"
                        :class="[
                            {'pointer-events-none': disabled || readonly},
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
    </div>
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
