import { cleanUpBoard } from "@/board";
import { placeSnakePart } from "@/snake";

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

		setTimeout(endGame, 3000);
	});
}

export function startGame() {
	placeSnakePart(0, 0);
}

function endGame() {
	startButton.classList.remove("game-in-progress");

	cleanUpBoard();
}
