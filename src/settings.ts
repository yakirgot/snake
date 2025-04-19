import { SnakeDirection } from "@/types/snake-direction";
import { singleton } from "tsyringe";

@singleton()
export class GameSettings {
	canvasHeightInSnakeParts = 30;
	canvasWidthInSnakeParts = 44;
	snakeGapInPx = 2;
	foodPartsOnCanvas = 3;
	snakeInitialLength = 3;
	snakePartsGrowth = 3;
	snakePartRadiiInPx = 3;
	partSizeInPx = 14;
	snakeIntervalInMs = 150;
	snakeStartingDirection: SnakeDirection = "right";

	get snakeSizeWithGap() {
		return this.partSizeInPx + this.snakeGapInPx;
	}

	get canvasWidthInPx() {
		return this.canvasWidthInSnakeParts * this.snakeSizeWithGap;
	}

	get canvasHeightInPx() {
		return this.canvasHeightInSnakeParts * this.snakeSizeWithGap;
	}
}
