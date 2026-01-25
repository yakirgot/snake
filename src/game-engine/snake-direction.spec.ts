import { beforeEach, describe, expect, it } from "vitest";
import { container } from "tsyringe";
import { GameState } from "@/game-engine/game-state";
import { GameSettings } from "@/settings";
import { applyNextDirection } from "@/game-engine/snake-direction";

describe("snake direction", () => {
	let gameState: GameState;

	beforeEach(() => {
		container.registerInstance("GameSettings", new GameSettings());
		gameState = new GameState();
		container.registerInstance("GameState", gameState);
	});

	describe(applyNextDirection, () => {
		it("should change direction if valid", () => {
			gameState.currentSnakeDirection = "right";
			gameState.snakeDirectionQueue.push("up");

			applyNextDirection();

			expect(gameState.currentSnakeDirection).toBe("up");
		});

		it("should not change direction if it is the same", () => {
			gameState.currentSnakeDirection = "right";
			gameState.snakeDirectionQueue.push("right");

			applyNextDirection();

			expect(gameState.currentSnakeDirection).toBe("right");
		});

		it("should not change to opposite direction (right -> left)", () => {
			gameState.currentSnakeDirection = "right";
			gameState.snakeDirectionQueue.push("left");

			applyNextDirection();

			expect(gameState.currentSnakeDirection).toBe("right");
		});

		it("should not change to opposite direction (left -> right)", () => {
			gameState.currentSnakeDirection = "left";
			gameState.snakeDirectionQueue.push("right");

			applyNextDirection();

			expect(gameState.currentSnakeDirection).toBe("left");
		});

		it("should not change to opposite direction (up -> down)", () => {
			gameState.currentSnakeDirection = "up";
			gameState.snakeDirectionQueue.push("down");

			applyNextDirection();

			expect(gameState.currentSnakeDirection).toBe("up");
		});

		it("should not change to opposite direction (down -> up)", () => {
			gameState.currentSnakeDirection = "down";
			gameState.snakeDirectionQueue.push("up");

			applyNextDirection();

			expect(gameState.currentSnakeDirection).toBe("down");
		});

		it("should process the first direction in the queue and remove it", () => {
			gameState.currentSnakeDirection = "right";
			gameState.snakeDirectionQueue.push("up", "left");

			applyNextDirection();

			expect(gameState.currentSnakeDirection).toBe("up");

			applyNextDirection();

			expect(gameState.currentSnakeDirection).toBe("left");
		});
	});
});
