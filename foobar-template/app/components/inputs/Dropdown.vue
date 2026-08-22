<script setup lang="ts">

    const themeStore = useThemeStore();

    const props = defineProps({
        // v-model value
        modelValue: { 
            type: [Array, Object, String, Number, Boolean] as PropType<Record<string, any> | string | number | boolean | null | Array<Record<string, any> | string | number | boolean>>, 
            default: "", required: true, 
        },

        // dropdown data
        list: {
            type: Array as () => Array<{ name: any; value: string | any } | any>,
            default: () => ['Option 1', 'Option 2', 'Option 3'],
        },       
        labelName:   { type: String, default: null, required: false },              // object property displayed as label
        emitName:    { type: String, default: null, required: false },              // object property emitted as value
        multiselect: { type: Boolean, default: false, required: false },            // enables multi-select mode

        // input interaction props
        disabled:      { type: Boolean, default: false, required: false },          // disables input interaction
        readonly:      { type: Boolean, default: false, required: false },          // read-only mode (no editing)

        // form field props
        required:        { type: Boolean, default: false,        required: false }, // marks field as required
        name:            { type: String,  default: "nameNeeded", required: true  }, // input name/id (also used for form + validation)
        label:           { type: String,  default: "",           required: false }, // label text above input
        description:     { type: String,  default: "",           required: false }, // helper text under label
        placeholder:     { type: String,  default: "",           required: false }, // placeholder text shown when empty
        errorAbsolute:   { type: Boolean, default: false,        required: false }, // error message positioning mode

        // optional icon & compact mode
        icon:            { type: String, default: "", required: false },            // Iconify icon
        slim:                  { type: Boolean, default: false, required: false },  // compact dropdown variant

        // custom styling props
        inputClass:      { type: String, default: "", required: false },            // custom input classes
        listClass:       { type: String, default: "", required: false },            // custom dropdown list classes
        itemClass:       { type: String, default: "", required: false },            // custom dropdown item classes
        
        // dropdown sizing props
        dropdownHeight:      { type: Number, default: 48, required: false },        // dropdown input/item height
        itemHeight:          { type: Number, default: 0,  required: false },        // custom dropdown height
        showItemsAmount:     { type: Number, default: 3,  required: false },        // maximum visible items

        // dropdown behavior props
        showEmittedValue:      { type: Boolean, default: false, required: false },  // display emitted object value
        showSelectedHighlight: { type: Boolean, default: true,  required: false },  // highlight selected item
        hideDefaultItemLabel:  { type: Boolean, default: false, required: false },  // hide default item label 
        onlyPlaceholder:       { type: Boolean, default: false, required: false },  // always show placeholder instead of selected value
    });

    // reactive reference to field name

    const name = toRef(props, 'name');

    // form field integration (vee-validate useField)

    const {
        value: inputValue,       // reactive dropdown value
        errorMessage,            // validation error message
        handleBlur,              // blur handler for validation
        handleChange,            // change handler for validation sync
        meta,                    // field metadata
    } = useField(name, undefined, {
        initialValue: props.modelValue, // initialize field with v-model value
    });

    const selected = ref<Record<string, any> | string | number | boolean | null | Array<Record<string, any> | string | number | boolean>>(); // currently selected item(s)
    const inputRef = ref<HTMLElement | null>(null);                                 // dropdown input container reference
    const inputField = ref();                                                       // hidden input reference
    const show = ref(false);                                                        // dropdown visibility state
    const focus = ref(false);                                                       // tracks dropdown hover/focus state
    const isBelow = ref(false);                                                     // whether dropdown opens below input
    const isOverflowVisible = ref(false);                                           // enables scrolling after animation
    const dropdownStyles = ref({ top: '0px', left: '0px', width: '0px' });          // dropdown position styles

    // Handles native input event
    const handleInput = (event: Event) => {
        handleChange(event);
        const input = event.target as HTMLInputElement;
        update(input.value);
    };

    // Vue event definitions
    const emit = defineEmits<{
        (e: 'update:modelValue', value: string | number | boolean | Record<string, any> | Array<string | number | boolean | Record<string, any>>): void;
        (e: 'itemSelected', value: string | number | boolean | Record<string, any> | Array<string | number | boolean | Record<string, any>>): void;
    }>();

    function getOptionValue(option: Record<string, any> | string | number | boolean) {
        return props.emitName && typeof option === 'object' && option !== null
            ? option[props.emitName]
            : option;
    }

    function syncSelected(values = props.modelValue) {
        if (props.multiselect) {
            const selectedValues = Array.isArray(values) ? values : [];
            selected.value = props.list.filter((option) =>
                selectedValues.some((value) => STRINGIFY(getOptionValue(option)) == STRINGIFY(value))
            );
            return;
        }

        selected.value = props.list.find((option) =>
            STRINGIFY(getOptionValue(option)) == STRINGIFY(props.modelValue)
        );
    }

    // Central update function (syncs local + parent state)
    function update(value: Record<string, any> | string | number | boolean) {
        const newValue = getOptionValue(value);

        if (props.multiselect) {
            const currentValues = Array.isArray(inputValue.value) ? [...inputValue.value] : [];
            const selectedIndex = currentValues.findIndex((item) =>
                STRINGIFY(item) == STRINGIFY(newValue)
            );

            if (selectedIndex === -1)
                currentValues.push(newValue);
            else
                currentValues.splice(selectedIndex, 1);

            inputValue.value = currentValues;
            syncSelected(currentValues);
            emit('update:modelValue', currentValues);
            return;
        }

        inputValue.value = value;
        selected.value = value;
        emit('update:modelValue', newValue);
    }

    function selectItem(value: Record<string, any> | string | number | boolean) {
        update(value);
        emit('itemSelected', value);

        if (!props.multiselect)
            setShow(false);
    }

    function isSelected(value: Record<string, any> | string | number | boolean) {
        if (props.multiselect)
            return Array.isArray(selected.value) && selected.value.some((item) =>
                STRINGIFY(getOptionValue(item)) == STRINGIFY(getOptionValue(value))
            );

        return STRINGIFY(getOptionValue(value)) == STRINGIFY(getOptionValue(selected.value as Record<string, any> | string | number | boolean));
    }

    // Calculates the dropdown height based on visible item count
    const dropdownHeightCalculated = computed(() => {
        if (props.itemHeight == 0)
            return (props.slim && props.dropdownHeight == 48 ? 28 : props.dropdownHeight)
                * Math.min(props.list.length, props.showItemsAmount);

        return props.itemHeight * Math.min(props.list.length, props.showItemsAmount)
    });

    // Calculates dropdown position relative to the input
    function calculateDropdownPosition() {
        if (!inputRef.value) return;

        const rect = inputRef.value.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const spaceBelow = windowHeight - rect.bottom;
        const spaceAbove = rect.top;

        isBelow.value =
            spaceBelow >= dropdownHeightCalculated.value + 6 ||
            spaceBelow >= spaceAbove;

        const topPosition = isBelow.value
            ? rect.bottom + window.scrollY
            : rect.top;

        const maxTop = window.scrollY;
        const minTop = window.scrollY + windowHeight;

        const top = Math.max(maxTop, Math.min(topPosition, minTop));

        dropdownStyles.value = {
            top: `${top}px`,
            left: `${rect.left + window.scrollX}px`,
            width: `${rect.width}px`,
        };
    }

    // Updates selected item when the dropdown list changes
    watch(() => props.list, () => {
        syncSelected();

        if (props.showSelectedHighlight)
            emit('itemSelected', props.modelValue as string | Record<string, any>);
    }, { deep: true });

    // Updates selected item when the v-model value changes
    watch(() => props.modelValue, () => {
        inputValue.value = props.modelValue;
        syncSelected();

        if (props.showSelectedHighlight)
            emit('itemSelected', props.modelValue as string | Record<string, any>);
    }, { deep: true });

    // Updates dropdown positioning and overflow state when visibility changes
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

    // Initialize dropdown listeners and selected value
    onMounted(() => {
        window.addEventListener('resize', calculateDropdownPosition);
        window.addEventListener('scroll', calculateDropdownPosition, true);

        syncSelected();

        if (props.showSelectedHighlight)
            emit('itemSelected', props.modelValue as string | Record<string, any>);
    });

    // Controls dropdown visibility with transition delay
    async function setShow(value: boolean = !show.value, label?: string) {
        if (!value && !show.value) return;

        show.value = value;
    }

    // Computes the value displayed inside the dropdown
    const displayValue = computed(() => {
        if (props.list.length === 0) return 'Prazna lista';

        if (props.placeholder && ((!selected.value || (Array.isArray(selected.value) && selected.value.length === 0)) || props.onlyPlaceholder))
            return props.placeholder;

        const key = props.showEmittedValue ? props.emitName : props.labelName;

        if (Array.isArray(selected.value))
            return selected.value.map((item) =>
                key && typeof item === 'object' && item !== null ? item[key] : item
            ).join(', ');

        if (key && typeof selected.value === 'object' && selected.value !== null)
            return (selected.value as Record<string, any>)[key];

        if (key && typeof inputValue.value === 'object' && inputValue.value !== null)
            return (inputValue.value as Record<string, any>)[key];

        return selected.value ?? inputValue.value;
    });

    // Expose dropdown positioning method to parent components
    defineExpose({ calculateDropdownPosition });

