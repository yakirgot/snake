import { Position } from "../../types/snake-types";
import { container } from "tsyringe";
import { GameSettings } from "../../settings";
import {
	canvasColor,
	foodColor,
	foodColorDark,
	foodColorLight,
	snakeColor,
	snakeColorDark,
	snakeColorLight,
} from "./canvas-colors";
import { canvasContext } from "./canvas-setup";
import { GameState } from "../game-state";

export function drawSnakePart(snakePosition: Position) {
	const gameSettings = container.resolve<GameSettings>("GameSettings");
	const { partSizeInPx, snakePartRadiiInPx } = gameSettings;

	const [x, y] = snakePosition;

	const gradient = canvasContext.createLinearGradient(
		x,
		y,
		x + partSizeInPx,
		y + partSizeInPx,
	);
	gradient.addColorStop(0, snakeColorLight);
	gradient.addColorStop(0.5, snakeColor);
	gradient.addColorStop(1, snakeColorDark);

	canvasContext.fillStyle = gradient;
	canvasContext.beginPath();
	canvasContext.roundRect(x, y, partSizeInPx, partSizeInPx, [
		snakePartRadiiInPx,
	]);
	canvasContext.fill();
}

export function drawSnakeHeadPart(snakePosition: Position) {
	drawSnakePart(snakePosition);
	drawEyes(snakePosition);
}

export function drawEyes(snakePosition: Position): void {
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
	const { partSizeInPx } = gameSettings;

	const [x, y] = foodPosition;
	const radii = Math.round(partSizeInPx / 3);

	const gradient = canvasContext.createLinearGradient(
		x,
		y,
		x + partSizeInPx,
		y + partSizeInPx,
	);
	gradient.addColorStop(0, foodColorLight);
	gradient.addColorStop(0.5, foodColor);
	gradient.addColorStop(1, foodColorDark);

	canvasContext.fillStyle = gradient;
	canvasContext.beginPath();
	canvasContext.roundRect(x, y, partSizeInPx, partSizeInPx, [radii]);
	canvasContext.fill();
}

export function erasePart(position: Position): void {
	const gameSettings = container.resolve<GameSettings>("GameSettings");
	const { partSizeInPx } = gameSettings;

	canvasContext.fillStyle = canvasColor;
	canvasContext.fillRect(position[0], position[1], partSizeInPx, partSizeInPx);
}
