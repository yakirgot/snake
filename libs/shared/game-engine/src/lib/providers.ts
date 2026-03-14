import { container } from "tsyringe";
import { GameSettings, HighScore, SoundSettings } from "@snake/ui-data-access";
import { GameState } from "./game-state.js";
import { GameSounds } from "./game-sounds.js";
import { UIManager } from "./ui-manager.js";
import { GameLoop } from "./game-loop.js";

export function registerProviders(): void {
	container.registerSingleton("GameSettings", GameSettings);
	container.registerSingleton("GameState", GameState);
	container.registerSingleton("HighScore", HighScore);
	container.registerSingleton("GameSounds", GameSounds);
	container.registerSingleton("SoundSettings", SoundSettings);
	container.registerSingleton("UIManager", UIManager);
	container.registerSingleton("GameLoop", GameLoop);
	container.registerInstance("Storage", globalThis.localStorage);
}
