import { container, singleton } from "tsyringe";
import { getRequiredElement } from "@yakirgot/ui-manager";
import { DOM_SELECTORS } from "@yakirgot/models";
import { GameState } from "./game-state.js";

@singleton()
export class UIManager {
	readonly #gameState = container.resolve<GameState>("GameState");

	#startButton!: HTMLButtonElement;
	#pointsElement!: HTMLElement;
	#highScoreElement!: HTMLElement;
	#announcerElement!: HTMLElement;
	#soundToggleButton!: HTMLButtonElement;

	initializeDomElements(): void {
		this.#pointsElement = getRequiredElement(DOM_SELECTORS.POINTS);
		this.#highScoreElement = getRequiredElement(DOM_SELECTORS.HIGH_SCORE);
		this.#startButton = getRequiredElement<HTMLButtonElement>(
			DOM_SELECTORS.START_BUTTON,
		);
		this.#announcerElement = getRequiredElement(DOM_SELECTORS.ANNOUNCER);
		this.#soundToggleButton = getRequiredElement<HTMLButtonElement>(
			DOM_SELECTORS.SOUND_TOGGLE,
		);
	}

	updateSoundButton(isEnabled: boolean): void {
		this.#soundToggleButton.textContent = `${isEnabled ? "🔊" : "🔇"}`;
		this.#soundToggleButton.setAttribute(
			"aria-label",
			`Turn sound ${isEnabled ? "off" : "on"}`,
		);
	}

	announce(message: string): void {
		this.#announcerElement.textContent = message;
	}

	updateGamePointsBySnakeParts(): void {
		this.#pointsElement.textContent = new Intl.NumberFormat().format(
			this.#gameState.snakePartsCount,
		);
	}

	updateHighScoreDisplay(): void {
		this.#highScoreElement.textContent = new Intl.NumberFormat().format(
			this.#gameState.highScore,
		);
	}

	setStartButtonDisabled(disabled: boolean): void {
		this.#startButton.disabled = disabled;
	}

	addSoundToggleClickListener(listener: () => void): void {
		this.#soundToggleButton.addEventListener("click", listener);
	}

	addStartButtonClickListener(listener: () => void): void {
		this.#startButton.addEventListener("click", listener);
	}
}
