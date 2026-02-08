import "core-js/full/reflect/index.js";
import { registerProviders } from "./app/game-engine/providers";
import { bootstrapGame } from "./app/game-engine/game";

registerProviders();

bootstrapGame();
