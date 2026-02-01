import { drawSnakePart, erasePart } from "@/game-engine/canvas/canvas-draw";
import { Position } from "@/types/snake-types";
import { container } from "tsyringe";
import { GameSettings } from "@/settings";
import { GameState } from "@/game-engine/game-state";

export function moveSnake(headPosition: Position): void {
	addAndDrawSnakePart(headPosition);

	const gameState = container.resolve<GameState>("GameState");
	if (gameState.pendingSnakeGrowthSteps === 0) {
		eraseSnakeTail();
	} else {
		gameState.pendingSnakeGrowthSteps--;
	}
}

export function resetSnake(): void {
	const gameState = container.resolve<GameState>("GameState");
	gameState.snakePositions.length = 0;
	gameState.pendingSnakeGrowthSteps = 0;
}

export function getNextSnakeHeadPosition(): Position {
	const gameSettings = container.resolve<GameSettings>("GameSettings");
	const { snakeSizeWithGap } = gameSettings;

	const gameState = container.resolve<GameState>("GameState");
	const nextPosition: Position = [...gameState.currentSnakeHeadPosition];

	switch (gameState.currentSnakeDirection) {
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

export function initializeSnakePosition(): void {
	const [xStartingPosition, yStartingPosition] = getSnakeStartingPoint();
	const gameSettings = container.resolve<GameSettings>("GameSettings");
	const { snakeInitialLength, snakeSizeWithGap } = gameSettings;

	for (let index = 0; index < snakeInitialLength; index++) {
		const xPositionCompensation = index * snakeSizeWithGap;
		const snakeXPosition = xStartingPosition + xPositionCompensation;
		const snakePosition: Position = [snakeXPosition, yStartingPosition];

		addAndDrawSnakePart(snakePosition);
	}
}

function addAndDrawSnakePart(position: Position): void {
	const gameState = container.resolve<GameState>("GameState");
	gameState.snakePositions.push(position);

	drawSnakePart(position);
}

function eraseSnakeTail(): void {
	const gameState = container.resolve<GameState>("GameState");
	const snakeTail = gameState.snakePositions.shift() as Position;

	erasePart(snakeTail);
}

function getSnakeStartingPoint(): Position {
	const gameSettings = container.resolve<GameSettings>("GameSettings");
	const {
		canvasWidthInSnakeParts,
		canvasHeightInSnakeParts,
		snakeSizeWithGap,
	} = gameSettings;

	const xGridCoordinate = Math.floor(canvasWidthInSnakeParts / 4);
	const yGridCoordinate = Math.floor(canvasHeightInSnakeParts / 2);

	const snakeStartingPosition: Position = [
		xGridCoordinate * snakeSizeWithGap,
		yGridCoordinate * snakeSizeWithGap,
	];

	return snakeStartingPosition;
}
