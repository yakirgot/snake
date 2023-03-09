import { GameDataModel } from "@/types/game-data-model";
import settings from "@/settings";

export const gameData: GameDataModel = {
	allPartsPositions: [],
	snakePositions: [],
	foodPositions: [],
	snakeGrowMoves: 0,
	currentSnakeDirection: settings.snakeStartingDirection,
	snakeDirectionQueue: [],
};
