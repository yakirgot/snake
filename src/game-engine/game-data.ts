import { GameDataModel } from "@/types/game-data-model";
import settings from "@/settings";
import { PartPosition } from "@/types/part-position";

export const gameData: GameDataModel = Object.seal({
	allPartsPositions: [],
	snakePositions: [],
	foodPositions: [],
	snakeGrowMoves: 0,
	currentSnakeDirection: settings.snakeStartingDirection,
	snakeDirectionQueue: [],
	get snakePartsCount() {
		return this.snakePositions.length;
	},
	get currentSnakeHeadPosition() {
		return this.snakePositions.at(-1) as unknown as PartPosition;
	},
});
