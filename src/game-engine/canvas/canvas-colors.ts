import { CSS_VARS } from "@/constants";

export const canvasColor = globalThis
	.getComputedStyle(document.documentElement)
	.getPropertyValue(CSS_VARS.MAIZE_CRAYOLA);

export const snakeColor = globalThis
	.getComputedStyle(document.documentElement)
	.getPropertyValue(CSS_VARS.DARK_SLATE_GRAY);

export const foodColor = globalThis
	.getComputedStyle(document.documentElement)
	.getPropertyValue(CSS_VARS.TEAL_BLUE);
