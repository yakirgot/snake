import { RectPosition } from "./rect-position";
import { SnakeDirectionType } from "../_types/snake-direction.type";

export class GameModel {
  snakeRectPositions: RectPosition[];
  /**
   * this is a stringified RectPosition
   * @type {Set<string>}
   */
  freeRectPositions: Set<string>;
  snakeDirection: SnakeDirectionType;
  foodRectPosition: RectPosition;

  constructor() {
    this.snakeRectPositions = [];
    this.freeRectPositions = new Set<string>();
    this.snakeDirection = "right";
    this.foodRectPosition = { xPosition: 0, yPosition: 0 };
  }
}
