export function getRequiredElement<T extends HTMLElement>(selector: string): T {
	const element = document.querySelector<T>(selector);
	if (!element) {
		throw new Error(`Element with selector "${selector}" not found`);
	}
	return element;
}
