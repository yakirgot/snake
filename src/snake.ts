import settings from "@/settings";
import { drawSnakePart, eraseSnakePart } from "@/board";
import { SnakePosition } from "@/types/snake-position";
import {
	getSnakeDirectionOrFromQueue,
	resetSnakeDirection,
} from "@/snake-direction";
import { detectCollisions } from "@/snake-collisions-detection";

export let snakePositions: SnakePosition[] = [];

export function addSnakePart(snakePosition: SnakePosition) {
	snakePositions.push(snakePosition);

	drawSnakePart(snakePosition);
}

export function resetSnake() {
	snakePositions = [];
	resetSnakeDirection();
}

function getNextHeadPosition() {
	const currentHeadPosition = snakePositions.at(-1) as SnakePosition;
	const nextPosition: SnakePosition = [...currentHeadPosition];

	switch (getSnakeDirectionOrFromQueue()) {
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
	const snakeTail = snakePositions.shift() as SnakePosition;

	eraseSnakePart(snakeTail);
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
