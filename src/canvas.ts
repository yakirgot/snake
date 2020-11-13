import { Configuration } from "./configuration";
import { singleton } from "tsyringe";
import { RectPosition } from "./_models/rect-position";

@singleton<Canvas>()
export class Canvas {
  private readonly canvasElement: HTMLCanvasElement;

  constructor() {
    this.canvasElement = document.createElement("canvas");

    this.configureCanvasElement();

    document.body.appendChild(this.canvasElement);
  }

  public fillRect(rectPosition: RectPosition): void {
    const colorVar = "--indian-red";

    const color: string = getComputedStyle(
      document.documentElement
    ).getPropertyValue(colorVar);

    this.fillRectOnCanvas(rectPosition, color);
  }

  public clearRect(rectPosition: RectPosition): void {
    const colorVar = "--medium-sea-green";

    const color: string = getComputedStyle(
      document.documentElement
    ).getPropertyValue(colorVar);

    this.fillRectOnCanvas(rectPosition, color);
  }

  public resetBoard(): void {
    const context = this.getCanvasContext();
    const { boardWidthInPixels, boardHeightInPixels } = Configuration;

    if (context) {
      context.clearRect(0, 0, boardWidthInPixels, boardHeightInPixels);
    }
  }

  private fillRectOnCanvas(rectPosition: RectPosition, color: string): void {
    const context = this.getCanvasContext();

    if (context) {
      context.fillStyle = color;

      const { xPosition, yPosition } = rectPosition;
      const rectSize = Configuration.snakePieceSizeInPixels;
      context.fillRect(xPosition, yPosition, rectSize, rectSize);
    }
  }

  private getCanvasContext(): CanvasRenderingContext2D | null {
    return this.canvasElement.getContext("2d");
  }

  private configureCanvasElement() {
    const { boardWidthInPixels, boardHeightInPixels } = Configuration;

    this.canvasElement.id = "snake-canvas";
    this.canvasElement.width = boardWidthInPixels;
    this.canvasElement.height = boardHeightInPixels;
  }
}
