import { container, singleton } from "tsyringe";

@singleton()
export class SoundSettings {
	readonly #storageKey = "snake-sound-enabled";
	readonly #storage = container.resolve<Storage>("Storage");

	isSoundEnabled(): boolean {
		const saved = this.#storage.getItem(this.#storageKey);
		if (saved === null) {
			return true;
		}
		return saved === "true";
	}

	saveSoundSetting(enabled: boolean): void {
		this.#storage.setItem(this.#storageKey, enabled.toString());
	}
}
