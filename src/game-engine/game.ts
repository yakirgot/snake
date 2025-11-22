import {
	clearCanvas,
	createSnakeSnapshot,
	setupCanvas,
} from "@/game-engine/canvas/canvas-setup";
import {
	getNextSnakeHeadPosition,
	moveSnake,
	placeSnakeOnStartingPoint,
	resetSnake,
} from "@/game-engine/snake";
import {
	initFood,
	replaceFoodPositionIfHasEaten,
	resetFood,
} from "@/game-engine/food";
import {
	initSnakeDirection,
	maybeUpdateCurrentSnakeDirectionFromQueue,
	resetSnakeDirection,
} from "@/game-engine/snake-direction";
import { isSnakeCollision } from "@/game-engine/collision-detection";
import { getAllPartsPositions } from "@/game-engine/all-parts-positions/all-parts-positions";
import { container } from "tsyringe";
import { GameSettings } from "@/settings";
import { GameData } from "@/game-engine/game-data";

let startButton: HTMLButtonElement;
let pointsElement: HTMLElement;
let moveSnakeIntervalId: ReturnType<typeof setTimeout> | undefined;

export async function initGame() {
	try {
		setupCanvas();
	} catch (error) {
		console.error("Failed to setup canvas:", error);
		return;
	}

	pointsElement = document.querySelector("[data-game-points]") as HTMLElement;
	startButton = document.querySelector(
		"[data-snake-game-start-button]",
	) as HTMLButtonElement;

	if (!pointsElement || !startButton) {
		console.error("Required DOM elements not found");
		return;
	}

	startButton.disabled = true;

	try {
		const gameData = container.resolve<GameData>("GameData");
		gameData.allPartsPositions = await getAllPartsPositions();
	} catch (error) {
		console.error("Failed to initialize game positions:", error);
		startButton.disabled = false;
		return;
	}

	startButton.disabled = false;

	startButton.addEventListener("click", () => {
		startButton.disabled = true;

		startGame();
	});
}

function startGame(): void {
	clearCanvas();
	placeSnakeOnStartingPoint();
	initFood();
	initSnakeDirection();
	updateGamePointsBySnakeParts();
	setSnakeInterval();
}

function makeGameMove(): void {
	const gameData = container.resolve<GameData>("GameData");
	if (gameData.snakeDirectionQueue.length > 0) {
		maybeUpdateCurrentSnakeDirectionFromQueue();
	}

	const nextHeadPosition = getNextSnakeHeadPosition();
	const hasCollisionOccurred = isSnakeCollision(nextHeadPosition);

	if (hasCollisionOccurred) {
		endGame();

		return;
	}

	moveSnake(nextHeadPosition);

	const hasEaten = replaceFoodPositionIfHasEaten(
		gameData.currentSnakeHeadPosition,
	);

	if (hasEaten) {
		const gameSettings = container.resolve<GameSettings>("GameSettings");
		gameData.snakeGrowMoves += gameSettings.snakePartsGrowth;
	}

	updateGamePointsBySnakeParts();
}

function endGame(): void {
	clearSnakeInterval();

	startButton.disabled = false;

	clearCanvas();
	createSnakeSnapshot();
	resetSnake();
	resetSnakeDirection();
	resetFood();
}

function setSnakeInterval(): void {
	const gameSettings = container.resolve<GameSettings>("GameSettings");

	moveSnakeIntervalId = globalThis.setInterval(
		makeGameMove,
		gameSettings.snakeIntervalInMs,
	);
}

function clearSnakeInterval(): void {
	globalThis.clearInterval(moveSnakeIntervalId);
	moveSnakeIntervalId = undefined;
}

function updateGamePointsBySnakeParts(): void {
	const gameData = container.resolve<GameData>("GameData");

	pointsElement.textContent = new Intl.NumberFormat().format(
		gameData.snakePartsCount,
	);
}
