import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import * as path from "path";

export default defineConfig(() => ({
	root: import.meta.dirname,
	cacheDir: "../../../node_modules/.vite/libs/shared/models",
	plugins: [
		dts({
			entryRoot: "src",
			tsconfigPath: path.join(import.meta.dirname, "tsconfig.lib.json"),
		}),
	],
	build: {
		outDir: "./dist",
		emptyOutDir: true,
		reportCompressedSize: true,
		sourcemap: true,
		commonjsOptions: {
			transformMixedEsModules: true,
		},
		lib: {
			entry: "src/index.ts",
			name: "@snake/models",
			fileName: "index",
			formats: ["es" as const],
		},
	},
}));
