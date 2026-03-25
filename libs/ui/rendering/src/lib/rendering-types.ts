const CSS_VARS = Object.freeze({
	MAIZE_CRAYOLA: "--color-maize-crayola",
	DARK_SLATE_GRAY: "--color-dark-slate-gray",
	DARK_SLATE_GRAY_LIGHT: "--color-dark-slate-gray-light",
	DARK_SLATE_GRAY_DARK: "--color-dark-slate-gray-dark",
	TEAL_BLUE: "--color-teal-blue",
	TEAL_BLUE_LIGHT: "--color-teal-blue-light",
	TEAL_BLUE_DARK: "--color-teal-blue-dark",
} as const);

export const colorMap = Object.freeze({
	canvasColor: CSS_VARS.MAIZE_CRAYOLA,
	snakeColor: CSS_VARS.DARK_SLATE_GRAY,
	snakeColorLight: CSS_VARS.DARK_SLATE_GRAY_LIGHT,
	snakeColorDark: CSS_VARS.DARK_SLATE_GRAY_DARK,
	foodColor: CSS_VARS.TEAL_BLUE,
	foodColorLight: CSS_VARS.TEAL_BLUE_LIGHT,
	foodColorDark: CSS_VARS.TEAL_BLUE_DARK,
} as const);
