import settings from "@/settings";
import { drawSnakePart, eraseSnakePart, getSnakeStartingPoint } from "@/board";
import { SnakePosition } from "@/types/snake-position";

let snakePositions: SnakePosition[] = [];

function addSnakePart(snakePosition: SnakePosition) {
	snakePositions.push(snakePosition);

	drawSnakePart(snakePosition);
}

function popFirstSnakePart() {
	const firstSnakePart = snakePositions.shift() as SnakePosition;

	eraseSnakePart(firstSnakePart);
}

export function resetSnake() {
	snakePositions = [];
}

export function moveSnake() {
	const snakeHeadPosition = snakePositions.at(-1) as SnakePosition;
	const nextSnakePositionX = snakeHeadPosition[0] + settings.snakeSizeWithGap;
	const nextSnakeHeadPosition: SnakePosition = [
		nextSnakePositionX,
		snakeHeadPosition[1],
	];

	addSnakePart(nextSnakeHeadPosition);

	popFirstSnakePart();
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
