import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
	root: "src",
	publicDir: "../public",
	build: {
		outDir: "../dist",
	},
});
