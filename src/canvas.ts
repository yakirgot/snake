import { GameConfiguration } from "./configuration";
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

  public snakeFillRect(rectPosition: RectPosition): void {
    const color: string = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--indian-red");

    this.fillRectOnCanvas(rectPosition, color);
  }

  public foodFillRect(rectPosition: RectPosition): void {
    const color: string = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--saffron");

    this.fillRectOnCanvas(rectPosition, color);
  }

  public clearRect(rectPosition: RectPosition): void {
    const color: string = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--medium-sea-green");

    this.fillRectOnCanvas(rectPosition, color);
  }

  public resetBoard(): void {
    const context = this.getCanvasContext();
    const { boardWidthInPixels, boardHeightInPixels } = GameConfiguration;

    if (context) {
      context.clearRect(0, 0, boardWidthInPixels, boardHeightInPixels);
    }
  }

  private fillRectOnCanvas(rectPosition: RectPosition, color: string): void {
    const context = this.getCanvasContext();

    if (context) {
      context.fillStyle = color;

      const { xPosition, yPosition } = rectPosition;
      const rectSize = GameConfiguration.snakePieceSizeInPixels;
      context.fillRect(xPosition, yPosition, rectSize, rectSize);
    }
  }

  private getCanvasContext(): CanvasRenderingContext2D | null {
    return this.canvasElement.getContext("2d");
  }

  private configureCanvasElement() {
    const { boardWidthInPixels, boardHeightInPixels } = GameConfiguration;

    this.canvasElement.id = "snake-canvas";
    this.canvasElement.width = boardWidthInPixels;
    this.canvasElement.height = boardHeightInPixels;
  }
}
