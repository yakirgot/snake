import { expect, test } from "@playwright/test";

test.describe("Snake Game", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("");
	});

	test("initial state should be correct", async ({ page }) => {
		const points = page.getByTestId("game-points");
		const highScore = page.getByTestId("high-score");
		const startButton = page.locator("[data-snake-game-start-button]");

		await expect(points).toHaveText("0");
		await expect(highScore).toBeVisible();
		await expect(startButton).toBeVisible();
		await expect(startButton).toHaveText("Start!");
	});

	test("should start the game when button is clicked", async ({ page }) => {
		const startButton = page.locator("[data-snake-game-start-button]");
		const announcer = page.locator("#game-announcer");

		await expect(startButton).toBeEnabled();
		await startButton.click();
		await expect(startButton).toBeDisabled();
		await expect(announcer).toHaveText(
			"Game started. Use arrow keys or swipe to move.",
		);
	});

	test("should toggle sound", async ({ page }) => {
		const soundButton = page.locator("[data-sound-toggle]");
		const announcer = page.locator("#game-announcer");

		// Initial state (sound is OFF by default)
		await expect(soundButton).toHaveAttribute("aria-label", "Turn sound on");
		await expect(soundButton).toHaveText("🔇");

		await soundButton.click();
		await expect(soundButton).toHaveAttribute("aria-label", "Turn sound off");
		await expect(soundButton).toHaveText("🔊");
		await expect(announcer).toHaveText("Sound enabled");

		await soundButton.click();
		await expect(soundButton).toHaveAttribute("aria-label", "Turn sound on");
		await expect(soundButton).toHaveText("🔇");
		await expect(announcer).toHaveText("Sound disabled");
	});

	test("should end game when snake hits the right wall", async ({ page }) => {
		await page.clock.install();
		const startButton = page.locator("[data-snake-game-start-button]");
		const announcer = page.locator("#game-announcer");

		await startButton.click();
		// Snake starts at x = 11, moving right.
		// Width is 44. To hit right wall it needs to reach 44.
		// 44 - 11 = 33 steps.
		// But wait, the head is at 11 + (length-1) = 11 + 2 = 13.
		// 44 - 13 = 31 steps.
		// 31 * 150ms = 4650ms.
		await page.clock.runFor(6000);

		await expect(startButton).toBeEnabled();
		await expect(announcer).toContainText("Game over");
	});

	test("should end game when snake hits the top wall", async ({ page }) => {
		await page.clock.install();
		const startButton = page.locator("[data-snake-game-start-button]");
		const announcer = page.locator("#game-announcer");

		await startButton.click();
		await page.keyboard.press("ArrowUp");

		// The snake starts at height/2 = 30/2 = 15.
		// 15 steps to hit the top wall. 15 * 150ms = 2250ms.
		await page.clock.runFor(3000);

		await expect(startButton).toBeEnabled();
		await expect(announcer).toContainText("Game over");
	});

	test("should show initial points as 3 after starting (snake length)", async ({
		page,
	}) => {
		const startButton = page.locator("[data-snake-game-start-button]");
		const pointsDisplay = page.getByTestId("game-points");

		await startButton.click();
		await expect(pointsDisplay).toHaveText("3");
	});

	test("should load high score from localStorage", async ({ page }) => {
		await page.evaluate(() => {
			localStorage.setItem("snake-high-score", "123");
		});
		await page.reload();

		const highScore = page.getByTestId("high-score");
		await expect(highScore).toHaveText("123");
	});
});
