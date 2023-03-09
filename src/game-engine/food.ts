import { PartPosition } from "@/types/part-position";
import settings from "@/settings";
import { drawFoodPart } from "@/game-engine/canvas";
import {
	detectPartCollision,
	detectSnakeSelfCollision,
} from "@/game-engine/collision-detection";
import { gameData } from "@/game-engine/game-data";

function addFoodPart(foodPosition: PartPosition) {
	gameData.foodPositions.push(foodPosition);
}

function removeFoodPart(partPosition: PartPosition) {
	const index = gameData.foodPositions.findIndex((foodPosition) =>
		detectPartCollision(partPosition, foodPosition),
	);

	gameData.foodPositions.splice(index, 1);
}

export function resetFood() {
	gameData.foodPositions.length = 0;
}

export function initFood() {
	for (let index = 1; index <= settings.foodPartsOnCanvas; index++) {
		placeFood();
	}
}

export function replaceFoodPosition(foodPosition: PartPosition) {
	removeFoodPart(foodPosition);

	placeFood();
}

export function isFoodPosition(partPosition: PartPosition) {
	const isPosition = gameData.foodPositions.some((foodPosition) =>
		detectPartCollision(partPosition, foodPosition),
	);

	return isPosition;
}

function placeFood() {
	const availablePositions = gameData.allPartsPositions.filter((partPosition) =>
		isAvailablePosition(partPosition),
	);
	const randomIndex = Math.floor(
		Math.random() * (availablePositions.length - 1),
	);

	const foodPosition: PartPosition = availablePositions[randomIndex];

	addFoodPart(foodPosition);
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
