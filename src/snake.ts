import { container } from "tsyringe";
import { Configuration } from "./configuration";
import { Canvas } from "./canvas";

export class Snake {
  xPosition: number;
  yPosition: number;

  constructor() {
    this.xPosition = Configuration.boardWidthInPixels / 4;
    this.yPosition = Configuration.boardHeightInPixels / 2;

    this.setupSnake();
  }

  private static getSnakeColor(): string {
    const colorVar = "--indian-red";

    const color: string = getComputedStyle(
      document.documentElement
    ).getPropertyValue(colorVar);

    return color;
  }

  private setupSnake(): void {
    const canvas: Canvas = container.resolve<Canvas>(Canvas);
    const context = canvas.getCanvasContext();

    if (context) {
      context.fillStyle = Snake.getSnakeColor();

      context.fillRect(
        this.xPosition,
        this.yPosition,
        Configuration.snakePieceSizeInPixels,
        Configuration.snakePieceSizeInPixels
      );
    }
  }
}
