import { describe, expect, it } from "vitest";
import { container } from "tsyringe";
import { GameState } from "./game-state";
import { GameSettings } from "../settings";
import {
	applyNextDirection,
	initializeKeyboardInputListeners,
	initializeTouchInputListeners,
	resetSnakeDirection,
} from "./snake-direction";

function setup() {
	const gameSettings = new GameSettings();
	container.registerInstance("GameSettings", gameSettings);

	const gameState = container.resolve(GameState);
	container.registerInstance("GameState", gameState);

	return { gameState, gameSettings };
}

describe("snake direction", () => {
	describe(applyNextDirection, () => {
		it("should change direction if valid", () => {
			const { gameState } = setup();
			gameState.currentSnakeDirection = "right";
			gameState.snakeDirectionQueue.push("up");

			const result = applyNextDirection();

			expect(gameState.currentSnakeDirection).toBe("up");
			expect(result).toBe(true);
		});

		it("should not change direction if it is the same", () => {
			const { gameState } = setup();
			gameState.currentSnakeDirection = "right";
			gameState.snakeDirectionQueue.push("right");

			const result = applyNextDirection();

			expect(gameState.currentSnakeDirection).toBe("right");
			expect(result).toBe(false);
		});

		it("should not change to opposite direction (right -> left)", () => {
			const { gameState } = setup();
			gameState.currentSnakeDirection = "right";
			gameState.snakeDirectionQueue.push("left");

			const result = applyNextDirection();

			expect(gameState.currentSnakeDirection).toBe("right");
			expect(result).toBe(false);
		});

		it("should not change to opposite direction (left -> right)", () => {
			const { gameState } = setup();
			gameState.currentSnakeDirection = "left";
			gameState.snakeDirectionQueue.push("right");

			applyNextDirection();

			expect(gameState.currentSnakeDirection).toBe("left");
		});

		it("should not change to opposite direction (up -> down)", () => {
			const { gameState } = setup();
			gameState.currentSnakeDirection = "up";
			gameState.snakeDirectionQueue.push("down");

			applyNextDirection();

			expect(gameState.currentSnakeDirection).toBe("up");
		});

		it("should not change to opposite direction (down -> up)", () => {
			const { gameState } = setup();
			gameState.currentSnakeDirection = "down";
			gameState.snakeDirectionQueue.push("up");

			applyNextDirection();

			expect(gameState.currentSnakeDirection).toBe("down");
		});

		it("should process the first direction in the queue and remove it", () => {
			const { gameState } = setup();
			gameState.currentSnakeDirection = "right";
			gameState.snakeDirectionQueue.push("up", "left");

			applyNextDirection();

			expect(gameState.currentSnakeDirection).toBe("up");

			applyNextDirection();

			expect(gameState.currentSnakeDirection).toBe("left");
		});

		it("should not change direction if queue is empty", () => {
			const { gameState } = setup();
			gameState.currentSnakeDirection = "right";

			applyNextDirection();

			expect(gameState.currentSnakeDirection).toBe("right");
		});
	});

	describe(resetSnakeDirection, () => {
		it("should reset direction and clear queue", () => {
			const { gameState, gameSettings } = setup();
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
			const { gameState } = setup();
			initializeKeyboardInputListeners();

			const event = new KeyboardEvent("keydown", { code: "ArrowUp" });
			globalThis.dispatchEvent(event);

			expect(gameState.snakeDirectionQueue).toContain("up");
		});

		it("should limit queue size to 2", () => {
			const { gameState } = setup();
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
			const { gameState } = setup();
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
			const { gameState } = setup();
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
			const { gameState } = setup();
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
			const { gameState } = setup();
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
			const { gameState } = setup();
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
			const { gameState } = setup();
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

		it("should ignore multi-touch start", () => {
			const { gameState } = setup();
			initializeTouchInputListeners();

			const startEvent = new CustomEvent("touchstart", {
				bubbles: true,
			}) as any;
			// Simulating 2 fingers
			startEvent.touches = [
				{ clientX: 100, clientY: 100 },
				{ clientX: 150, clientY: 150 },
			];
			globalThis.dispatchEvent(startEvent);

			const endEvent = new CustomEvent("touchend", {
				bubbles: true,
			}) as any;
			endEvent.changedTouches = [{ clientX: 200, clientY: 100 }];
			globalThis.dispatchEvent(endEvent);

			// Should be empty because touchStartX/Y were not updated from their reset values (0,0)
			// But wait, if they are (0,0), then (200, 100) - (0,0) = (200, 100) which is a swipe right.
			// So if we want to truly ignore it, we might need a flag or check if it was initialized.
			expect(gameState.snakeDirectionQueue).toHaveLength(0);
		});

		it("should ignore multi-touch end", () => {
			const { gameState } = setup();
			initializeTouchInputListeners();

			const startEvent = new CustomEvent("touchstart", {
				bubbles: true,
			}) as any;
			startEvent.touches = [{ clientX: 100, clientY: 100 }];
			globalThis.dispatchEvent(startEvent);

			const endEvent = new CustomEvent("touchend", {
				bubbles: true,
			}) as any;
			// Simulating 2 fingers changed
			endEvent.changedTouches = [
				{ clientX: 200, clientY: 100 },
				{ clientX: 250, clientY: 150 },
			];
			globalThis.dispatchEvent(endEvent);

			expect(gameState.snakeDirectionQueue).toHaveLength(0);
		});
	});
	/* eslint-enable @typescript-eslint/no-explicit-any */
});
