import { cleanCanvas, createSnakeSnapshot, setupCanvas } from "@/canvas";
import {
	currentSnakeHeadPosition,
	getNextHeadPosition,
	growSnake,
	isSnakeCollision,
	moveSnake,
	resetSnake,
} from "@/snake";
import settings from "@/settings";
import {
	cancelListenToUserArrowKeys,
	listenToUserArrowKeys,
} from "@/user-interactions";
import { placeSnakeOnStartingPoint } from "@/snake-start-position";
import {
	initFood,
	isFoodPosition,
	placeFood,
	removeFoodPart,
	resetFood,
} from "@/food";
import { updateAllPartsPositions } from "@/parts-positions";
import { initGamePoints, updateGamePointsBySnakeParts } from "@/game-points";

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
	cleanCanvas();
	placeSnakeOnStartingPoint();
	initFood();
	listenToUserArrowKeys();
	updateGamePointsBySnakeParts();

	moveSnakeIntervalId = window.setInterval(
		makeGameMove,
		settings.snakeIntervalInMs,
	);
}

function makeGameMove() {
	const nextHeadPosition = getNextHeadPosition();
	const hasCollisionOccurred = isSnakeCollision(nextHeadPosition);

	if (hasCollisionOccurred) {
		endGame();

		return;
	}

	moveSnake(nextHeadPosition);

	const hasEaten = isFoodPosition(currentSnakeHeadPosition());

	if (hasEaten) {
		removeFoodPart(currentSnakeHeadPosition());
		placeFood();

		growSnake();
	}

	updateGamePointsBySnakeParts();
}

function endGame() {
	window.clearInterval(moveSnakeIntervalId);
	moveSnakeIntervalId = undefined;

	startButton.disabled = false;

	cleanCanvas();
	createSnakeSnapshot();
	resetSnake();
	resetFood();
	cancelListenToUserArrowKeys();
}
