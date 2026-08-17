export const defaultUISettings : UISettings = {
    // TEME
    selectedTheme: 'fooobar' as string,
    colorThemes: [] as ColorTheme[],

    // IZBORNIK
    fixedSidebar: true as boolean,
    showSidebarOnHover: false as boolean,
    showSettingsOnHover: false as boolean,

    // AKCIJE
    showQuickActionsOnHover: false as boolean,
    showThemeButton: true as boolean,
    showPixelartButton: true as boolean,

    // EFEKTI
    glassEffect: true as boolean,
    blurStrength: 8 as number,
    cardOpacity: 0.25 as number,
    radiusSize: 1 as number,
};

export const defaultColors: RootColors = JSONIFY(foobarTheme.colors);

export const defaultImages: ThemeImages = JSONIFY(foobarTheme.images);

export const defaultColorTheme = JSONIFY(foobarTheme) as ColorTheme;

export const defaultColorThemes = [
    defaultColorTheme,
    siinamotaTheme,
    inabakumoriTheme,
    takTheme,
    matrixTheme,
    r906Theme,
    iyowaTheme,
    ztmyTheme,
    gyariTheme,
    yukopiTheme,
    starWarsTheme,
    bwTheme,
    rainyTheme,
]