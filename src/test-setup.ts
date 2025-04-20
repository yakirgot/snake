import "core-js/full/reflect/index.js";
import { container } from "tsyringe";
import { beforeEach } from "vitest";

beforeEach(() => {
	container.clearInstances();
});
