import { SnakeDirection } from "@/types/snake-types";
import { container } from "tsyringe";
import { GameSettings } from "@/settings";
import { GameState } from "@/game-engine/game-state";

/**
 * Initializes listeners for keyboard events to control the snake.
 */
export function initializeKeyboardInputListeners(): void {
	addEventListener("keydown", handleKeyboardInput);
}

/**
 * Resets the snake's direction to its initial state and clears the input queue.
 * Also removes the keyboard event listener.
 */
export function resetSnakeDirection(): void {
	const gameState = container.resolve<GameState>("GameState");
	const gameSettings = container.resolve(GameSettings);

	gameState.currentSnakeDirection = gameSettings.snakeStartingDirection;
	gameState.snakeDirectionQueue.length = 0;

	removeEventListener("keydown", handleKeyboardInput);
}

/**
 * Processes the next direction from the queue and updates the game state.
 * Prevents the snake from turning 180 degrees directly.
 */
export function applyNextDirection(): void {
	const gameState = container.resolve<GameState>("GameState");
	const nextSnakeDirection =
		gameState.snakeDirectionQueue.shift() as SnakeDirection;
	const isOppositeDirection =
		gameState.currentSnakeDirection === nextSnakeDirection ||
		(gameState.currentSnakeDirection === "up" &&
			nextSnakeDirection === "down") ||
		(gameState.currentSnakeDirection === "down" &&
			nextSnakeDirection === "up") ||
		(gameState.currentSnakeDirection === "left" &&
			nextSnakeDirection === "right") ||
		(gameState.currentSnakeDirection === "right" &&
			nextSnakeDirection === "left");

	if (!isOppositeDirection) {
		gameState.currentSnakeDirection = nextSnakeDirection;
	}
}

/**
 * Maps keyboard keys to snake directions and adds them to the processing queue.
 */
function handleKeyboardInput(keyboardEvent: KeyboardEvent): void {
	let direction: SnakeDirection | undefined;

	switch (keyboardEvent.code) {
		case "ArrowUp":
		case "KeyW": {
			direction = "up";
			break;
		}
		case "ArrowDown":
		case "KeyS": {
			direction = "down";
			break;
		}
		case "ArrowLeft":
		case "KeyA": {
			direction = "left";
			break;
		}
		case "ArrowRight":
		case "KeyD": {
			direction = "right";
			break;
		}
	}

	if (direction) {
		keyboardEvent.preventDefault();
		addSnakeDirectionToQueue(direction);
	}
}

/**
 * we limit the queue size to 2 directions to allow the player to "pre-buffer"
 * their next turn while still being able to change their mind about the second turn
 */
function addSnakeDirectionToQueue(snakeDirection: SnakeDirection): void {
	const gameState = container.resolve<GameState>("GameState");
	if (gameState.snakeDirectionQueue.length > 0) {
		gameState.snakeDirectionQueue[1] = snakeDirection;
	} else {
		gameState.snakeDirectionQueue.push(snakeDirection);
	}
}
