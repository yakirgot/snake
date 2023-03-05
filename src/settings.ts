import { SnakeDirection } from "@/types/snake-direction";

const settings = Object.freeze({
	boardHeightInSnakeParts: 30,
	boardWidthInSnakeParts: 44,
	snakeGapInPx: 2,
	snakeInitialLength: 3,
	partSizeInPx: 14,
	get snakeSizeWithGap() {
		return this.partSizeInPx + this.snakeGapInPx;
	},
	get canvasWidthInPx() {
		return this.boardWidthInSnakeParts * this.snakeSizeWithGap;
	},
	get canvasHeightInPx() {
		return this.boardHeightInSnakeParts * this.snakeSizeWithGap;
	},
	snakeIntervalInMs: 250,
	snakeStartingDirection: "right" as SnakeDirection,
} as const);

export default settings;
