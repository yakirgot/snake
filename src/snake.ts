import { container } from "tsyringe";
import { Canvas } from "./canvas";
import { SnakeRectData } from "./snake-rect-data";
import { Configuration } from "./configuration";
import { SnakeDirectionType } from "./_types/snake-direction.type";

export class Snake {
  private readonly canvas: Canvas;
  private readonly snakeDataArray: SnakeRectData[];
  private snakeDirection: SnakeDirectionType;
  private moveSnakeInterval: number | undefined;

  constructor() {
    this.canvas = container.resolve<Canvas>(Canvas);

    this.snakeDataArray = [];
    this.snakeDirection = "right";

    this.setupSnake();

    this.startGame();

    addEventListener("keyup", this.changeSnakeDirection.bind(this));
  }

  private static isOutOfBoard(snakeRectData: SnakeRectData): boolean {
    const outRight: boolean =
      snakeRectData.xPosition >
      Configuration.boardWidthInPixels - Configuration.snakePieceSizeInPixels;
    const outLeft: boolean = snakeRectData.xPosition < 0;
    const outDown: boolean =
      snakeRectData.yPosition >
      Configuration.boardHeightInPixels - Configuration.snakePieceSizeInPixels;
    const outUp: boolean = snakeRectData.yPosition < 0;

    return outRight || outLeft || outDown || outUp;
  }

  private startGame(): void {
    this.snakeDirection = "right";

    this.moveSnakeInterval = window.setInterval(
      () => this.moveSnake(),
      Configuration.movementDelayInMs
    );
  }

  private changeSnakeDirection(keyboardEvent: KeyboardEvent): void {
    switch (keyboardEvent.key) {
      case "ArrowRight":
        if (this.snakeDirection !== "left") {
          this.snakeDirection = "right";
        }

        break;
      case "ArrowLeft":
        if (this.snakeDirection !== "right") {
          this.snakeDirection = "left";
        }

        break;
      case "ArrowUp":
        if (this.snakeDirection !== "down") {
          this.snakeDirection = "up";
        }

        break;
      case "ArrowDown":
        if (this.snakeDirection !== "up") {
          this.snakeDirection = "down";
        }

        break;
    }
  }

  private endgame(): void {
    if (this.moveSnakeInterval) {
      clearInterval(this.moveSnakeInterval);
    }

    this.canvas.resetBoard();

    console.log("Game over!");
  }

  private getNextSnakeData(snakeRectData: SnakeRectData): SnakeRectData {
    const { xPosition, yPosition } = snakeRectData;
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

    return nextSnakeData;
  }

  private moveSnake(): void {
    const firstSnakeData = this.snakeDataArray[this.snakeDataArray.length - 1];
    const nextSnakeData: SnakeRectData = this.getNextSnakeData(firstSnakeData);

    const isOutOfBoard = Snake.isOutOfBoard(nextSnakeData);
    const isSelfHit = this.isSelfHit(nextSnakeData);

    if (isOutOfBoard || isSelfHit) {
      this.endgame();

      return;
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

    let xPosition = Math.round(Configuration.boardWidthInPixels / 4);
    const yPosition = Math.round(Configuration.boardHeightInPixels / 2);

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

  private isSelfHit(nextSnakeData: SnakeRectData): boolean {
    const isSelfHit = this.snakeDataArray.some(
      (snakeRectData: SnakeRectData) => {
        const isSameXValue: boolean =
          nextSnakeData.xPosition === snakeRectData.xPosition;
        const isSameYValue: boolean =
          nextSnakeData.yPosition === snakeRectData.yPosition;

        return isSameXValue && isSameYValue;
      }
    );

    return isSelfHit;
  }
}
