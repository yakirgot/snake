addEventListener("message", (messageEvent) => {
	const positions = [];
	const { canvasWidthInPx, canvasHeightInPx, snakeSizeWithGap } =
		messageEvent.data;

	for (let height = 0; height < canvasHeightInPx; height += snakeSizeWithGap) {
		for (let width = 0; width < canvasWidthInPx; width += snakeSizeWithGap) {
			positions.push([width, height]);
		}
	}

	postMessage(positions);
});
