import { cleanUpBoard, placeSnakeOnStartingPoint } from "@/board";

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
		startButton.classList.add("game-in-progress");

		startGame();
	});
}

export function startGame() {
	placeSnakeOnStartingPoint();

	setTimeout(endGame, 5000);
}

function endGame() {
	startButton.classList.remove("game-in-progress");

	cleanUpBoard();
}
