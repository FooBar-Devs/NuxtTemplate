declare global {
	type ColorTheme = {
		name: string;
		colors: RootColors;
		images: ThemeImages;
	};
	type RootColors = {
		light: RootColor[];
		dark: RootColor[];
	};
	type RootColor = {
		name: string;
		property: string;
		value: string;
	};
	type ThemeImages = {
		light: ThemeImage[];
		dark: ThemeImage[];
	};
	type ThemeImage = {
		url: string;
		style: string;
	};

	type UISettings = {
		// TEME
		selectedTheme: string;
		colorThemes: ColorTheme[];

		// AKCIJE
		showQuickActionsOnHover: boolean;
		showThemeButton: boolean;
		showPixelartButton: boolean;

		// EFEKTI
		glassEffect: boolean;
		blurStrength: number;
		cardOpacity: number;
		radiusSize: number;
	};
}
export {
	ColorTheme,
	RootColors,
	RootColor,
	ThemeImages,
	ThemeImage
};
