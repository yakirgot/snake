import "core-js/full/reflect/index.js";
import { container } from "tsyringe";
import { beforeEach, vi } from "vitest";
import { SoundSettings } from "@/game-engine/sound-settings";

beforeEach(() => {
	vi.clearAllMocks();
	container.clearInstances();

	container.registerInstance("Storage", {
		getItem: vi.fn(),
		setItem: vi.fn(),
	});

	container.registerSingleton("SoundSettings", SoundSettings);
});
