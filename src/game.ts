import { cleanBoard, setupBoard } from "@/board";
import {
	currentSnakeHeadPosition,
	moveSnakeAndDetectCollisions,
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
	placeFoodOnBoard,
	removeFoodPart,
	resetFood,
} from "@/food";
import { updateAllPartsPositions } from "@/parts-positions";

let startButton: HTMLButtonElement;
let moveSnakeIntervalId: number | undefined;

export async function initGame() {
	setupBoard();

	updateStartButton();

	startButton.disabled = true;

	await updateAllPartsPositions();

	startButton.disabled = false;

	startButton.addEventListener("click", () => {
		startButton.disabled = true;

		startGame();
	});
}

function updateStartButton() {
	const possibleStartButton = document.querySelector(
		"[data-snake-game-start-button]",
	) as HTMLButtonElement | undefined;

	if (!possibleStartButton) {
		return;
	}

	startButton = possibleStartButton;
}

function startGame() {
	placeSnakeOnStartingPoint();
	initFood();
	listenToUserArrowKeys();

	moveSnakeIntervalId = window.setInterval(
		makeGameMove,
		settings.snakeIntervalInMs,
	);
}

function makeGameMove() {
	const hasCollisionOccurred = moveSnakeAndDetectCollisions();

	if (hasCollisionOccurred) {
		endGame();

		return;
	}

	const hasEaten = isFoodPosition(currentSnakeHeadPosition());

	if (hasEaten) {
		removeFoodPart(currentSnakeHeadPosition());
		placeFoodOnBoard();
	}
}

function endGame() {
	window.clearInterval(moveSnakeIntervalId);
	moveSnakeIntervalId = undefined;

	startButton.disabled = false;

	resetSnake();
	resetFood();
	cleanBoard();
	cancelListenToUserArrowKeys();
}
