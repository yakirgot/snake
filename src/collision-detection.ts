import { PartPosition } from "@/types/part-position";
import settings from "@/settings";
import { getSnakePositions } from "@/snake";

export function detectWallCollision(partPosition: PartPosition) {
	const { canvasWidthInPx, canvasHeightInPx, snakeSizeWithGap } = settings;

	const [positionX, positionY] = partPosition;

	if (positionX < 0 || positionY < 0) {
		return true;
	}

	if (positionX + snakeSizeWithGap > canvasWidthInPx) {
		return true;
	}

	return positionY + snakeSizeWithGap > canvasHeightInPx;
}

export function detectSnakeCollision(partPosition: PartPosition) {
	const isCollision = getSnakePositions().some((snakePosition) =>
		detectPartCollision(partPosition, snakePosition),
	);

	return isCollision;
}

export function detectPartCollision(
	partPosition: PartPosition,
	itemPosition: PartPosition,
) {
	const xCollision = partPosition[0] === itemPosition[0];
	const yCollision = partPosition[1] === itemPosition[1];

	return xCollision && yCollision;
}
