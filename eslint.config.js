import * as jsoncParser from "jsonc-eslint-parser";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import js from "@eslint/js";
import nx from "@nx/eslint-plugin";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

/** @type {import('typescript-eslint').Config} */
export default [
	...nx.configs["flat/base"],
	...nx.configs["flat/typescript"],
	...nx.configs["flat/javascript"],
	{
		ignores: ["**/dist", "**/out-tsc", "**/test-output"],
	},
	{
		files: ["**/*.js", "**/*.ts", "**/*.json"],
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
								"type:feature",
								"type:ui",
								"type:util",
								"type:data-access",
							],
						},
						{
							sourceTag: "type:ui",
							onlyDependOnLibsWithTags: [
								"type:ui",
								"type:util",
								"type:data-access",
							],
						},
						{
							sourceTag: "type:data-access",
							onlyDependOnLibsWithTags: ["type:data-access", "type:util"],
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
		...json.configs.recommended,
	},
	{
		files: ["**/*.json"],
		ignores: ["**/package.json", "**/project.json"],
		language: "json/json",
	},
	{
		files: ["**/package.json", "**/project.json"],
		languageOptions: {
			parser: jsoncParser,
		},
	},
	{
		files: ["**/*.md"],
		plugins: { markdown },
		language: "markdown/commonmark",
		...markdown.configs.recommended,
	},
];
