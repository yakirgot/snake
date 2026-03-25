import { Position, SnakeDirection } from "@snake/models";
import { container, singleton } from "tsyringe";
import { GameSettings } from "./settings.js";
import { SoundSettings } from "./sound-settings.js";

@singleton()
export class GameState {
	canvasGridPositions: Position[] = [];
	snakePositions: Position[] = [];
	foodPositions: Position[] = [];
	pendingSnakeGrowthSteps = 0;
	snakeDirectionQueue: SnakeDirection[] = [];
	highScore = 0;

	readonly #gameSettings = container.resolve<GameSettings>("GameSettings");
	currentSnakeDirection = this.#gameSettings.snakeStartingDirection;

	readonly #soundSettings = container.resolve<SoundSettings>("SoundSettings");
	soundsEnabled = this.#soundSettings.isSoundEnabled();

	get snakePartsCount(): number {
		return this.snakePositions.length;
	}

	get currentSnakeHeadPosition(): Position {
		const head = this.snakePositions.at(-1);
		if (!head) throw new Error("Snake has no positions");

		return head;
	}
}
