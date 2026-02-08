import { Position, SnakeDirection } from "../types/snake-types";
import { container, singleton } from "tsyringe";
import { GameSettings } from "../settings";
import { SoundSettings } from "./audio/sound-settings";

@singleton()
export class GameState {
	readonly #gameSettings = container.resolve<GameSettings>("GameSettings");
	readonly #soundSettings = container.resolve<SoundSettings>("SoundSettings");

	canvasGridPositions: Position[] = [];
	snakePositions: Position[] = [];
	foodPositions: Position[] = [];
	pendingSnakeGrowthSteps = 0;
	currentSnakeDirection = this.#gameSettings.snakeStartingDirection;
	snakeDirectionQueue: SnakeDirection[] = [];
	highScore = 0;
	soundsEnabled = this.#soundSettings.isSoundEnabled();

	get snakePartsCount(): number {
		return this.snakePositions.length;
	}

	get currentSnakeHeadPosition(): Position {
		const head = this.snakePositions.at(-1);
		if (!head) {
			throw new Error("Snake has no positions");
		}
		return head;
	}
}
