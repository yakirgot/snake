import { container, singleton } from "tsyringe";
import { GameSettings, GameState, HighScore } from "@snake/ui-data-access";
import { applyNextDirection, resetSnakeDirection } from "./snake-direction.js";
import { GameSounds } from "./game-sounds.js";
import { getNextSnakeHeadPosition, moveSnake, resetSnake } from "./snake.js";
import { checkSnakeCollision } from "./collision-detection.js";
import { replaceFoodPositionIfWasEaten, resetFood } from "./food.js";
import { UIManager } from "./ui-manager.js";
import { clearCanvas, renderGameOverSnapshot } from "./canvas/canvas-setup.js";

@singleton()
export class GameLoop {
	readonly #gameState = container.resolve<GameState>("GameState");
	readonly #gameSettings = container.resolve<GameSettings>("GameSettings");
	readonly #audioService = container.resolve<GameSounds>("GameSounds");
	readonly #uiManager = container.resolve<UIManager>("UIManager");
	readonly #highScore = container.resolve<HighScore>("HighScore");

	#moveSnakeIntervalId: ReturnType<typeof setTimeout> | undefined;

	startGameLoop(): void {
		this.#moveSnakeIntervalId = globalThis.setInterval(() => {
			globalThis.requestAnimationFrame(this.#processGameTick.bind(this));
		}, this.#gameSettings.snakeIntervalInMs);
	}

	stopGameLoop(): void {
		globalThis.clearInterval(this.#moveSnakeIntervalId);
		this.#moveSnakeIntervalId = undefined;
	}

	#processGameTick(): void {
		if (this.#gameState.snakeDirectionQueue.length > 0) {
			const directionChanged = applyNextDirection();
			if (directionChanged) {
				this.#audioService.playChangeDirectionSound();
			}
		}

		const nextHeadPosition = getNextSnakeHeadPosition();
		const hasCollisionOccurred = checkSnakeCollision(nextHeadPosition);

		if (hasCollisionOccurred) {
			this.endGame();

			return;
		}

		const snakeWasGrowing = this.#gameState.pendingSnakeGrowthSteps > 0;
		moveSnake(nextHeadPosition);

		const hasEaten = replaceFoodPositionIfWasEaten(
			this.#gameState.currentSnakeHeadPosition,
		);

		if (hasEaten) {
			this.#gameState.pendingSnakeGrowthSteps +=
				this.#gameSettings.snakePartsGrowth;
			this.#audioService.playEatSound();

			this.#uiManager.announce(
				`Food eaten. ${
					this.#gameState.snakePartsCount +
					this.#gameState.pendingSnakeGrowthSteps
				} points`,
			);
		}

		if (snakeWasGrowing) {
			this.#uiManager.updateGamePointsBySnakeParts();
		}
	}

	endGame(): void {
		this.#audioService.playGameOverSound();

		this.stopGameLoop();

		this.#uiManager.setStartButtonDisabled(false);

		if (this.#gameState.snakePartsCount > this.#gameState.highScore) {
			this.#gameState.highScore = this.#gameState.snakePartsCount;
			this.#highScore.saveHighScore(this.#gameState.highScore);
			this.#uiManager.updateHighScoreDisplay();
		}

		this.#uiManager.announce(
			`Game over. Final score: ${
				this.#gameState.snakePartsCount
			} points. Press start to play again.`,
		);

		clearCanvas();
		renderGameOverSnapshot();
		resetSnake();
		resetSnakeDirection();
		resetFood();
	}
}
