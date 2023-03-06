import { PartPosition } from "@/types/part-position";

const foodPositions: Set<PartPosition> = new Set();

function addFoodPart(foodPosition: PartPosition) {
	foodPositions.add(foodPosition);
}

function removeFoodPart(foodPosition: PartPosition) {
	foodPositions.delete(foodPosition);
}

export function resetFood() {
	foodPositions.clear();
}

function isEatingFood(snakePosition: PartPosition) {
	return foodPositions.has(snakePosition);
}

function placeFoodOnBoard() {}

export function initFood() {}
