import { Position } from "@/types/snake-types";
import { container } from "tsyringe";
import { GameSettings } from "@/settings";
import {
	canvasColor,
	foodColor,
	snakeColor,
} from "@/game-engine/canvas/canvas-colors";
import { canvasContext } from "@/game-engine/canvas/canvas-setup";
import { GameState } from "@/game-engine/game-state";

export function drawSnakePart(snakePosition: Position, isHead = false) {
	const gameSettings = container.resolve<GameSettings>("GameSettings");

	drawPart(snakePosition, snakeColor, gameSettings.snakePartRadiiInPx);

	if (isHead) {
		drawEyes(snakePosition);
	}
}

function drawEyes(snakePosition: Position): void {
	const gameState = container.resolve<GameState>("GameState");
	const gameSettings = container.resolve<GameSettings>("GameSettings");
	const { partSizeInPx } = gameSettings;

	const eyeColor = canvasColor;
	const eyeRadius = partSizeInPx / 8;
	const eyeOffset = partSizeInPx / 4;

	canvasContext.fillStyle = eyeColor;

	const [x, y] = snakePosition;
	const centerX = x + partSizeInPx / 2;
	const centerY = y + partSizeInPx / 2;

	let eye1: [number, number];
	let eye2: [number, number];

	switch (gameState.currentSnakeDirection) {
		case "right": {
			eye1 = [x + partSizeInPx - eyeOffset, centerY - eyeOffset];
			eye2 = [x + partSizeInPx - eyeOffset, centerY + eyeOffset];
			break;
		}
		case "left": {
			eye1 = [x + eyeOffset, centerY - eyeOffset];
			eye2 = [x + eyeOffset, centerY + eyeOffset];
			break;
		}
		case "up": {
			eye1 = [centerX - eyeOffset, y + eyeOffset];
			eye2 = [centerX + eyeOffset, y + eyeOffset];
			break;
		}
		case "down": {
			eye1 = [centerX - eyeOffset, y + partSizeInPx - eyeOffset];
			eye2 = [centerX + eyeOffset, y + partSizeInPx - eyeOffset];
			break;
		}
	}

	drawEye(eye1, eyeRadius);
	drawEye(eye2, eyeRadius);
}

function drawEye(position: [number, number], radius: number): void {
	canvasContext.beginPath();
	canvasContext.arc(position[0], position[1], radius, 0, Math.PI * 2);
	canvasContext.fill();
}

export function drawFoodPart(foodPosition: Position): void {
	const gameSettings = container.resolve<GameSettings>("GameSettings");
	drawPart(foodPosition, foodColor, Math.round(gameSettings.partSizeInPx / 3));
}

function drawPart(snakePosition: Position, color: string, radii = 0): void {
	const gameSettings = container.resolve<GameSettings>("GameSettings");
	const { partSizeInPx } = gameSettings;

	canvasContext.fillStyle = color;

	canvasContext.beginPath();
	canvasContext.roundRect(
		snakePosition[0],
		snakePosition[1],
		partSizeInPx,
		partSizeInPx,
		[radii],
	);
	canvasContext.fill();
}

export function erasePart(position: Position): void {
	const gameSettings = container.resolve<GameSettings>("GameSettings");
	const { partSizeInPx } = gameSettings;

	canvasContext.clearRect(position[0], position[1], partSizeInPx, partSizeInPx);
}
