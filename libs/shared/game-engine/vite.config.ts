/// <reference types='vitest' />
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "node:path";

export default defineConfig(() => ({
	root: import.meta.dirname,
	cacheDir: "../../../node_modules/.vite/libs/shared/game-engine",
	resolve: {
		alias: {
			"@snake/domain": path.resolve(__dirname, "../../ui/domain/src/index.ts"),
			"@snake/rendering": path.resolve(
				__dirname,
				"../../ui/rendering/src/index.ts",
			),
			"@snake/models": path.resolve(__dirname, "../models/src/index.ts"),
			"@snake/game-engine": path.resolve(__dirname, "./src/index.ts"),
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
		sourcemap: true,
		commonjsOptions: {
			transformMixedEsModules: true,
		},
		lib: {
			entry: "src/index.ts",
			name: "@snake/game-engine",
			fileName: "index",
			formats: ["es" as const],
		},
		rollupOptions: {
			external: [
				"tsyringe",
				"@snake/rendering",
				"@snake/domain",
				"@snake/models",
			],
		},
	},
	test: {
		name: "@snake/game-engine",
		watch: false,
		environment: "jsdom",
		include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
		setupFiles: ["src/test-setup.ts"],
		reporters: ["default"],
		coverage: {
			reportsDirectory: "../../../coverage/libs/shared/game-engine",
			provider: "v8",
		},
	},
}));
