import { PartPosition } from "@/types/part-position";
import { SnakeDirection } from "@/types/snake-direction";

export type GameDataModel = {
	allPartsPositions: PartPosition[];
	snakePositions: PartPosition[];
	foodPositions: PartPosition[];
	snakeGrowMoves: number;
	currentSnakeDirection: SnakeDirection;
	snakeDirectionQueue: SnakeDirection[];
};
