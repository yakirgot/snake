import { cleanBoard } from "@/board";
import { moveSnake, placeSnakeOnStartingPoint, resetSnake } from "@/snake";
import settings from "@/settings";

const gameInProgressClass = "game-in-progress";
let startButton: Element;
let moveSnakeIntervalId: number | undefined;

export function initGame() {
	const possibleStartButton = document.querySelector(
		"[data-snake-game-start-button]",
	);

	if (!possibleStartButton) {
		return;
	}

	startButton = possibleStartButton;

	startButton.addEventListener("click", () => {
		startButton.classList.add(gameInProgressClass);

		startGame();
	});
}

function startGame() {
	placeSnakeOnStartingPoint();

	moveSnakeIntervalId = window.setInterval(
		moveSnake,
		settings.snakeIntervalInMs,
	);

	setTimeout(endGame, 5000);
}

function endGame() {
	startButton.classList.remove(gameInProgressClass);
	window.clearInterval(moveSnakeIntervalId);
	moveSnakeIntervalId = undefined;

	resetSnake();
	cleanBoard();
}
