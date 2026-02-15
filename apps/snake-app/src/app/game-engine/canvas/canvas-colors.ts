import { CSS_VARS } from "../../constants";

export type GameColor =
	| "canvasColor"
	| "snakeColor"
	| "snakeColorLight"
	| "snakeColorDark"
	| "foodColor"
	| "foodColorLight"
	| "foodColorDark";

const colorMap: Record<GameColor, string> = {
	canvasColor: CSS_VARS.MAIZE_CRAYOLA,
	snakeColor: CSS_VARS.DARK_SLATE_GRAY,
	snakeColorLight: CSS_VARS.DARK_SLATE_GRAY_LIGHT,
	snakeColorDark: CSS_VARS.DARK_SLATE_GRAY_DARK,
	foodColor: CSS_VARS.TEAL_BLUE,
	foodColorLight: CSS_VARS.TEAL_BLUE_LIGHT,
	foodColorDark: CSS_VARS.TEAL_BLUE_DARK,
};

export function getColor(colorName: GameColor): string {
	return globalThis
		.getComputedStyle(document.documentElement)
		.getPropertyValue(colorMap[colorName])
		.trim();
}
