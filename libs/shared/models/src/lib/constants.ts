export const DOM_SELECTORS = Object.freeze({
	POINTS: "[data-game-points]",
	HIGH_SCORE: "[data-high-score]",
	START_BUTTON: "[data-snake-game-start-button]",
	ANNOUNCER: "#game-announcer",
	SOUND_TOGGLE: "[data-sound-toggle]",
	CANVAS: "[data-snake-game]",
} as const);

export const KEY_CODES = Object.freeze({
	ARROW_UP: "ArrowUp",
	ARROW_DOWN: "ArrowDown",
	ARROW_LEFT: "ArrowLeft",
	ARROW_RIGHT: "ArrowRight",
	W: "KeyW",
	S: "KeyS",
	A: "KeyA",
	D: "KeyD",
} as const);

export const GAME_CONSTANTS = Object.freeze({
	TOUCH_THRESHOLD: 30,
});
