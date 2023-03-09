import settings from "@/settings";
import { drawSnakePart, erasePart } from "@/game-engine/canvas";
import { PartPosition } from "@/types/part-position";
import { getSnakeDirectionOrFromQueue } from "@/game-engine/snake-direction";
import { gameData } from "@/game-engine/game-data";

export function moveSnake(headPosition: PartPosition) {
	addAndDrawSnakePart(headPosition);

	if (gameData.snakeGrowMoves === 0) {
		eraseSnakeTail();
	} else {
		gameData.snakeGrowMoves--;
	}
}

export function addAndDrawSnakePart(snakePosition: PartPosition) {
	gameData.snakePositions.push(snakePosition);

	drawSnakePart(snakePosition);
}

export function resetSnake() {
	gameData.snakePositions.length = 0;
	gameData.snakeGrowMoves = 0;
}

export function getNextSnakeHeadPosition() {
	const nextPosition: PartPosition = [...gameData.currentSnakeHeadPosition];
	const direction = getSnakeDirectionOrFromQueue();
	const { snakeSizeWithGap } = settings;

	switch (direction) {
		case "right": {
			nextPosition[0] += snakeSizeWithGap;
			break;
		}
		case "left": {
			nextPosition[0] -= snakeSizeWithGap;
			break;
		}
		case "up": {
			nextPosition[1] -= snakeSizeWithGap;
			break;
		}
		case "down": {
			nextPosition[1] += snakeSizeWithGap;
			break;
		}
	}

	return nextPosition;
}

function eraseSnakeTail() {
	const snakeTail = gameData.snakePositions.shift() as PartPosition;

	erasePart(snakeTail);
}

export function placeSnakeOnStartingPoint() {
	const [xStartingPosition, yStartingPosition] = getSnakeStartingPoint();
	const { snakeInitialLength, snakeSizeWithGap } = settings;

	for (let index = 0; index < snakeInitialLength; index++) {
		const xPositionCompensation = index * snakeSizeWithGap;
		const snakeXPosition = xStartingPosition + xPositionCompensation;

		const snakePosition: PartPosition = [snakeXPosition, yStartingPosition];

		addAndDrawSnakePart(snakePosition);
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
