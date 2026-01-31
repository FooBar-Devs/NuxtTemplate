<script setup lang="ts">
    const props = defineProps({
        title: { type: String, default: "" },
        label: { type: String, required: true },
        modelValue: { type: Boolean, default: false },
        required: { type: Boolean, default: false },
        warning: { type: Boolean, default: false },
        slim: { type: Boolean, default: false },
        hideLabel: { type: Boolean, default: false },
        description: { type: String, default: "" },
    });

    const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void; }>();
    function update(value: boolean) { emit('update:modelValue', value); }
</script>

<template>
    <div class="flex flex-col justify-center grow" :class="slim ? 'text-xs' : 'mt-7'">
            
        <!--LABEL-->
        <InputsLabel :label="title" :description="description"/>

        <div class="inline-flex items-center" :class="slim ? 'gap-1' : 'gap-2'">

            <label class="relative flex items-center justify-center p-1 rounded-full cursor-pointer group peer" :for="label">
                <input type="checkbox" :checked="modelValue" @change="update(($event.target as HTMLInputElement).checked)" :id="label"
                    :class="[warning && !modelValue ? 'input-ring-error bg-TBD-error-light/25 dark:bg-TBD-error-light/10' : 'input-ring bg-TBD-bg-light dark:bg-TBD-bg-dark/25',
                        slim ? 'h-4' : 'h-6']" class="relative peer aspect-square cursor-pointer appearance-none rounded transition-300
                        checked:ring-TBD-primary-light dark:checked:ring-TBD-primary-dark checked:hover:ring-TBD-text-dark dark:checked:hover:ring-TBD-text-light
                        checked:bg-TBD-primary-light dark:checked:bg-TBD-primary-dark/75"/>
                <Icon name="material-symbols:check-rounded" :class="slim ? ' text-lg' : ' text-2xl'"
                    class="peer-not-checked:scale-0 peer-not-checked:opacity-0 transition-300 absolute pointer-events-none text-TBD-text-light dark:text-TBD-text-dark"/>
            </label>

            <label v-if="!hideLabel" :class="[warning && !modelValue ? 'text-TBD-error-light' : 'text-TBD-text-dark dark:text-TBD-text-light',
                slim ? 'text-xs' : '']" class="relative cursor-pointer select-none" :for="label">
                {{ label }} <span v-if="required" class="relative text-TBD-error-light -top-1"><span class="text-lg absolute">*</span></span>
            </label>

            <div @click="$emit('update:modelValue', !modelValue)">
                <slot/>
            </div>
            
        </div>
    </div>
</template> 