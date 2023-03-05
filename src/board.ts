import settings from "@/settings";
import { PartPosition } from "@/types/part-position";

export let canvasElement: HTMLCanvasElement;
export let canvasContext: CanvasRenderingContext2D;
const snakeColor = window
	.getComputedStyle(document.documentElement)
	.getPropertyValue("--color-dark-slate-gray");
const foodColor = window
	.getComputedStyle(document.documentElement)
	.getPropertyValue("--color-teal-blue");

export function setupBoard() {
	const possibleCanvas =
		document.querySelector<HTMLCanvasElement>("[data-snake-game]");

	if (!possibleCanvas) {
		return;
	}

	canvasElement = possibleCanvas;

	const possibleCanvasContext = canvasElement.getContext("2d");

	if (!possibleCanvasContext) {
		return;
	}

	canvasContext = possibleCanvasContext;

	setBoardSize();

	cleanBoard();
}

function setBoardSize() {
	const { canvasWidthInPx, canvasHeightInPx } = settings;

	canvasElement.width = canvasWidthInPx;
	canvasElement.style.width = `${canvasWidthInPx}px`;

	canvasElement.height = canvasHeightInPx;
	canvasElement.style.height = `${canvasHeightInPx}px`;
}

export function cleanBoard() {
	const { canvasWidthInPx, canvasHeightInPx } = settings;

	canvasContext.fillStyle = window
		.getComputedStyle(document.documentElement)
		.getPropertyValue("--color-maize-crayola");
	canvasContext.fillRect(0, 0, canvasWidthInPx, canvasHeightInPx);
}

export function drawSnakePart(snakePosition: PartPosition) {
	drawPart(snakePosition, snakeColor);
}

export function drawFoodPart(foodPosition: PartPosition) {
	drawPart(foodPosition, foodColor);
}

function drawPart(snakePosition: PartPosition, color: string) {
	const { partSizeInPx } = settings;

	canvasContext.fillStyle = color;
	canvasContext.fillRect(
		snakePosition[0],
		snakePosition[1],
		partSizeInPx,
		partSizeInPx,
	);
}

export function erasePart(partPosition: PartPosition) {
	const { partSizeInPx } = settings;

	canvasContext.clearRect(
		partPosition[0],
		partPosition[1],
		partSizeInPx,
		partSizeInPx,
	);
}
