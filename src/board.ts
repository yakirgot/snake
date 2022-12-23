import settings from "@/settings";
import { placeSnakePart } from "@/snake";

export let canvasElement: HTMLCanvasElement;
export let canvasContext: CanvasRenderingContext2D;

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

	cleanUpBoard();
}

function setBoardSize() {
	const { boardWidth, boardHeight, snakePartSizeInPx } = settings;

	canvasElement.width = boardWidth * snakePartSizeInPx;
	canvasElement.style.width = `${canvasElement.width}px`;

	canvasElement.height = boardHeight * snakePartSizeInPx;
	canvasElement.style.height = `${canvasElement.height}px`;
}

export function cleanUpBoard() {
	canvasContext.fillStyle = window
		.getComputedStyle(document.documentElement)
		.getPropertyValue("--color-maize-crayola");
	canvasContext.fillRect(0, 0, canvasElement.width, canvasElement.height);
}

export function placeSnakeOnStartingPoint() {
	const { boardWidth, boardHeight, snakePartSizeInPx } = settings;
	const halfSnakeSize = snakePartSizeInPx / 2;

	const boardWidthInPx = boardWidth * snakePartSizeInPx;
	const quarterScreenX = boardWidthInPx / 4;
	const xCoordinate = quarterScreenX - halfSnakeSize;

	const boardHeightInPx = boardHeight * snakePartSizeInPx;
	const middleScreenY = boardHeightInPx / 2;
	const yCoordinate = middleScreenY - halfSnakeSize;

	const normalizedX = Math.floor(xCoordinate);
	const normalizedY = Math.floor(yCoordinate);

	placeSnakePart(normalizedX, normalizedY);
}
