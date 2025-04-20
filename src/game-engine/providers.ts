import { container, Lifecycle } from "tsyringe";
import { GameSettings } from "@/settings";
import { GameData } from "@/game-engine/game-data";

export function registerProviders(): void {
	container.register(
		"GameSettings",
		{ useClass: GameSettings },
		{ lifecycle: Lifecycle.Singleton },
	);

	container.register(
		"GameData",
		{ useClass: GameData },
		{ lifecycle: Lifecycle.Singleton },
	);
}
