import { PartPosition } from "@/types/part-position";
import { container } from "tsyringe";
import { GameSettings } from "@/settings";

const gameSettings = container.resolve(GameSettings);

const partsWorker = new Worker(
	new URL("all-parts-positions-worker.ts", import.meta.url),
	{ type: "module" },
);

export function getAllPartsPositions(): Promise<PartPosition[]> {
	const { canvasWidthInPx, canvasHeightInPx, snakeSizeWithGap } = gameSettings;
	partsWorker.postMessage({
		canvasWidthInPx,
		canvasHeightInPx,
		snakeSizeWithGap,
	});

	return new Promise<PartPosition[]>((resolve) => {
		partsWorker.addEventListener(
			"message",
			(results: MessageEvent<PartPosition[]>) => {
				resolve(results.data);
			},
			{ once: true },
		);
	});
}
