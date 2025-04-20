import { PartPosition } from "@/types/part-position";
import { drawFoodPart } from "@/game-engine/canvas-draw";
import {
	detectPartCollision,
	detectSnakeSelfCollision,
} from "@/game-engine/collision-detection";
import { container } from "tsyringe";
import { GameSettings } from "@/settings";
import { GameData } from "@/game-engine/game-data";

export function resetFood() {
	const gameData = container.resolve<GameData>("GameData");
	gameData.foodPositions.length = 0;
}

export function initFood() {
	const gameSettings = container.resolve<GameSettings>("GameSettings");
	for (let index = 1; index <= gameSettings.foodPartsOnCanvas; index++) {
		placeNewFood();
	}
}

export function replaceFoodPositionIfHasEaten(partPosition: PartPosition) {
	const hasEaten = isFoodPosition(partPosition);

	if (!hasEaten) {
		return false;
	}

	removeFoodPart(partPosition);
	placeNewFood();

	return true;
}

function isFoodPosition(partPosition: PartPosition) {
	const gameData = container.resolve<GameData>("GameData");
	const isPosition = gameData.foodPositions.some((foodPosition) =>
		detectPartCollision(partPosition, foodPosition),
	);

	return isPosition;
}

function removeFoodPart(partPosition: PartPosition) {
	const gameData = container.resolve<GameData>("GameData");
	const index = gameData.foodPositions.findIndex((foodPosition) =>
		detectPartCollision(partPosition, foodPosition),
	);

	gameData.foodPositions.splice(index, 1);
}

function placeNewFood() {
	const gameData = container.resolve<GameData>("GameData");

	const availablePositions = gameData.allPartsPositions.filter((partPosition) =>
		isAvailablePosition(partPosition),
	);
	const randomIndex = Math.floor(
		Math.random() * (availablePositions.length - 1),
	);

	const foodPosition: PartPosition = availablePositions[randomIndex];

	gameData.foodPositions.push(foodPosition);
	drawFoodPart(foodPosition);
}

function isAvailablePosition(partPosition: PartPosition) {
	const isSnakePart = detectSnakeSelfCollision(partPosition);

	if (isSnakePart) {
		return false;
	}

	const isFoodPart = isFoodPosition(partPosition);

	return !isFoodPart;
}
