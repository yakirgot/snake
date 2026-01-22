import {
	clearCanvas,
	renderGameOverSnapshot,
	setupCanvas,
} from "@/game-engine/canvas/canvas-setup";
import {
	getNextSnakeHeadPosition,
	moveSnake,
	initializeSnakePosition,
	resetSnake,
} from "@/game-engine/snake";
import {
	spawnInitialFood,
	replaceFoodPositionIfWasEaten,
	resetFood,
} from "@/game-engine/food";
import {
	initializeKeyboardInputListeners,
	applyNextDirection,
	resetSnakeDirection,
} from "@/game-engine/snake-direction";
import { checkSnakeCollision } from "@/game-engine/collision-detection";
import { getAllPartsPositions } from "@/game-engine/all-parts-positions/all-parts-positions";
import { container } from "tsyringe";
import { GameSettings } from "@/settings";
import { GameState } from "@/game-engine/game-state";

let startButton: HTMLButtonElement;
let pointsElement: HTMLElement;
let announcerElement: HTMLElement;
let moveSnakeIntervalId: ReturnType<typeof setTimeout> | undefined;

export async function bootstrapGame() {
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
	announcerElement = document.querySelector("#game-announcer") as HTMLElement;

	if (!pointsElement || !startButton || !announcerElement) {
		console.error("Required DOM elements not found");
		return;
	}

	startButton.disabled = true;

	try {
		const gameState = container.resolve<GameState>("GameState");
		gameState.canvasGridPositions = await getAllPartsPositions();
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
	initializeSnakePosition();
	spawnInitialFood();
	initializeKeyboardInputListeners();
	updateGamePointsBySnakeParts();
	announce("Game started. Use arrow keys to move.");
	startGameLoop();
}

function announce(message: string): void {
	announcerElement.textContent = message;
}

function processGameTick(): void {
	const gameState = container.resolve<GameState>("GameState");
	if (gameState.snakeDirectionQueue.length > 0) {
		applyNextDirection();
	}

	const nextHeadPosition = getNextSnakeHeadPosition();
	const hasCollisionOccurred = checkSnakeCollision(nextHeadPosition);

	if (hasCollisionOccurred) {
		endGame();

		return;
	}

	const snakeWasGrowing = gameState.pendingSnakeGrowthSteps > 0;
	moveSnake(nextHeadPosition);

	const hasEaten = replaceFoodPositionIfWasEaten(
		gameState.currentSnakeHeadPosition,
	);

	if (hasEaten) {
		const gameSettings = container.resolve<GameSettings>("GameSettings");
		gameState.pendingSnakeGrowthSteps += gameSettings.snakePartsGrowth;
		announce(
			`Food eaten. ${gameState.snakePartsCount + gameState.pendingSnakeGrowthSteps} points`,
		);
	}

	if (snakeWasGrowing) {
		updateGamePointsBySnakeParts();
	}
}

function endGame(): void {
	clearSnakeInterval();

	startButton.disabled = false;

	const gameState = container.resolve<GameState>("GameState");
	announce(
		`Game over. Final score: ${gameState.snakePartsCount} points. Press start to play again.`,
	);

	clearCanvas();
	renderGameOverSnapshot();
	resetSnake();
	resetSnakeDirection();
	resetFood();
}

function startGameLoop(): void {
	const gameSettings = container.resolve<GameSettings>("GameSettings");

	moveSnakeIntervalId = globalThis.setInterval(
		processGameTick,
		gameSettings.snakeIntervalInMs,
	);
}

function clearSnakeInterval(): void {
	globalThis.clearInterval(moveSnakeIntervalId);
	moveSnakeIntervalId = undefined;
}

function updateGamePointsBySnakeParts(): void {
	const gameState = container.resolve<GameState>("GameState");

	pointsElement.textContent = new Intl.NumberFormat().format(
		gameState.snakePartsCount,
	);
}
