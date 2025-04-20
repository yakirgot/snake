import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	detectPartCollision,
	isSnakeCollision,
} from "@/game-engine/collision-detection";
import { container } from "tsyringe";
import { GameSettings } from "@/settings";
import { GameData } from "@/game-engine/game-data";

describe("collision detection", () => {
	const gameSettingsMock = vi.fn().mockReturnValue(new GameSettings());
	const gameDataMock = vi.fn().mockReturnValue(new GameData());

	beforeEach(() => {
		container.register("GameSettings", { useValue: gameSettingsMock() });
		container.register("GameData", { useValue: gameDataMock() });
	});

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
			gameSettingsMock.mockReturnValue(gameSettings);
			container.register("GameSettings", { useValue: gameSettingsMock() });

			const gameData = new GameData();
			gameData.snakePositions.push([1, 1]);
			gameDataMock.mockReturnValue(gameData);
			container.register("GameData", { useValue: gameDataMock() });
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
