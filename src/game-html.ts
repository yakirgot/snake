export function gameHTML() {
	return `
		<div class="snake-game-container">
			<h1 class="snake-game-title">
				Snake Game - <span data-game-points data-testid="game-points">0</span> Points
			</h1>

			<canvas data-snake-game class="snake-game-canvas"></canvas>

			<div class="snake-game-start-button-container">
				<button
					class="snake-game-start-button"
					data-snake-game-start-button
					tabindex="1"
				>
					Start!
				</button>
			</div>
		</div>
	`;
}
