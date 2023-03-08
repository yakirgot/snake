import { SnakeDirection } from "@/types/snake-direction";
import settings from "@/game-engine/settings";

let currentSnakeDirection: SnakeDirection = settings.snakeStartingDirection;
const snakeDirectionQueue: SnakeDirection[] = [];

export function initSnakeDirection() {
	addEventListener("keydown", handleKeyboardEvent);
}

export function resetSnakeDirection() {
	currentSnakeDirection = settings.snakeStartingDirection;
	snakeDirectionQueue.length = 0;

	removeEventListener("keydown", handleKeyboardEvent);
}

export function getSnakeDirectionOrFromQueue() {
	if (snakeDirectionQueue.length > 0) {
		maybeUpdateCurrentSnakeDirectionFromQueue();
	}

	return currentSnakeDirection;
}

function maybeUpdateCurrentSnakeDirectionFromQueue() {
	const nextSnakeDirection = snakeDirectionQueue.shift() as SnakeDirection;
	const isOppositeDirection =
		currentSnakeDirection === nextSnakeDirection ||
		(currentSnakeDirection === "up" && nextSnakeDirection === "down") ||
		(currentSnakeDirection === "down" && nextSnakeDirection === "up") ||
		(currentSnakeDirection === "left" && nextSnakeDirection === "right") ||
		(currentSnakeDirection === "right" && nextSnakeDirection === "left");

	if (!isOppositeDirection) {
		currentSnakeDirection = nextSnakeDirection;
	}
}

function addSnakeDirectionToQueue(snakeDirection: SnakeDirection) {
	/**
	 * We limit our queue size to 2 directions to allow the player to change the second turn direction
	 */
	const hasSnakeDirectionsInQueue = snakeDirectionQueue.length > 0;

	if (hasSnakeDirectionsInQueue) {
		snakeDirectionQueue[1] = snakeDirection;
	} else {
		snakeDirectionQueue.push(snakeDirection);
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
