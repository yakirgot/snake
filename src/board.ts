export let canvas: HTMLCanvasElement;
export let canvasContext: CanvasRenderingContext2D;

export function setupBoard() {
	const possibleCanvas =
		document.querySelector<HTMLCanvasElement>("[data-snake-game]");

	if (!possibleCanvas) {
		return;
	}

	canvas = possibleCanvas;

	const possibleCanvasContext = canvas.getContext("2d");

	if (!possibleCanvasContext) {
		return;
	}

	canvasContext = possibleCanvasContext;

	cleanUpBoard();
}

export function cleanUpBoard() {
	canvasContext.fillStyle = window
		.getComputedStyle(document.documentElement)
		.getPropertyValue("--color-maize-crayola");
	canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}
