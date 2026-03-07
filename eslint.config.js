import json from "@eslint/json";
import markdown from "@eslint/markdown";
import js from "@eslint/js";
import nx from "@nx/eslint-plugin";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import { defineConfig } from "eslint/config";

/** @type {import('typescript-eslint').Config} */
export default defineConfig([
	...nx.configs["flat/base"],
	...nx.configs["flat/typescript"],
	...nx.configs["flat/javascript"],
	{
		ignores: ["**/dist", "**/out-tsc"],
	},
	{
		files: ["**/*.ts", "**/*.js"],
		rules: {
			"@nx/enforce-module-boundaries": [
				"error",
				{
					enforceBuildableLibDependency: true,
					allow: ["^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$"],
					depConstraints: [
						{
							sourceTag: "*",
							onlyDependOnLibsWithTags: ["*"],
						},
					],
				},
			],
		},
	},
	{
		files: ["**/*.ts"],
		...eslintPluginUnicorn.configs.recommended,
	},
	{
		files: ["**/*.js"],
		plugins: { js },
		extends: ["js/recommended"],
	},
	{
		files: ["**/*.json"],
		plugins: { json },
		ignores: ["package-lock.json"],
		language: "json/json",
		...json.configs.recommended,
	},
	{
		files: ["**/*.md"],
		plugins: { markdown },
		language: "markdown/commonmark",
		...markdown.configs.recommended,
	},
]);
