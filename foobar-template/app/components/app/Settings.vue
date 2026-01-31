<script setup lang="ts">
    const themeStore = useThemeStore();

    debouncedWatch(
        () => themeStore.selectedTheme,
        async (theme) => {
            themeStore.setRootStyle();
            themeStore.updateStyle(theme, 'colors');
            themeStore.updateStyle(theme, 'images');            
        }, 'theme'
    );

    const hoverVariant = ref(-1)
    const hoverColor = ref(-1)
    const newTheme = ref<ColorTheme>(JSONIFY(defaultColorTheme));

    const colorThemesCombined = computed(() => {
        return themeStore.uiSettings.colorThemes.concat(defaultColorThemes);
    });

    const settingsPanel = ref();
    const selectedThemeNewName = ref('');
    
    onMounted(() => {
        selectedThemeNewName.value = themeStore.selectedTheme.name;
    });
    
    function selectTheme(v: ColorTheme) {
        selectedThemeNewName.value = v.name;
        themeStore.selectTheme(v);
    }
</script>

<template>
    <div class="fixed tl-0 flex-center-full transition-300 ease-in overflow-hidden"
        :class="!themeStore.settingsOpen ? 'opacity-0 pointer-events-none blur-sm' : 'opacity-100'">
        
        <div class="overflow-hidden rounded-lg shadow-dark dark:shadow-light aspect-square z-5
            flex-col-full text-xs dark:bg-TBD-bg-dark/50 rotate-180 w-146 min-w-102 min-h-82 h-204 max-h-screen direction-rtl
            dark:text-TBD-text-light bg-TBD-bg-light/50 text-TBD-text-dark border border-TBD-bg-dark/10" ref="settingsPanel">

            <TextBGEffect/>
            
            <div class="rotate-180 overflow-y-auto overflow-x-hidden flex-col-full direction-ltr">
                <div class="w-full min-w-102 min-h-8 flex overflow-hidden text-center text-sm">
                    <div class="flex-center grow px-2 bg-TBD-primary-light dark:bg-TBD-primary-dark text-TBD-text-light dark:text-TBD-text-dark">
                        Postavke
                    </div>
                </div>

                <div class="w-full px-4 py-2 flex gap-2">
                    <InputsButton class="grow" type="button" outline slim
                        :disabled="STRINGIFY(themeStore.uiSettings) == STRINGIFY(defaultUISettings) && themeStore.selectedTheme.name == themeStore.uiSettings.selectedTheme && STRINGIFY(themeStore.selectedTheme) == STRINGIFY(themeStore.defaultTheme)"
                        color-outline="error" @click="themeStore.resetUISettings()">
                        Resetiraj na zadane postavke
                    </InputsButton>
                </div>

                <TextLine />

                <div class="w-full min-w-102 h-fit py-2 overflow-x-hidden overflow-y-auto">

                    <!-- UI Postavke -->
                    <AppSettingsUISettings />

                    <TextLine class="my-4"/>

                    <div class="px-4 pb-4">
                        <p class="font-bold text-lg"> TEME: </p>
                        
                        <!-- Theme Selector -->
                        <AppSettingsThemeSelector
                            :themes="colorThemesCombined"
                            :selectedTheme="themeStore.selectedTheme"
                            v-model:selectedThemeNewName="selectedThemeNewName"
                            :settingsPanel="settingsPanel"
                            :newTheme="newTheme"
                            @select="selectTheme" />

                        <!-- Theme Actions -->
                        <AppSettingsThemeActions
                            :selectedTheme="themeStore.selectedTheme"
                            v-model:selectedThemeNewName="selectedThemeNewName" />
                        
                        <!-- Color editor -->
                        <AppSettingsColorEditor 
                            :selectedTheme="themeStore.selectedTheme"
                            v-model:hoverColor="hoverColor"
                            v-model:hoverVariant="hoverVariant"/>

                        <!-- Image editor -->
                        <AppSettingsImageEditor
                            :selectedTheme="themeStore.selectedTheme"
                            v-model:hoverVariant="hoverVariant" />
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>