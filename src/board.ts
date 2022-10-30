export function setupBoard() {
	const appElement = document.querySelector<HTMLDivElement>("#app");

	if (!appElement) {
		return;
	}

	appElement.innerHTML = `
  <div class="snake-game-container">
    <h1 class="snake-game-title">Snake Game</h1>

    <canvas data-snake-game class="snake-game-canvas"></canvas>
  </div>
`;
}
