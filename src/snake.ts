import settings from "@/settings";
import { drawSnakePart, eraseSnakePart, getSnakeStartingPoint } from "@/board";
import { SnakePosition } from "@/types/snake-position";
import { SnakeDirection } from "@/types/snake-direction";

export let snakeDirection: SnakeDirection = "right";

let snakePositions: SnakePosition[] = [];

function addSnakePart(snakePosition: SnakePosition) {
	snakePositions.push(snakePosition);

	drawSnakePart(snakePosition);
}

export function resetSnake() {
	snakePositions = [];
	snakeDirection = "right";
}

function addSnakeHead() {
	const snakeHeadPosition = snakePositions.at(-1) as SnakePosition;
	let nextSnakeHeadPosition: SnakePosition;

	switch (snakeDirection) {
		case "right": {
			nextSnakeHeadPosition = [
				snakeHeadPosition[0] + settings.snakeSizeWithGap,
				snakeHeadPosition[1],
			];
			break;
		}
		case "left": {
			nextSnakeHeadPosition = [
				snakeHeadPosition[0] - settings.snakeSizeWithGap,
				snakeHeadPosition[1],
			];
			break;
		}
		case "up": {
			nextSnakeHeadPosition = [
				snakeHeadPosition[0],
				snakeHeadPosition[1] - settings.snakeSizeWithGap,
			];
			break;
		}
		case "down": {
			nextSnakeHeadPosition = [
				snakeHeadPosition[0],
				snakeHeadPosition[1] + settings.snakeSizeWithGap,
			];
			break;
		}
	}

	addSnakePart(nextSnakeHeadPosition);
}

function eraseSnakeTail() {
	const snakeTail = snakePositions.shift() as SnakePosition;

	eraseSnakePart(snakeTail);
}

export function moveSnake() {
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

export function maybeChangeSnakeDirection(direction: SnakeDirection) {
	if (snakeDirection === direction) {
		return;
	}

	if (snakeDirection === "up" && direction === "down") {
		return;
	}

	if (snakeDirection === "down" && direction === "up") {
		return;
	}

	if (snakeDirection === "left" && direction === "right") {
		return;
	}

	if (snakeDirection === "right" && direction === "left") {
		return;
	}

	snakeDirection = direction;
}
