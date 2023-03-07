import { PartPosition } from "@/types/part-position";
import { getAllAvailablePositions } from "@/parts-positions";
import settings from "@/settings";
import { drawFoodPart } from "@/board";
import { detectPartCollision } from "@/collisions-detection";

const foodPositions: PartPosition[] = [];

function addFoodPart(foodPosition: PartPosition) {
	foodPositions.push(foodPosition);

	drawFoodPart(foodPosition);
}

export function removeFoodPart(partPosition: PartPosition) {
	const index = foodPositions.findIndex((foodPosition) =>
		detectPartCollision(partPosition, foodPosition),
	);

	foodPositions.splice(index, 1);
}

export function resetFood() {
	foodPositions.length = 0;
}

export function isFoodPosition(partPosition: PartPosition) {
	const isPosition = foodPositions.some((foodPosition) =>
		detectPartCollision(partPosition, foodPosition),
	);

	return isPosition;
}

export function placeFoodOnBoard() {
	const availablePositions = getAllAvailablePositions();

	const randomIndex = Math.floor(
		Math.random() * (availablePositions.length - 1),
	);

	addFoodPart(availablePositions[randomIndex]);
}

export function initFood() {
	for (let index = 1; index <= settings.foodPartsOnBoard; index++) {
		placeFoodOnBoard();
	}
}
