import settings from "@/settings";
import { SnakePosition } from "@/types/snake-position";

export let canvasElement: HTMLCanvasElement;
export let canvasContext: CanvasRenderingContext2D;
const canvasFillStyle = window
	.getComputedStyle(document.documentElement)
	.getPropertyValue("--color-dark-slate-gray");

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
	const { boardWidth, boardHeight, snakeSizeWithGap } = settings;

	canvasElement.width = boardWidth * snakeSizeWithGap;
	canvasElement.style.width = `${canvasElement.width}px`;

	canvasElement.height = boardHeight * snakeSizeWithGap;
	canvasElement.style.height = `${canvasElement.height}px`;
}

export function cleanBoard() {
	canvasContext.fillStyle = window
		.getComputedStyle(document.documentElement)
		.getPropertyValue("--color-maize-crayola");
	canvasContext.fillRect(0, 0, canvasElement.width, canvasElement.height);
}

export function getSnakeStartingPoint(): SnakePosition {
	const { boardWidth, boardHeight, snakeSizeWithGap } = settings;

	const boardWidthInPx = boardWidth * snakeSizeWithGap;
	const quarterScreenX = boardWidthInPx / 4;

	const boardHeightInPx = boardHeight * snakeSizeWithGap;
	const middleScreenY = boardHeightInPx / 2;
	const halfSnakeSize = snakeSizeWithGap / 2;
	const yCoordinate = middleScreenY - halfSnakeSize;

	const normalizedX = Math.floor(quarterScreenX);
	const normalizedY = Math.floor(yCoordinate);

	const snakeStartingPosition: SnakePosition = [normalizedX, normalizedY];

	return snakeStartingPosition;
}

export function drawSnakePart(snakePosition: SnakePosition) {
	const { snakePartSizeInPx } = settings;

	canvasContext.fillStyle = canvasFillStyle;
	canvasContext.fillRect(
		snakePosition[0],
		snakePosition[1],
		snakePartSizeInPx,
		snakePartSizeInPx,
	);
}

export function eraseSnakePart(snakePosition: SnakePosition) {
	const { snakePartSizeInPx } = settings;

	canvasContext.clearRect(
		snakePosition[0],
		snakePosition[1],
		snakePartSizeInPx,
		snakePartSizeInPx,
	);
}
