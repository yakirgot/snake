export class Canvas {
  private readonly canvasElement: HTMLCanvasElement;

  constructor() {
    this.canvasElement = document.createElement("canvas");
    this.canvasElement.id = "snake-canvas";

    document.body.appendChild(this.canvasElement);
  }

  getCanvasContext(): CanvasRenderingContext2D | null {
    return this.canvasElement.getContext("2d");
  }
}
