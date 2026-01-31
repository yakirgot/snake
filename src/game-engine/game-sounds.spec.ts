import { beforeEach, describe, expect, it, vi } from "vitest";
import { container } from "tsyringe";
import { GameSounds } from "@/game-engine/game-sounds";
import { GameState } from "@/game-engine/game-state";
import { GameSettings } from "@/settings";

const mockCreateOscillator = vi.fn();

vi.stubGlobal(
	"AudioContext",
	vi.fn().mockImplementation(function () {
		return {
			createOscillator: mockCreateOscillator,
		};
	}),
);

describe(GameSounds, () => {
	let gameSounds: GameSounds;
	let gameState: GameState;

	beforeEach(() => {
		vi.clearAllMocks();
		container.clearInstances();

		const gameSettings = new GameSettings();
		container.registerInstance("GameSettings", gameSettings);

		gameState = container.resolve(GameState);
		container.registerInstance("GameState", gameState);

		gameSounds = new GameSounds();
	});

	it("should play sound when sounds are enabled", () => {
		gameState.soundsEnabled = true;

		gameSounds.playEatSound();

		expect(mockCreateOscillator).toHaveBeenCalledWith();
	});

	it("should NOT play sound when sounds are disabled", () => {
		gameState.soundsEnabled = false;

		gameSounds.playEatSound();

		expect(mockCreateOscillator).not.toHaveBeenCalled();
	});
});
