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
    const snakeStartRects = 3;

    let xPosition = Configuration.boardWidthInPixels / 4;
    const yPosition = Configuration.boardHeightInPixels / 2;

    for (let i = 0; i < snakeStartRects; i++) {
      const snakeData = new SnakeRectData(xPosition, yPosition);

      this.snakeDataArray.push(snakeData);

      this.canvas.fillRect(snakeData);

      const isLast: boolean = i === snakeStartRects - 1;

      if (!isLast) {
        xPosition +=
          Configuration.snakePieceSizeInPixels + Configuration.snakeRectGap;
      }
    }
  }
}
