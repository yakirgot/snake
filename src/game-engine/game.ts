import {
	clearCanvas,
	renderGameOverSnapshot,
	setupCanvas,
} from "@/game-engine/canvas/canvas-setup";
import {
	getNextSnakeHeadPosition,
	initializeSnakePosition,
	moveSnake,
	resetSnake,
} from "@/game-engine/snake";
import {
	replaceFoodPositionIfWasEaten,
	resetFood,
	spawnInitialFood,
} from "@/game-engine/food";
import {
	applyNextDirection,
	initializeKeyboardInputListeners,
	resetSnakeDirection,
} from "@/game-engine/snake-direction";
import { checkSnakeCollision } from "@/game-engine/collision-detection";
import { container } from "tsyringe";
import { GameSettings } from "@/settings";
import { GameState } from "@/game-engine/game-state";
import { HighScore } from "@/game-engine/high-score";
import { GameSounds } from "@/game-engine/game-sounds";
import { getAllPartsPositions } from "@/game-engine/all-parts-positions/all-parts-positions";

let startButton: HTMLButtonElement;
let pointsElement: HTMLElement;
let highScoreElement: HTMLElement;
let announcerElement: HTMLElement;
let soundToggleButton: HTMLButtonElement;
let moveSnakeIntervalId: ReturnType<typeof setTimeout> | undefined;

export async function bootstrapGame(): Promise<void> {
	try {
		setupCanvas();
	} catch (error) {
		console.error("Failed to setup canvas:", error);
		return;
	}

	pointsElement = document.querySelector("[data-game-points]") as HTMLElement;
	highScoreElement = document.querySelector("[data-high-score]") as HTMLElement;
	startButton = document.querySelector(
		"[data-snake-game-start-button]",
	) as HTMLButtonElement;
	announcerElement = document.querySelector("#game-announcer") as HTMLElement;
	soundToggleButton = document.querySelector(
		"[data-sound-toggle]",
	) as HTMLButtonElement;

	if (
		!pointsElement ||
		!highScoreElement ||
		!startButton ||
		!announcerElement ||
		!soundToggleButton
	) {
		console.error("Required DOM elements not found");
		return;
	}

	startButton.disabled = true;

	try {
		const gameState = container.resolve<GameState>("GameState");
		const highScore = container.resolve<HighScore>("HighScore");

		gameState.canvasGridPositions = await getAllPartsPositions();
		gameState.highScore = highScore.getHighScore();
		updateHighScoreDisplay();
	} catch (error) {
		console.error("Failed to initialize game positions:", error);
		startButton.disabled = false;
		return;
	}

	startButton.disabled = false;

	const gameState = container.resolve<GameState>("GameState");
	soundToggleButton.textContent = `Sound: ${gameState.soundsEnabled ? "ON" : "OFF"}`;

	soundToggleButton.addEventListener("click", () => {
		gameState.soundsEnabled = !gameState.soundsEnabled;
		soundToggleButton.textContent = `Sound: ${gameState.soundsEnabled ? "ON" : "OFF"}`;
		announce(`Sound ${gameState.soundsEnabled ? "enabled" : "disabled"}`);
	});

	startButton.addEventListener("click", () => {
		startButton.disabled = true;

		startGame();
	});
}

function startGame(): void {
	const audioService = container.resolve<GameSounds>("GameSounds");
	audioService.playStartSound();

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
		const audioService = container.resolve<GameSounds>("GameSounds");

		gameState.pendingSnakeGrowthSteps += gameSettings.snakePartsGrowth;
		audioService.playEatSound();

		announce(
			`Food eaten. ${gameState.snakePartsCount + gameState.pendingSnakeGrowthSteps} points`,
		);
	}

	if (snakeWasGrowing) {
		updateGamePointsBySnakeParts();
	}
}

function endGame(): void {
	const gameSounds = container.resolve<GameSounds>("GameSounds");
	gameSounds.playGameOverSound();

	clearSnakeInterval();

	startButton.disabled = false;

	const gameState = container.resolve<GameState>("GameState");
	const highScore = container.resolve<HighScore>("HighScore");

	if (gameState.snakePartsCount > gameState.highScore) {
		gameState.highScore = gameState.snakePartsCount;
		highScore.saveHighScore(gameState.highScore);
		updateHighScoreDisplay();
	}

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

function updateHighScoreDisplay(): void {
	const gameState = container.resolve<GameState>("GameState");

	highScoreElement.textContent = new Intl.NumberFormat().format(
		gameState.highScore,
	);
}
