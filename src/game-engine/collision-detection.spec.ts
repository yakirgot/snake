import { beforeEach, describe, expect, it } from "vitest";
import {
	detectPartCollision,
	isSnakeCollision,
} from "@/game-engine/collision-detection";
import { container } from "tsyringe";
import { GameSettings } from "@/settings";
import { GameData } from "@/game-engine/game-data";

describe("collision detection", () => {
	describe(detectPartCollision, () => {
		it("should detect a collision", () => {
			expect(detectPartCollision([1, 1], [1, 1])).toBe(true);
			expect(detectPartCollision([2, 2], [2, 2])).toBe(true);
		});

		it("should not detect a collision when there is none", () => {
			expect(detectPartCollision([2, 1], [1, 1])).toBe(false);
			expect(detectPartCollision([1, 2], [1, 1])).toBe(false);
			expect(detectPartCollision([1, 1], [2, 1])).toBe(false);
			expect(detectPartCollision([1, 1], [1, 2])).toBe(false);
			expect(detectPartCollision([2, 1], [1, 2])).toBe(false);
		});
	});

	describe(isSnakeCollision, () => {
		beforeEach(() => {
			const gameSettings = new GameSettings();
			gameSettings.canvasWidthInSnakeParts = 2;
			gameSettings.canvasHeightInSnakeParts = 2;
			gameSettings.partSizeInPx = 1;
			gameSettings.snakeGapInPx = 1;
			container.registerInstance("GameSettings", gameSettings);

			const gameData = new GameData();
			gameData.snakePositions.push([1, 1]);
			container.registerInstance("GameData", gameData);
		});

		it("should detect self collision", () => {
			const isCollision = isSnakeCollision([1, 1]);

			expect(isCollision).toBe(true);
		});

		it("should detect left wall collision", () => {
			const isCollision = isSnakeCollision([-1, 0]);

			expect(isCollision).toBe(true);
		});

		it("should detect top wall collision", () => {
			const isCollision = isSnakeCollision([0, -1]);

			expect(isCollision).toBe(true);
		});

		it("should detect right wall collision", () => {
			const isCollision = isSnakeCollision([3, 0]);

			expect(isCollision).toBe(true);
		});

		it("should detect bottom wall collision", () => {
			const isCollision = isSnakeCollision([0, 3]);

			expect(isCollision).toBe(true);
		});
	});
});
