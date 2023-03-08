import settings from "@/game-engine/settings";
import { PartPosition } from "@/types/part-position";
import { addSnakePart } from "@/game-engine/snake";

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
	const {
		canvasWidthInSnakeParts,
		canvasHeightInSnakeParts,
		snakeSizeWithGap,
	} = settings;

	const canvasWidthInPx = canvasWidthInSnakeParts * snakeSizeWithGap;
	const quarterScreenX = canvasWidthInPx / 4;

	const canvasHeightInPx = canvasHeightInSnakeParts * snakeSizeWithGap;
	const yCoordinate = canvasHeightInPx / 2;

	const normalizedX = Math.floor(quarterScreenX);
	const normalizedY = Math.floor(yCoordinate);

	const snakeStartingPosition: PartPosition = [normalizedX, normalizedY];

	return snakeStartingPosition;
}
