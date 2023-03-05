import { SnakeDirection } from "@/types/snake-direction";
import settings from "@/settings";

let snakeDirection: SnakeDirection = settings.snakeStartingDirection;
const snakeDirectionQueue: SnakeDirection[] = [];

export function addSnakeDirectionToQueue(userInputDirection: SnakeDirection) {
	if (snakeDirectionQueue.length > 0) {
		snakeDirectionQueue[1] = userInputDirection;
	} else {
		snakeDirectionQueue.push(userInputDirection);
	}
}

export function getSnakeDirectionOrFromQueue() {
	if (snakeDirectionQueue.length > 0) {
		const nextDirection = snakeDirectionQueue.shift() as SnakeDirection;
		const isOpposite = isNextDirectionOpposite(nextDirection);

		if (!isOpposite) {
			snakeDirection = nextDirection;
		}
	}

	return snakeDirection;
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

export function resetSnakeDirection() {
	snakeDirection = settings.snakeStartingDirection;
	snakeDirectionQueue.length = 0;
}
