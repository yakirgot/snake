import { beforeEach, describe, expect, it, vi } from "vitest";
import { container } from "tsyringe";
import { GameState } from "@/game-engine/game-state";
import { GameSettings } from "@/settings";
import {
	resetFood,
	spawnInitialFood,
	replaceFoodPositionIfWasEaten,
} from "@/game-engine/food";

vi.mock(import("@/game-engine/canvas/canvas-draw"), () => ({
	drawFoodPart: vi.fn<() => void>(),
	erasePart: vi.fn<() => void>(),
}));

describe("food", () => {
	let gameState: GameState;
	let gameSettings: GameSettings;

	beforeEach(() => {
		vi.clearAllMocks();

		gameSettings = new GameSettings();
		gameSettings.foodPartsOnCanvas = 2;
		container.registerInstance("GameSettings", gameSettings);

		gameState = new GameState();
		gameState.canvasGridPositions = [
			[0, 0],
			[16, 0],
			[0, 16],
			[16, 16],
		];
		container.registerInstance("GameState", gameState);
	});

	describe(resetFood, () => {
		it("should clear food positions", () => {
			gameState.foodPositions = [[0, 0]];

			resetFood();

			expect(gameState.foodPositions).toHaveLength(0);
		});
	});

	describe(spawnInitialFood, () => {
		it("should spawn correct amount of food", () => {
			spawnInitialFood();

			expect(gameState.foodPositions).toHaveLength(2);
		});
	});

	describe(replaceFoodPositionIfWasEaten, () => {
		it("should return false if no food at position", () => {
			gameState.foodPositions = [[0, 0]];

			const wasEaten = replaceFoodPositionIfWasEaten([16, 16]);

			expect(wasEaten).toBe(false);
			expect(gameState.foodPositions).toStrictEqual([[0, 0]]);
		});

		it("should return true and replace food if eaten", () => {
			gameState.foodPositions = [[0, 0]];
			// Only [16, 0], [0, 16], [16, 16] are free

			// Mock Math.random to pick the first available free position which is NOT [0,0] if we are lucky
			// Actually [0,0] is free too because it was just removed.
			// freePositions: [0,0], [16,0], [0,16], [16,16]
			// Let's force it to pick index 1 ([16,0])
			vi.spyOn(Math, "random").mockReturnValue(0.4); // 0.4 * 4 = 1.6 -> 1

			const wasEaten = replaceFoodPositionIfWasEaten([0, 0]);

			expect(wasEaten).toBe(true);
			expect(gameState.foodPositions).toStrictEqual([[16, 0]]);
		});
	});
});
