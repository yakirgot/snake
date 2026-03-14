import { clearCanvas, setupCanvas } from "./canvas/canvas-setup.js";
import { initializeSnakePosition } from "./snake.js";
import { spawnInitialFood } from "./food.js";
import {
	initializeKeyboardInputListeners,
	initializeTouchInputListeners,
} from "./snake-direction.js";
import { container } from "tsyringe";
import { GameState } from "./game-state.js";
import { HighScore } from "@snake/ui-data-access";
import { GameSounds } from "./audio/game-sounds.js";
import { getAllPartsPositions } from "./all-parts-positions.js";
import { SoundSettings } from "./audio/sound-settings.js";
import { registerProviders } from "./providers.js";
import { UIManager } from "./ui-manager.js";
import { GameLoop } from "./game-loop.js";

export async function bootstrapGame(): Promise<void> {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", () => {
			void bootstrapGame();
		});
		return;
	}

	registerProviders();

	const uiManager = container.resolve<UIManager>("UIManager");

	try {
		setupCanvas();
	} catch (error) {
		console.error("Failed to setup canvas:", error);
		return;
	}

	try {
		uiManager.initializeDomElements();
	} catch (error) {
		console.error("Required DOM elements not found:", error);
		return;
	}

	try {
		await initializeGameState();
	} catch (error) {
		console.error("Failed to initialize game positions:", error);
		return;
	}

	setupEventListeners();
}

async function initializeGameState(): Promise<void> {
	const gameState = container.resolve<GameState>("GameState");
	const highScore = container.resolve<HighScore>("HighScore");
	const uiManager = container.resolve<UIManager>("UIManager");

	gameState.canvasGridPositions = await getAllPartsPositions();
	gameState.highScore = highScore.getHighScore();
	uiManager.updateHighScoreDisplay();
}

function setupEventListeners(): void {
	const gameState = container.resolve<GameState>("GameState");
	const soundSettings = container.resolve<SoundSettings>("SoundSettings");
	const uiManager = container.resolve<UIManager>("UIManager");

	uiManager.updateSoundButton(gameState.soundsEnabled);

	uiManager.addSoundToggleClickListener(() => {
		gameState.soundsEnabled = !gameState.soundsEnabled;
		soundSettings.saveSoundSetting(gameState.soundsEnabled);
		uiManager.updateSoundButton(gameState.soundsEnabled);
		uiManager.announce(
			`Sound ${gameState.soundsEnabled ? "enabled" : "disabled"}`,
		);
	});

	uiManager.addStartButtonClickListener(() => {
		uiManager.setStartButtonDisabled(true);
		startGame();
	});
}

function startGame(): void {
	const audioService = container.resolve<GameSounds>("GameSounds");
	const uiManager = container.resolve<UIManager>("UIManager");
	const gameLoop = container.resolve<GameLoop>("GameLoop");

	audioService.playStartSound();

	clearCanvas();
	initializeSnakePosition();
	spawnInitialFood();
	initializeKeyboardInputListeners();
	initializeTouchInputListeners();
	uiManager.updateGamePointsBySnakeParts();
	uiManager.announce("Game started. Use arrow keys or swipe to move.");
	gameLoop.startGameLoop();
}
