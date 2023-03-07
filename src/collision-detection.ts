import { PartPosition } from "@/types/part-position";
import settings from "@/settings";
import { getSnakePositions } from "@/snake";

export function detectWallCollision(partPosition: PartPosition) {
	const { canvasWidthInPx, canvasHeightInPx, snakeSizeWithGap } = settings;

	const [positionX, positionY] = partPosition;

	const isLeftOrTopOutsideOfBoard = positionX < 0 || positionY < 0;

	if (isLeftOrTopOutsideOfBoard) {
		return true;
	}

	const isBottomOutsideOfBoard = positionX + snakeSizeWithGap > canvasWidthInPx;

	if (isBottomOutsideOfBoard) {
		return true;
	}

	const isRightOutsideOfBoard = positionY + snakeSizeWithGap > canvasHeightInPx;

	return isRightOutsideOfBoard;
}

export function detectSnakeCollision(partPosition: PartPosition) {
	const isCollision = getSnakePositions().some((snakePosition) =>
		detectPartCollision(partPosition, snakePosition),
	);

	return isCollision;
}

export function detectPartCollision(
	partPositionA: PartPosition,
	partPositionB: PartPosition,
) {
	const xAxisCollision = partPositionA[0] === partPositionB[0];
	const yAxisCollision = partPositionA[1] === partPositionB[1];

	return xAxisCollision && yAxisCollision;
}
