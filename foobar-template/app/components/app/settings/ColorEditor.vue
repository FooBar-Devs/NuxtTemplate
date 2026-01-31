<script setup lang="ts">
    const themeStore = useThemeStore();

    interface Props {
        selectedTheme: ColorTheme;
        hoverColor: number;
        hoverVariant: number;
    }

    const props = defineProps<Props>();
    const emit = defineEmits<{
        'update:hoverColor': [value: number]
        'update:hoverVariant': [value: number]
    }>();

    const hoverColorModel = computed({
        get: () => props.hoverColor,
        set: (value) => emit('update:hoverColor', value)
    });

    const hoverVariantModel = computed({
        get: () => props.hoverVariant,
        set: (value) => emit('update:hoverVariant', value)
    });
</script>

<template>
    <div>
        <p class="font-bold text-lg mt-4"> BOJE: </p>

        <div class="flex w-full justify-around gap-2">
            <div v-for="variant, j in (['light', 'dark'] as const)" :key="variant"
                class="flex flex-col gap-1" @click="hoverVariantModel = j">

                <p class="font-bold mt-4 mb-2">
                    {{ variant === 'light' ? 'Svijetla tema' : 'Tamna tema' }}
                </p>

                <div v-for="color, i in selectedTheme.colors[variant]" :key="color.property"
                    class="flex items-center gap-1">
                    
                    <Icon name="material-symbols:refresh-rounded" @click="themeStore.resetColor(variant, color.property)"
                        class="text-lg cursor-pointer hover:rotate-15 hover:opacity-75 transition-150 active:hover:rotate-90" 
                        :class="themeStore.getDefaultColorValue(variant, color.property).value == color.value ? 'opacity-25 pointer-events-none active:hover:rotate-0' : ''"
                        @mouseenter="setTooltip('Resetiraj boju')" @mouseleave="setTooltip()"/>

                    <InputsColor :i="i" :j="j" :hoverColor="hoverColor"
                        @clickColor="hoverColorModel = i; themeStore.uiSettings.showSettingsOnHover = false; themeStore.uiSettings.showSidebarOnHover = false;"
                        :hoverVariant="hoverVariant" v-model="color.value" :property="color.property" 
                        @leaveColorPicker="hoverColorModel = -1;"/>

                    <label :for="color.property" :class="i==hoverColor && hoverVariant==j ? 'underline text-TBD-primary-light dark:text-TBD-primary-dark' : ''">
                        {{ color.name }}
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>