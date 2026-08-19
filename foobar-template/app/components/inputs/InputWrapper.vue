<script setup lang="ts">
    const props = defineProps({
        required:      { type: Boolean, default: false },       // marks field as required
        label:         { type: String, default: "" },           // label text above input
        description:   { type: String, default: "" },           // optional helper text under label
        slim:          { type: Boolean, default: false },       // compact input variant
        errorMessage:  { type: String, default: "" },           // validation error message
        errorAbsolute: { type: Boolean, default: false },       // error message positioning mode
    });
</script>

<template>
    <div class="relative flex flex-col" 
        :class="[ 
            {'text-xs' : slim},
            {'gap-2' : label != ' ' && label}
        ]">

        <!-- LABEL -->
        <InputsLabel :label="label" :description="description" :required="required" :slim="slim">
            <template #label> <slot name="label"/> </template>
            <template #description> <slot name="description"/> </template>
        </InputsLabel>

        <slot name="input"/>

        <!-- ERROR MESSAGE -->
        <InputsErrorMessage :errorAbsolute="errorAbsolute" :error-message="errorMessage" :slim="slim"/>

    </div>
</template>