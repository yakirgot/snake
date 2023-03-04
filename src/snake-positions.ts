import settings from "@/settings";
import { SnakePosition } from "@/types/snake-position";
import { addSnakePart } from "@/snake";

export function placeSnakeOnStartingPoint() {
	const [xStartingPosition, yStartingPosition] = getSnakeStartingPoint();
	const { snakeInitialLength, snakeSizeWithGap } = settings;

	for (let index = 0; index < snakeInitialLength; index++) {
		const xPositionCompensation = index * snakeSizeWithGap;
		const snakeXPosition = xStartingPosition + xPositionCompensation;

		const snakePosition: SnakePosition = [snakeXPosition, yStartingPosition];

		addSnakePart(snakePosition);
	}
}

function getSnakeStartingPoint(): SnakePosition {
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
