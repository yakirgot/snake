import { container } from "tsyringe";
import { GameSettings } from "./settings.js";
import { GameState } from "./game-state.js";
import { HighScore } from "./high-score.js";
import { GameSounds } from "./audio/game-sounds.js";
import { SoundSettings } from "./audio/sound-settings.js";

export function registerProviders(): void {
	container.registerSingleton("GameSettings", GameSettings);
	container.registerSingleton("GameState", GameState);
	container.registerSingleton("HighScore", HighScore);
	container.registerSingleton("GameSounds", GameSounds);
	container.registerSingleton("SoundSettings", SoundSettings);
	container.registerInstance("Storage", globalThis.localStorage);
}
