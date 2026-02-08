import { describe, expect, it } from "vitest";
import { getRequiredElement } from "./dom";

function setup() {
	document.body.innerHTML = "";
}

describe(getRequiredElement, () => {
	it("should return the element if it exists in the document", () => {
		setup();
		const div = document.createElement("div");
		div.id = "test-id";
		document.body.append(div);

		const element = getRequiredElement<HTMLDivElement>("#test-id");

		expect(element).toBe(div);
	});

	it("should throw an error if the element is not found", () => {
		setup();

		expect(() => {
			getRequiredElement("#non-existent");
		}).toThrowError('Element with selector "#non-existent" not found');
	});
});
