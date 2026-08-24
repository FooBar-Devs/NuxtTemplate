<script setup lang="ts">
import ColorEditor from './settings/ColorEditor.vue';
import ImageEditor from './settings/ImageEditor.vue';
import ThemeActions from './settings/ThemeActions.vue';
import ThemeSelector from './settings/ThemeSelector.vue';
import UISettings from './settings/UISettings.vue';

    const themeStore = useThemeStore();

    debouncedWatch(
        () => themeStore.selectedTheme,
        async (theme) => {
            themeStore.setRootStyle();
            themeStore.updateStyle(theme, 'colors');
            themeStore.updateStyle(theme, 'images');            
        }, 'theme'
    );

    defineProps({ settingsOpen: Boolean });

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
    <div class="fixed z-10 bl-0 flex flex-col transition-300 ease-in px-6 pt-6 pb-6 pointer-events-none"
        :class="!themeStore.settingsOpen ? 'opacity-0 pointer-events-none blur-sm z-2000' : 'opacity-100'">
        <TextResizableDiv resize-top inverseY resize-right
            :min-width="408" :min-height="328" :initial-height="816"
            hide-edges :full-edge="false"
            class="overflow-hidden rounded-lg shadow-dark dark:shadow-light aspect-square z-5 wh-full
            flex-col-full text-xs dark:bg-TBD-bg-dark/50
            dark:text-TBD-text-light bg-TBD-bg-light/50 text-TBD-text-dark border border-TBD-bg-dark/10"
            :class="themeStore.settingsOpen ? 'pointer-events-auto' : 'pointer-events-none'" ref="settingsPanel"
            id="TUTORIAL_settings">

            <TextBGEffect/>
            
            <div class="overflow-y-auto overflow-x-hidden flex-col-full">
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
                    <UISettings />

                    <TextLine class="my-4"/>

                    <div class="px-4 pb-4">
                        <p class="font-bold text-lg"> TEME: </p>
                        
                        <!-- Theme Selector -->
                        <ThemeSelector
                            :themes="colorThemesCombined"
                            :selectedTheme="themeStore.selectedTheme"
                            v-model:selectedThemeNewName="selectedThemeNewName"
                            :settingsPanel="settingsPanel"
                            :newTheme="newTheme"
                            @select="selectTheme" />

                        <!-- Theme Actions -->
                        <ThemeActions :selectedTheme="themeStore.selectedTheme"
                            v-model:selectedThemeNewName="selectedThemeNewName" />
                        
                        <!-- Color editor -->
                        <ColorEditor :selectedTheme="themeStore.selectedTheme"/>

                        <!-- Image editor -->
                        <ImageEditor :selectedTheme="themeStore.selectedTheme"/>
                    </div>

                </div>

            </div>
        </TextResizableDiv>
    </div>
</template>