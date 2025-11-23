declare global {
	type ColorTheme = {
		name: string;
		colors: RootColors;
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
}
export {
	ColorTheme,
	RootColors,
	RootColor,
};
