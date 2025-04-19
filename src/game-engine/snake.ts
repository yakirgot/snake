import { drawSnakePart, erasePart } from "@/game-engine/canvas";
import { PartPosition } from "@/types/part-position";
import { gameData } from "@/game-engine/game-data";
import { container } from "tsyringe";
import { GameSettings } from "@/settings";

const gameSettings = container.resolve(GameSettings);

export function moveSnake(headPosition: PartPosition): void {
	addAndDrawSnakePart(headPosition);

	if (gameData.snakeGrowMoves === 0) {
		eraseSnakeTail();
	} else {
		gameData.snakeGrowMoves--;
	}
}

export function addAndDrawSnakePart(snakePosition: PartPosition): void {
	gameData.snakePositions.push(snakePosition);

	drawSnakePart(snakePosition);
}

export function resetSnake(): void {
	gameData.snakePositions.length = 0;
	gameData.snakeGrowMoves = 0;
}

export function getNextSnakeHeadPosition(): PartPosition {
	const { snakeSizeWithGap } = gameSettings;
	const nextPosition: PartPosition = [...gameData.currentSnakeHeadPosition];

	switch (gameData.currentSnakeDirection) {
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

function eraseSnakeTail(): void {
	const snakeTail = gameData.snakePositions.shift() as PartPosition;

	erasePart(snakeTail);
}

export function placeSnakeOnStartingPoint() {
	const [xStartingPosition, yStartingPosition] = getSnakeStartingPoint();
	const { snakeInitialLength, snakeSizeWithGap } = gameSettings;

	for (let index = 0; index < snakeInitialLength; index++) {
		const xPositionCompensation = index * snakeSizeWithGap;
		const snakeXPosition = xStartingPosition + xPositionCompensation;
		const snakePosition: PartPosition = [snakeXPosition, yStartingPosition];

		addAndDrawSnakePart(snakePosition);
	}
}

function getSnakeStartingPoint(): PartPosition {
	const {
		canvasWidthInSnakeParts,
		canvasHeightInSnakeParts,
		snakeSizeWithGap,
	} = gameSettings;

	const canvasWidthInPx = canvasWidthInSnakeParts * snakeSizeWithGap;
	const quarterScreenX = canvasWidthInPx / 4;

	const canvasHeightInPx = canvasHeightInSnakeParts * snakeSizeWithGap;
	const yCoordinate = canvasHeightInPx / 2;

	const normalizedX = Math.floor(quarterScreenX);
	const normalizedY = Math.floor(yCoordinate);

	const snakeStartingPosition: PartPosition = [normalizedX, normalizedY];

	return snakeStartingPosition;
}
