<script setup lang="ts">
    const props = defineProps({
        // image source
        image: { type: String, default: null, required: true },

        // optional class for the image element
        imageClass: { type: String, default: '', required: false },

        // optional background rendering mode
        background: { type: Boolean, default: false, required: false },

        // pixel-art detection threshold
        pixelThreshold: { type: Number, default: 128, required: false },
    });


    // reactive reference to image dimensions
    const imageSize = ref<{ width: number; height: number } | null>(null);

    // tracks whether the image failed to load
    const imageError = ref(false);


    // Determines whether the image should use pixel-art rendering
    const isPixelArt = computed(() => {
        if (!imageSize.value) return false;

        return imageSize.value.width <= props.pixelThreshold
            && imageSize.value.height <= props.pixelThreshold;
    });


    // Handles image loading errors
    const handleImageError = () => {
        imageError.value = true;
        imageSize.value = null;
    };


    // Loads image and determines its dimensions
    const loadImageSize = () => {
        imageError.value = false;
        imageSize.value = null;

        if (!props.image) {
            imageError.value = true;
            return;
        }

        const img = new Image();

        img.onload = () => {
            imageSize.value = {
                width: img.width,
                height: img.height,
            };
        };

        img.onerror = handleImageError;
        img.src = props.image;
    };


    // Reload image whenever the source or threshold changes
    watch(
        () => [props.image, props.pixelThreshold],
        loadImageSize,
        { immediate: true }
    );
</script>

<template>
    <!-- IMAGE PREVIEW -->
    <div class="relative flex-center overflow-hidden rounded-md">

        <!-- IMAGE ERROR -->
        <div v-if="imageError"
            class="wh-full flex-center input-bg input-ring rounded-md opacity-50">
            <Icon name="tabler:photo-off" class="text-2xl"/>
        </div>

        <!-- IMAGE -->
        <img v-else-if="background"
            class="absolute wh-full input-bg input-ring object-contain object-center rounded-md"
            :class="[isPixelArt ? 'pixelated' : 'smooth', imageClass]"
            :src="image"
            @error="handleImageError"/>

        <!-- BACKGROUND IMAGE -->
        <div v-else
            class="input-bg input-ring relative wh-full flex-center overflow-hidden rounded-md bg-contain bg-center bg-no-repeat"
            :class="[isPixelArt ? 'pixelated' : 'smooth', imageClass]"
            :style="`background-image: url('${image}');`">
        </div>

    </div>
</template>