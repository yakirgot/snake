import { defineConfig } from "vitest/config";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export default defineConfig({
	resolve: {
		alias: {
			"@": resolve(dirname(fileURLToPath(import.meta.url)), "src"),
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
		setupFiles: ["@vitest/web-worker"],
	},
});
