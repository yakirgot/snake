import { PartPosition } from "@/types/part-position";
import settings from "@/settings";
import { snakePositions } from "@/snake";

export function detectCollisions(partPosition: PartPosition) {
	const isWallCollision = detectWallCollision(partPosition);
	const isSelfCollision = detectSelfCollision(partPosition);

	return isWallCollision || isSelfCollision;
}

function detectWallCollision(partPosition: PartPosition) {
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

function detectSelfCollision(partPosition: PartPosition) {
	const restOfSnake = snakePositions.slice(0, -2);

	const isCollision = restOfSnake.some((snakePosition) => {
		const xCollision = partPosition[0] === snakePosition[0];
		const yCollision = partPosition[1] === snakePosition[1];

		return xCollision && yCollision;
	});

	return isCollision;
}
