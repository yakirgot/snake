import { container } from "tsyringe";
import { GameSettings } from "@/settings";
import { GameState } from "@/game-engine/game-state";
import { HighScore } from "@/game-engine/high-score";

export function registerProviders(): void {
	container.registerSingleton("GameSettings", GameSettings);
	container.registerSingleton("GameState", GameState);
	container.registerSingleton("HighScore", HighScore);
	container.registerInstance("Storage", globalThis.localStorage);
}
