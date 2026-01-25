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

		gameState = new GameState();
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
	});

	describe(moveSnake, () => {
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
