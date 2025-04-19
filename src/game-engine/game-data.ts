import { PartPosition } from "@/types/part-position";
import { SnakeDirection } from "@/types/snake-direction";
import { container } from "tsyringe";
import { GameSettings } from "@/settings";

const gameSettings = container.resolve(GameSettings);

export const gameData = Object.seal({
	allPartsPositions: [] as PartPosition[],
	snakePositions: [] as PartPosition[],
	foodPositions: [] as PartPosition[],
	snakeGrowMoves: 0,
	currentSnakeDirection: gameSettings.snakeStartingDirection,
	snakeDirectionQueue: [] as SnakeDirection[],
	get snakePartsCount(): number {
		return this.snakePositions.length;
	},
	get currentSnakeHeadPosition(): PartPosition {
		return this.snakePositions.at(-1) as unknown as PartPosition;
	},
});
