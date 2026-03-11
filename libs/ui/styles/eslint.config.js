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
					ignoredFiles: ["{projectRoot}/eslint.config.{js,cjs,mjs,ts,cts,mts}"],
				},
			],
		},
	},
	{
		ignores: ["**/out-tsc"],
	},
];
