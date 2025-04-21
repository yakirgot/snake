import { SnakeDirection } from "@/types/snake-types";
import { container } from "tsyringe";
import { GameSettings } from "@/settings";
import { GameData } from "@/game-engine/game-data";

export function initSnakeDirection(): void {
	addEventListener("keydown", addDirectionFromKeyboardEvent);
}

export function resetSnakeDirection(): void {
	const gameData = container.resolve<GameData>("GameData");
	const gameSettings = container.resolve(GameSettings);

	gameData.currentSnakeDirection = gameSettings.snakeStartingDirection;
	gameData.snakeDirectionQueue.length = 0;

	removeEventListener("keydown", addDirectionFromKeyboardEvent);
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

function addDirectionFromKeyboardEvent(keyboardEvent: KeyboardEvent): void {
	let direction: SnakeDirection | undefined;

	switch (keyboardEvent.code) {
		case "ArrowUp": {
			direction = "up";
			break;
		}
		case "ArrowDown": {
			direction = "down";
			break;
		}
		case "ArrowLeft": {
			direction = "left";
			break;
		}
		case "ArrowRight": {
			direction = "right";
			break;
		}
	}

	if (direction) {
		addSnakeDirectionToQueue(direction);
	}
}

/**
 * We limit our queue size to 2 directions to allow the player to change the second turn direction
 */
function addSnakeDirectionToQueue(snakeDirection: SnakeDirection): void {
	const gameData = container.resolve<GameData>("GameData");
	if (gameData.snakeDirectionQueue.length > 0) {
		gameData.snakeDirectionQueue[1] = snakeDirection;
	} else {
		gameData.snakeDirectionQueue.push(snakeDirection);
	}
}
