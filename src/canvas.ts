import { Configuration } from "./configuration";
import { singleton } from "tsyringe";

@singleton<Canvas>()
export class Canvas {
  private readonly canvasElement: HTMLCanvasElement;

  constructor() {
    this.canvasElement = document.createElement("canvas");

    this.configureCanvasElement();

    document.body.appendChild(this.canvasElement);
  }

  getCanvasContext(): CanvasRenderingContext2D | null {
    return this.canvasElement.getContext("2d");
  }

  private configureCanvasElement() {
    this.canvasElement.id = "snake-canvas";
    this.canvasElement.width = Configuration.boardWidthInPixels;
    this.canvasElement.height = Configuration.boardHeightInPixels;
  }
}
