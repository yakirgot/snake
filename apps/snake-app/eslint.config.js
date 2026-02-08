import baseConfig from "../../eslint.config.js";
import vitest from "@vitest/eslint-plugin";

export default [
	...baseConfig,
	{
		files: ["src/**/*.spec.ts"],
		plugins: { vitest },
		rules: {
			...vitest.configs.all.rules,
			"vitest/prefer-expect-assertions": "off",
			"vitest/no-hooks": "off",
			"vitest/consistent-test-filename": [
				"error",
				{ pattern: ".*\\.spec\\.ts$" },
			],
			"vitest/valid-title": ["error", { allowArguments: true }],
		},
	},
];
