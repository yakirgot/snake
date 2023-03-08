import { PartPosition } from "@/types/part-position";
import settings from "@/game-engine/settings";
import { getSnakePositions } from "@/game-engine/snake";

export function detectSnakeCollision(partPosition: PartPosition) {
	const isCollision = getSnakePositions().some((snakePosition) =>
		detectPartCollision(partPosition, snakePosition),
	);

	return isCollision;
}

function detectWallCollision(partPosition: PartPosition) {
	const { canvasWidthInPx, canvasHeightInPx, snakeSizeWithGap } = settings;

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

export function isSnakeCollision(headPosition: PartPosition) {
	const isWallCollision = detectWallCollision(headPosition);
	const isSelfCollision = detectSnakeCollision(headPosition);

	return isWallCollision || isSelfCollision;
}

export function detectPartCollision(
	partPositionA: PartPosition,
	partPositionB: PartPosition,
) {
	const xAxisCollision = partPositionA[0] === partPositionB[0];
	const yAxisCollision = partPositionA[1] === partPositionB[1];

	return xAxisCollision && yAxisCollision;
}
