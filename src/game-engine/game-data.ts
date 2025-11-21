import { PartPosition } from "@/types/snake-types";
import { SnakeDirection } from "@/types/snake-types";
import { container, singleton } from "tsyringe";
import { GameSettings } from "@/settings";

@singleton()
export class GameData {
	readonly #gameSettings = container.resolve(GameSettings);

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
		const head = this.snakePositions.at(-1);
		if (!head) {
			throw new Error("Snake has no positions");
		}
		return head;
	}
}
