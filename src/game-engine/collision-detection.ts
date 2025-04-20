import { PartPosition } from "@/types/part-position";
import { GameSettings } from "@/settings";
import { container } from "tsyringe";
import { GameData } from "@/game-engine/game-data";

export function detectPartCollision(
	partPositionA: PartPosition,
	partPositionB: PartPosition,
): boolean {
	const xAxisCollision = partPositionA[0] === partPositionB[0];
	const yAxisCollision = partPositionA[1] === partPositionB[1];

	return xAxisCollision && yAxisCollision;
}

export function isSnakeCollision(snakePosition: PartPosition): boolean {
	const isWallCollision = detectWallCollision(snakePosition);
	const isSelfCollision = detectSnakeSelfCollision(snakePosition);

	return isWallCollision || isSelfCollision;
}

export function detectSnakeSelfCollision(partPosition: PartPosition): boolean {
	const gameData = container.resolve<GameData>("GameData");
	const isCollision = gameData.snakePositions.some((snakePosition) =>
		detectPartCollision(partPosition, snakePosition),
	);

	return isCollision;
}

function detectWallCollision(partPosition: PartPosition): boolean {
	const gameSettings = container.resolve<GameSettings>("GameSettings");
	const { canvasWidthInPx, canvasHeightInPx, snakeSizeWithGap } = gameSettings;

	const [positionX, positionY] = partPosition;

	const isLeftOrTopOutsideOfCanvas = positionX < 0 || positionY < 0;

	if (isLeftOrTopOutsideOfCanvas) {
		return true;
	}

	const isBottomOutsideOfCanvas =
		positionX + snakeSizeWithGap > canvasWidthInPx;

	if (isBottomOutsideOfCanvas) {
		return true;
	}

	const isRightOutsideOfCanvas =
		positionY + snakeSizeWithGap > canvasHeightInPx;

	return isRightOutsideOfCanvas;
}
