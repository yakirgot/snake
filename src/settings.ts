const settings = {
	/**
	 * number of y-axis snake parts
	 */
	boardHeight: 30,
	/**
	 * number of x-axis snake parts
	 */
	boardWidth: 44,
	snakeGapInPx: 2,
	snakeInitialLength: 3,
	snakePartSizeInPx: 14,
	get snakeSizeWithGap() {
		return this.snakePartSizeInPx + this.snakeGapInPx;
	},
} as const;

export default settings;
