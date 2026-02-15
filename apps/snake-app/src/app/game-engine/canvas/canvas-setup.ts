import { container } from "tsyringe";
import { GameSettings } from "../../settings";
import { GameState } from "../game-state";
import { getRequiredElement } from "../utils/dom";
import { DOM_SELECTORS } from "../../constants";
import { drawEyes } from "./canvas-draw";
import { getColor } from "./canvas-colors";

export let canvasElement: HTMLCanvasElement;
export let canvasContext: CanvasRenderingContext2D;

export function setupCanvas(): void {
	canvasElement = getRequiredElement<HTMLCanvasElement>(DOM_SELECTORS.CANVAS);

	const context = canvasElement.getContext("2d");
	if (!context) {
		throw new Error("Could not get 2D context from canvas");
	}
	canvasContext = context;

	setCanvasSize();
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

	canvasContext.fillStyle = getColor("canvasColor");
	canvasContext.fillRect(0, 0, canvasWidthInPx, canvasHeightInPx);
}

export function renderGameOverSnapshot(): void {
	const gameSettings = container.resolve<GameSettings>("GameSettings");
	const { partSizeInPx, snakePartRadiiInPx } = gameSettings;

	canvasContext.strokeStyle = getColor("snakeColor");
	canvasContext.shadowColor = getColor("snakeColor");
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

	drawEyes(gameState.currentSnakeHeadPosition);

	canvasContext.shadowBlur = 0;
}
