import {
	clearCanvas,
	createSnakeSnapshot,
	setupCanvas,
} from "@/game-engine/canvas";
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
import { gameData } from "@/game-engine/game-data";
import { getAllPartsPositions } from "@/game-engine/all-parts-positions";
import { container } from "tsyringe";
import { GameSettings } from "@/settings";

const gameSettings = container.resolve(GameSettings);

let startButton: HTMLButtonElement;
let pointsElement: HTMLElement;
let moveSnakeIntervalId: ReturnType<typeof setTimeout> | undefined;

export async function initGame() {
	setupCanvas();

	pointsElement = document.querySelector("[data-game-points]") as HTMLElement;
	startButton = document.querySelector(
		"[data-snake-game-start-button]",
	) as HTMLButtonElement;

	startButton.disabled = true;

	gameData.allPartsPositions = await getAllPartsPositions();

	startButton.disabled = false;

	startButton.addEventListener("click", () => {
		startButton.disabled = true;

		startGame();
	});
}

function startGame() {
	clearCanvas();
	placeSnakeOnStartingPoint();
	initFood();
	initSnakeDirection();
	updateGamePointsBySnakeParts();

	moveSnakeIntervalId = globalThis.setInterval(
		makeGameMove,
		gameSettings.snakeIntervalInMs,
	);
}

function makeGameMove() {
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
		gameData.snakeGrowMoves += gameSettings.snakePartsGrowth;
	}

	updateGamePointsBySnakeParts();
}

function endGame() {
	globalThis.clearInterval(moveSnakeIntervalId);
	moveSnakeIntervalId = undefined;

	startButton.disabled = false;

	clearCanvas();
	createSnakeSnapshot();
	resetSnake();
	resetSnakeDirection();
	resetFood();
}

function updateGamePointsBySnakeParts() {
	pointsElement.textContent = new Intl.NumberFormat().format(
		gameData.snakePartsCount,
	);
}
