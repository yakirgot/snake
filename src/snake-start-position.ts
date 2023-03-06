import settings from "@/settings";
import { PartPosition } from "@/types/part-position";
import { addSnakePart } from "@/snake";

export function placeSnakeOnStartingPoint() {
	const [xStartingPosition, yStartingPosition] = getSnakeStartingPoint();
	const { snakeInitialLength, snakeSizeWithGap } = settings;

	for (let index = 0; index < snakeInitialLength; index++) {
		const xPositionCompensation = index * snakeSizeWithGap;
		const snakeXPosition = xStartingPosition + xPositionCompensation;

		const snakePosition: PartPosition = [snakeXPosition, yStartingPosition];

		addSnakePart(snakePosition);
	}
}

function getSnakeStartingPoint() {
	const { boardWidthInSnakeParts, boardHeightInSnakeParts, snakeSizeWithGap } =
		settings;

	const boardWidthInPx = boardWidthInSnakeParts * snakeSizeWithGap;
	const quarterScreenX = boardWidthInPx / 4;

	const boardHeightInPx = boardHeightInSnakeParts * snakeSizeWithGap;
	const yCoordinate = boardHeightInPx / 2;

	const normalizedX = Math.floor(quarterScreenX);
	const normalizedY = Math.floor(yCoordinate);

	const snakeStartingPosition: PartPosition = [normalizedX, normalizedY];

	return snakeStartingPosition;
}
