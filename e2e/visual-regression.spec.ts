import { expect, test } from "@playwright/test";

test.describe("Visual Regression", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/", { waitUntil: "networkidle" });
	});

	test("initial landing page", async ({ page }) => {
		await page.waitForSelector("[data-snake-game-start-button]");
		await expect(page).toHaveScreenshot("landing-page.png");
	});

	test("game over screen", async ({ page }) => {
		await page.clock.install();
		const startButton = page.locator("[data-snake-game-start-button]");
		await startButton.click();
		await page.keyboard.press("ArrowUp");

		// The snake starts at height/2 = 30/2 = 15.
		// 15 steps to hit the top wall. 15 * 150ms = 2250ms.
		await page.clock.runFor(3000);

		await expect(page).toHaveScreenshot("game-over-screen.png", {
			mask: [
				page.getByTestId("game-points"),
				page.getByTestId("snake-game"),
				page.getByTestId("high-score"),
			],
			animations: "disabled",
			maxDiffPixelRatio: 0.1,
		});
	});
});
