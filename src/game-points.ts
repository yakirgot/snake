import { getSnakePartsCount } from "@/snake";

let pointsElement: HTMLElement;

export function initGamePoints() {
	pointsElement = document.querySelector("[data-game-points]") as HTMLElement;
}

export function updateGamePointsBySnakeParts() {
	const points = getSnakePartsCount();

	pointsElement.textContent = new Intl.NumberFormat().format(points);
}
