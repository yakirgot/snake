import { container } from "tsyringe";
import { GameSettings } from "../settings";
import { GameState } from "./game-state";
import { HighScore } from "./high-score";
import { GameSounds } from "./audio/game-sounds";
import { SoundSettings } from "./audio/sound-settings";

export function registerProviders(): void {
	container.registerSingleton("GameSettings", GameSettings);
	container.registerSingleton("GameState", GameState);
	container.registerSingleton("HighScore", HighScore);
	container.registerSingleton("GameSounds", GameSounds);
	container.registerSingleton("SoundSettings", SoundSettings);
	container.registerInstance("Storage", globalThis.localStorage);
}
