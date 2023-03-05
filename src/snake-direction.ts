import { SnakeDirection } from "@/types/snake-direction";
import settings from "@/settings";

let snakeDirection: SnakeDirection = settings.snakeStartingDirection;
const snakeDirectionQueue: SnakeDirection[] = [];

export function maybeChangeSnakeDirection(userInputDirection: SnakeDirection) {
	if (snakeDirectionQueue.length > 0) {
		snakeDirectionQueue[1] = userInputDirection;

		return;
	}

	const nextDirection = snakeDirectionQueue.shift() as SnakeDirection;

	if (isNextDirectionOpposite(nextDirection)) {
		return;
	}

	snakeDirectionQueue[0] = userInputDirection;
}

export function getSnakeDirectionOrFromQueue() {
	maybeUpdateSnakeDirectionFromQueue();

	return snakeDirection;
}

function maybeUpdateSnakeDirectionFromQueue() {
	if (snakeDirectionQueue.length === 0) {
		return;
	}

	const nextDirection = snakeDirectionQueue.shift() as SnakeDirection;

	if (!isNextDirectionOpposite(nextDirection)) {
		snakeDirection = nextDirection;
	}
}

export function resetSnakeDirection() {
	snakeDirection = settings.snakeStartingDirection;
	snakeDirectionQueue.length = 0;
}

function isNextDirectionOpposite(nextDirection: SnakeDirection) {
	return (
		snakeDirection === nextDirection ||
		(snakeDirection === "up" && nextDirection === "down") ||
		(snakeDirection === "down" && nextDirection === "up") ||
		(snakeDirection === "left" && nextDirection === "right") ||
		(snakeDirection === "right" && nextDirection === "left")
	);
}
