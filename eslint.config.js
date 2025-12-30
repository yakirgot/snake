import tsEslint from "typescript-eslint";
import globals from "globals";
import eslint from "@eslint/js";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import vitest from "@vitest/eslint-plugin";

/** @type {import('typescript-eslint').Config} */
export default tsEslint.config(
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.browser,
			},
			ecmaVersion: "latest",
			sourceType: "module",
		},
	},
	{
		files: ["**/*.ts"],
		extends: [
			tsEslint.configs.recommended,
			eslint.configs.recommended,
			eslintPluginUnicorn.configs.recommended,
		],
	},
	{
		files: ["**/*.json"],
		plugins: { json },
		ignores: ["package-lock.json"],
		language: "json/json",
		extends: [json.configs.recommended],
	},
	{
		files: ["**/*.md"],
		plugins: { markdown },
		language: "markdown/commonmark",
		extends: [markdown.configs.recommended],
	},
	{
		files: ["**/*.spec.ts"],
		plugins: { vitest },
		extends: [vitest.configs.all],
		rules: {
			"vitest/prefer-expect-assertions": "off",
			"vitest/no-hooks": "off",
			"vitest/consistent-test-filename": [
				"error",
				{ pattern: ".*\\.spec\\.ts$" },
			],
			"vitest/valid-title": ["error", { allowArguments: true }],
		},
	},
);
