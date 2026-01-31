import { beforeEach, describe, expect, it } from "vitest";
import {
	arePositionsEqual,
	checkSnakeCollision,
} from "@/game-engine/collision-detection";
import { container } from "tsyringe";
import { GameSettings } from "@/settings";
import { GameState } from "@/game-engine/game-state";

describe("collision detection", () => {
	describe(arePositionsEqual, () => {
		it("should detect a collision", () => {
			expect(arePositionsEqual([1, 1], [1, 1])).toBe(true);
			expect(arePositionsEqual([2, 2], [2, 2])).toBe(true);
		});

		it("should not detect a collision when there is none", () => {
			expect(arePositionsEqual([2, 1], [1, 1])).toBe(false);
			expect(arePositionsEqual([1, 2], [1, 1])).toBe(false);
			expect(arePositionsEqual([1, 1], [2, 1])).toBe(false);
			expect(arePositionsEqual([1, 1], [1, 2])).toBe(false);
			expect(arePositionsEqual([2, 1], [1, 2])).toBe(false);
		});
	});

	describe(checkSnakeCollision, () => {
		beforeEach(() => {
			const gameSettings = new GameSettings();
			gameSettings.canvasWidthInSnakeParts = 2;
			gameSettings.canvasHeightInSnakeParts = 2;
			gameSettings.partSizeInPx = 1;
			gameSettings.snakeGapInPx = 1;
			container.registerInstance("GameSettings", gameSettings);

			const gameState = container.resolve(GameState);
			gameState.snakePositions.push([2, 2]);
			container.registerInstance("GameState", gameState);
		});

		it("should return false when no collision occurs", () => {
			const isCollision = checkSnakeCollision([0, 0]);

			expect(isCollision).toBe(false);
		});

		it("should detect self collision", () => {
			const isCollision = checkSnakeCollision([2, 2]);

			expect(isCollision).toBe(true);
		});

		it("should detect left wall collision", () => {
			const isCollision = checkSnakeCollision([-1, 0]);

			expect(isCollision).toBe(true);
		});

		it("should detect top wall collision", () => {
			const isCollision = checkSnakeCollision([0, -1]);

			expect(isCollision).toBe(true);
		});

		it("should detect right wall collision", () => {
			const isCollision = checkSnakeCollision([3, 0]);

			expect(isCollision).toBe(true);
		});

		it("should detect bottom wall collision", () => {
			const isCollision = checkSnakeCollision([0, 3]);

			expect(isCollision).toBe(true);
		});

		it("should not detect collision at the exact right boundary", () => {
			const isCollision = checkSnakeCollision([2, 0]);

			expect(isCollision).toBe(false);
		});

		it("should not detect collision at the exact bottom boundary", () => {
			const isCollision = checkSnakeCollision([0, 2]);

			expect(isCollision).toBe(false);
		});
	});
});
