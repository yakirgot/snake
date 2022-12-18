import "the-new-css-reset/css/reset.css";
import "@/styles/styles.scss";
import { setupBoard } from "@/board";
import { initGame } from "@/game";

const appElement = document.querySelector("#app");

if (appElement) {
	appElement.innerHTML = `
		<div class="snake-game-container">
			<h1 class="snake-game-title">Snake Game</h1>

			<canvas data-snake-game class="snake-game-canvas"></canvas>

			<div class="snake-game-start-button-container">
				<button
					class="snake-game-start-button"
					data-snake-game-start-button
					tabindex="1"
				>
					Start!
				</button>
			</div>
		</div>
	`;

	setupBoard();
	initGame();
}
