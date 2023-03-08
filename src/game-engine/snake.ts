import settings from "@/game-engine/settings";
import { drawSnakePart, erasePart } from "@/game-engine/canvas";
import { PartPosition } from "@/types/part-position";
import {
	getSnakeDirectionOrFromQueue,
	resetSnakeDirection,
} from "@/game-engine/snake-direction";

const snakePositions: PartPosition[] = [];
let snakeGrowMoves = 0;

export function addSnakePart(snakePosition: PartPosition) {
	snakePositions.push(snakePosition);

	drawSnakePart(snakePosition);
}

export function resetSnake() {
	snakePositions.length = 0;
	snakeGrowMoves = 0;
	resetSnakeDirection();
}

export function growSnake() {
	snakeGrowMoves += settings.snakePartsGrowth;
}

export function getSnakePartsCount() {
	return snakePositions.length;
}

export function getSnakePositions() {
	return snakePositions;
}

export function currentSnakeHeadPosition() {
	return snakePositions.at(-1) as PartPosition;
}

export function getNextSnakeHeadPosition() {
	const nextPosition: PartPosition = [...currentSnakeHeadPosition()];
	const direction = getSnakeDirectionOrFromQueue();
	const { snakeSizeWithGap } = settings;

	switch (direction) {
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

function eraseSnakeTail() {
	const snakeTail = snakePositions.shift() as PartPosition;

	erasePart(snakeTail);
}

export function moveSnake(headPosition: PartPosition) {
	addSnakePart(headPosition);

	if (snakeGrowMoves === 0) {
		eraseSnakeTail();
	} else {
		snakeGrowMoves--;
	}
}
