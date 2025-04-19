import { PartPosition } from "@/types/part-position";
import { gameData } from "@/game-engine/game-data";
import { container } from "tsyringe";
import { GameSettings } from "@/settings";

const gameSettings = container.resolve(GameSettings);

let canvasElement: HTMLCanvasElement;
let canvasContext: CanvasRenderingContext2D;
const snakeColor = globalThis
	.getComputedStyle(document.documentElement)
	.getPropertyValue("--color-dark-slate-gray");
const foodColor = globalThis
	.getComputedStyle(document.documentElement)
	.getPropertyValue("--color-teal-blue");

export function setupCanvas() {
	canvasElement = document.querySelector<HTMLCanvasElement>(
		"[data-snake-game]",
	) as HTMLCanvasElement;

	canvasContext = canvasElement.getContext("2d") as CanvasRenderingContext2D;

	setCanvasSize();

	clearCanvas();
}

function setCanvasSize() {
	const { canvasWidthInPx, canvasHeightInPx } = gameSettings;

	canvasElement.width = canvasWidthInPx;
	canvasElement.style.width = `${canvasWidthInPx}px`;

	canvasElement.height = canvasHeightInPx;
	canvasElement.style.height = `${canvasHeightInPx}px`;
}

export function clearCanvas() {
	const { canvasWidthInPx, canvasHeightInPx } = gameSettings;

	canvasContext.fillStyle = globalThis
		.getComputedStyle(document.documentElement)
		.getPropertyValue("--color-maize-crayola");
	canvasContext.fillRect(0, 0, canvasWidthInPx, canvasHeightInPx);
}

export function drawSnakePart(snakePosition: PartPosition) {
	drawPart(snakePosition, snakeColor, gameSettings.snakePartRadiiInPx);
}

export function drawFoodPart(foodPosition: PartPosition) {
	drawPart(foodPosition, foodColor, gameSettings.partSizeInPx / 3);
}

export function createSnakeSnapshot() {
	const { partSizeInPx, snakePartRadiiInPx } = gameSettings;

	canvasContext.strokeStyle = snakeColor;
	canvasContext.shadowColor = snakeColor;
	canvasContext.shadowBlur = partSizeInPx / 3;

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

function drawPart(snakePosition: PartPosition, color: string, radii = 0) {
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

export function erasePart(partPosition: PartPosition) {
	const { partSizeInPx } = gameSettings;

	canvasContext.clearRect(
		partPosition[0],
		partPosition[1],
		partSizeInPx,
		partSizeInPx,
	);
}
