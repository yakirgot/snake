import { describe, expect, it } from "vitest";
import { detectPartCollision } from "@/game-engine/collision-detection";

describe("detectPartCollision", () => {
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
		expect(detectPartCollision([1, 2], [2, 1])).toBe(false);
	});
});
