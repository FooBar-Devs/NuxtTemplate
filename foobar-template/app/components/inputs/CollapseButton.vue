<script setup lang="ts">
    const props = defineProps({
        modelValue: { type: Boolean, default: false },
        disable: { type: Boolean, default: false },
        rotate: { type: Boolean, default: false },
        rotateOther: { type: Boolean, default: false },
        rounded: { type: String, default: "" },
    });

    const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void; }>();
    function update(value: boolean) { 
        if (!props.disable) emit('update:modelValue', value); 
    }
</script>

<template>
    <div @click="update(!modelValue)" class="relative bg-TBD-bg-light dark:bg-TBD-bg-dark t min-w-3 w-3 flex-center cursor-pointer z-50 transition-500 ease-out" :class="rounded">
        <div class="group absolute flex-center-full bg-TBD-bg-light dark:bg-TBD-bg-dark hover:bg-TBD-fipu-blue-default dark:hover:bg-TBD-fipu-blue-default/50 -z-10 
            text-TBD-text-dark hover:text-TBD-bg-light dark:text-TBD-text-light transition-500 ease-out shadow-dark dark:shadow-light" :class="rounded">
            <Icon name="material-symbols:arrow-left-rounded" 
                :class="[modelValue ? '-scale-x-200' : '', {'-rotate-90' : rotate}, {'rotate-90' : rotateOther}]" 
                class="scale-200 transition-500 ease-out pointer-events-none"/>
        </div>
    </div>
</template>