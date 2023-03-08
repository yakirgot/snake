import {
	cleanCanvas,
	createSnakeSnapshot,
	setupCanvas,
} from "@/game-engine/canvas";
import {
	currentSnakeHeadPosition,
	getNextHeadPosition,
	growSnake,
	isSnakeCollision,
	moveSnake,
	resetSnake,
} from "@/game-engine/snake";
import settings from "@/game-engine/settings";
import {
	cancelListenToUserArrowKeys,
	listenToUserArrowKeys,
} from "@/game-engine/user-interactions";
import { placeSnakeOnStartingPoint } from "@/game-engine/snake-start-position";
import {
	initFood,
	isFoodPosition,
	placeFood,
	removeFoodPart,
	resetFood,
} from "@/game-engine/food";
import { updateAllPartsPositions } from "@/game-engine/parts-positions";
import {
	initGamePoints,
	updateGamePointsBySnakeParts,
} from "@/game-engine/game-points";

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

	handleMaybeHasEaten();

	updateGamePointsBySnakeParts();
}

function handleMaybeHasEaten() {
	const hasEaten = isFoodPosition(currentSnakeHeadPosition());

	if (!hasEaten) {
		return;
	}

	removeFoodPart(currentSnakeHeadPosition());
	placeFood();

	growSnake();
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
