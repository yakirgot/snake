import nx from "@nx/eslint-plugin";

export default [
	...nx.configs["flat/base"],
	...nx.configs["flat/typescript"],
	...nx.configs["flat/javascript"],
	{
		files: ["**/*.json"],
		rules: {
			"@nx/dependency-checks": [
				"error",
				{
					ignoredFiles: [
						"{projectRoot}/eslint.config.{js,cjs,mjs,ts,cts,mts}",
						"{projectRoot}/vite.config.{js,ts,mjs,mts}",
					],
				},
			],
		},
		languageOptions: {
			parser: await import("jsonc-eslint-parser"),
		},
	},
	{
		ignores: ["**/dist", "**/out-tsc"],
	},
];
