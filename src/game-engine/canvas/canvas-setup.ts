import { container } from "tsyringe";
import { GameSettings } from "@/settings";
import { GameState } from "@/game-engine/game-state";
import { canvasColor, snakeColor } from "@/game-engine/canvas/canvas-colors";
import { getRequiredElement } from "@/game-engine/utils/dom";

export let canvasElement: HTMLCanvasElement;
export let canvasContext: CanvasRenderingContext2D;

export function setupCanvas(): void {
	canvasElement = getRequiredElement<HTMLCanvasElement>("[data-snake-game]");

	const context = canvasElement.getContext("2d");
	if (!context) {
		throw new Error("Could not get 2D context from canvas");
	}
	canvasContext = context;

	setCanvasSize();

	clearCanvas();
}

function setCanvasSize(): void {
	const gameSettings = container.resolve<GameSettings>("GameSettings");
	const { canvasWidthInPx, canvasHeightInPx } = gameSettings;

	canvasElement.width = canvasWidthInPx;
	canvasElement.height = canvasHeightInPx;
}

export function clearCanvas(): void {
	const gameSettings = container.resolve<GameSettings>("GameSettings");
	const { canvasWidthInPx, canvasHeightInPx } = gameSettings;

	canvasContext.fillStyle = canvasColor;
	canvasContext.fillRect(0, 0, canvasWidthInPx, canvasHeightInPx);
}

export function renderGameOverSnapshot(): void {
	const gameSettings = container.resolve<GameSettings>("GameSettings");
	const { partSizeInPx, snakePartRadiiInPx } = gameSettings;

	canvasContext.strokeStyle = snakeColor;
	canvasContext.shadowColor = snakeColor;
	canvasContext.shadowBlur = Math.round(partSizeInPx / 3);

	const gameState = container.resolve<GameState>("GameState");
	for (const snakePosition of gameState.snakePositions) {
		canvasContext.beginPath();

		canvasContext.roundRect(
			snakePosition[0],
			snakePosition[1],
			partSizeInPx,
			partSizeInPx,
			[snakePartRadiiInPx],
		);
		canvasContext.closePath();
		canvasContext.stroke();
	}

	canvasContext.shadowBlur = 0;
}
