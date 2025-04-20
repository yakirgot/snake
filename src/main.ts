import "core-js/full/reflect/index.js";
import "@/styles/styles.css";
import { initGame } from "@/game-engine/game";
import { container } from "tsyringe";
import { GameSettings } from "@/settings";

container.register("GameSettings", { useClass: GameSettings });

initGame();
