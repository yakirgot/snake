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
		ignores: ["**/dist", "**/out-tsc", "**/test-output"],
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
							sourceTag: "type:app",
							onlyDependOnLibsWithTags: [
								"type:feature",
								"type:ui",
								"type:util",
								"type:data-access",
							],
						},
						{
							sourceTag: "type:e2e",
							onlyDependOnLibsWithTags: [
								"type:app",
								"type:feature",
								"type:ui",
								"type:util",
								"type:data-access",
							],
						},
						{
							sourceTag: "type:feature",
							onlyDependOnLibsWithTags: [
								"type:ui",
								"type:util",
								"type:data-access",
							],
						},
						{
							sourceTag: "type:ui",
							onlyDependOnLibsWithTags: ["type:util"],
						},
						{
							sourceTag: "type:data-access",
							onlyDependOnLibsWithTags: ["type:util"],
						},
						{
							sourceTag: "type:util",
							onlyDependOnLibsWithTags: ["type:util"],
						},
						{
							sourceTag: "scope:client",
							onlyDependOnLibsWithTags: ["scope:client", "scope:shared"],
						},
						{
							sourceTag: "scope:shared",
							onlyDependOnLibsWithTags: ["scope:shared"],
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
		...js.configs.recommended,
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
