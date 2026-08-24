<script setup lang="ts">
    const themeStore = useThemeStore();

    interface Props {
        selectedTheme: ColorTheme;
    }

    const props = defineProps<Props>();
</script>

<template>
    <div>
        <p class="font-bold text-lg mt-4"> BOJE: </p>

        <div class="flex w-full justify-around gap-2">
            <div v-for="variant, j in (['light', 'dark'] as const)" :key="variant"
                class="flex flex-col w-1/2 gap-1">

                <p class="font-bold mb-2 sticky top-8 z-1 py-1 text-center bg-TBD-bg-light dark:bg-TBD-bg-dark rounded border border-TBD-bg-dark/25 dark:border-TBD-bg-light/25">
                    {{ variant === 'light' ? 'Svijetla tema' : 'Tamna tema' }}
                </p>

                <div v-for="color, i in selectedTheme.colors[variant]" :key="color.property"
                    class="flex items-center gap-1">
                    
                    <Icon name="material-symbols:refresh-rounded" @click="themeStore.resetColor(variant, color.property)"
                        class="text-lg cursor-pointer hover:rotate-15 hover:opacity-75 transition-150 active:hover:rotate-90" 
                        :class="themeStore.getDefaultColorValue(variant, color.property).value == color.value ? 'opacity-25 pointer-events-none active:hover:rotate-0' : ''"
                        @mouseenter="setTooltip('Resetiraj boju')" @mouseleave="setTooltip()"/>

                    <InputsColor v-model="color.value" :name="`${color.property}_${i}_${j}`" :showPickerMode="false"
                        :mode="i === 0 ? 'gradient' : 'solid'" :show-alpha="i === 0" :label="color.name"/>
                        
                </div>
            </div>
        </div>
    </div>
</template>