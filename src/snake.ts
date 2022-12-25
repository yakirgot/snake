import settings from "@/settings";
import { canvasContext } from "@/board";
import { SnakePosition } from "@/snake-position.type";

const canvasFillStyle = window
	.getComputedStyle(document.documentElement)
	.getPropertyValue("--color-dark-slate-gray");
let snakePositions: SnakePosition[] = [];

export function addSnakePart(position: SnakePosition) {
	snakePositions.push(position);
}

export function popFirstSnakePart() {
	snakePositions.shift();
}

export function resetSnake() {
	snakePositions = [];
}

export function drawSnakeOnBoard() {
	for (const snakePosition of snakePositions) {
		const { snakePartSizeInPx } = settings;

		canvasContext.fillStyle = canvasFillStyle;
		canvasContext.fillRect(
			snakePosition[0],
			snakePosition[1],
			snakePartSizeInPx,
			snakePartSizeInPx,
		);
	}
}
