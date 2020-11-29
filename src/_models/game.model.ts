import { RectPosition } from "./rect-position";
import { SnakeDirectionType } from "../_types/snake-direction.type";

export class GameModel {
  snakeRectPositions: RectPosition[];
  snakeDirection: SnakeDirectionType;

  constructor() {
    this.snakeRectPositions = [];
    this.snakeDirection = "right";
  }
}
