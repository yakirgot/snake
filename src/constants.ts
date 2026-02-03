export const DOM_SELECTORS = {
	POINTS: "[data-game-points]",
	HIGH_SCORE: "[data-high-score]",
	START_BUTTON: "[data-snake-game-start-button]",
	ANNOUNCER: "#game-announcer",
	SOUND_TOGGLE: "[data-sound-toggle]",
	CANVAS: "[data-snake-game]",
} as const;

export const KEY_CODES = {
	ARROW_UP: "ArrowUp",
	ARROW_DOWN: "ArrowDown",
	ARROW_LEFT: "ArrowLeft",
	ARROW_RIGHT: "ArrowRight",
	W: "KeyW",
	S: "KeyS",
	A: "KeyA",
	D: "KeyD",
} as const;

export const GAME_CONSTANTS = {
	TOUCH_THRESHOLD: 30,
} as const;

export const CSS_VARS = {
	MAIZE_CRAYOLA: "--color-maize-crayola",
	DARK_SLATE_GRAY: "--color-dark-slate-gray",
	TEAL_BLUE: "--color-teal-blue",
} as const;
