<script setup lang="ts">
    const themeStore = useThemeStore();

    interface Props {
        selectedTheme: ColorTheme;
        selectedThemeNewName: string;
    }

    const props = defineProps<Props>();
    const emit = defineEmits<{
        'update:selectedThemeNewName': [value: string]
    }>();

    const selectedThemeNewNameModel = computed({
        get: () => props.selectedThemeNewName,
        set: (value) => emit('update:selectedThemeNewName', value)
    });

    function handleResetTheme() {
        themeStore.resetTheme();
        selectedThemeNewNameModel.value = themeStore.selectedTheme.name;
    }
</script>

<template>
    <div class="flex gap-2 mt-2">
        <InputsButton v-if="!defaultColorThemes.map(t=>t.name).includes(selectedTheme.name)" 
            class="w-full transition-300" type="button" color-outline="error" 
            :disabled="defaultColorThemes.map(t=>t.name).includes(selectedTheme.name) || 
                !themeStore.uiSettings.colorThemes.map(t=>t.name).includes(selectedTheme.name)"
                outline slim @click="themeStore.deleteTheme()">
            <div class="flex-center-full gap-1 whitespace-nowrap">
                Izbriši temu
            </div>
        </InputsButton>
        
        <InputsButton class="w-full transition-300" type="button" color-background="warning"
            :disabled="STRINGIFY(selectedTheme) == STRINGIFY(themeStore.defaultTheme)"
            outline slim @click="handleResetTheme">
            <div class="flex-center-full gap-1 whitespace-nowrap">
                Resetiraj temu
            </div>
        </InputsButton>
        
        <InputsButton v-if="!defaultColorThemes.map(t=>t.name).includes(selectedTheme.name)" 
            class="w-full transition-300" type="button" slim 
            :disabled="STRINGIFY(selectedTheme) == STRINGIFY(themeStore.defaultTheme) && 
                (defaultColorThemes.map(t=>t.name).includes(selectedThemeNewName) ||
                themeStore.uiSettings.colorThemes.map(t=>t.name).includes(selectedThemeNewName))" 
            @click="themeStore.updateTheme(selectedThemeNewName)">
            <div class="flex-center-full gap-1 whitespace-nowrap">
                Ažuriraj temu
            </div>
        </InputsButton>
    </div>
</template>