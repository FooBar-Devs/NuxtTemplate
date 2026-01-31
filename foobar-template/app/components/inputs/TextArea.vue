<script setup lang="ts">
    const props = defineProps({
        required: { type: Boolean, default: false },
        maxlength: { type: Number, default: 300 },
        height: { type: Number, default: -1 },
        name: { type: String, required: true },
        placeholder: { type: String, default: "" },
        label: { type: String, default: "" },
        description: { type: String, default: "" },
        icon: { type: String, default: "" },
        modelValue: { type: String, default: "" },
        ring: { type: String, default: "" },
        onkeypress: { type: Function as PropType<(event: KeyboardEvent) => void> },
        slim: { type: Boolean, default: false },
        errorAbsolute: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
    });

    const name = toRef(props, 'name');

    const {
        value: inputValue,
        errorMessage,
        handleBlur,
        handleChange,
    } = useField(name, undefined, {
        initialValue: props.modelValue,
    });

    const handleInput = (event: Event) => {
        handleChange(event);
        const input = event.target as HTMLInputElement;
        update(input.value);
    };
    const emit = defineEmits<{ (e: 'update:modelValue', value: string): void; }>();
    const update = function (value: string) {         
        emit('update:modelValue', value);
        inputValue.value = value;
    }
    const inputField = ref();

    watch(() => props.modelValue,
        (newValue) => {            
            inputValue.value = newValue;
        }
    );

    defineExpose({ update })
</script>

<template>
    <div class="relative flex flex-col" :class="{'text-xs' : slim, 'gap-2' : label != ' ' && label}">

        <!--LABEL-->
        <InputsLabel :label="label" :description="description" :required="required">
            <slot/>
        </InputsLabel>

        <div @click="inputField.focus()" class="relative flex-center px-2.5 rounded-md overflow-hidden outline-none transition-shadow duration-300 ease-in-out resize-y scrollbar-none"
            :class="[ring, slim ? 'h-7 gap-1.5': 'h-12 gap-3', !errorMessage ? 'input-bg input-ring input-text focus-within-input-ring focus-within-input-text': 
            'input-bg-error input-ring-error input-text-error focus-within-input-ring-error focus-within-input-text-error',
            disabled ? 'opacity-25 cursor-not-allowed' : 'cursor-text']"
            :style="height != -1 ? `height: ${height}px; min-height: ${height}px;` : ''">
            
            <!--ICON---> 
            <div v-if="icon != ''" class="flex-center" :class="slim ? 'text-xl -ml-1' : 'text-2xl'">
                <Icon :name="icon"/>
            </div>

            <!--TEXT INPUT-->
            <textarea :name="name" :id="name" ref="inputField" :value="inputValue" @input="handleInput" @blur="handleBlur" :maxlength="maxlength" @keypress="onkeypress"
                class="peer min-h-full w-full disabled:cursor-not-allowed bg-transparent outline-none text-TBD-text-dark dark:text-TBD-text-light placeholder:text-TBD-bg-light pt-2 transition-300 resize-none" :disabled="disabled"/>

            <!--PLACEHOLDER---> 
            <div v-if="inputValue == ''" class="peer-focus:opacity-0 pointer-events-none absolute top-2 opacity-75 whitespace-nowrap" 
                :class="icon != '' ? slim ? 'left-8' : 'left-12' : 'left-2'">
                {{ placeholder }}
            </div>

        </div>

        <!--ERROR---> 
        <InputsErrorMessage :errorAbsolute="errorAbsolute" :error-message="errorMessage"/>

    </div>
</template>
