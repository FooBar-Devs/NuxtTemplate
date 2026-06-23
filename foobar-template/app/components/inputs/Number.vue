<script setup lang="ts">
    const props = defineProps({
        required: { type: Boolean, default: false },
        name: { type: String, required: true },
        label: { type: String, default: "" },
        description: { type: String, default: "" },
        icon: { type: String, default: "" },
        modelValue: { type: Number, default: 0 },
        min: {type: Number, default: null, },
        max: { type: Number, default: null, },
        ring: { type: String, default: "" },
        slim: { type: Boolean, default: false },
        width: { type: Number, default: 0 },
        height: { type: Number, default: 0 },
        increment: { type: Number, default: 1 },
        errorAbsolute: { type: Boolean, default: false },
        round: { type: Number, default: 2 },
    });

    const name = toRef(props, 'name');

    const {
        value: inputValue,
        errorMessage,
        handleBlur,
        handleChange,
        meta,
    } = useField(name, undefined, {
        initialValue: props.modelValue,
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
            ? inputValue.value : inputValue.value +  props.increment
            : inputValue.value <= props.min && props.min !== null
            ? inputValue.value
            : inputValue.value -  props.increment;        
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
    
    const handleInput = async (event: Event) => {
        const input = event.target as HTMLInputElement;
        update(Number(input.value));
        handleChange(event);
        await wait(0.01);
    };
    const emit = defineEmits<{ 
        (e: 'update:modelValue', value: number): void; 
        (e: 'watch', value: number): void; 
    }>();
    const inputField = ref();
    function update(value: number) {
        let newValue = Math.round(value * Math.pow(10, props.round)) / Math.pow(10, props.round);
        if (props.max !== null) newValue = Math.min(newValue, props.max);
        if (props.min !== null) newValue = Math.max(newValue, props.min);
        inputValue.value = newValue;
        emit('update:modelValue', newValue);
        emit('watch', newValue);
        inputField.value.value = newValue;
    }

    watch(() => props.modelValue,
        (newValue) => {
            inputValue.value = newValue;
            emit('watch', newValue);
        }
    );

    onMounted(() => { update(props.modelValue); })
</script>

<template>

    <div class="relative flex flex-col gap-2" :class="{'text-xs' : slim}" 
        @wheel.passive.stop="scroll($event)" @wheel.stop.prevent>

        <!--LABEL-->
        <InputsLabel :label="label" :description="description" :required="required">
            <slot/>
        </InputsLabel>

        <div @click="inputField.focus()" class="relative flex-center w-fit gap-3 rounded-md overflow-hidden outline-none transition-300 cursor-text"
            :class="[ring, slim ? 'min-h-7': 'h-12', !errorMessage ? 'input-bg input-ring input-text focus-within-input-ring focus-within-input-text': 
            'input-bg-error input-ring-error input-text-error focus-within-input-ring-error focus-within-input-text-error']" :style="[width!=0 ? 'width: '+width+'px;': '', height!=0 ? 'height: '+height+'px; min-height: 0px;': '']">
            
            <!--ICON---> 
            <div v-if="icon != ''" class="flex-center text-2xl">
                <Icon :name="icon"/>
            </div>

            <!--TEXT INPUT-->
            <input :name="name" :id="name" type="number" ref="inputField" :value="inputValue" @input="handleInput" @blur="handleBlur"
                class="relative right-4.5 text-right peer wh-full bg-transparent outline-none text-TBD-text-dark dark:text-TBD-text-light placeholder:text-TBD-bg-light mt-0.5 transition-300"/>

            <!--ARROWS---> 
            <div class="absolute tr-0 h-full items-end pr-0.5 justify-center flex flex-col gap-1 text-base">
                <Icon name="material-symbols:chevron-left-rounded" class="rotate-90 dark:text-neutral-400 text-neutral-800 -mb-1 dark:hover:text-TBD-primary-dark hover:text-TBD-primary-light/75 cursor-pointer"
                    @mousedown="startUpdate(true)" @mouseleave="exit = true" @mouseout="exit = true" @mouseup="exit = true"/>
                <Icon name="material-symbols:chevron-right-rounded" class="rotate-90 dark:text-neutral-400 text-neutral-800 -mt-1 dark:hover:text-TBD-primary-dark hover:text-TBD-primary-light/75 cursor-pointer"
                    @mousedown="startUpdate(false)" @mouseleave="exit = true" @mouseout="exit = true" @mouseup="exit = true"/>
            </div>

        </div>

        <!--ERROR---> 
        <InputsErrorMessage :errorAbsolute="errorAbsolute" :error-message="errorMessage"/>

    </div>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
    appearance: textfield;
}
</style>
