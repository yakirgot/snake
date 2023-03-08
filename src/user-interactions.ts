import { SnakeDirection } from "@/types/snake-direction";
import { addSnakeDirectionToQueue } from "@/snake-direction";

export function listenToUserArrowKeys() {
	addEventListener("keydown", handleKeyboardEvent);
}

export function cancelListenToUserArrowKeys() {
	removeEventListener("keydown", handleKeyboardEvent);
}

function handleKeyboardEvent(keyboardEvent: KeyboardEvent) {
	const direction = getNewDirection(keyboardEvent.code);

	if (direction) {
		addSnakeDirectionToQueue(direction);
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
