addEventListener("message", (messageEvent) => {
	const partPositions = [];
	const { canvasWidthInPx, canvasHeightInPx, snakeSizeWithGap } =
		messageEvent.data;

	for (let height = 0; height < canvasHeightInPx; height += snakeSizeWithGap) {
		for (let width = 0; width < canvasWidthInPx; width += snakeSizeWithGap) {
			partPositions.push([width, height]);
		}
	}

	postMessage(partPositions);
});
