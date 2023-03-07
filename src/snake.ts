import settings from "@/settings";
import { drawSnakePart, erasePart } from "@/board";
import { PartPosition } from "@/types/part-position";
import {
	getSnakeDirectionOrFromQueue,
	resetSnakeDirection,
} from "@/snake-direction";
import {
	detectSnakeCollision,
	detectWallCollision,
} from "@/collisions-detection";

export const snakePositions: PartPosition[] = [];

export function addSnakePart(snakePosition: PartPosition) {
	snakePositions.push(snakePosition);

	drawSnakePart(snakePosition);
}

export function resetSnake() {
	snakePositions.length = 0;
	resetSnakeDirection();
}

export function currentSnakeHeadPosition() {
	return snakePositions.at(-1) as PartPosition;
}

function getNextHeadPosition() {
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

function eraseTail() {
	const snakeTail = snakePositions.shift() as PartPosition;

	erasePart(snakeTail);
}

/**
 * @return a collision has occurred
 */
export function moveSnakeAndDetectCollisions() {
	const nextHeadPosition = getNextHeadPosition();

	const isWallCollision = detectWallCollision(nextHeadPosition);
	const isSelfCollision = detectSnakeCollision(nextHeadPosition);

	if (isWallCollision || isSelfCollision) {
		return true;
	}

	addSnakePart(nextHeadPosition);
	eraseTail();

	return false;
}
