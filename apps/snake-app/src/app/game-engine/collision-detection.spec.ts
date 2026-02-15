import { describe, expect, it } from "vitest";
import { arePositionsEqual, checkSnakeCollision } from "./collision-detection";
import { container } from "tsyringe";
import { GameSettings } from "../settings";
import { GameState } from "./game-state";
import { XCoordinate, YCoordinate } from "../types/snake-types";

function setup() {
	const gameSettings = new GameSettings();
	gameSettings.canvasWidthInSnakeParts = 2;
	gameSettings.canvasHeightInSnakeParts = 2;
	gameSettings.partSizeInPx = 1;
	gameSettings.snakeGapInPx = 1;
	container.registerInstance("GameSettings", gameSettings);

	const gameState = container.resolve(GameState);
	gameState.snakePositions.push([2 as XCoordinate, 2 as YCoordinate]);
	container.registerInstance("GameState", gameState);

	return { gameState, gameSettings };
}

describe("collision detection", () => {
	describe(arePositionsEqual, () => {
		it("should detect a collision", () => {
			expect(
				arePositionsEqual(
					[1 as XCoordinate, 1 as YCoordinate],
					[1 as XCoordinate, 1 as YCoordinate],
				),
			).toBe(true);
			expect(
				arePositionsEqual(
					[2 as XCoordinate, 2 as YCoordinate],
					[2 as XCoordinate, 2 as YCoordinate],
				),
			).toBe(true);
		});

		it("should not detect a collision when there is none", () => {
			expect(
				arePositionsEqual(
					[2 as XCoordinate, 1 as YCoordinate],
					[1 as XCoordinate, 1 as YCoordinate],
				),
			).toBe(false);
			expect(
				arePositionsEqual(
					[1 as XCoordinate, 2 as YCoordinate],
					[1 as XCoordinate, 1 as YCoordinate],
				),
			).toBe(false);
			expect(
				arePositionsEqual(
					[1 as XCoordinate, 1 as YCoordinate],
					[2 as XCoordinate, 1 as YCoordinate],
				),
			).toBe(false);
			expect(
				arePositionsEqual(
					[1 as XCoordinate, 1 as YCoordinate],
					[1 as XCoordinate, 2 as YCoordinate],
				),
			).toBe(false);
			expect(
				arePositionsEqual(
					[2 as XCoordinate, 1 as YCoordinate],
					[1 as XCoordinate, 2 as YCoordinate],
				),
			).toBe(false);
		});
	});

	describe(checkSnakeCollision, () => {
		it("should return false when no collision occurs", () => {
			setup();
			const isCollision = checkSnakeCollision([
				0 as XCoordinate,
				0 as YCoordinate,
			]);

			expect(isCollision).toBe(false);
		});

		it("should detect self collision", () => {
			setup();
			const isCollision = checkSnakeCollision([
				2 as XCoordinate,
				2 as YCoordinate,
			]);

			expect(isCollision).toBe(true);
		});

		it("should detect left wall collision", () => {
			setup();
			const isCollision = checkSnakeCollision([
				-1 as XCoordinate,
				0 as YCoordinate,
			]);

			expect(isCollision).toBe(true);
		});

		it("should detect top wall collision", () => {
			setup();
			const isCollision = checkSnakeCollision([
				0 as XCoordinate,
				-1 as YCoordinate,
			]);

			expect(isCollision).toBe(true);
		});

		it("should detect right wall collision", () => {
			setup();
			const isCollision = checkSnakeCollision([
				3 as XCoordinate,
				0 as YCoordinate,
			]);

			expect(isCollision).toBe(true);
		});

		it("should detect bottom wall collision", () => {
			setup();
			const isCollision = checkSnakeCollision([
				0 as XCoordinate,
				3 as YCoordinate,
			]);

			expect(isCollision).toBe(true);
		});

		it("should not detect collision at the exact right boundary", () => {
			setup();
			const isCollision = checkSnakeCollision([
				2 as XCoordinate,
				0 as YCoordinate,
			]);

			expect(isCollision).toBe(false);
		});

		it("should not detect collision at the exact bottom boundary", () => {
			setup();
			const isCollision = checkSnakeCollision([
				0 as XCoordinate,
				2 as YCoordinate,
			]);

			expect(isCollision).toBe(false);
		});
	});
});
