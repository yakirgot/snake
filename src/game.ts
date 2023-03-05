import { cleanBoard } from "@/board";
import { moveSnakeAndDetectCollisions, resetSnake } from "@/snake";
import settings from "@/settings";
import {
	cancelListenToUserArrowKeys,
	listenToUserArrowKeys,
} from "@/user-interactions";
import { placeSnakeOnStartingPoint } from "@/snake-positions";

let startButton: HTMLButtonElement;
let moveSnakeIntervalId: number | undefined;

export function initGame() {
	const possibleStartButton = document.querySelector(
		"[data-snake-game-start-button]",
	) as HTMLButtonElement | undefined;

	if (!possibleStartButton) {
		return;
	}

	startButton = possibleStartButton;

	startButton.addEventListener("click", () => {
		startButton.disabled = true;

		startGame();
	});
}

function startGame() {
	placeSnakeOnStartingPoint();

	moveSnakeIntervalId = window.setInterval(() => {
		const hasCollisionOccurred = moveSnakeAndDetectCollisions();

		if (hasCollisionOccurred) {
			endGame();
		}
	}, settings.snakeIntervalInMs);

	listenToUserArrowKeys();
}

export function endGame() {
	startButton.disabled = false;
	window.clearInterval(moveSnakeIntervalId);
	moveSnakeIntervalId = undefined;

	cancelListenToUserArrowKeys();
	resetSnake();
	cleanBoard();
}