</script>

<template>
    <div class="relative flex flex-col w-full group"
        :class="[
            { 'text-xs': slim },
            { 'gap-2': label != ' ' },
            { 'pointer-events-none opacity-25': list.length == 0 },
        ]">

        <InputsInputWrapper :label="label" :description="description" :required="required"
            :error-message="errorMessage" :error-absolute="errorAbsolute" :slim="slim">

            <!-- LABEL SLOT -->
            <template #label> <slot name="label"/> </template>
            <template #description> <slot name="description"/> </template>

            <!-- INPUT SLOT -->
            <template #input>
                <div ref="inputRef" @focusout="!focus ? setShow(false, 'div2') : ''"
                    @mousedown.prevent="
                        if (!disabled) {
                            setShow(!show);
                            inputField.focus();
                        }"                    
                    :style="'height: ' + (slim && dropdownHeight == 48 ? 28 : dropdownHeight) + 'px'"
                    class="relative px-2.5 flex-center-full overflow-hidden transition-300 cursor-pointer rounded-md"
                    :class="[
                        inputClass,
                        slim ? 'gap-1 pl-2' : 'gap-3',
                        show ? errorMessage
                                ? 'focus-within-input-ring-error focus-within-input-text-error'
                                : 'focus-within-input-ring focus-within-input-text'
                            : '',
                        errorMessage
                            ? 'input-ring-error input-text-error input-bg-error'
                            : 'input-ring input-text input-bg',

                        // disabled state opacity
                        { 'opacity-25' : disabled }, 

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

                    <!-- HIDDEN INPUT FIELD -->
                    <div class="relative flex items-center wh-full">
                        <input readonly ref="inputField" :name="name" :id="name" :value="inputValue"
                            @blur="handleBlur" @input="handleInput"
                            :disabled="disabled"
                            class="wh-full opacity-0 overflow-hidden peer pointer-events-none"/>

                        <!-- DISPLAY VALUE -->
                        <div class="absolute w-full bg-transparent overflow-x-auto whitespace-nowrap scrollbar-none">
                            {{ displayValue }}
                        </div>
                    </div>

                    <!-- EXPAND ICON -->
                    <div class="flex-center text-2xl rotate-90"
                        :class="slim ? '-mr-2' : ''">
                        <Icon name="material-symbols:chevron-left-rounded" class="transition-scale cursor-pointer"
                            :class="show ? '-scale-100 text-TBD-primary-light dark:text-TBD-primary-dark' : ''"/>
                    </div>
                </div>
            </template>
        </InputsInputWrapper>

        <!-- DROPDOWN -->
        <Teleport to="body">
            <div class="fixed flex z-10" :class="isBelow ? '' : 'items-end'" :style="dropdownStyles">

                <div @mouseleave="focus = false" @mouseenter="focus = true"
                    :style="[
                        show
                            ? 'opacity: 100%; height: ' + dropdownHeightCalculated + 'px'
                            : 'height: 0px; opacity: 0%;',
                    ]"
                    :class="[
                        isOverflowVisible ? 'overflow-y-auto' : '',
                        themeStore.isDarkMode ? 'dark' : '',
                        isBelow ? 'mt-2' : 'mb-2',
                    ]"
                    class="w-full backdrop-blur-sm drop-shadow-lg rounded overflow-hidden transition-height_opacity 
                        duration-1000 absolute z-50 ring-1 ring-TBD-text-dark/10">

                    <div class="z-50 w-full text-left" 
                        :class="[
                            listClass,

                            // disabled state opacity
                            { 'opacity-25' : disabled }, 

                            // readonly visual state
                            { 'opacity-50' : readonly && !disabled },

                            // disable cursor for all children when disabled
                            { 'cursor-not-allowed *:cursor-not-allowed' : disabled && !readonly },
                        ]">

                        <!-- DROPDOWN ITEMS -->
                        <li v-for="(v, id) in list" :key="id"
                            @click="disabled || readonly ? null : (selectItem(v), inputField.focus())"
                            :style="'height: ' + (slim && dropdownHeight == 48 ? 28 : dropdownHeight) + 'px'"
                            class="flex items-center cursor-pointer z-50 whitespace-nowrap transition-100"
                            :class="[
                                itemClass,
                                slim ? 'px-2 text-xs' : 'px-5 text-sm',

                                isSelected(v) && showSelectedHighlight
                                    ? [
                                        `bg-TBD-primary-light dark:bg-TBD-primary-dark font-bold
                                        text-TBD-text-light dark:text-TBD-text-dark`,

                                        { 'pointer-events-none': !multiselect },

                                        multiselect
                                            ? `hover:bg-TBD-primary-light/75 dark:hover:bg-TBD-primary-dark/75`
                                            : '',
                                    ]
                                    : disabled || readonly
                                        ? `bg-TBD-bg-light/60 dark:bg-TBD-bg-dark/60
                                        text-TBD-text-dark/75 dark:text-TBD-text-light/75 pointer-events-none`
                                        : `bg-TBD-bg-light/60 dark:bg-TBD-bg-dark/60
                                        hover:bg-TBD-primary-light/60 dark:hover:bg-TBD-primary-dark/60
                                        text-TBD-text-dark/75 dark:text-TBD-text-light/75
                                        hover:text-TBD-text-light dark:hover:text-TBD-text-dark`,
                            ]"

                            <!-- CUSTOM ITEM SLOT -->
                            <slot name="item" :item="v" :id="id"
                                :selected="isSelected(v)"/>

                            <!-- DEFAULT ITEM LABEL -->
                            <span v-if="!hideDefaultItemLabel">
                                {{ labelName && typeof v === 'object' ? v[labelName as keyof typeof v] : v }}
                            </span>

                        </li>

                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>