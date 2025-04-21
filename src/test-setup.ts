import "core-js/full/reflect/index.js";
import { container } from "tsyringe";
import { beforeEach, vi } from "vitest";

beforeEach(() => {
	vi.clearAllMocks();
	container.clearInstances();
});
