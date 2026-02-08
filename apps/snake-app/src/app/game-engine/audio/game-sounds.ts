import { container } from "tsyringe";
import { GameState } from "../game-state";

export class GameSounds {
	#audioContext: AudioContext | undefined;

	#getAudioContext(): AudioContext {
		if (!this.#audioContext) {
			this.#audioContext = new AudioContext();
		}
		return this.#audioContext;
	}

	#playTone(
		frequency: number,
		duration: number,

		type: OscillatorType = "sine",
	): void {
		const gameState = container.resolve<GameState>("GameState");
		if (!gameState.soundsEnabled) {
			return;
		}

		try {
			const context = this.#getAudioContext();
			if (context.state === "suspended") {
				void context.resume();
			}
			const oscillator = context.createOscillator();
			const gainNode = context.createGain();

			oscillator.type = type;
			oscillator.frequency.setValueAtTime(frequency, context.currentTime);

			gainNode.gain.setValueAtTime(0.1, context.currentTime);
			gainNode.gain.exponentialRampToValueAtTime(
				0.01,
				context.currentTime + duration,
			);

			oscillator.connect(gainNode);
			gainNode.connect(context.destination);

			oscillator.start();
			oscillator.stop(context.currentTime + duration);
		} catch (error) {
			console.warn("Failed to play sound:", error);
		}
	}

	playStartSound(): void {
		this.#playTone(440, 0.2); // A4
		setTimeout(() => {
			this.#playTone(880, 0.2); // A5
		}, 100);
	}

	playEatSound(): void {
		this.#playTone(660, 0.1); // E5
	}

	playGameOverSound(): void {
		this.#playTone(220, 0.5, "sawtooth"); // A3
	}
}
