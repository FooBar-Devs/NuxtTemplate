import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('themeStore', () => {
    const EduCoderVersion = ref('2.0');
    const isDarkMode = ref(false);
    const selectedTheme = ref(JSONIFY(defaultColorTheme) as ColorTheme);
    const colorThemes = ref([] as ColorTheme[]);
    const defaultTheme = ref(JSONIFY(defaultColorTheme) as ColorTheme);
    const settingsOpen = ref(false);

    const resetTheme = () => {
        selectedTheme.value.colors.light = JSONIFY(defaultTheme.value.colors.light);
        selectedTheme.value.colors.dark = JSONIFY(defaultTheme.value.colors.dark);
        applyColorsToRoot();
    };

    const resetColor = (variant: 'light' | 'dark', property: string) => {
        const defaultColor = defaultTheme.value.colors[variant].find(
            (color) => color.property === property
        ) as RootColor;
        if (defaultColor) {
            const index = selectedTheme.value.colors[variant].findIndex(
                (color) => color.property === property
            );
            if (index !== -1) {
                const selected = selectedTheme.value.colors[variant][index];
                if (selected) {
                    selected.value = defaultColor.value;
                    setRootStyle();
                }
            }
        }
    };

    const applyColorToRoot = (property: string, value: string) => {
        document.documentElement.style.setProperty(property, value);
        document.documentElement.style.setProperty(property + '-rgb', value.replace(/[^\d,]/g, ''));
    };

    const applyColorsToRoot = () => {
        const variant = isDarkMode.value ? 'dark' : 'light';
        selectedTheme.value.colors[variant].forEach((color) => {
            applyColorToRoot(color.property, color.value);
        });
    };

    const toggleTheme = async (): Promise<void> => {
        isDarkMode.value = !isDarkMode.value;
        setRootStyle();
    };

    const setRootStyle = () => {
        const variant = isDarkMode.value ? 'dark' : 'light';
        selectedTheme.value.colors[variant].forEach((color) => {
            applyColorToRoot(color.property, color.value);
        });
        const thumbColor = selectedTheme.value.colors[variant].find((c) => c.property == '--thumb');
        const thumbHoverColor = selectedTheme.value.colors[variant].find((c) => c.property == '--thumbhover');
        if (!thumbColor || !thumbHoverColor) return;
        applyColorToRoot('--thumb', thumbColor.value);
        applyColorToRoot('--thumbhover', thumbHoverColor.value);
        document.querySelector('body')?.classList.toggle('dark', isDarkMode.value);
    };

    const updateStyle = (theme: ColorTheme) => {
        const cti = colorThemes.value.findIndex((ct) => ct.name == selectedTheme.value.name);
        if (cti != -1) {
            const selected = colorThemes.value[cti];
            if (selected) selected.colors = JSONIFY(theme.colors);
        }
    };

    const selectTheme = (theme: ColorTheme) => {
        defaultTheme.value = JSONIFY(theme) as ColorTheme;
        setRootStyle();
    };

    const deleteTheme = () => {
        colorThemes.value = colorThemes.value.filter((t) => t.name != selectedTheme.value.name);
        selectedTheme.value = JSONIFY(defaultColorTheme) as ColorTheme;
        defaultTheme.value = JSONIFY(defaultColorTheme) as ColorTheme;
    };

    const addNewTheme = (name: string): void => {
        const newTheme = {
            name: name,
            colors: JSONIFY(selectedTheme.value.colors),
        } as ColorTheme;
        colorThemes.value.push(newTheme);
        selectedTheme.value = JSONIFY(newTheme) as ColorTheme;
        defaultTheme.value = JSONIFY(newTheme) as ColorTheme;
    };

    return {
        EduCoderVersion,
        isDarkMode,
        settingsOpen,
        selectedTheme,
        colorThemes,
        defaultTheme,
        resetTheme,
        resetColor,
        applyColorsToRoot,
        toggleTheme,
        setRootStyle,
        updateStyle,
        selectTheme,
        deleteTheme,
        addNewTheme,
    };
}, {
    persist: {
        storage: localStorage
    }
})
