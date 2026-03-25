import { colorMap } from "../rendering-types.js";

/**
 * this function was introduced to solve a race condition in WebKit
 */
export function getColor(colorName: keyof typeof colorMap): string {
	return globalThis
		.getComputedStyle(document.documentElement)
		.getPropertyValue(colorMap[colorName])
		.trim();
}
