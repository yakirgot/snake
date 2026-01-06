import { Position } from "@/types/snake-types";
import { container } from "tsyringe";
import { GameSettings } from "@/settings";
import { foodColor, snakeColor } from "@/game-engine/canvas/canvas-colors";
import { canvasContext } from "@/game-engine/canvas/canvas-setup";

export function drawSnakePart(snakePosition: Position) {
	const gameSettings = container.resolve<GameSettings>("GameSettings");
	drawPart(snakePosition, snakeColor, gameSettings.snakePartRadiiInPx);
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
	canvasContext.closePath();
	canvasContext.fill();
}

export function erasePart(position: Position): void {
	const gameSettings = container.resolve<GameSettings>("GameSettings");
	const { partSizeInPx } = gameSettings;

	canvasContext.clearRect(position[0], position[1], partSizeInPx, partSizeInPx);
}
