<script setup>
    const props = defineProps({
        errorMessage: {type: String, default: ""},
        errorAbsolute: {type: Boolean, default: false},
    });

    const errorDiv = ref(null);
    const errorDivHeight = ref(0);

    const updateErrorDivHeight = () => {
        if (errorDiv.value) {
            errorDivHeight.value = errorDiv.value.scrollHeight;
        }
    };

    watch(
        () => props.errorMessage,
        async () => {
            await nextTick();
            updateErrorDivHeight();
        }
    );

    onMounted(() => {
        updateErrorDivHeight();
    });
</script>

<template>
    <div v-if="!errorAbsolute" class="overflow-clip ml-1.5 text-TBD-fipu-red-default transition-300 -mb-2"
        :style="{ height: errorMessage ? errorDivHeight + 'px' : '0' }"
        :class="errorMessage ? 'opacity-100' : 'opacity-0'">
        <div ref="errorDiv"> {{ errorMessage }} </div>
    </div>
    
    <div v-else class="absolute -bottom-5 ml-1.5 text-TBD-fipu-red-default" :class="errorMessage ? 'opacity-100' : 'opacity-0'">
        {{ errorMessage }}
    </div>

</template>