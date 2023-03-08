import {
	clearCanvas,
	createSnakeSnapshot,
	setupCanvas,
} from "@/game-engine/canvas";
import {
	currentSnakeHeadPosition,
	getNextSnakeHeadPosition,
	growSnake,
	moveSnake,
	resetSnake,
} from "@/game-engine/snake";
import settings from "@/game-engine/settings";
import { placeSnakeOnStartingPoint } from "@/game-engine/snake-start-position";
import {
	initFood,
	isFoodPosition,
	replaceFoodPosition,
	resetFood,
} from "@/game-engine/food";
import { updateAllPartsPositions } from "@/game-engine/parts-positions";
import {
	initGamePoints,
	updateGamePointsBySnakeParts,
} from "@/game-engine/game-points";
import { PartPosition } from "@/types/part-position";
import { initSnakeDirection } from "@/game-engine/snake-direction";
import { isSnakeCollision } from "@/game-engine/collision-detection";

let startButton: HTMLButtonElement;
let moveSnakeIntervalId: number | undefined;

export async function initGame() {
	setupCanvas();
	initGamePoints();

	startButton = document.querySelector(
		"[data-snake-game-start-button]",
	) as HTMLButtonElement;

	startButton.disabled = true;

	await updateAllPartsPositions();

	startButton.disabled = false;

	startButton.addEventListener("click", () => {
		startButton.disabled = true;

		startGame();
	});
}

function startGame() {
	clearCanvas();
	placeSnakeOnStartingPoint();
	initFood();
	initSnakeDirection();
	updateGamePointsBySnakeParts();

	moveSnakeIntervalId = window.setInterval(
		makeGameMove,
		settings.snakeIntervalInMs,
	);
}

function makeGameMove() {
	const nextHeadPosition = getNextSnakeHeadPosition();
	const hasCollisionOccurred = isSnakeCollision(nextHeadPosition);

	if (hasCollisionOccurred) {
		endGame();

		return;
	}

	moveSnake(nextHeadPosition);

	handleMaybeHasEaten();

	updateGamePointsBySnakeParts();
}

function handleMaybeHasEaten() {
	const snakeHeadPosition: PartPosition = currentSnakeHeadPosition();
	const hasEaten = isFoodPosition(snakeHeadPosition);

	if (!hasEaten) {
		return;
	}

	replaceFoodPosition(snakeHeadPosition);

	growSnake();
}

function endGame() {
	window.clearInterval(moveSnakeIntervalId);
	moveSnakeIntervalId = undefined;

	startButton.disabled = false;

	clearCanvas();
	createSnakeSnapshot();
	resetSnake();
	resetFood();
}
