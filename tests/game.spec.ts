import { describe, it } from "vitest";
import { getByText } from "@testing-library/dom";
import { gameHTML } from "../src/game-html";

describe("game", () => {
	it("should have a start button", () => {
		const container = document.createElement("div");

		container.innerHTML = gameHTML();

		getByText(container, "Start!");
	});
});
