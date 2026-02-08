import { Position } from "../../types/snake-types";
import { container } from "tsyringe";
import { GameSettings } from "../../settings";

const partsWorker = new Worker(
	new URL("all-parts-positions-worker.ts", import.meta.url),
	{ type: "module" },
);

export function getAllPartsPositions(): Promise<Position[]> {
	const gameSettings = container.resolve<GameSettings>("GameSettings");
	const { canvasWidthInPx, canvasHeightInPx, snakeSizeWithGap } = gameSettings;
	partsWorker.postMessage({
		canvasWidthInPx,
		canvasHeightInPx,
		snakeSizeWithGap,
	});

	return new Promise<Position[]>((resolve): void => {
		partsWorker.addEventListener(
			"message",
			(results: MessageEvent<Position[]>) => {
				resolve(results.data);
			},
			{ once: true },
		);
	});
}
