let canvasContext: CanvasRenderingContext2D | null | undefined;

export function setupGame() {
	setCanvasContext();
}

function setCanvasContext() {
	const canvas: HTMLCanvasElement | null =
		document.querySelector("[data-snake-game]");

	if (!canvas) {
		return;
	}

	canvasContext = canvas.getContext("2d");

	if (!canvasContext) {
		return;
	}

	canvasContext.fillStyle = "blue";
	canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}
