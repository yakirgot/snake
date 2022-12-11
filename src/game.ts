import { cleanUpBoard } from "@/board";
import { placeSnakePart } from "@/snake";

const startButton = document.querySelector("[data-snake-game-start-button]");

export function initGame() {
	if (!startButton) {
		return;
	}

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
	if (!startButton) {
		return;
	}

	startButton.classList.remove("game-in-progress");
	cleanUpBoard();
}
