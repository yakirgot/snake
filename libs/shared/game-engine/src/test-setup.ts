import "core-js/full/reflect/index.js";
import { container } from "tsyringe";
import { beforeEach, vi } from "vitest";
import { SoundSettings } from "@snake/ui-data-access";

beforeEach(() => {
	vi.clearAllMocks();
	container.clearInstances();

	container.registerInstance("Storage", {
		getItem: vi.fn(),
		setItem: vi.fn(),
	});

	container.registerSingleton("SoundSettings", SoundSettings);
});
