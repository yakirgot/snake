import settings from "@/settings";
import { PartPosition } from "@/types/part-position";
import { SnakeDirection } from "@/types/snake-direction";

export const gameData = Object.seal({
	allPartsPositions: [] as PartPosition[],
	snakePositions: [] as PartPosition[],
	foodPositions: [] as PartPosition[],
	snakeGrowMoves: 0,
	currentSnakeDirection: settings.snakeStartingDirection,
	snakeDirectionQueue: [] as SnakeDirection[],
	get snakePartsCount(): number {
		return this.snakePositions.length;
	},
	get currentSnakeHeadPosition(): PartPosition {
		return this.snakePositions.at(-1) as unknown as PartPosition;
	},
});
