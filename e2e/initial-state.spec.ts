import { expect, test } from "@playwright/test";

test.describe("Initial State", () => {
	test("should load the game with 0 points, correct high score, and visible start button", async ({
		page,
	}) => {
		await page.goto("/");

		// Verify points are 0
		const points = page.getByTestId("game-points");
		await expect(points).toHaveText("0");

		// Verify the high score is visible (could be 0 initially or some other value if persisted)
		const highScore = page.getByTestId("high-score");
		await expect(highScore).toBeVisible();

		// Verify Start! button is visible
		const startButton = page.locator("[data-snake-game-start-button]");
		await expect(startButton).toBeVisible();
		await expect(startButton).toHaveText("Start!");
	});
});
