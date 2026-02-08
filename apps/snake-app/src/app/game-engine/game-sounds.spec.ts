import { describe, expect, it, vi } from "vitest";
import { container } from "tsyringe";
import { GameSounds } from "./audio/game-sounds";
import { GameState } from "./game-state";
import { GameSettings } from "../settings";

const mockCreateOscillator = vi.fn().mockReturnValue({
	connect: vi.fn(),
	start: vi.fn(),
	stop: vi.fn(),
	frequency: {
		setValueAtTime: vi.fn(),
	},
});

vi.stubGlobal(
	"AudioContext",
	vi.fn().mockImplementation(function () {
		return {
			createOscillator: mockCreateOscillator,
			createGain: vi.fn().mockReturnValue({
				connect: vi.fn(),
				gain: {
					setValueAtTime: vi.fn(),
					exponentialRampToValueAtTime: vi.fn(),
				},
			}),
		};
	}),
);

function setup() {
	const gameSettings = new GameSettings();
	container.registerInstance("GameSettings", gameSettings);

	const gameState = container.resolve(GameState);
	container.registerInstance("GameState", gameState);

	const gameSounds = new GameSounds();

	return { gameSounds, gameState };
}

describe(GameSounds, () => {
	it("should play sound when audio are enabled", () => {
		const { gameSounds, gameState } = setup();
		gameState.soundsEnabled = true;

		gameSounds.playEatSound();

		expect(mockCreateOscillator).toHaveBeenCalledWith();
	});

	it("should NOT play sound when audio are disabled", () => {
		const { gameSounds, gameState } = setup();
		gameState.soundsEnabled = false;

		gameSounds.playEatSound();

		expect(mockCreateOscillator).not.toHaveBeenCalled();
	});
});
