/// <reference types='vitest' />
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "node:path";

export default defineConfig(() => ({
	root: import.meta.dirname,
	cacheDir: "../../../node_modules/.vite/libs/ui/rendering",
	resolve: {
		alias: {
			"@snake/domain": path.resolve(__dirname, "../domain/src/index.ts"),
			"@snake/rendering": path.resolve(__dirname, "./src/index.ts"),
			"@snake/models": path.resolve(
				__dirname,
				"../../shared/models/src/index.ts",
			),
			"@snake/game-engine": path.resolve(
				__dirname,
				"../../shared/game-engine/src/index.ts",
			),
		},
	},
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
		commonjsOptions: {
			transformMixedEsModules: true,
		},
		lib: {
			entry: "src/index.ts",
			name: "@snake/rendering",
			fileName: "index",
			formats: ["es" as const],
		},
		rollupOptions: {
			external: ["tsyringe", "@snake/domain", "@snake/models"],
		},
	},
	test: {
		name: "@snake/rendering",
		watch: false,
		environment: "jsdom",
		include: ["{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
		reporters: ["default"],
		coverage: {
			reportsDirectory: "./test-output/vitest/coverage",
			provider: "v8" as const,
		},
	},
}));
