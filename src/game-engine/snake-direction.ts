import { SnakeDirection } from "@/types/snake-types";
import { container } from "tsyringe";
import { GameSettings } from "@/settings";
import { GameState } from "@/game-engine/game-state";

export function initializeKeyboardInputListeners(): void {
	addEventListener("keydown", handleKeyboardInput);
}

export function resetSnakeDirection(): void {
	const gameState = container.resolve<GameState>("GameState");
	const gameSettings = container.resolve(GameSettings);

	gameState.currentSnakeDirection = gameSettings.snakeStartingDirection;
	gameState.snakeDirectionQueue.length = 0;

	removeEventListener("keydown", handleKeyboardInput);
}

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

function handleKeyboardInput(keyboardEvent: KeyboardEvent): void {
	let direction: SnakeDirection | undefined;

	switch (keyboardEvent.code) {
		case "ArrowUp": {
			direction = "up";
			break;
		}
		case "ArrowDown": {
			direction = "down";
			break;
		}
		case "ArrowLeft": {
			direction = "left";
			break;
		}
		case "ArrowRight": {
			direction = "right";
			break;
		}
	}

	if (direction) {
		addSnakeDirectionToQueue(direction);
	}
}

/**
 * we limit our queue size to 2 directions to allow the player to change the second turn direction
 */
function addSnakeDirectionToQueue(snakeDirection: SnakeDirection): void {
	const gameState = container.resolve<GameState>("GameState");
	if (gameState.snakeDirectionQueue.length > 0) {
		gameState.snakeDirectionQueue[1] = snakeDirection;
	} else {
		gameState.snakeDirectionQueue.push(snakeDirection);
	}
}
