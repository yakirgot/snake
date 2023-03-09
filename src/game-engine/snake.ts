import settings from "@/settings";
import { drawSnakePart, erasePart } from "@/game-engine/canvas";
import { PartPosition } from "@/types/part-position";
import {
	getSnakeDirectionOrFromQueue,
	resetSnakeDirection,
} from "@/game-engine/snake-direction";
import { gameData } from "@/game-engine/game-data";

export function addSnakePart(snakePosition: PartPosition) {
	gameData.snakePositions.push(snakePosition);

	drawSnakePart(snakePosition);
}

export function resetSnake() {
	gameData.snakePositions.length = 0;
	gameData.snakeGrowMoves = 0;
	resetSnakeDirection();
}

export function growSnake() {
	gameData.snakeGrowMoves += settings.snakePartsGrowth;
}

export function getSnakePartsCount() {
	return gameData.snakePositions.length;
}

export function getSnakePositions() {
	return gameData.snakePositions;
}

export function currentSnakeHeadPosition() {
	return gameData.snakePositions.at(-1) as PartPosition;
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
	const snakeTail = gameData.snakePositions.shift() as PartPosition;

	erasePart(snakeTail);
}

export function moveSnake(headPosition: PartPosition) {
	addSnakePart(headPosition);

	if (gameData.snakeGrowMoves === 0) {
		eraseSnakeTail();
	} else {
		gameData.snakeGrowMoves--;
	}
}
