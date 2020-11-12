import { container } from "tsyringe";
import { Canvas } from "./canvas";
import { SnakeRectData } from "./snake-rect-data";
import { Configuration } from "./configuration";
import { SnakeDirectionType } from "./_types/snake-direction.type";

export class Snake {
  private readonly canvas: Canvas;
  private readonly snakeDataArray: SnakeRectData[];
  private snakeDirection: SnakeDirectionType;

  constructor() {
    this.canvas = container.resolve<Canvas>(Canvas);

    this.snakeDataArray = [];

    this.snakeDirection = "right";

    this.setupSnake();

    setInterval(() => this.moveSnake(), Configuration.movementDelayInMs);
  }

  private moveSnake(): void {
    const { xPosition, yPosition } = this.snakeDataArray[
      this.snakeDataArray.length - 1
    ];
    const nextSnakeData: SnakeRectData = new SnakeRectData(
      xPosition,
      yPosition
    );

    switch (this.snakeDirection) {
      case "right":
        nextSnakeData.xPosition =
          xPosition +
          Configuration.snakePieceSizeInPixels +
          Configuration.snakeRectGap;

        break;
      case "left":
        nextSnakeData.xPosition =
          xPosition -
          Configuration.snakePieceSizeInPixels -
          Configuration.snakeRectGap;

        break;
      case "up":
        nextSnakeData.yPosition =
          yPosition -
          Configuration.snakePieceSizeInPixels -
          Configuration.snakeRectGap;

        break;
      case "down":
        nextSnakeData.yPosition =
          yPosition +
          Configuration.snakePieceSizeInPixels +
          Configuration.snakeRectGap;

        break;
    }

    this.snakeDataArray.push(nextSnakeData);
    this.canvas.fillRect(nextSnakeData);

    const lastSnakeData = this.snakeDataArray.shift();
    if (lastSnakeData) {
      this.canvas.clearRect(lastSnakeData);
    }
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
