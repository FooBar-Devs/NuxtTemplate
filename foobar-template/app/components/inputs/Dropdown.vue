<script setup lang="ts">
    const themeStore = useThemeStore();
    
    const props = defineProps({
        required: { type: Boolean, default: false },
        name: { type: String, required: true },
        modelValue: { type: [Object, String, Number, Boolean] as PropType<Record<string, any> | string | number | boolean | null>, required: false, default: "" },
        labelName: { type: String, default: null },
        emitName: { type: String, default: null },
        list: {
            type: Array as () => Array<{ name: any; value: string | any } | any>,
            default: () => [
                { name: 'one', value: '1' },
                { name: 'two', value: '2' },
                { name: 'three', value: '3' },
                { name: 'four', value: '4' },
            ],
        },
        label: { type: String, default: " " },
        description: { type: String, default: " " },
        inputClass: { type: String, default: "" },
        icon: { type: String, default: " " },
        showEmitted: { type: Boolean, default: false },
        height: { type: Number, default: 48 },
        ring: { type: String, default: "" },
        itemClass: { type: String, default: "" },
        listClass: { type: String, default: "" },
        placeholder: { type: String, default: "" },
        onlyPlaceholder: { type: Boolean, default: false },
        showItemsAmount: { type: Number, default: 3 },
        slim: { type: Boolean, default: false },
        showSelectedHighlight: { type: Boolean, default: true },
        errorAbsolute: { type: Boolean, default: false },
        hideDefaultLabel: { type: Boolean, default: false },
        dropdownItemHeight: { type: Number, default: 0 },
        dropdownHeight: { type: Number, default: 0 }
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

    const selected = ref<Record<string, any> | string | number | boolean | null>();
    const inputRef = ref<HTMLElement | null>(null);
    const show = ref(false);
    const canSet = ref(true);
    const focus = ref(false);
    const isBelow = ref(false);
    const isOverflowVisible = ref(false);
    const dropdownStyles = ref({ top: '0px', left: '0px', width: '0px' });
    const inputField = ref();

    // VALUE UPDATE
    const handleInput = (event: Event) => {
        handleChange(event);
        const input = event.target as HTMLInputElement;
        update(input.value);
    };

    const emit = defineEmits<{
        (e: 'update:modelValue', value: string | Record<string, any>): void;
        (e: 'itemSelected', value: string | Record<string, any>): void;
    }>();

    function update(value: Record<string, any> | string | number | boolean) {
        inputValue.value = value;
        const newValue = props.emitName && typeof value === 'object' ? value[props.emitName] : value;   
        selected.value = value;        
        emit('update:modelValue', newValue);
    }

    const dropdownHeightCalculated = computed(() => {
        if (props.dropdownItemHeight == 0)
            return (props.slim && props.height == 48 ? 28 :props. height) * Math.min(props.list.length, props.showItemsAmount);
        else return props.dropdownItemHeight * Math.min(props.list.length, props.showItemsAmount) + props.dropdownHeight;
    });

    // UPDATING DROPDOWN POSITION
    function calculateDropdownPosition() {
        if (inputRef.value) {
            const rect = inputRef.value.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const spaceBelow = windowHeight - rect.bottom;
            const spaceAbove = rect.top;

            let topPosition;
            isBelow.value = spaceBelow >= dropdownHeightCalculated.value + 6 || spaceBelow >= spaceAbove
            if (isBelow.value) {
                topPosition = rect.bottom + window.scrollY;
            } else {
                topPosition = rect.top;
            }

            const maxTop = window.scrollY; // Top of the viewport
            const minTop = window.scrollY + windowHeight; // Bottom of the viewport
            topPosition = Math.max(maxTop, Math.min(topPosition, minTop));

            dropdownStyles.value = {
                top: `${topPosition}px`,
                left: `${rect.left + window.scrollX}px`,
                width: `${rect.width}px`,
            };
        }
    }

    watch(() => props.list,
        () => {
            selected.value = props.list.find((obj) => {                
                if (typeof obj === 'object' && props.emitName!=null) return STRINGIFY(obj[props.emitName]) == STRINGIFY(props.modelValue);
                return STRINGIFY(obj) == STRINGIFY(props.modelValue);
            });
            if (props.showSelectedHighlight) emit('itemSelected', props.modelValue as string | Record<string, any>);
        }, { deep: true }
    );

    watch(() => props.modelValue,
        () => {
            selected.value = props.list.find((obj) => {                
                if (typeof obj === 'object' && props.emitName!=null) return STRINGIFY(obj[props.emitName]) == STRINGIFY(props.modelValue);
                return STRINGIFY(obj) == STRINGIFY(props.modelValue);
            });
            if (props.showSelectedHighlight) emit('itemSelected', props.modelValue as string | Record<string, any>);
        }, { deep: true }
    );

    watch(show, (isVisible) => {
        if (isVisible) {
            calculateDropdownPosition();
            setTimeout(() => {
                isOverflowVisible.value = true;
            }, 300);
        } else {
            isOverflowVisible.value = false;
        }
    });

    onMounted(() => {
        window.addEventListener('resize', calculateDropdownPosition);
        window.addEventListener('scroll', calculateDropdownPosition, true);
        selected.value = props.list.find((obj) => {            
            if (typeof obj === 'object' && props.emitName!=null) return STRINGIFY(obj[props.emitName]) == STRINGIFY(props.modelValue); 
            return STRINGIFY(obj) == STRINGIFY(props.modelValue);            
        });      
        if (props.showSelectedHighlight) emit('itemSelected', props.modelValue as string | Record<string, any>);
    });

    async function setShow(value: boolean = !show.value, label?: string) {
        if (!canSet.value) return;
        if (!value && !show.value) return;
        
        show.value = value;
        canSet.value = false;
        
        await new Promise((resolve) => setTimeout(resolve, 300));
        canSet.value = true;
    }

    const displayValue = computed(() => {
        if (props.list.length === 0) return 'Prazna lista';
        if (props.placeholder && (!selected.value || props.onlyPlaceholder)) return props.placeholder;

        const key = props.showEmitted ? props.emitName : props.labelName;
        
        if (key && typeof selected.value === 'object' && selected.value !== null) {
            return (selected.value as Record<string, any>)[key];
        }
        
        if (key && typeof inputValue.value === 'object' && inputValue.value !== null) {
            return (inputValue.value as Record<string, any>)[key];
        }

        return selected.value ?? inputValue.value;
    });
    defineExpose({ calculateDropdownPosition });
</script>

<template>
    <div class="relative flex flex-col w-full group" :class="[{'text-xs' : slim}, {'gap-2' : label != ' '}, {'pointer-events-none opacity-25' : list.length == 0}]">
        
        <!--LABEL-->
        <InputsLabel :label="label" :description="description" :required="required">
            <slot/>
        </InputsLabel>

        <div ref="inputRef" @click="inputField.focus(); setShow(!show, 'div1')" @focusout="!focus ? setShow(false, 'div2') : ''"
            class="relative px-2.5 flex-center-full overflow-hidden transition-300 cursor-pointer rounded-md" :style="'height: '+ (slim && height == 48 ? 28 : height) +'px'"
            :class="[inputClass, ring, slim ? 'gap-1 pl-2' : 'gap-3', show ? 
            errorMessage ? 'focus-within-input-ring-error focus-within-input-text-error' : 'focus-within-input-ring focus-within-input-text' : '', 
            errorMessage ? 'input-ring-error input-text-error input-bg-error' : 'input-ring input-text input-bg']">
            
            <!--ICON---> 
            <div v-if="icon != ''" class="flex-center" :class="slim ? 'text-xl -ml-1' : 'text-2xl'">
                <Icon :name="icon"/>
            </div>

            <!--INPUT---> 
            <div class="relative flex items-center wh-full">
                <input readonly ref="inputField" class="wh-full opacity-0 overflow-hidden peer pointer-events-none" 
                    :name="name" :id="name" :value="inputValue" @blur="handleBlur" @input="handleInput"/>
                <!--INPUT VALUE---> 
                <div class="absolute w-full bg-transparent overflow-x-auto whitespace-nowrap scrollbar-none">
                    {{ 
                        displayValue
                    }}
                </div>
            </div>
            
            <!--EXPAND ICON---> 
            <div class="flex-center text-2xl rotate-90" :class="slim ? '-mr-2' : ''">                    
                <Icon name="material-symbols:chevron-left-rounded" class="transition-scale cursor-pointer"
                    :class="show ? '-scale-100 text-TBD-primary-light dark:text-TBD-primary-dark' : ''"/>
            </div>
        </div>
        
        <!--ERROR---> 
        <InputsErrorMessage :errorAbsolute="errorAbsolute" :error-message="errorMessage"/>

        <!--DROPDOWN-->
        <Teleport to="body">
            <div class="fixed flex z-10" :class="isBelow ? '' : 'items-end'" :style="dropdownStyles">
                <div @mouseleave="focus = false" @mouseenter="focus = true" :style="[
                    show ? 'opacity: 100%; ' + 'height: '+dropdownHeightCalculated+'px' : 'height: 0px; opacity: 0%;']"
                    :class="[isOverflowVisible ? 'overflow-y-auto' : '', themeStore.isDarkMode ? 'dark' : '', isBelow ? 'mt-2' : 'mb-2']"
                    class="w-full backdrop-blur-sm drop-shadow-lg rounded overflow-hidden transition-height_opacity
                        duration-1000 absolute z-50 ring-1 ring-TBD-text-dark/10">
                    
                    <div class="z-50 w-full text-left" :class="listClass">
                        <li v-for="(v, id) in list" @click="setShow(false); update(v); $emit('itemSelected', v)"
                            :key="id" :style="'height: '+(slim && height == 48 ? 28 : height)+'px'"
                            class="flex items-center bg-TBD-bg-light/50 hover:bg-TBD-bg-dark/10 dark:bg-TBD-bg-dark/50 dark:hover:bg-TBD-bg-light/10 input-text cursor-pointer z-50 whitespace-nowrap"
                            :class="[itemClass, slim ? 'px-2 text-xs' : 'px-5 text-sm',
                                JSON.stringify(v) == JSON.stringify(selected) && showSelectedHighlight ? 
                                    'bg-TBD-primary-light/75 dark:bg-TBD-primary-dark/95 text-TBD-text-light dark:text-TBD-text-dark font-bold' : '']">
                                <slot name="item" :item="v" :id="id" :selected="JSON.stringify(v) == JSON.stringify(selected)"/>
                                <span v-if="!hideDefaultLabel">
                                    {{ labelName && typeof v === 'object' ? v[labelName as keyof typeof v] : v }}
                                </span>
                        </li>   
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>