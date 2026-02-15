import "core-js/full/reflect/index.js";
import { registerProviders } from "./app/game-engine/providers";
import { bootstrapGame } from "./app/game-engine/game";

function init() {
	registerProviders();
	bootstrapGame();
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}
