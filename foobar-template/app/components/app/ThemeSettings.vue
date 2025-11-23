<script setup lang="ts">
    const themeStore = useThemeStore();

    debouncedWatch(
        () => themeStore.selectedTheme,
        async (theme) => {
            themeStore.toggleTheme();
            themeStore.toggleTheme();
            themeStore.updateStyle(theme);            
        }, 'colors'
    );

    const hoverVariant = ref(-1)
    const hoverColor = ref(-1)
    const newTheme = ref<ColorTheme>(JSONIFY(defaultColorTheme));
</script>

<template>
    <div class="fixed tl-0 flex-center-full transition-500 bg-TBD-bg-dark/5 dark:bg-TBD-bg-light/5"
        :class="!themeStore.settingsOpen ? 'opacity-0 pointer-events-none blur-sm' : 'opacity-100 backdrop-blur-sm'">
        <div class="overflow-hidden rounded-lg shadow-dark dark:shadow-light z-5 transition-300
            text-xs dark:bg-TBD-bg-dark/90 backdrop-blur-lg dark:text-TBD-text-light 
            bg-TBD-bg-light/50 text-TBD-text-dark border border-TBD-bg-dark/10 p-4">

            <p class="font-bold text-lg"> TEME: </p>
            
            <div class="flex items-end gap-2 mt-2">
                <InputsText v-model="newTheme.name" slim label="Naziv nove teme" name="themeName" placeholder="Naziv nove teme..."/>
                <InputsButton slim outline class="min-w-7! max-w-7! h-7 p-0!" type="button"
                @mouseenter="setTooltip('Dodaj novu temu')" @mouseleave="setTooltip()" @click="themeStore.addNewTheme(newTheme.name)"
                :disabled="!newTheme || newTheme?.name == '' || themeStore.colorThemes.concat(JSONIFY(defaultColorThemes)).map((t: ColorTheme) => t.name).includes(newTheme.name)">
                <Icon class="text-lg mt-1" name="mdi:paint-outline"/>
                </InputsButton>
                <InputsDropdown slim label="Trenutna tema" name="colorTheme" class="w-auto!" @click="themeStore.showSettingsOnHover = false; themeStore.showSidebarOnHover = false;"
                v-model="themeStore.selectedTheme" :show-items-amount="7" @item-selected="(v : ColorTheme) => themeStore.selectTheme(v)"
                :list="JSONIFY(defaultColorThemes).concat(themeStore.colorThemes)" labelName="name"/> 
            </div>
            <div class="flex gap-2 mt-2" :class="defaultColorThemes.map((t: ColorTheme) => t.name).includes(themeStore.selectedTheme.name) ? 'opacity-50 pointer-events-none' : ''">
                <InputsButton class="w-full transition-300" type="button" color-outline="error"
                outline slim @click="themeStore.deleteTheme()">
                <div class="flex-center-full gap-1 whitespace-nowrap">
                    Izbriši temu
                </div>
                </InputsButton>
                <InputsButton class="w-full transition-300" type="button" color-background="warning"
                :disabled="STRINGIFY(themeStore.selectedTheme) == STRINGIFY(themeStore.defaultTheme)"
                slim @click="themeStore.resetTheme()">
                <div class="flex-center-full gap-1 whitespace-nowrap">
                    Resetiraj temu
                </div>
                </InputsButton>
            </div>
            
            <p class="font-bold text-lg mt-4"> BOJE: </p>

            <div class="flex w-full justify-around gap-2">
                <div v-for="variant, j in (['light', 'dark'] as const)" :key="variant"
                    class="flex flex-col gap-1" @click="hoverVariant = j">

                    <p class="font-bold mt-4 mb-2">
                        {{ variant === 'light' ? 'Svijetla tema' : 'Tamna tema' }}
                    </p>

                    <div v-for="color, i in themeStore.selectedTheme.colors[variant]" :key="color.property"
                        class="flex items-center gap-1">
                        
                        <Icon name="material-symbols:refresh-rounded" @click="themeStore.resetColor(variant, color.property)"
                            class="text-lg cursor-pointer hover:rotate-15 hover:opacity-75 transition-150 active:hover:rotate-90"
                            @mouseenter="setTooltip('Resetiraj boju')" @mouseleave="setTooltip()"/>

                            <InputsColor :i="i" :j="j" :hoverColor="hoverColor"
                                @clickColor="hoverColor = i; themeStore.showSettingsOnHover = false; themeStore.showSidebarOnHover = false;"
                                :hoverVariant="hoverVariant" v-model="color.value" :property="color.property" @leaveColorPicker="hoverColor = -1;"/>

                        <label :for="color.property" :class="i==hoverColor && hoverVariant==j ? 'underline text-TBD-fipu-blue-default dark:text-TBD-fipu-blue-dark' : ''">
                            {{ color.name }}
                        </label>
                    </div>

                </div>
            </div>
        </div>        
    </div>
</template>