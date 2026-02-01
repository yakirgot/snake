import { beforeEach, describe, expect, it, vi } from "vitest";
import { container } from "tsyringe";
import { GameSettings } from "@/settings";
import { GameState } from "@/game-engine/game-state";
import {
	getNextSnakeHeadPosition,
	initializeSnakePosition,
	moveSnake,
	resetSnake,
} from "@/game-engine/snake";
import { drawSnakePart } from "@/game-engine/canvas/canvas-draw";

vi.mock(import("@/game-engine/canvas/canvas-draw"), () => ({
	drawSnakePart: vi.fn<() => void>(),
	erasePart: vi.fn<() => void>(),
}));

describe("snake movement", () => {
	let gameState: GameState;
	let gameSettings: GameSettings;

	beforeEach(() => {
		gameSettings = new GameSettings();
		gameSettings.snakeGapInPx = 2;
		gameSettings.partSizeInPx = 14;
		container.registerInstance("GameSettings", gameSettings);

		gameState = container.resolve(GameState);
		container.registerInstance("GameState", gameState);
	});

	describe(getNextSnakeHeadPosition, () => {
		it("should return next position to the right", () => {
			gameState.snakePositions = [[16, 16]];
			gameState.currentSnakeDirection = "right";

			const nextPosition = getNextSnakeHeadPosition();

			expect(nextPosition).toStrictEqual([32, 16]);
		});

		it("should return next position to the left", () => {
			gameState.snakePositions = [[32, 16]];
			gameState.currentSnakeDirection = "left";

			const nextPosition = getNextSnakeHeadPosition();

			expect(nextPosition).toStrictEqual([16, 16]);
		});

		it("should return next position upwards", () => {
			gameState.snakePositions = [[16, 32]];
			gameState.currentSnakeDirection = "up";

			const nextPosition = getNextSnakeHeadPosition();

			expect(nextPosition).toStrictEqual([16, 16]);
		});

		it("should return next position downwards", () => {
			gameState.snakePositions = [[16, 16]];
			gameState.currentSnakeDirection = "down";

			const nextPosition = getNextSnakeHeadPosition();

			expect(nextPosition).toStrictEqual([16, 32]);
		});

		it("should throw error if snake has no positions", () => {
			gameState.snakePositions = [];

			expect(() => getNextSnakeHeadPosition()).toThrowError(
				"Snake has no positions",
			);
		});
	});

	describe(moveSnake, () => {
		it("should draw previous head as body and new head as head", () => {
			gameState.snakePositions = [[16, 16]];

			moveSnake([32, 16]);

			expect(drawSnakePart).toHaveBeenCalledWith([16, 16], false);
			expect(drawSnakePart).toHaveBeenCalledWith([32, 16], true);
		});

		it("should move snake and erase tail when not growing", () => {
			gameState.snakePositions = [
				[16, 16],
				[32, 16],
				[48, 16],
			];

			moveSnake([64, 16]);

			expect(gameState.snakePositions).toStrictEqual([
				[32, 16],
				[48, 16],
				[64, 16],
			]);
			expect(gameState.pendingSnakeGrowthSteps).toBe(0);
		});

		it("should move snake and not erase tail when growing", () => {
			gameState.snakePositions = [
				[16, 16],
				[32, 16],
				[48, 16],
			];
			gameState.pendingSnakeGrowthSteps = 1;

			moveSnake([64, 16]);

			expect(gameState.snakePositions).toStrictEqual([
				[16, 16],
				[32, 16],
				[48, 16],
				[64, 16],
			]);
			expect(gameState.pendingSnakeGrowthSteps).toBe(0);
		});

		it("should decrease growth steps by 1 when moving and growing", () => {
			gameState.snakePositions = [[16, 16]];
			gameState.pendingSnakeGrowthSteps = 3;

			moveSnake([32, 16]);

			expect(gameState.pendingSnakeGrowthSteps).toBe(2);
			expect(gameState.snakePositions).toHaveLength(2);
		});
	});

	describe(initializeSnakePosition, () => {
		it("should initialize snake with correct length and positions", () => {
			gameSettings.snakeInitialLength = 3;
			gameSettings.canvasWidthInSnakeParts = 40;
			gameSettings.canvasHeightInSnakeParts = 20;

			initializeSnakePosition();

			expect(gameState.snakePositions).toStrictEqual([
				[160, 160],
				[176, 160],
				[192, 160],
			]);
		});

		it("should align snake perfectly even with odd canvas dimensions", () => {
			gameSettings.snakeInitialLength = 3;
			gameSettings.canvasWidthInSnakeParts = 41; // Odd number
			gameSettings.canvasHeightInSnakeParts = 21; // Odd number
			gameSettings.partSizeInPx = 14;
			gameSettings.snakeGapInPx = 2; // snakeSizeWithGap = 16

			initializeSnakePosition();

			// Current implementation:
			// quarterScreenX = (41 * 16) / 4 = 164
			// yCoordinate = (21 * 16) / 2 = 168
			// normalizedX = 164, normalizedY = 168
			// 164 is not a multiple of 16 (164 / 16 = 10.25)

			for (const pos of gameState.snakePositions) {
				expect(pos[0] % 16).toBe(0);
				expect(pos[1] % 16).toBe(0);
			}
		});
	});

	describe(resetSnake, () => {
		it("should clear snake positions and growth steps", () => {
			gameState.snakePositions = [
				[16, 16],
				[32, 16],
			];
			gameState.pendingSnakeGrowthSteps = 3;

			resetSnake();

			expect(gameState.snakePositions).toHaveLength(0);
			expect(gameState.pendingSnakeGrowthSteps).toBe(0);
		});
	});
});
