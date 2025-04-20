import { SnakeDirection } from "@/types/snake-direction";
import { container } from "tsyringe";
import { GameSettings } from "@/settings";
import { GameData } from "@/game-engine/game-data";

const gameSettings = container.resolve(GameSettings);

export function initSnakeDirection(): void {
	addEventListener("keydown", handleKeyboardEvent);
}

export function resetSnakeDirection(): void {
	const gameData = container.resolve<GameData>("GameData");
	gameData.currentSnakeDirection = gameSettings.snakeStartingDirection;
	gameData.snakeDirectionQueue.length = 0;

	removeEventListener("keydown", handleKeyboardEvent);
}

export function maybeUpdateCurrentSnakeDirectionFromQueue(): void {
	const gameData = container.resolve<GameData>("GameData");
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

function addSnakeDirectionToQueue(snakeDirection: SnakeDirection): void {
	const gameData = container.resolve<GameData>("GameData");

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

function handleKeyboardEvent(keyboardEvent: KeyboardEvent): void {
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
