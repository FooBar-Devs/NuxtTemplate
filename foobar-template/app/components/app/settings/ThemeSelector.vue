<script setup lang="ts">
    interface Props {
        themes: ColorTheme[];
        selectedTheme: ColorTheme;
        selectedThemeNewName: string;
        newTheme: ColorTheme;
        settingsPanel?: HTMLElement;
    }

    const props = defineProps<Props>();
    const emit = defineEmits<{
        'update:selectedThemeNewName': [value: string]
        'select': [theme: ColorTheme]
    }>();

    const themeStore = useThemeStore();
    const colorThemesDropdown = ref();

    const selectedThemeNewNameModel = computed({
        get: () => props.selectedThemeNewName,
        set: (value) => emit('update:selectedThemeNewName', value)
    });

    onMounted(() => {
        if (props.settingsPanel) {
            const resizeObserver = new ResizeObserver(() => {
                colorThemesDropdown.value?.calculateDropdownPosition();
            });
            resizeObserver.observe(props.settingsPanel);
            
            onBeforeUnmount(() => {
                resizeObserver.disconnect();
            });
        }
    });
</script>

<template>
    <div class="flex items-end gap-2 mt-2">
        <InputsButton slim outline class="min-w-7! max-w-7! h-7 p-0!" type="button"
            @mouseenter="setTooltip('Učitaj temu')" @mouseleave="setTooltip()" @click="themeStore.importTheme()">
            <Icon class="text-lg" name="ic:round-upload"/>
        </InputsButton>
        
        <InputsText v-model="selectedThemeNewNameModel" slim label="Naziv nove teme" 
            name="themeName" placeholder="Naziv nove teme..." class="grow"/>
        
        <InputsButton slim outline class="min-w-7! max-w-7! h-7 p-0!" type="button"
            @mouseenter="setTooltip('Izradi novu temu iz trenutne')" @mouseleave="setTooltip()" @click="themeStore.addNewTheme(selectedThemeNewName)"
            :disabled="!newTheme || selectedThemeNewName == '' || themeStore.uiSettings.colorThemes.concat(JSONIFY(defaultColorThemes)).map(t=>t.name).includes(selectedThemeNewName)">
            <Icon class="text-lg" name="mdi:paint-outline"/>
        </InputsButton>
        
        <InputsDropdown slim label="Trenutna tema" name="colorTheme" class="w-auto! grow" @click="themeStore.uiSettings.showSettingsOnHover = false; themeStore.uiSettings.showSidebarOnHover = false;" :showSelectedHighlight="false"
            v-model="themeStore.selectedTheme" :show-items-amount="5" @item-selected="(v : any) => emit('select', v as ColorTheme)" :dropdown-item-height="48" :dropdown-height="themeStore.uiSettings.colorThemes.length > 0 && themeStore.uiSettings.colorThemes.length < 5 ? 64 : 32" ref="colorThemesDropdown" :list="JSONIFY(themes)" labelName="name"
            itemClass="h-fit! p-0!" hideDefaultLabel>
            <template #item="{ item, id, selected }">
                <div class="flex flex-col w-full">

                    <div v-if="id==0 && themeStore.uiSettings.colorThemes.length > 0" class="bg-TBD-bg-dark dark:bg-TBD-bg-light text-TBD-bg-light dark:text-TBD-bg-dark text-xs font-bold p-2">
                        Korisničke teme
                    </div>
                    <div v-if="id==themeStore.uiSettings.colorThemes.length" class="bg-TBD-bg-dark dark:bg-TBD-bg-light text-TBD-bg-light dark:text-TBD-bg-dark text-xs font-bold p-2">
                        Zadane teme
                    </div>

                    <div class="flex flex-col min-h-fit w-full p-2"
                        :class="selected ? 'bg-TBD-primary-light/75 dark:bg-TBD-primary-dark/95 text-TBD-text-light dark:text-TBD-text-dark font-bold' : ''">
                        
                        <div class="w-full font-bold mb-1">
                            {{ item.name }}
                        </div>

                        <div class="flex flex-wrap gap-[3px]" v-if="themes[id]">
                            <div v-for="color in themes[id].colors[themeStore.isDarkMode ? 'dark' : 'light']" 
                                class="h-3 aspect-square rounded-xs outline-1 bg-white"
                                :class="selected ? 'outline-TBD-text-light dark:outline-TBD-text-dark' : 'outline-TBD-text-dark dark:outline-TBD-text-light'" :key="color.property">
                                <div class="wh-full" :style="{ backgroundColor: color.value }" >

                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </template>
        </InputsDropdown> 
        
        <InputsButton slim outline class="min-w-7! max-w-7! h-7 p-0!" type="button"
            @mouseenter="setTooltip('Preuzmi trenutnu temu')" @mouseleave="setTooltip()" @click="themeStore.exportTheme()">
            <Icon class="text-lg" name="ic:round-download"/>
        </InputsButton>
    </div>
</template>