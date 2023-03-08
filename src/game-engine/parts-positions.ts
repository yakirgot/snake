import { PartPosition } from "@/types/part-position";
import settings from "@/game-engine/settings";
import { isFoodPosition } from "@/game-engine/food";
import { detectSnakeCollision } from "@/game-engine/collision-detection";

let allPartsPositions: PartPosition[] = [];

const partWorker = new Worker(
	new URL("all-parts-positions-worker.ts", import.meta.url),
	{ type: "module" },
);

export function updateAllPartsPositions() {
	const promise = new Promise<void>((resolve) => {
		partWorker.addEventListener(
			"message",
			(results: MessageEvent<PartPosition[]>) => {
				allPartsPositions = results.data;

				resolve();
			},
			{ once: true },
		);

		// eslint-disable-next-line unicorn/require-post-message-target-origin
		partWorker.postMessage(settings);
	});

	return promise;
}

export function getAllAvailablePositions() {
	const availablePositions = allPartsPositions.filter((partPosition) =>
		isAvailablePosition(partPosition),
	);

	return availablePositions;
}

function isAvailablePosition(partPosition: PartPosition) {
	const isSnakePart = detectSnakeCollision(partPosition);

	if (isSnakePart) {
		return false;
	}

	const isFoodPart = isFoodPosition(partPosition);

	return !isFoodPart;
}
