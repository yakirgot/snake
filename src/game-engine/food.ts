import { Position } from "@/types/snake-types";
import { drawFoodPart } from "@/game-engine/canvas/canvas-draw";
import {
	arePositionsEqual,
	detectSnakeSelfCollision,
} from "@/game-engine/collision-detection";
import { container } from "tsyringe";
import { GameSettings } from "@/settings";
import { GameState } from "@/game-engine/game-state";

export function resetFood(): void {
	const gameState = container.resolve<GameState>("GameState");
	gameState.foodPositions.length = 0;
}

export function spawnInitialFood(): void {
	const gameSettings = container.resolve<GameSettings>("GameSettings");
	for (let index = 1; index <= gameSettings.foodPartsOnCanvas; index++) {
		placeNewFood();
	}
}

export function replaceFoodPositionIfWasEaten(position: Position): boolean {
	const hasEaten = isFoodPosition(position);

	if (!hasEaten) {
		return false;
	}

	removeFoodPart(position);
	placeNewFood();

	return true;
}

function isFoodPosition(position: Position): boolean {
	const gameState = container.resolve<GameState>("GameState");
	const isPosition = gameState.foodPositions.some((foodPosition) =>
		arePositionsEqual(position, foodPosition),
	);

	return isPosition;
}

function removeFoodPart(position: Position): void {
	const gameState = container.resolve<GameState>("GameState");
	const index = gameState.foodPositions.findIndex((foodPosition) =>
		arePositionsEqual(position, foodPosition),
	);

	gameState.foodPositions.splice(index, 1);
}

function placeNewFood(): void {
	const gameState = container.resolve<GameState>("GameState");

	const freePositions = gameState.canvasGridPositions.filter((position) =>
		isFreePosition(position),
	);
	const randomIndex = Math.floor(Math.random() * (freePositions.length - 1));

	const foodPosition: Position = freePositions[randomIndex];

	gameState.foodPositions.push(foodPosition);
	drawFoodPart(foodPosition);
}

function isFreePosition(position: Position): boolean {
	const isSnakePart = detectSnakeSelfCollision(position);

	if (isSnakePart) {
		return false;
	}

	const isFoodPart = isFoodPosition(position);

	return !isFoodPart;
}
