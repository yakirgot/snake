import { container } from "tsyringe";
import { GameSettings } from "@/settings";
import { GameData } from "@/game-engine/game-data";
import { canvasColor, snakeColor } from "@/game-engine/canvas-colors";

export let canvasElement: HTMLCanvasElement;
export let canvasContext: CanvasRenderingContext2D;

export function setupCanvas() {
	canvasElement = document.querySelector<HTMLCanvasElement>(
		"[data-snake-game]",
	) as HTMLCanvasElement;

	canvasContext = canvasElement.getContext("2d") as CanvasRenderingContext2D;

	setCanvasSize();

	clearCanvas();
}

function setCanvasSize() {
	const gameSettings = container.resolve<GameSettings>("GameSettings");
	const { canvasWidthInPx, canvasHeightInPx } = gameSettings;

	canvasElement.width = canvasWidthInPx;
	canvasElement.style.width = `${canvasWidthInPx}px`;

	canvasElement.height = canvasHeightInPx;
	canvasElement.style.height = `${canvasHeightInPx}px`;
}

export function clearCanvas() {
	const gameSettings = container.resolve<GameSettings>("GameSettings");
	const { canvasWidthInPx, canvasHeightInPx } = gameSettings;

	canvasContext.fillStyle = canvasColor;
	canvasContext.fillRect(0, 0, canvasWidthInPx, canvasHeightInPx);
}

export function createSnakeSnapshot() {
	const gameSettings = container.resolve<GameSettings>("GameSettings");
	const { partSizeInPx, snakePartRadiiInPx } = gameSettings;

	canvasContext.strokeStyle = snakeColor;
	canvasContext.shadowColor = snakeColor;
	canvasContext.shadowBlur = Math.round(partSizeInPx / 3);

	const gameData = container.resolve<GameData>("GameData");
	for (const snakePosition of gameData.snakePositions) {
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
