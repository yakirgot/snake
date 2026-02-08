/// <reference types='vitest' />
import { defineConfig } from "vite";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import { nxCopyAssetsPlugin } from "@nx/vite/plugins/nx-copy-assets.plugin";

export default defineConfig(() => ({
	root: import.meta.dirname,
	cacheDir: "../../node_modules/.vite/apps/snake-app",
	server: {
		port: 4200,
		host: "localhost",
	},
	preview: {
		port: 4300,
		host: "localhost",
	},
	plugins: [nxViteTsPaths(), nxCopyAssetsPlugin(["*.md"])],
	worker: {
		plugins: () => [nxViteTsPaths()],
	},
	build: {
		outDir: "../../dist/apps/snake-app",
		emptyOutDir: true,
		reportCompressedSize: true,
		commonjsOptions: {
			transformMixedEsModules: true,
		},
	},
	test: {
		name: "snake-app",
		watch: false,
		environment: "jsdom",
		include: ["src/**/*.spec.ts"],
		setupFiles: ["@vitest/web-worker", "./src/test-setup.ts"],
	},
}));
