import playwright from "eslint-plugin-playwright";
import baseConfig from "../../eslint.config.js";

export default [playwright.configs["flat/recommended"], ...baseConfig];
