import settings from "@/settings";
import { drawSnakePart, eraseSnakePart, getSnakeStartingPoint } from "@/board";
import { SnakePosition } from "@/types/snake-position";
import { resetSnakeDirection, snakeDirection } from "@/snake-direction";

let snakePositions: SnakePosition[] = [];

function addSnakePart(snakePosition: SnakePosition) {
	snakePositions.push(snakePosition);

	drawSnakePart(snakePosition);
}

export function resetSnake() {
	snakePositions = [];
	resetSnakeDirection();
}

function addSnakeHead() {
	const currentPosition = snakePositions.at(-1) as SnakePosition;
	const nextPosition: SnakePosition = [...currentPosition];

	switch (snakeDirection) {
		case "right": {
			nextPosition[0] = currentPosition[0] + settings.snakeSizeWithGap;
			break;
		}
		case "left": {
			nextPosition[0] = currentPosition[0] - settings.snakeSizeWithGap;
			break;
		}
		case "up": {
			nextPosition[1] = currentPosition[1] - settings.snakeSizeWithGap;
			break;
		}
		case "down": {
			nextPosition[1] = currentPosition[1] + settings.snakeSizeWithGap;
			break;
		}
	}

	addSnakePart(nextPosition);
}

function eraseSnakeTail() {
	const snakeTail = snakePositions.shift() as SnakePosition;

	eraseSnakePart(snakeTail);
}

export function moveSnake() {
	if (snakePositions.length === 0) {
		return;
	}

	addSnakeHead();
	eraseSnakeTail();
}

export function placeSnakeOnStartingPoint() {
	const { snakeInitialLength, snakeSizeWithGap } = settings;
	const snakeStartingPosition = getSnakeStartingPoint();

	for (let index = 0; index < snakeInitialLength; index++) {
		const xPositionCompensation = index * snakeSizeWithGap;
		const snakeXPosition = snakeStartingPosition[0] + xPositionCompensation;

		const snakePosition: SnakePosition = [
			snakeXPosition,
			snakeStartingPosition[1],
		];

		addSnakePart(snakePosition);
	}
}
