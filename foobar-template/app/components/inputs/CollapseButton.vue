<script setup lang="ts">
    const props = defineProps({
        // v-model value
        modelValue: { type: Boolean, default: false, required: false },

        // disabled state
        disabled: { type: Boolean, default: false, required: false },

        // icon rotation options
        rotate:        { type: Boolean, default: false, required: false }, // rotates icon 90 degrees
        flip:          { type: Boolean, default: false, required: false }, // flips icon 180 degrees

        // wrapper styling
        wrapperClasses:         { type: String,  default: "",    required: false }, // custom border radius classes
        butttonClasses:         { type: String,  default: "",    required: false }, // custom button classes
    });

    // Vue v-model emit definition
    const emit = defineEmits<{
        (e: 'update:modelValue', value: boolean): void;
    }>();

    // Central update function
    const update = function (value: boolean) {
        if (!props.disabled) emit('update:modelValue', value);
    };
</script>

<template>
    <!-- TOGGLE WRAPPER -->
    <div @click="update(!modelValue)"
        class="relative flex-center cursor-pointer z-50 transition-500 ease-out"
        :class="[
            wrapperClasses,

            // disabled state
            { 'opacity-50 cursor-not-allowed' : disabled },
            // optional rotation
            rotate ? 'w-full min-h-3 h-3' : 'h-full min-w-3 w-3',
        ]">


        <!-- TOGGLE BUTTON -->
        <div class="group absolute flex-center-full bg-TBD-bg-light dark:bg-TBD-bg-dark 
            hover:bg-TBD-primary-light dark:hover:bg-TBD-primary-light/50 -z-10
            text-TBD-text-dark hover:text-TBD-bg-light dark:text-TBD-text-light 
            transition-500 ease-out shadow-dark dark:shadow-light rounded-md"
            :class="butttonClasses">


            <!-- ARROW ICON -->
            <Icon name="material-symbols:arrow-left-rounded"
                :class="[
                    modelValue ? '-scale-x-200' : '',

                    // optional rotation
                    { 'rotate-90' : rotate && !flip },
                    { '-rotate-90' : rotate && flip },
                    { '-rotate-180' : flip && !rotate },
                ]"
                class="scale-200 transition-500 ease-out pointer-events-none"/>

        </div>

    </div>
</template>