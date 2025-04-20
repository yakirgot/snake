import { PartPosition } from "@/types/part-position";
import { container } from "tsyringe";
import { GameSettings } from "@/settings";
import { foodColor, snakeColor } from "@/game-engine/canvas/canvas-colors";
import { canvasContext } from "@/game-engine/canvas/canvas-setup";

export function drawSnakePart(snakePosition: PartPosition) {
	const gameSettings = container.resolve<GameSettings>("GameSettings");
	drawPart(snakePosition, snakeColor, gameSettings.snakePartRadiiInPx);
}

export function drawFoodPart(foodPosition: PartPosition): void {
	const gameSettings = container.resolve<GameSettings>("GameSettings");
	drawPart(foodPosition, foodColor, Math.round(gameSettings.partSizeInPx / 3));
}

function drawPart(snakePosition: PartPosition, color: string, radii = 0): void {
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

export function erasePart(partPosition: PartPosition): void {
	const gameSettings = container.resolve<GameSettings>("GameSettings");
	const { partSizeInPx } = gameSettings;

	canvasContext.clearRect(
		partPosition[0],
		partPosition[1],
		partSizeInPx,
		partSizeInPx,
	);
}
