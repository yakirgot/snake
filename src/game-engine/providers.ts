import { container } from "tsyringe";
import { GameSettings } from "@/settings";
import { GameState } from "@/game-engine/game-state";

export function registerProviders(): void {
	container.registerSingleton("GameSettings", GameSettings);
	container.registerSingleton("GameState", GameState);
}
