import {
	afterEach,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from "vitest";
import { getByTestId, getByText, waitFor } from "@testing-library/dom";
import { gameHTML } from "@/game-html";
import { initGame } from "@/game-engine/game";
import { PartPosition } from "@/types/part-position";
import { gameData } from "@/game-engine/game-data";
import userEvent from "@testing-library/user-event";

let container: HTMLDivElement;
const user = userEvent.setup();

describe("game", () => {
	beforeAll(() => {
		vi.mock("@/game-engine/canvas", () => {
			return {
				setupCanvas: vi.fn(),
				clearCanvas: vi.fn(),
				drawSnakePart: vi.fn(),
				drawFoodPart: vi.fn(),
				erasePart: vi.fn(),
				createSnakeSnapshot: vi.fn(),
			};
		});

		vi.mock("@/game-engine/all-parts-positions", () => {
			const partPositions: PartPosition[] = [];

			for (let height = 0; height < 480; height += 16) {
				for (let width = 0; width < 704; width += 16) {
					partPositions.push([width, height]);
				}
			}

			return {
				getAllPartsPositions() {
					return Promise.resolve(partPositions);
				},
			};
		});

		container = document.createElement("div");

		container.innerHTML = gameHTML();

		document.body.append(container);

		initGame();
	});

	describe("at init", () => {
		it("should init with 0 points", () => {
			expect(getByTestId(container, "game-points").textContent).toBe("0");
		});
	});

	describe("after start button clicked", () => {
		beforeEach(() => {
			vi.useFakeTimers();

			const button: HTMLButtonElement = getByText(container, "Start!");

			button.click();
		});

		afterEach(() => {
			gameData.snakePositions.push([9999, 9999]);

			vi.advanceTimersToNextTimer();

			vi.runOnlyPendingTimers();
			vi.useRealTimers();
		});

		it("should start a new game when clicking the start button", () => {
			expect(getByTestId(container, "game-points").textContent).toBe("3");
		});

		it("should move the snake after interval", () => {
			expect(gameData.snakePositions.at(-1)).toStrictEqual([208, 240]);

			vi.advanceTimersToNextTimer();

			expect(gameData.snakePositions.at(-1)).toStrictEqual([224, 240]);
		});

		it("should grow after eating food", () => {
			gameData.foodPositions.push([224, 240]);

			vi.advanceTimersToNextTimer();
			vi.advanceTimersToNextTimer();
			vi.advanceTimersToNextTimer();
			vi.advanceTimersToNextTimer();

			expect(getByTestId(container, "game-points").textContent).toBe("6");

			vi.advanceTimersToNextTimer();

			expect(getByTestId(container, "game-points").textContent).toBe("6");
		});

		it("snake should move around with keyboard interactions", async () => {
			await pressKeyboard("ArrowUp");
			expect(gameData.snakePositions.at(-1)).toStrictEqual([208, 224]);

			await pressKeyboard("ArrowLeft");
			expect(gameData.snakePositions.at(-1)).toStrictEqual([192, 224]);
		});
	});
});

async function pressKeyboard(code: string) {
	await waitFor(() => {
		user.keyboard(`[${code}]`);
	});

	await vi.runOnlyPendingTimersAsync();
}
