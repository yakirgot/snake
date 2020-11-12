import { Configuration } from "./configuration";
import { singleton } from "tsyringe";
import { SnakeRectData } from "./snake-rect-data";

@singleton<Canvas>()
export class Canvas {
  private readonly canvasElement: HTMLCanvasElement;

  constructor() {
    this.canvasElement = document.createElement("canvas");

    this.configureCanvasElement();

    document.body.appendChild(this.canvasElement);
  }

  public fillRect(snakeRectData: SnakeRectData): void {
    const colorVar = "--indian-red";

    const color: string = getComputedStyle(
      document.documentElement
    ).getPropertyValue(colorVar);

    this.fillRectOnCanvas(snakeRectData, color);
  }

  public clearRect(snakeRectData: SnakeRectData): void {
    const colorVar = "--medium-sea-green";

    const color: string = getComputedStyle(
      document.documentElement
    ).getPropertyValue(colorVar);

    this.fillRectOnCanvas(snakeRectData, color);
  }

  public resetBoard(): void {
    const context = this.getCanvasContext();

    if (context) {
      context.clearRect(
        0,
        0,
        Configuration.boardWidthInPixels,
        Configuration.boardHeightInPixels
      );
    }
  }

  private fillRectOnCanvas(snakeRectData: SnakeRectData, color: string): void {
    const context = this.getCanvasContext();

    if (context) {
      context.fillStyle = color;

      context.fillRect(
        snakeRectData.xPosition,
        snakeRectData.yPosition,
        Configuration.snakePieceSizeInPixels,
        Configuration.snakePieceSizeInPixels
      );
    }
  }

  private getCanvasContext(): CanvasRenderingContext2D | null {
    return this.canvasElement.getContext("2d");
  }

  private configureCanvasElement() {
    this.canvasElement.id = "snake-canvas";
    this.canvasElement.width = Configuration.boardWidthInPixels;
    this.canvasElement.height = Configuration.boardHeightInPixels;
  }
}
