import "core-js/full/reflect/index.js";
import "@/styles/styles.css";
import { initGame } from "@/game-engine/game";
import { container, Lifecycle } from "tsyringe";
import { GameSettings } from "@/settings";
import { GameData } from "@/game-engine/game-data";

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

initGame();
