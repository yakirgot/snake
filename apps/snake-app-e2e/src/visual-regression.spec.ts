import { expect, test } from "@playwright/test";

test.describe("Visual Regression", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("");
	});

	test("initial landing page should match snapshot", async ({ page }) => {
		await expect(page).toHaveScreenshot("landing-page.png", {
			mask: [page.getByTestId("high-score")], // Masking high score as it might change based on localStorage
		});
	});

	test("gameplay state should match snapshot", async ({ page }) => {
		await page.clock.install();
		const startButton = page.locator("[data-snake-game-start-button]");
		await startButton.click();

		// Wait for some time to ensure the snake is rendered
		await page.clock.runFor(150);

		await expect(page).toHaveScreenshot("game-started.png", {
			mask: [
				page.getByTestId("game-points"),
				page.getByTestId("high-score"),
				page.getByTestId("snake-game"),
			],
		});
	});
});
