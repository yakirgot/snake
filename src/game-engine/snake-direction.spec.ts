import { beforeEach, describe, expect, it } from "vitest";
import { container } from "tsyringe";
import { GameState } from "@/game-engine/game-state";
import { GameSettings } from "@/settings";
import {
	applyNextDirection,
	initializeKeyboardInputListeners,
	initializeTouchInputListeners,
	resetSnakeDirection,
} from "@/game-engine/snake-direction";

describe("snake direction", () => {
	let gameState: GameState;
	let gameSettings: GameSettings;

	beforeEach(() => {
		gameSettings = new GameSettings();
		container.registerInstance("GameSettings", gameSettings);

		gameState = container.resolve(GameState);
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

		it("should not change direction if queue is empty", () => {
			gameState.currentSnakeDirection = "right";

			applyNextDirection();

			expect(gameState.currentSnakeDirection).toBe("right");
		});
	});

	describe(resetSnakeDirection, () => {
		it("should reset direction and clear queue", () => {
			gameSettings.snakeStartingDirection = "down";
			gameState.currentSnakeDirection = "right";
			gameState.snakeDirectionQueue.push("up");

			resetSnakeDirection();

			expect(gameState.currentSnakeDirection).toBe("down");
			expect(gameState.snakeDirectionQueue).toHaveLength(0);
		});
	});

	describe("keyboard input", () => {
		it("should add direction to queue on keydown", () => {
			initializeKeyboardInputListeners();

			const event = new KeyboardEvent("keydown", { code: "ArrowUp" });
			globalThis.dispatchEvent(event);

			expect(gameState.snakeDirectionQueue).toContain("up");
		});

		it("should limit queue size to 2", () => {
			initializeKeyboardInputListeners();

			globalThis.dispatchEvent(
				new KeyboardEvent("keydown", { code: "ArrowUp" }),
			);
			globalThis.dispatchEvent(
				new KeyboardEvent("keydown", { code: "ArrowLeft" }),
			);
			globalThis.dispatchEvent(
				new KeyboardEvent("keydown", { code: "ArrowDown" }),
			);

			expect(gameState.snakeDirectionQueue).toHaveLength(2);
			expect(gameState.snakeDirectionQueue).toStrictEqual(["up", "down"]);
		});

		it("should support WASD keys", () => {
			initializeKeyboardInputListeners();

			globalThis.dispatchEvent(new KeyboardEvent("keydown", { code: "KeyW" }));

			expect(gameState.snakeDirectionQueue.at(-1)).toBe("up");

			globalThis.dispatchEvent(new KeyboardEvent("keydown", { code: "KeyS" }));

			expect(gameState.snakeDirectionQueue.at(-1)).toBe("down");

			globalThis.dispatchEvent(new KeyboardEvent("keydown", { code: "KeyA" }));

			expect(gameState.snakeDirectionQueue.at(-1)).toBe("left");

			globalThis.dispatchEvent(new KeyboardEvent("keydown", { code: "KeyD" }));

			expect(gameState.snakeDirectionQueue.at(-1)).toBe("right");
		});
	});

	/* eslint-disable @typescript-eslint/no-explicit-any */
	describe("touch input", () => {
		it("should detect swipe up", () => {
			initializeTouchInputListeners();

			const startEvent = new CustomEvent("touchstart", {
				bubbles: true,
			}) as any;
			startEvent.touches = [{ clientX: 100, clientY: 200 }];
			globalThis.dispatchEvent(startEvent);

			const endEvent = new CustomEvent("touchend", {
				bubbles: true,
			}) as any;
			endEvent.changedTouches = [{ clientX: 100, clientY: 100 }];
			globalThis.dispatchEvent(endEvent);

			expect(gameState.snakeDirectionQueue).toContain("up");
		});

		it("should detect swipe down", () => {
			initializeTouchInputListeners();

			const startEvent = new CustomEvent("touchstart", {
				bubbles: true,
			}) as any;
			startEvent.touches = [{ clientX: 100, clientY: 100 }];
			globalThis.dispatchEvent(startEvent);

			const endEvent = new CustomEvent("touchend", {
				bubbles: true,
			}) as any;
			endEvent.changedTouches = [{ clientX: 100, clientY: 200 }];
			globalThis.dispatchEvent(endEvent);

			expect(gameState.snakeDirectionQueue).toContain("down");
		});

		it("should detect swipe left", () => {
			initializeTouchInputListeners();

			const startEvent = new CustomEvent("touchstart", {
				bubbles: true,
			}) as any;
			startEvent.touches = [{ clientX: 200, clientY: 100 }];
			globalThis.dispatchEvent(startEvent);

			const endEvent = new CustomEvent("touchend", {
				bubbles: true,
			}) as any;
			endEvent.changedTouches = [{ clientX: 100, clientY: 100 }];
			globalThis.dispatchEvent(endEvent);

			expect(gameState.snakeDirectionQueue).toContain("left");
		});

		it("should detect swipe right", () => {
			initializeTouchInputListeners();

			const startEvent = new CustomEvent("touchstart", {
				bubbles: true,
			}) as any;
			startEvent.touches = [{ clientX: 100, clientY: 100 }];
			globalThis.dispatchEvent(startEvent);

			const endEvent = new CustomEvent("touchend", {
				bubbles: true,
			}) as any;
			endEvent.changedTouches = [{ clientX: 200, clientY: 100 }];
			globalThis.dispatchEvent(endEvent);

			expect(gameState.snakeDirectionQueue).toContain("right");
		});

		it("should ignore small movements", () => {
			initializeTouchInputListeners();

			const startEvent = new CustomEvent("touchstart", {
				bubbles: true,
			}) as any;
			startEvent.touches = [{ clientX: 100, clientY: 100 }];
			globalThis.dispatchEvent(startEvent);

			const endEvent = new CustomEvent("touchend", {
				bubbles: true,
			}) as any;
			endEvent.changedTouches = [{ clientX: 110, clientY: 110 }];
			globalThis.dispatchEvent(endEvent);

			expect(gameState.snakeDirectionQueue).toHaveLength(0);
		});
	});
	/* eslint-enable @typescript-eslint/no-explicit-any */
});
