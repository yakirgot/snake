import tsEslint from "typescript-eslint";
import globals from "globals";
import eslint from "@eslint/js";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

/** @type {import('typescript-eslint').Config} */
export default tsEslint.config(
	{
		plugins: {
			json,
			markdown,
			css,
		},
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
		ignores: ["package-lock.json"],
		language: "json/json",
		extends: [json.configs.recommended],
	},
	{
		files: ["**/*.md"],
		language: "markdown/commonmark",
		extends: [markdown.configs.recommended],
	},
	{
		files: ["**/*.css"],
		language: "css/css",
		extends: [css.configs.recommended],
		rules: {
			"css/prefer-logical-properties": "error",
		},
	},
);
