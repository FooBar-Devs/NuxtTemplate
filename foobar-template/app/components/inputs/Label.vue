<script setup lang="ts">
    const props = defineProps({
        label:       { type: String, default: " " },    // main label text (space means "empty")
        description: { type: String, default: " " },    // helper/description text
        required:    { type: Boolean, default: false }, // shows required indicator (*)
    });
</script>

<template>
	<div v-if="label != ' ' || description != ' '" class="font-bold relative">

		<!-- MAIN LABEL TEXT -->
		{{ label }}

		<slot name="label"/>

		<!-- REQUIRED MARK (when label exists) -->
		<span v-if="required && label != ' ' && label" 
            class="relative text-TBD-error-light -top-1.5">

			<span class="text-lg absolute">*</span>

		</span>

		<!-- DESCRIPTION / HELPER TEXT -->
		<div v-if="description != ' ' && description" 
            class="relative font-normal opacity-75"
            :class="label != ' ' && label ? 'top-1' : '-top-0.5'">

			{{ description }}

		    <slot name="description"/>

			<!-- REQUIRED MARK (fallback when no label, only description) -->
			<span v-if="required && (label == ' ' || !label)" 
                class="relative text-TBD-error-light -top-1.5">

				<span class="text-lg absolute">*</span>
                
			</span>

		</div>
        
	</div>
</template>