import { Position } from "@snake/models";
import { drawFoodPart } from "./canvas/canvas-draw.js";
import { arePositionsEqual } from "./collision-detection.js";
import { container } from "tsyringe";
import { GameSettings } from "./settings.js";
import { GameState } from "./game-state.js";

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
	const isPosition = gameState.foodPositions.some((foodPosition: Position) =>
		arePositionsEqual(position, foodPosition),
	);

	return isPosition;
}

function removeFoodPart(position: Position): void {
	const gameState = container.resolve<GameState>("GameState");
	const index = gameState.foodPositions.findIndex((foodPosition: Position) =>
		arePositionsEqual(position, foodPosition),
	);

	gameState.foodPositions.splice(index, 1);
}

function placeNewFood(): void {
	const gameState = container.resolve<GameState>("GameState");

	const occupiedPositions = new Set(
		[...gameState.snakePositions, ...gameState.foodPositions].map(
			(p) => `${p[0]},${p[1]}`,
		),
	);

	const freePositions = gameState.canvasGridPositions.filter(
		(position: Position) =>
			!occupiedPositions.has(`${position[0]},${position[1]}`),
	);

	if (freePositions.length === 0) {
		return;
	}

	const randomIndex = Math.floor(Math.random() * freePositions.length);
	const foodPosition: Position = freePositions[randomIndex];

	gameState.foodPositions.push(foodPosition);
	drawFoodPart(foodPosition);
}
