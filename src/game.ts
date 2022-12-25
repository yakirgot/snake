import { cleanUpBoard, placeSnakeOnStartingPoint } from "@/board";

const gameInProgressClass = "game-in-progress";
let startButton: Element;

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

	setTimeout(endGame, 5000);
}

function endGame() {
	startButton.classList.remove(gameInProgressClass);

	cleanUpBoard();
}
