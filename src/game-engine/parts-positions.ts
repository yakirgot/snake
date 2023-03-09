import { PartPosition } from "@/types/part-position";
import settings from "@/settings";
import { isFoodPosition } from "@/game-engine/food";
import { detectSnakeSelfCollision } from "@/game-engine/collision-detection";
import { gameData } from "@/game-engine/game-data";

const partWorker = new Worker(
	new URL("all-parts-positions-worker.ts", import.meta.url),
	{ type: "module" },
);

export function updateAllPartsPositions() {
	const promise = new Promise<void>((resolve) => {
		partWorker.addEventListener(
			"message",
			(results: MessageEvent<PartPosition[]>) => {
				gameData.allPartsPositions = results.data;

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
	const availablePositions = gameData.allPartsPositions.filter((partPosition) =>
		isAvailablePosition(partPosition),
	);

	return availablePositions;
}

function isAvailablePosition(partPosition: PartPosition) {
	const isSnakePart = detectSnakeSelfCollision(partPosition);

	if (isSnakePart) {
		return false;
	}

	const isFoodPart = isFoodPosition(partPosition);

	return !isFoodPart;
}
