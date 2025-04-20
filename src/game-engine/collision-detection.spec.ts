import { beforeEach, describe, expect, it } from "vitest";
import { detectPartCollision } from "@/game-engine/collision-detection";
import { container } from "tsyringe";
import { GameSettings } from "@/settings";
import { GameData } from "@/game-engine/game-data";

describe("collision detection", () => {
	const gameSettingsMock = new GameSettings();
	gameSettingsMock.canvasHeightInSnakeParts = 3;
	gameSettingsMock.canvasWidthInSnakeParts = 3;

	beforeEach(() => {
		container.register("GameSettings", { useValue: gameSettingsMock });
		container.register("GameData", { useClass: GameData });
	});

	describe(detectPartCollision, () => {
		it("should detect a collision", () => {
			expect(detectPartCollision([1, 1], [1, 1])).toBe(true);
			expect(detectPartCollision([2, 2], [2, 2])).toBe(true);
		});

		it("should not detect a collision when there is none", () => {
			expect(detectPartCollision([2, 1], [1, 1])).toBe(false);
			expect(detectPartCollision([1, 2], [1, 1])).toBe(false);
			expect(detectPartCollision([1, 1], [2, 1])).toBe(false);
			expect(detectPartCollision([1, 1], [1, 2])).toBe(false);
			expect(detectPartCollision([2, 1], [1, 2])).toBe(false);
		});
	});
});
