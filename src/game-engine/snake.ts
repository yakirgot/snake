import { drawSnakePart, erasePart } from "@/game-engine/canvas/canvas-draw";
import { PartPosition } from "@/types/part-position";
import { container } from "tsyringe";
import { GameSettings } from "@/settings";
import { GameData } from "@/game-engine/game-data";

export function moveSnake(headPosition: PartPosition): void {
	addAndDrawSnakePart(headPosition);

	const gameData = container.resolve<GameData>("GameData");
	if (gameData.snakeGrowMoves === 0) {
		eraseSnakeTail();
	} else {
		gameData.snakeGrowMoves--;
	}
}

export function addAndDrawSnakePart(snakePosition: PartPosition): void {
	const gameData = container.resolve<GameData>("GameData");
	gameData.snakePositions.push(snakePosition);

	drawSnakePart(snakePosition);
}

export function resetSnake(): void {
	const gameData = container.resolve<GameData>("GameData");
	gameData.snakePositions.length = 0;
	gameData.snakeGrowMoves = 0;
}

export function getNextSnakeHeadPosition(): PartPosition {
	const gameSettings = container.resolve<GameSettings>("GameSettings");
	const { snakeSizeWithGap } = gameSettings;

	const gameData = container.resolve<GameData>("GameData");
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
	const gameData = container.resolve<GameData>("GameData");
	const snakeTail = gameData.snakePositions.shift() as PartPosition;

	erasePart(snakeTail);
}

export function placeSnakeOnStartingPoint() {
	const [xStartingPosition, yStartingPosition] = getSnakeStartingPoint();
	const gameSettings = container.resolve<GameSettings>("GameSettings");
	const { snakeInitialLength, snakeSizeWithGap } = gameSettings;

	for (let index = 0; index < snakeInitialLength; index++) {
		const xPositionCompensation = index * snakeSizeWithGap;
		const snakeXPosition = xStartingPosition + xPositionCompensation;
		const snakePosition: PartPosition = [snakeXPosition, yStartingPosition];

		addAndDrawSnakePart(snakePosition);
	}
}

function getSnakeStartingPoint(): PartPosition {
	const gameSettings = container.resolve<GameSettings>("GameSettings");
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
