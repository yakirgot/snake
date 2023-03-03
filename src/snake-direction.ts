import { SnakeDirection } from "@/types/snake-direction";

export let snakeDirection: SnakeDirection = "right";

export function maybeChangeSnakeDirection(direction: SnakeDirection) {
	if (snakeDirection === direction) {
		return;
	}

	if (snakeDirection === "up" && direction === "down") {
		return;
	}

	if (snakeDirection === "down" && direction === "up") {
		return;
	}

	if (snakeDirection === "left" && direction === "right") {
		return;
	}

	if (snakeDirection === "right" && direction === "left") {
		return;
	}

	snakeDirection = direction;
}

export function resetSnakeDirection() {
	snakeDirection = "right";
}
