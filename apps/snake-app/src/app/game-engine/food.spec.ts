import { describe, expect, it, vi } from "vitest";
import { container } from "tsyringe";
import { GameState } from "./game-state";
import { GameSettings } from "../settings";
import { XCoordinate, YCoordinate } from "../types/snake-types";
import {
	replaceFoodPositionIfWasEaten,
	resetFood,
	spawnInitialFood,
} from "./food";

vi.mock(import("./canvas/canvas-draw"), () => ({
	drawFoodPart: vi.fn<() => void>(),
	erasePart: vi.fn<() => void>(),
}));

function setup() {
	const gameSettings = new GameSettings();
	gameSettings.foodPartsOnCanvas = 2;
	container.registerInstance("GameSettings", gameSettings);

	const gameState = container.resolve(GameState);
	gameState.canvasGridPositions = [
		[0 as XCoordinate, 0 as YCoordinate],
		[16 as XCoordinate, 0 as YCoordinate],
		[0 as XCoordinate, 16 as YCoordinate],
		[16 as XCoordinate, 16 as YCoordinate],
	];
	container.registerInstance("GameState", gameState);

	return { gameState, gameSettings };
}

describe("food", () => {
	describe(resetFood, () => {
		it("should clear food positions", () => {
			const { gameState } = setup();
			gameState.foodPositions = [[0 as XCoordinate, 0 as YCoordinate]];

			resetFood();

			expect(gameState.foodPositions).toHaveLength(0);
		});
	});

	describe(spawnInitialFood, () => {
		it("should spawn correct amount of food", () => {
			setup();
			spawnInitialFood();

			const gameState = container.resolve(GameState);

			expect(gameState.foodPositions).toHaveLength(2);
		});
	});

	describe(replaceFoodPositionIfWasEaten, () => {
		it("should return false if no food at position", () => {
			const { gameState } = setup();
			gameState.foodPositions = [[0 as XCoordinate, 0 as YCoordinate]];

			const wasEaten = replaceFoodPositionIfWasEaten([
				16 as XCoordinate,
				16 as YCoordinate,
			]);

			expect(wasEaten).toBe(false);
			expect(gameState.foodPositions).toStrictEqual([
				[0 as XCoordinate, 0 as YCoordinate],
			]);
		});

		it("should return true and replace food if eaten", () => {
			const { gameState } = setup();
			gameState.foodPositions = [[0 as XCoordinate, 0 as YCoordinate]];
			// Only [16, 0], [0, 16], [16, 16] are free

			// Mock Math.random to pick the first available free position which is NOT [0,0] if we are lucky
			// Actually [0,0] is free too because it was just removed.
			// freePositions: [0,0], [16,0], [0,16], [16,16]
			// Let's force it to pick index 1 ([16,0])
			vi.spyOn(Math, "random").mockReturnValue(0.4); // 0.4 * 4 = 1.6 -> 1

			const wasEaten = replaceFoodPositionIfWasEaten([
				0 as XCoordinate,
				0 as YCoordinate,
			]);

			expect(wasEaten).toBe(true);
			expect(gameState.foodPositions).toStrictEqual([
				[16 as XCoordinate, 0 as YCoordinate],
			]);
		});
	});
});
