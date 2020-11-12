import { container } from "tsyringe";
import { Canvas } from "./canvas";
import { SnakeRectData } from "./snake-rect-data";
import { Configuration } from "./configuration";

export class Snake {
  private canvas: Canvas;
  private snakeDataArray: SnakeRectData[];

  constructor() {
    this.canvas = container.resolve<Canvas>(Canvas);

    this.snakeDataArray = [];

    this.setupSnake();
  }

  private setupSnake(): void {
    const snakeData = new SnakeRectData(
      Configuration.boardWidthInPixels / 4,
      Configuration.boardHeightInPixels / 2
    );

    this.snakeDataArray.push(snakeData);

    this.canvas.fillRect(snakeData);
  }
}
