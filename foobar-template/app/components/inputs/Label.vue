<script setup lang="ts">
const props = defineProps({
	label: { type: String, default: " " },
	description: { type: String, default: " " },
	required: { type: Boolean, default: false },
});
</script>

<template>
	<div v-if="label != ' ' || description != ' '" class="font-bold relative">
		{{ label }} <span v-if="required && label != ' ' && label" class="relative text-TBD-error-light -top-1"><span class="text-lg absolute">*</span></span>
		<div v-if="description != ' ' && description" class="relative top-1 font-normal opacity-75">
			{{ description }}
			<span v-if="required && (label == ' ' || !label)" class="relative text-TBD-error-light -top-1"><span class="text-lg absolute">*</span></span>
		</div>
		<slot />
	</div>
</template>
