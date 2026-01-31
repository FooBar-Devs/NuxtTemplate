import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('themeStore', () => {
    const updating = ref(false);

    const isDarkMode = ref(false);
    const fun = ref(true);
    const settingsOpen = ref(false);

    const selectedTheme = ref(JSONIFY(defaultColorTheme) as ColorTheme);
    const defaultTheme = ref(JSONIFY(defaultColorTheme) as ColorTheme);
    const uiSettings = ref(JSONIFY(defaultUISettings) as UISettings);

    const layoutWidth = ref('max-w-5xl');

    const resetTheme = () => {
        selectedTheme.value.colors = JSONIFY(defaultTheme.value.colors);
        selectedTheme.value.images = JSONIFY(defaultTheme.value.images);
        selectedTheme.value.name = defaultTheme.value.name;
        applyColorsToRoot();
    };

    const getDefaultColorValue = (variant: 'light' | 'dark', property: string): RootColor => {
        const color = defaultTheme.value.colors[variant].find(
            (color) => color.property === property
        ) as RootColor;
        return color;
    }

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
        const thumbColor = selectedTheme.value.colors[variant].find((c) => c.property == '--color-TBD-thumb');
        const thumbHoverColor = selectedTheme.value.colors[variant].find((c) => c.property == '--color-TBD-thumbhover');
        if (!thumbColor || !thumbHoverColor) return;
        applyColorToRoot('--color-TBD-thumb', thumbColor.value);
        applyColorToRoot('--color-TBD-thumbhover', thumbHoverColor.value);
        if (uiSettings.value.radiusSize) document.documentElement.style.setProperty('--color-TBD-radius-TBD-scale', uiSettings.value.radiusSize.toString());
        document.querySelector('body')?.classList.toggle('dark', isDarkMode.value);
    };

    const updateStyle = (theme: ColorTheme, key: 'colors' | 'images') => {
        const cti = uiSettings.value.colorThemes.findIndex((ct) => ct.name == selectedTheme.value.name);
        if (cti != -1) {
            const selected = uiSettings.value.colorThemes[cti];
            if (selected) selected[key] = JSONIFY(theme[key]);
        }
    };

    const selectTheme = async (theme: ColorTheme) => {
        defaultTheme.value = JSONIFY(theme) as ColorTheme;
        selectedTheme.value = JSONIFY(theme) as ColorTheme;
        toggleTheme();
        toggleTheme();
    };

    const deleteTheme = () => {
        uiSettings.value.colorThemes = uiSettings.value.colorThemes.filter((t) => t.name != selectedTheme.value.name);
        selectedTheme.value = JSONIFY(defaultColorTheme) as ColorTheme;
        defaultTheme.value = JSONIFY(defaultColorTheme) as ColorTheme;
    };

    const updateTheme = (newThemeName: string) => {
        const cti = uiSettings.value.colorThemes.findIndex((ct) => ct.name == defaultTheme.value.name);
        if (cti != -1) {
            uiSettings.value.colorThemes[cti] = JSONIFY(selectedTheme.value) as ColorTheme;
            uiSettings.value.colorThemes[cti].name = newThemeName;
            selectedTheme.value.name = newThemeName;
            defaultTheme.value.name = newThemeName;
            defaultTheme.value = JSONIFY(selectedTheme.value) as ColorTheme;
        }
    }

    const addNewTheme = (name: string): void => {
        const newTheme = {
            name: name,
            colors: JSONIFY(selectedTheme.value.colors),
            images: JSONIFY(selectedTheme.value.images),
        } as ColorTheme;
        uiSettings.value.colorThemes.push(newTheme);
        selectedTheme.value = JSONIFY(newTheme) as ColorTheme;
        defaultTheme.value = JSONIFY(newTheme) as ColorTheme;
    };

    const addImage = (variant: 'light' | 'dark') => {
        selectedTheme.value.images[variant].push({
            url: '',
            style: 'width: auto;\nheight: auto;\ntop: 50%;\nleft: 50%;\ntransform: translate(-50%, -50%);\n',
        } as ThemeImage);
    };

    const exportTheme = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(selectedTheme.value));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "educoder_theme-["+selectedTheme.value.name + "].json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    const importTheme = async () => {
        try {
            const { files, open } = useFileDialog({
                accept: '.json',
                multiple: false,
            });
            
            open();

            // Wait for file selection with 30 second timeout
            await new Promise<void>((resolve, reject) => {
                const timeout = setTimeout(() => reject(new Error('File selection timeout')), 30000);
                const stop = watchOnce(() => files.value?.length, () => {
                    clearTimeout(timeout);
                    stop();
                    resolve();
                });
            });

            if (!files.value?.length) return;

            const importedFile = files.value[0];
            if (!importedFile) throw new Error('No file selected');
            const text = await importedFile.text();
            const importedTheme = JSON.parse(text) as ColorTheme;

            // Validate theme structure
            if (!importedTheme.name || !importedTheme.colors || !importedTheme.images) {
                pushPopup(getMessage(THEME_MSGS.INVALID_THEME_FORMAT__WARNING), updating, 1, { location: "themeStore - importTheme()", message: "Invalid theme format" });
                return;
            }

            // Check for duplicate theme name
            const colorThemes = uiSettings.value.colorThemes.concat(defaultColorThemes);
            if (colorThemes.some(ct => ct.name === importedTheme.name)) {
                pushPopup(getMessage(THEME_MSGS.THEME_NAME_ALREADY_EXISTS__WARNING), updating, 1, { location: "themeStore - importTheme()", message: "Theme with the same name already exists" });
                return;
            }

            // Import the theme
            uiSettings.value.colorThemes.push(importedTheme);
            selectedTheme.value = JSONIFY(importedTheme) as ColorTheme;
            defaultTheme.value = JSONIFY(importedTheme) as ColorTheme;
            setRootStyle();
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            pushPopup(getMessage(THEME_MSGS.THEME__ERROR), updating, 1, { location: "themeStore - importTheme()", message });
        }
    }

    const deleteImage = (variant: 'light' | 'dark', index: number) => {
        selectedTheme.value.images[variant].splice(index, 1);
    }

    const getImagePreview = (image: ThemeImage): string => {
        const url = image.url;
        const style = image.style;
        if (url == 'transparent') {
            const regex = /url\(['"]?(.*?)['"]?\)/;
            const match = style.match(regex);
            if (match && match[1]) {
                return match[1];
            }
        }
        return image.url != '' ? image.url : 'https://picsum.photos/200';
    }

    const getBg = computed(() => {
        return `background-color: ${(isDarkMode.value ? 
        `rgba(var(--color-TBD-bg-dark-rgb), ${uiSettings.value.cardOpacity})` : 
        `rgba(var(--color-TBD-bg-light-rgb), ${uiSettings.value.cardOpacity})`)}; ${
        uiSettings.value.glassEffect ?  `backdrop-filter: blur(${uiSettings.value.blurStrength}px)` : ''}`;
    });

    const getBlur = computed(() => {
        return uiSettings.value.glassEffect ?  `backdrop-filter: blur(${uiSettings.value.blurStrength}px)` : '';
    });

    function resetUISettings() {
        selectedTheme.value = JSONIFY(defaultColorTheme) as ColorTheme;
        defaultTheme.value = JSONIFY(defaultColorTheme) as ColorTheme;
        uiSettings.value = JSONIFY(defaultUISettings) as UISettings;
        settingsOpen.value = false;
    }

    function $reset() {
        isDarkMode.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        fun.value = true;
        settingsOpen.value = false;

        selectedTheme.value = JSONIFY(defaultColorTheme) as ColorTheme;
        defaultTheme.value = JSONIFY(defaultColorTheme) as ColorTheme;
        uiSettings.value = JSONIFY(defaultUISettings) as UISettings;

        layoutWidth.value = 'max-w-5xl';

        applyColorsToRoot();
        toggleTheme();
        toggleTheme();
        resetUISettings();
    }

    return {
        updating,
        isDarkMode,
        settingsOpen,
        uiSettings,
        selectedTheme,
        defaultTheme,
        layoutWidth,
        fun,
        getBg,
        getBlur,
        resetTheme,
        resetColor,
        getDefaultColorValue,
        applyColorsToRoot,
        toggleTheme,
        setRootStyle,
        updateStyle,
        selectTheme,
        deleteTheme,
        updateTheme,
        addNewTheme,
        addImage,
        deleteImage,
        exportTheme,
        importTheme,
        getImagePreview,
        resetUISettings,
        $reset,
    };
}, {
    persist: {
        storage: localStorage
    }
})