import { defineConfig } from "vitest/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

export default defineConfig({
	base: "/snake/",
	resolve: {
		alias: {
			"@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "src"),
		},
	},
	root: "src",
	publicDir: "../public",
	build: {
		outDir: "../dist",
	},
	test: {
		root: ".",
		environment: "jsdom",
		setupFiles: ["@vitest/web-worker", "./src/test-setup.ts"],
	},
});
