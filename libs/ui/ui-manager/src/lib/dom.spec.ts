import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getRequiredElement } from "./dom.js";

describe("getRequiredElement", () => {
	let container: HTMLElement;

	beforeEach(() => {
		container = document.createElement("div");
		container.id = "test-container";
		document.body.append(container);
	});

	afterEach(() => {
		container.remove();
	});

	it("should return the element when it exists in the DOM", () => {
		const selector = "#test-element";
		const element = document.createElement("div");
		element.id = "test-element";
		container.append(element);

		const result = getRequiredElement(selector);

		expect(result).toBe(element);
	});

	it("should throw an error when the element does not exist", () => {
		const selector = "#non-existent-element";

		expect(() => getRequiredElement(selector)).toThrow(
			`Element with selector "${selector}" not found`,
		);
	});

	it("should work with different types of HTML elements", () => {
		const selector = "button";
		const button = document.createElement("button");
		container.append(button);

		const result = getRequiredElement<HTMLButtonElement>(selector);

		expect(result).toBe(button);
		expect(result instanceof HTMLButtonElement).toBe(true);
	});
});
