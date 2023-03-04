const settings = Object.freeze({
	boardHeightInSnakeParts: 30,
	boardWidthInSnakeParts: 44,
	snakeGapInPx: 2,
	snakeInitialLength: 3,
	snakePartSizeInPx: 14,
	get snakeSizeWithGap() {
		return this.snakePartSizeInPx + this.snakeGapInPx;
	},
	get canvasWidthInPx() {
		return this.boardWidthInSnakeParts * this.snakeSizeWithGap;
	},
	get canvasHeightInPx() {
		return this.boardHeightInSnakeParts * this.snakeSizeWithGap;
	},
	snakeIntervalInMs: 250,
} as const);

export default settings;
