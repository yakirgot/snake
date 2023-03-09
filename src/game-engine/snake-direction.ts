import { SnakeDirection } from "@/types/snake-direction";
import settings from "@/settings";
import { gameData } from "@/game-engine/game-data";

export function initSnakeDirection() {
	addEventListener("keydown", handleKeyboardEvent);
}

export function resetSnakeDirection() {
	gameData.currentSnakeDirection = settings.snakeStartingDirection;
	gameData.snakeDirectionQueue.length = 0;

	removeEventListener("keydown", handleKeyboardEvent);
}

export function maybeUpdateCurrentSnakeDirectionFromQueue() {
	const nextSnakeDirection =
		gameData.snakeDirectionQueue.shift() as SnakeDirection;
	const isOppositeDirection =
		gameData.currentSnakeDirection === nextSnakeDirection ||
		(gameData.currentSnakeDirection === "up" &&
			nextSnakeDirection === "down") ||
		(gameData.currentSnakeDirection === "down" &&
			nextSnakeDirection === "up") ||
		(gameData.currentSnakeDirection === "left" &&
			nextSnakeDirection === "right") ||
		(gameData.currentSnakeDirection === "right" &&
			nextSnakeDirection === "left");

	if (!isOppositeDirection) {
		gameData.currentSnakeDirection = nextSnakeDirection;
	}
}

function addSnakeDirectionToQueue(snakeDirection: SnakeDirection) {
	/**
	 * We limit our queue size to 2 directions to allow the player to change the second turn direction
	 */
	const hasSnakeDirectionsInQueue = gameData.snakeDirectionQueue.length > 0;

	if (hasSnakeDirectionsInQueue) {
		gameData.snakeDirectionQueue[1] = snakeDirection;
	} else {
		gameData.snakeDirectionQueue.push(snakeDirection);
	}
}

function handleKeyboardEvent(keyboardEvent: KeyboardEvent) {
	const direction = getDirectionFromKeyboardEventCode(keyboardEvent.code);

	if (direction) {
		addSnakeDirectionToQueue(direction);
	}
}

function getDirectionFromKeyboardEventCode(
	code: string,
): SnakeDirection | undefined {
	switch (code) {
		case "ArrowUp": {
			return "up";
		}
		case "ArrowDown": {
			return "down";
		}
		case "ArrowLeft": {
			return "left";
		}
		case "ArrowRight": {
			return "right";
		}
		default: {
			return undefined;
		}
	}
}
