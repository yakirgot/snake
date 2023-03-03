import { SnakeDirection } from "@/types/snake-direction";
import { maybeChangeSnakeDirection } from "@/snake";

export function listenToUserArrowKeys() {
	addEventListener("keydown", handleKeyboardEvent);
}

export function cancelListenToUserArrowKeys() {
	removeEventListener("keydown", handleKeyboardEvent);
}

function handleKeyboardEvent(event: KeyboardEvent) {
	const direction = getNewDirection(event.code);

	if (direction) {
		maybeChangeSnakeDirection(direction);
	}
}

function getNewDirection(key: string): SnakeDirection | undefined {
	switch (key) {
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
