import {
	clearCanvas,
	createSnakeSnapshot,
	setupCanvas,
} from "@/game-engine/canvas";
import {
	currentSnakeHeadPosition,
	getNextSnakeHeadPosition,
	getSnakePartsCount,
	growSnake,
	moveSnake,
	resetSnake,
} from "@/game-engine/snake";
import settings from "@/settings";
import { placeSnakeOnStartingPoint } from "@/game-engine/snake-start-position";
import {
	initFood,
	isFoodPosition,
	replaceFoodPosition,
	resetFood,
} from "@/game-engine/food";
import { PartPosition } from "@/types/part-position";
import { initSnakeDirection } from "@/game-engine/snake-direction";
import { isSnakeCollision } from "@/game-engine/collision-detection";
import { gameData } from "@/game-engine/game-data";

let startButton: HTMLButtonElement;
let pointsElement: HTMLElement;
let moveSnakeIntervalId: number | undefined;
const partsWorker = new Worker(
	new URL("all-parts-positions-worker.ts", import.meta.url),
	{ type: "module" },
);

export async function initGame() {
	setupCanvas();

	pointsElement = document.querySelector("[data-game-points]") as HTMLElement;
	startButton = document.querySelector(
		"[data-snake-game-start-button]",
	) as HTMLButtonElement;

	startButton.disabled = true;

	await updateAllPartsPositions();

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

	moveSnakeIntervalId = window.setInterval(
		makeGameMove,
		settings.snakeIntervalInMs,
	);
}

function makeGameMove() {
	const nextHeadPosition = getNextSnakeHeadPosition();
	const hasCollisionOccurred = isSnakeCollision(nextHeadPosition);

	if (hasCollisionOccurred) {
		endGame();

		return;
	}

	moveSnake(nextHeadPosition);

	handleMaybeHasEaten();

	updateGamePointsBySnakeParts();
}

function handleMaybeHasEaten() {
	const snakeHeadPosition: PartPosition = currentSnakeHeadPosition();
	const hasEaten = isFoodPosition(snakeHeadPosition);

	if (!hasEaten) {
		return;
	}

	replaceFoodPosition(snakeHeadPosition);

	growSnake();
}

function endGame() {
	window.clearInterval(moveSnakeIntervalId);
	moveSnakeIntervalId = undefined;

	startButton.disabled = false;

	clearCanvas();
	createSnakeSnapshot();
	resetSnake();
	resetFood();
}

function updateGamePointsBySnakeParts() {
	const points = getSnakePartsCount();

	pointsElement.textContent = new Intl.NumberFormat().format(points);
}

function updateAllPartsPositions() {
	const promise = new Promise<void>((resolve) => {
		partsWorker.addEventListener(
			"message",
			(results: MessageEvent<PartPosition[]>) => {
				gameData.allPartsPositions = results.data;

				resolve();
			},
			{ once: true },
		);

		// eslint-disable-next-line unicorn/require-post-message-target-origin
		partsWorker.postMessage(settings);
	});

	return promise;
}
