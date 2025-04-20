import { PartPosition } from "@/types/snake-types";
import { SnakeDirection } from "@/types/snake-types";
import { container, singleton } from "tsyringe";
import { GameSettings } from "@/settings";

@singleton()
export class GameData {
	#gameSettings = container.resolve(GameSettings);

	allPartsPositions: PartPosition[] = [];
	snakePositions: PartPosition[] = [];
	foodPositions: PartPosition[] = [];
	snakeGrowMoves = 0;
	currentSnakeDirection = this.#gameSettings.snakeStartingDirection;
	snakeDirectionQueue: SnakeDirection[] = [];

	get snakePartsCount(): number {
		return this.snakePositions.length;
	}

	get currentSnakeHeadPosition(): PartPosition {
		return this.snakePositions.at(-1) as unknown as PartPosition;
	}
}
