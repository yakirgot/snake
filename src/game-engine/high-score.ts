import { container, singleton } from "tsyringe";

@singleton()
export class HighScore {
	readonly #storageKey = "snake-high-score";
	readonly #storage = container.resolve<Storage>("Storage");

	getHighScore(): number {
		const savedHighScore = this.#storage.getItem(this.#storageKey);
		if (savedHighScore) {
			return Number.parseInt(savedHighScore, 10) || 0;
		}

		return 0;
	}

	saveHighScore(score: number): void {
		this.#storage.setItem(this.#storageKey, score.toString());
	}
}
