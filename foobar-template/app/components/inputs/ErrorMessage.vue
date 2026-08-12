<script setup>
    const props = defineProps({
        errorMessage:  { type: String, default: "" },     // validation/error text to display
        errorAbsolute: { type: Boolean, default: false }, // switch between layout modes
        slim:          { type: Boolean, default: false }, // compact layout adjustment
    });

    // Reference to the DOM element containing error text
    const errorDiv = ref(null);

    // Stores computed height of error content for smooth expand/collapse animation
    const errorDivHeight = ref(0);

    // Measures actual rendered height of error text
    const updateErrorDivHeight = () => {
        if (errorDiv.value) {
            // scrollHeight gives full content height even if hidden
            errorDivHeight.value = errorDiv.value.scrollHeight;
        }
    };

    // Recalculate height whenever error message changes
    watch(
        () => props.errorMessage,
        async () => {
            await nextTick();       // wait for DOM update before measuring
            updateErrorDivHeight(); // update stored height for animation
        }
    );

    // Initial measurement after component mounts
    onMounted(() => {
        updateErrorDivHeight();
    });
</script>

<template>

    <!-- NON-ABSOLUTE ERROR MODE (pushes layout, animated height) -->
    <div v-if="!errorAbsolute" 
        class="overflow-clip ml-1.5 text-TBD-error-light dark:text-TBD-error-dark transition-300 -mb-2"
        :style="{ height: errorMessage ? errorDivHeight + 'px' : '0' }"
        :class="errorMessage ? 'opacity-100' : 'opacity-0'">

        <!-- Hidden measurement container (used for height calculation) -->
        <div ref="errorDiv"> {{ errorMessage }} </div>
        
    </div>
    
    <!-- ABSOLUTE ERROR MODE -->
    <div v-else class="absolute ml-1.5 text-TBD-error-light dark:text-TBD-error-dark" 
        :class="[
            errorMessage ? 'opacity-100' : 'opacity-0',

            // vertical positioning depending on input size variant
            slim ? '-bottom-6' : '-bottom-8',
        ]">

        {{ errorMessage }}

    </div>

</template>