import { Position } from "../types/snake-types";
import { GameSettings } from "../settings";
import { container } from "tsyringe";
import { GameState } from "./game-state";

export function arePositionsEqual(
	positionA: Position,
	positionB: Position,
): boolean {
	const xAxisCollision = positionA[0] === positionB[0];
	const yAxisCollision = positionA[1] === positionB[1];

	return xAxisCollision && yAxisCollision;
}

export function checkSnakeCollision(snakePosition: Position): boolean {
	const isWallCollision = detectWallCollision(snakePosition);
	const isSelfCollision = detectSnakeSelfCollision(snakePosition);

	return isWallCollision || isSelfCollision;
}

export function detectSnakeSelfCollision(position: Position): boolean {
	const gameState = container.resolve<GameState>("GameState");
	const isCollision = gameState.snakePositions.some((snakePosition) =>
		arePositionsEqual(position, snakePosition),
	);

	return isCollision;
}

function detectWallCollision(position: Position): boolean {
	const gameSettings = container.resolve<GameSettings>("GameSettings");
	const { canvasWidthInPx, canvasHeightInPx, snakeSizeWithGap } = gameSettings;

	const [positionX, positionY] = position;

	const isLeftOrTopOutsideOfCanvas = positionX < 0 || positionY < 0;

	if (isLeftOrTopOutsideOfCanvas) {
		return true;
	}

	const isRightOutsideOfCanvas = positionX + snakeSizeWithGap > canvasWidthInPx;

	if (isRightOutsideOfCanvas) {
		return true;
	}

	const isBottomOutsideOfCanvas =
		positionY + snakeSizeWithGap > canvasHeightInPx;

	return isBottomOutsideOfCanvas;
}
