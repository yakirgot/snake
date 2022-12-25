import settings from "@/settings";
import { SnakePosition } from "@/snake-position.type";
import { addSnakePart, drawSnakeOnBoard } from "@/snake";

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
	const { boardWidth, boardHeight, snakeSizeWithGap } = settings;

	canvasElement.width = boardWidth * snakeSizeWithGap;
	canvasElement.style.width = `${canvasElement.width}px`;

	canvasElement.height = boardHeight * snakeSizeWithGap;
	canvasElement.style.height = `${canvasElement.height}px`;
}

export function cleanUpBoard() {
	canvasContext.fillStyle = window
		.getComputedStyle(document.documentElement)
		.getPropertyValue("--color-maize-crayola");
	canvasContext.fillRect(0, 0, canvasElement.width, canvasElement.height);
}

export function placeSnakeOnStartingPoint() {
	const { snakeInitialLength, snakeSizeWithGap } = settings;
	const snakeStartingPosition = getStartingPoint();

	for (let index = 0; index < snakeInitialLength; index++) {
		const xPositionCompensation = index * snakeSizeWithGap;
		const snakeXPosition = snakeStartingPosition[0] + xPositionCompensation;

		const snakePosition: SnakePosition = [
			snakeXPosition,
			snakeStartingPosition[1],
		];

		addSnakePart(snakePosition);
	}

	drawSnakeOnBoard();
}

function getStartingPoint(): SnakePosition {
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
