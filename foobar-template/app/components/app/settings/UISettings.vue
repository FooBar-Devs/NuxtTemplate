<script setup lang="ts">
    const themeStore = useThemeStore();

    debouncedWatch(
        () => themeStore.uiSettings.radiusSize, async () => {
            document.documentElement.style.setProperty('--color-TBD-radius-ZUZA-scale', themeStore.uiSettings.radiusSize.toString());
        }, 'radiusSize'
    );
</script>

<template>
    <div class="px-4 flex">
        <div class="grow">
            <p class="font-bold text-lg py-2">
                IZBORNIK:
            </p>

            <InputsCheckBox slim v-model="themeStore.uiSettings.fixedSidebar" 
                label="Fiksiraj izbornik" />
            <InputsCheckBox slim v-model="themeStore.uiSettings.showSidebarOnHover"
                label="Prikaži izbornik prijelazom miša" />
            <InputsCheckBox slim v-model="themeStore.uiSettings.showSettingsOnHover"
                label="Prikaži postavke prijelazom miša" />
            
            <p class="font-bold text-lg py-2">
                AKCIJE:
            </p>
            
            <InputsCheckBox slim v-model="themeStore.uiSettings.showQuickActionsOnHover"
                label="Prikaži akcije prijelazom miša" />
            <InputsCheckBox slim v-model="themeStore.uiSettings.showPixelartButton"
                label="Prikaži dugme za pozadinske slike" />
            <InputsCheckBox slim v-model="themeStore.uiSettings.showThemeButton"
                label="Prikaži dugme za temu" />
        </div>

        <div class="grow pr-1">
            <p class="font-bold text-lg py-2">
                EFEKTI:
            </p>                        
                label="Uključi efekt stakla" />
            
            <div class="transition-300"
                :class="themeStore.uiSettings.glassEffect ? 'opacity-100 h-12': 'opacity-0 h-0 pointer-events-none'">
                <InputsLabel label="Jačina efekta stakla" class="-mb-2 ml-1 mt-1" />
                <div class="flex items-center gap-2">
                    <Icon name="material-symbols:refresh-rounded" @click="themeStore.uiSettings.blurStrength = 8"
                        class="text-lg cursor-pointer hover:rotate-15 hover:opacity-75 transition-150 active:hover:rotate-90" 
                        :class="themeStore.uiSettings.blurStrength == 8 ? 'opacity-25 pointer-events-none active:hover:rotate-0' : ''"
                        @mouseenter="setTooltip('Resetiraj na zadanu vrijednost')" @mouseleave="setTooltip()"/>
                    <Slider class="my-4 min-h-2 h-2 w-full self-center tbd-slider"
                        v-model="themeStore.uiSettings.blurStrength" :min="1" :max="100"
                        showTooltip="focus" :merge="1" :lazy="false"/>
                </div>
            </div>
            
            <div class="transition-300">
                <InputsLabel label="Prozirnost elemenata" class="-mb-2 ml-1 mt-1" />
                <div class="flex items-center gap-2">
                    <Icon name="material-symbols:refresh-rounded" @click="themeStore.uiSettings.cardOpacity = 0.25"
                        class="text-lg cursor-pointer hover:rotate-15 hover:opacity-75 transition-150 active:hover:rotate-90" 
                        :class="themeStore.uiSettings.cardOpacity == 0.25 ? 'opacity-25 pointer-events-none active:hover:rotate-0' : ''"
                        @mouseenter="setTooltip('Resetiraj na zadanu vrijednost')" @mouseleave="setTooltip()"/>
                    <Slider class="my-4 min-h-2 h-2 w-full self-center tbd-slider"
                        v-model="themeStore.uiSettings.cardOpacity" :min="0" :max="1"
                        showTooltip="focus" :merge="0.1" :lazy="false" :step="-1"/>
                </div>
            </div>
            
            <div class="transition-300">
                <InputsLabel label="Zaobljenost elemenata" class="-mb-2 ml-1 mt-1" />
                <div class="flex items-center gap-2">
                    <Icon name="material-symbols:refresh-rounded" @click="themeStore.uiSettings.radiusSize = 1"
                        class="text-lg cursor-pointer hover:rotate-15 hover:opacity-75 transition-150 active:hover:rotate-90" 
                        :class="themeStore.uiSettings.radiusSize == 1 ? 'opacity-25 pointer-events-none active:hover:rotate-0' : ''"
                        @mouseenter="setTooltip('Resetiraj na zadanu vrijednost')" @mouseleave="setTooltip()"/>
                    <Slider class="my-4 min-h-2 h-2 w-full self-center tbd-slider"
                        v-model="themeStore.uiSettings.radiusSize" :min="0" :max="4"
                        showTooltip="focus" :merge="1" :lazy="false" :step="-1"/>
                </div>
            </div>
        </div>
    </div>
</template>