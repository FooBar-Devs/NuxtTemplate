<script setup lang="ts">
    const themeStore = useThemeStore();

    debouncedWatch(
        () => themeStore.uiSettings.radiusSize, async () => {
            document.documentElement.style.setProperty('--color-TBD-radius-TBD-scale', themeStore.uiSettings.radiusSize.toString());
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
            
            <InputsCheckBox slim v-model="themeStore.uiSettings.glassEffect"
                label="Uključi efekt stakla" />
            
            <div class="transition-300"
                :class="themeStore.uiSettings.glassEffect ? 'opacity-100 h-8': 'opacity-0 h-0 pointer-events-none'">
                <InputsLabel label="Jačina efekta stakla" class="-mb-2 ml-1 mt-1" />
                <Slider class="my-4 min-h-2 h-2 w-full self-center tbd-slider"
                    v-model="themeStore.uiSettings.blurStrength" :min="1" :max="100"
                    showTooltip="focus" :merge="1" :lazy="false"/>
            </div>
            
            <div class="transition-300 mt-2">
                <InputsLabel label="Prozirnost kartica" class="-mb-2 ml-1 mt-1" />
                <Slider class="my-4 min-h-2 h-2 w-full self-center tbd-slider"
                    v-model="themeStore.uiSettings.cardOpacity" :min="0" :max="1"
                    showTooltip="focus" :merge="0.1" :lazy="false" :step="-1"/>
            </div>
            
            <div class="transition-300 mt-2">
                <InputsLabel label="Zaobljenost" class="-mb-2 ml-1 mt-1" />
                <Slider class="my-4 min-h-2 h-2 w-full self-center tbd-slider"
                    v-model="themeStore.uiSettings.radiusSize" :min="0" :max="4"
                    showTooltip="focus" :merge="1" :lazy="false" :step="-1"/>
            </div>
        </div>
    </div>
</template>