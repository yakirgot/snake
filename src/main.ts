import "the-new-css-reset/css/reset.css";
import "@/styles/styles.scss";
import { initGame } from "@/game-engine/game";
import { gameHTML } from "@/game-html";

const appElement = document.querySelector("#app");

if (appElement) {
	appElement.innerHTML = gameHTML();

	initGame();
}
