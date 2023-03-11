import { PartPosition } from "@/types/part-position";
import settings from "@/settings";

const partsWorker = new Worker(
	new URL("all-parts-positions-worker.ts", import.meta.url),
	{ type: "module" },
);

export function getAllPartsPositions() {
	// eslint-disable-next-line unicorn/require-post-message-target-origin
	partsWorker.postMessage(settings);

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
