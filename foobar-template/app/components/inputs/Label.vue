<script setup lang="ts">
    const props = defineProps({
        label:       { type: String, default: " " },    // main label text (space means "empty")
        description: { type: String, default: " " },    // helper/description text
        required:    { type: Boolean, default: false }, // shows required indicator (*)
        slim:        { type: Boolean, default: false }, // compact input variant
    });
</script>

<template>
	<div v-if="label != ' ' || description != ' '" class="font-bold relative transition-300">

		<!-- MAIN LABEL TEXT -->
		{{ label }}

		<slot name="label"/>

		<!-- REQUIRED MARK (when label exists) -->
		<span v-if="required && label != ' ' && label" 
            class="relative text-TBD-error-light dark:text-TBD-error-dark transition-300"
            :class="slim ? '-top-1.75' : '-top-1.5'">

			<span class="text-lg absolute transition-300">*</span>

		</span>

		<!-- DESCRIPTION / HELPER TEXT -->
		<div v-if="description != ' ' && description" 
            class="relative font-normal opacity-75 transition-300"
            :class="label != ' ' && label ? 'top-0.75' : '-top-0.75'">

			{{ description }}

			<slot name="description"/>

			<!-- REQUIRED MARK (fallback when no label, only description) -->
			<span v-if="required && (label == ' ' || !label)" 
                class="relative text-TBD-error-light dark:text-TBD-error-dark transition-300"
                :class="slim ? '-top-1.75' : '-top-1.25'">

				<span class="text-lg absolute transition-300">*</span>
                
			</span>

		</div>
        
	</div>
</template>