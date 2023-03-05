import settings from "@/settings";
import { drawSnakePart, erasePart } from "@/board";
import { PartPosition } from "@/types/part-position";
import {
	getSnakeDirectionOrFromQueue,
	resetSnakeDirection,
} from "@/snake-direction";
import { detectCollisions } from "@/snake-collisions-detection";

export const snakePositions: PartPosition[] = [];

export function addSnakePart(snakePosition: PartPosition) {
	snakePositions.push(snakePosition);

	drawSnakePart(snakePosition);
}

export function resetSnake() {
	snakePositions.length = 0;
	resetSnakeDirection();
}

function getNextHeadPosition() {
	const currentHeadPosition = snakePositions.at(-1) as PartPosition;
	const nextPosition: PartPosition = [...currentHeadPosition];
	const direction = getSnakeDirectionOrFromQueue();

	switch (direction) {
		case "right": {
			nextPosition[0] = currentHeadPosition[0] + settings.snakeSizeWithGap;
			break;
		}
		case "left": {
			nextPosition[0] = currentHeadPosition[0] - settings.snakeSizeWithGap;
			break;
		}
		case "up": {
			nextPosition[1] = currentHeadPosition[1] - settings.snakeSizeWithGap;
			break;
		}
		case "down": {
			nextPosition[1] = currentHeadPosition[1] + settings.snakeSizeWithGap;
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

	const isCollision = detectCollisions(nextHeadPosition);

	if (isCollision) {
		return true;
	}

	requestAnimationFrame(() => {
		addSnakePart(nextHeadPosition);
		eraseTail();
	});

	return false;
}
