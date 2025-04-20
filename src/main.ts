import "core-js/full/reflect/index.js";
import "@/styles/styles.css";
import { registerProviders } from "@/game-engine/providers";
import { initGame } from "@/game-engine/game";

registerProviders();

initGame();
