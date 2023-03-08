import { SnakeDirection } from "@/types/snake-direction";
import settings from "@/game-engine/settings";

let currentSnakeDirection: SnakeDirection = settings.snakeStartingDirection;
const snakeDirectionQueue: SnakeDirection[] = [];

export function addSnakeDirectionToQueue(snakeDirection: SnakeDirection) {
	/**
	 * We limit our queue size to 2 directions to allow the player to change the second turn direction
	 */
	const hasDirectionsInQueue = snakeDirectionQueue.length > 0;

	if (hasDirectionsInQueue) {
		snakeDirectionQueue[1] = snakeDirection;
	} else {
		snakeDirectionQueue.push(snakeDirection);
	}
}

export function resetSnakeDirection() {
	currentSnakeDirection = settings.snakeStartingDirection;
	snakeDirectionQueue.length = 0;
}

export function getSnakeDirectionOrFromQueue() {
	if (snakeDirectionQueue.length > 0) {
		maybeUpdateCurrentSnakeDirectionFromQueue();
	}

	return currentSnakeDirection;
}

function maybeUpdateCurrentSnakeDirectionFromQueue() {
	const nextDirection = snakeDirectionQueue.shift() as SnakeDirection;
	const isOpposite =
		currentSnakeDirection === nextDirection ||
		(currentSnakeDirection === "up" && nextDirection === "down") ||
		(currentSnakeDirection === "down" && nextDirection === "up") ||
		(currentSnakeDirection === "left" && nextDirection === "right") ||
		(currentSnakeDirection === "right" && nextDirection === "left");

	if (!isOpposite) {
		currentSnakeDirection = nextDirection;
	}
}
