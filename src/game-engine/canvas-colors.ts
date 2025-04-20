export const canvasColor = globalThis
	.getComputedStyle(document.documentElement)
	.getPropertyValue("--color-maize-crayola");

export const snakeColor = globalThis
	.getComputedStyle(document.documentElement)
	.getPropertyValue("--color-dark-slate-gray");

export const foodColor = globalThis
	.getComputedStyle(document.documentElement)
	.getPropertyValue("--color-teal-blue");
