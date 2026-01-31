<script setup lang="ts">
    interface Props {
        selectedTheme: ColorTheme;
        hoverVariant: number;
    }

    const props = defineProps<Props>();
    const emit = defineEmits<{
        'update:hoverVariant': [value: number]
    }>();

    const themeStore = useThemeStore();

    const hoverVariantModel = computed({
        get: () => props.hoverVariant,
        set: (value) => emit('update:hoverVariant', value)
    });
</script>

<template>
    <div>
        <p class="font-bold text-lg mt-4"> SLIKE: </p>

        <div class="flex w-full justify-around gap-2">
            <div v-for="variant, j in (['light', 'dark'] as const)" :key="variant"
                class="flex flex-col w-1/2" @click="hoverVariantModel = j">

                <p class="font-bold mt-4 mb-2">
                    {{ variant === 'light' ? 'Svijetla tema' : 'Tamna tema' }}
                </p>

                <div v-for="image, i in selectedTheme.images[variant]" 
                    class="flex flex-col gap-1 items-center px-1 pt-1 pb-3 border dark:border-TBD-bg-light/25 rounded-lg mt-2">
                    
                    <div class="flex w-full gap-1">
                        <InputsText class="w-full" v-model="image.url" slim 
                            :name="themeStore.defaultTheme.name+'_'+variant+'_imageURL_'+i" 
                            placeholder="URL slike..." :maxlength="300"/>
                        
                        <InputsButton @mouseenter="setTooltip('Ukloni sliku')" @mouseleave="setTooltip()"
                            @click="themeStore.deleteImage(variant, i); setTooltip();"
                            slim class="px-0! min-w-7 aspect-square" outline color-outline="error" type="button">
                            <div class="flex-center"> 
                                <Icon class="text-lg" name="material-symbols:delete-outline-rounded"/> 
                            </div>
                        </InputsButton>
                    </div>
                    
                    <div class="flex w-full gap-1">
                        <InputsImagePreview :image="themeStore.getImagePreview(image)"/>
                        <InputsTextArea class="grow w-0!" :height="80" v-model="image.style" 
                            slim name="imageStyle" placeholder="Stil slike..."/>
                    </div>
                </div>

                <InputsButton slim class="min-h-fit py-1 mt-2" type="button" 
                    :disabled="selectedTheme.images[variant].length >= 10"
                    @click="themeStore.addImage(variant)">
                    <span v-if="selectedTheme.images[variant].length < 10">Dodaj sliku </span>
                    <span v-else>Najviše 10 slika po temi</span>
                </InputsButton>
            </div>
        </div>
    </div>
</template>