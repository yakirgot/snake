import { PartPosition } from "@/types/part-position";
import { getAllAvailablePositions } from "@/game-engine/parts-positions";
import settings from "@/game-engine/settings";
import { drawFoodPart } from "@/game-engine/canvas";
import { detectPartCollision } from "@/game-engine/collision-detection";

const foodPositions: PartPosition[] = [];

function addFoodPart(foodPosition: PartPosition) {
	foodPositions.push(foodPosition);
}

function removeFoodPart(partPosition: PartPosition) {
	const index = foodPositions.findIndex((foodPosition) =>
		detectPartCollision(partPosition, foodPosition),
	);

	foodPositions.splice(index, 1);
}

export function resetFood() {
	foodPositions.length = 0;
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
	const isPosition = foodPositions.some((foodPosition) =>
		detectPartCollision(partPosition, foodPosition),
	);

	return isPosition;
}

function placeFood() {
	const availablePositions = getAllAvailablePositions();

	const randomIndex = Math.floor(
		Math.random() * (availablePositions.length - 1),
	);

	const foodPosition: PartPosition = availablePositions[randomIndex];

	addFoodPart(foodPosition);
	drawFoodPart(foodPosition);
}
