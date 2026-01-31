<script setup lang="ts">
    const props = defineProps({
        image: { type: String, required: true },
    });

    const imageSize = ref<{ width: number; height: number } | null>(null);
    const isPixelArt = computed(() => {
        if (!imageSize.value) return false;
        return imageSize.value.width <= 128 && imageSize.value.height <= 128;
    });

    const imageClasses = computed(() => {
        return isPixelArt.value ? 'pixelated' : 'smooth';
    });

    const loadImageSize = () => {
        const img = new Image();
        img.onload = () => {
            imageSize.value = { width: img.width, height: img.height };
        };
        img.src = props.image;
    };

    watchEffect(() => {
        if (props.image) {
            loadImageSize();
        }
    });
</script>
<template>
    <div class="min-h-20 h-20 aspect-square input-bg pointer-events-none rounded-md input-ring 
        bg-no-repeat bg-contain bg-center"
        :class="imageClasses"
        :style="`background-image: url('${props.image}');`">
    </div>
</template>