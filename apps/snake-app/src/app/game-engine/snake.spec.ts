import { describe, expect, it, vi } from "vitest";
import { container } from "tsyringe";
import { GameSettings } from "../settings";
import { GameState } from "./game-state";
import { Position } from "../types/snake-types";
import {
	getNextSnakeHeadPosition,
	initializeSnakePosition,
	moveSnake,
	resetSnake,
} from "./snake";
import { drawSnakeHeadPart, drawSnakePart } from "./canvas/canvas-draw";

vi.mock(import("./canvas/canvas-draw"), () => ({
	drawSnakePart: vi.fn<() => void>(),
	drawSnakeHeadPart: vi.fn<() => void>(),
	erasePart: vi.fn<() => void>(),
}));

function setup() {
	const gameSettings = new GameSettings();
	gameSettings.snakeGapInPx = 2;
	gameSettings.partSizeInPx = 14;
	container.registerInstance("GameSettings", gameSettings);

	const gameState = container.resolve(GameState);
	container.registerInstance("GameState", gameState);

	return { gameState, gameSettings };
}

describe("snake movement", () => {
	describe(getNextSnakeHeadPosition, () => {
		it("should return next position to the right", () => {
			const { gameState } = setup();
			gameState.snakePositions = [[16, 16] as Position];
			gameState.currentSnakeDirection = "right";

			const nextPosition = getNextSnakeHeadPosition();

			expect(nextPosition).toStrictEqual([32, 16] as Position);
		});

		it("should return next position to the left", () => {
			const { gameState } = setup();
			gameState.snakePositions = [[32, 16] as Position];
			gameState.currentSnakeDirection = "left";

			const nextPosition = getNextSnakeHeadPosition();

			expect(nextPosition).toStrictEqual([16, 16] as Position);
		});

		it("should return next position upwards", () => {
			const { gameState } = setup();
			gameState.snakePositions = [[16, 32] as Position];
			gameState.currentSnakeDirection = "up";

			const nextPosition = getNextSnakeHeadPosition();

			expect(nextPosition).toStrictEqual([16, 16] as Position);
		});

		it("should return next position downwards", () => {
			const { gameState } = setup();
			gameState.snakePositions = [[16, 16] as Position];
			gameState.currentSnakeDirection = "down";

			const nextPosition = getNextSnakeHeadPosition();

			expect(nextPosition).toStrictEqual([16, 32] as Position);
		});

		it("should throw error if snake has no positions", () => {
			const { gameState } = setup();
			gameState.snakePositions = [];

			expect(() => getNextSnakeHeadPosition()).toThrowError(
				"Snake has no positions",
			);
		});
	});

	describe(moveSnake, () => {
		it("should draw previous head as body and new head as head", () => {
			const { gameState } = setup();
			gameState.snakePositions = [[16, 16] as Position];

			moveSnake([32, 16] as Position);

			expect(drawSnakePart).toHaveBeenCalledWith([16, 16] as Position);
			expect(drawSnakeHeadPart).toHaveBeenCalledWith([32, 16] as Position);
		});

		it("should move snake and erase tail when not growing", () => {
			const { gameState } = setup();
			gameState.snakePositions = [
				[16, 16] as Position,
				[32, 16] as Position,
				[48, 16] as Position,
			];

			moveSnake([64, 16] as Position);

			expect(gameState.snakePositions).toStrictEqual([
				[32, 16] as Position,
				[48, 16] as Position,
				[64, 16] as Position,
			]);
			expect(gameState.pendingSnakeGrowthSteps).toBe(0);
		});

		it("should move snake and not erase tail when growing", () => {
			const { gameState } = setup();
			gameState.snakePositions = [
				[16, 16] as Position,
				[32, 16] as Position,
				[48, 16] as Position,
			];
			gameState.pendingSnakeGrowthSteps = 1;

			moveSnake([64, 16] as Position);

			expect(gameState.snakePositions).toStrictEqual([
				[16, 16] as Position,
				[32, 16] as Position,
				[48, 16] as Position,
				[64, 16] as Position,
			]);
			expect(gameState.pendingSnakeGrowthSteps).toBe(0);
		});

		it("should decrease growth steps by 1 when moving and growing", () => {
			const { gameState } = setup();
			gameState.snakePositions = [[16, 16] as Position];
			gameState.pendingSnakeGrowthSteps = 3;

			moveSnake([32, 16] as Position);

			expect(gameState.pendingSnakeGrowthSteps).toBe(2);
			expect(gameState.snakePositions).toHaveLength(2);
		});
	});

	describe(initializeSnakePosition, () => {
		it("should initialize snake with correct length and positions", () => {
			const { gameSettings, gameState } = setup();
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
			const { gameSettings, gameState } = setup();
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
			const { gameState } = setup();
			gameState.snakePositions = [
				[16, 16] as Position,
				[32, 16] as Position,
			];
			gameState.pendingSnakeGrowthSteps = 3;

			resetSnake();

			expect(gameState.snakePositions).toHaveLength(0);
			expect(gameState.pendingSnakeGrowthSteps).toBe(0);
		});
	});
});
