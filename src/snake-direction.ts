import { SnakeDirection } from "@/types/snake-direction";
import settings from "@/settings";

let currentSnakeDirection: SnakeDirection = settings.snakeStartingDirection;
const snakeDirectionQueue: SnakeDirection[] = [];

export function addSnakeDirectionToQueue(snakeDirection: SnakeDirection) {
	if (snakeDirectionQueue.length > 0) {
		snakeDirectionQueue[1] = snakeDirection;
	} else {
		snakeDirectionQueue.push(snakeDirection);
	}
}

export function getSnakeDirectionOrFromQueue() {
	if (snakeDirectionQueue.length > 0) {
		const nextDirection = snakeDirectionQueue.shift() as SnakeDirection;
		const isOpposite = isDirectionOpposite(nextDirection);

		if (!isOpposite) {
			currentSnakeDirection = nextDirection;
		}
	}

	return currentSnakeDirection;
}

function isDirectionOpposite(snakeDirection: SnakeDirection) {
	return (
		currentSnakeDirection === snakeDirection ||
		(currentSnakeDirection === "up" && snakeDirection === "down") ||
		(currentSnakeDirection === "down" && snakeDirection === "up") ||
		(currentSnakeDirection === "left" && snakeDirection === "right") ||
		(currentSnakeDirection === "right" && snakeDirection === "left")
	);
}

export function resetSnakeDirection() {
	currentSnakeDirection = settings.snakeStartingDirection;
	snakeDirectionQueue.length = 0;
}
