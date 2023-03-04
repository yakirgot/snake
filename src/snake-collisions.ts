import { SnakePosition } from "@/types/snake-position";
import settings from "@/settings";
import { snakePositions } from "@/snake";

export function detectCollisions(position: SnakePosition) {
	const isWallCollision = detectWallCollision(position);
	const isSelfCollision = detectSelfCollision(position);

	return isWallCollision || isSelfCollision;
}

function detectWallCollision(position: SnakePosition) {
	const { canvasWidthInPx, canvasHeightInPx, snakeSizeWithGap } = settings;

	const [positionX, positionY] = position;

	if (positionX < 0 || positionY < 0) {
		return true;
	}

	if (positionX + snakeSizeWithGap > canvasWidthInPx) {
		return true;
	}

	return positionY + snakeSizeWithGap > canvasHeightInPx;
}

function detectSelfCollision(position: SnakePosition) {
	const restOfSnake = snakePositions.slice(0, -2);

	const isCollision = restOfSnake.some((snakePosition) => {
		const xCollision = position[0] === snakePosition[0];
		const yCollision = position[1] === snakePosition[1];

		return xCollision && yCollision;
	});

	return isCollision;
}
