import settings from "@/settings";
import { canvasContext } from "@/board";

const canvasFillStyle = window
	.getComputedStyle(document.documentElement)
	.getPropertyValue("--color-dark-slate-gray");

export function placeSnakePart(xCoordinate: number, yCoordinate: number) {
	const { snakePartSizeInPx } = settings;

	canvasContext.fillStyle = canvasFillStyle;
	canvasContext.fillRect(
		xCoordinate,
		yCoordinate,
		snakePartSizeInPx,
		snakePartSizeInPx,
	);
}
