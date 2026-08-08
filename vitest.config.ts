import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		projects: [
			"**/vite.config.{js,ts}",
			"**/vitest.config.{js,ts}",
			"!vitest.config.ts",
		],
	},
});
