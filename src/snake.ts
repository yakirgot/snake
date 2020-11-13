import { container } from "tsyringe";
import { Canvas } from "./canvas";
import { RectPosition } from "./_models/rect-position";
import { Configuration } from "./configuration";
import { SnakeDirectionType } from "./_types/snake-direction.type";

export class Snake {
  private readonly canvas: Canvas;
  private rectPositions: RectPosition[];
  private snakeDirection: SnakeDirectionType;
  /**
   * prevents the snake from going to the opposite direction on fast clicks
   */
  private hasSnakeDirectionChanged: boolean;

  private moveSnakeInterval: number | undefined;

  constructor() {
    this.canvas = container.resolve<Canvas>(Canvas);

    this.rectPositions = [];
    this.snakeDirection = "right";
    this.hasSnakeDirectionChanged = false;

    this.startGame();

    addEventListener("keyup", this.changeSnakeDirection.bind(this));
    addEventListener("keyup", (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.code === "Space") {
        this.endgame();

        this.startGame();
      }
    });
  }

  private static isOutOfBoard(rectPosition: RectPosition): boolean {
    const {
      boardWidthInPixels,
      boardHeightInPixels,
      snakePieceSizeInPixels,
    } = Configuration;
    const { xPosition, yPosition } = rectPosition;

    const outRight: boolean =
      xPosition > boardWidthInPixels - snakePieceSizeInPixels;
    const outLeft: boolean = xPosition < 0;
    const outDown: boolean =
      yPosition > boardHeightInPixels - snakePieceSizeInPixels;
    const outUp: boolean = yPosition < 0;

    const isOutOfBoard: boolean = outRight || outLeft || outDown || outUp;

    return isOutOfBoard;
  }

  private startGame(): void {
    this.snakeDirection = "right";
    this.hasSnakeDirectionChanged = false;

    this.setupSnake();

    this.moveSnakeInterval = window.setInterval(() => {
      this.moveSnake();

      this.hasSnakeDirectionChanged = false;
    }, Configuration.movementDelayInMs);
  }

  private changeSnakeDirection(keyboardEvent: KeyboardEvent): void {
    if (this.hasSnakeDirectionChanged) {
      return;
    }

    switch (keyboardEvent.key) {
      case "ArrowRight":
        if (this.snakeDirection !== "left") {
          this.snakeDirection = "right";

          this.hasSnakeDirectionChanged = true;
        }

        break;
      case "ArrowLeft":
        if (this.snakeDirection !== "right") {
          this.snakeDirection = "left";

          this.hasSnakeDirectionChanged = true;
        }

        break;
      case "ArrowUp":
        if (this.snakeDirection !== "down") {
          this.snakeDirection = "up";

          this.hasSnakeDirectionChanged = true;
        }

        break;
      case "ArrowDown":
        if (this.snakeDirection !== "up") {
          this.snakeDirection = "down";

          this.hasSnakeDirectionChanged = true;
        }

        break;
    }
  }

  private endgame(): void {
    if (this.moveSnakeInterval) {
      clearInterval(this.moveSnakeInterval);
    }

    this.canvas.resetBoard();

    console.log(`Game over! ${this.rectPositions.length} points :-)`);
  }

  private getNextSnakeData(rectPosition: RectPosition): RectPosition {
    const { xPosition, yPosition } = rectPosition;
    const nextSnakeData: RectPosition = new RectPosition(xPosition, yPosition);
    const { snakePieceSizeInPixels, snakeRectGap } = Configuration;

    switch (this.snakeDirection) {
      case "right":
        nextSnakeData.xPosition =
          xPosition + snakePieceSizeInPixels + snakeRectGap;

        break;
      case "left":
        nextSnakeData.xPosition =
          xPosition - snakePieceSizeInPixels - snakeRectGap;

        break;
      case "up":
        nextSnakeData.yPosition =
          yPosition - snakePieceSizeInPixels - snakeRectGap;

        break;
      case "down":
        nextSnakeData.yPosition =
          yPosition + snakePieceSizeInPixels + snakeRectGap;

        break;
    }

    return nextSnakeData;
  }

  private moveSnake(): void {
    const firstSnakeData = this.rectPositions[this.rectPositions.length - 1];
    const nextSnakeData: RectPosition = this.getNextSnakeData(firstSnakeData);

    const isOutOfBoard = Snake.isOutOfBoard(nextSnakeData);
    const isSelfHit = this.isSelfHit(nextSnakeData);

    if (isOutOfBoard || isSelfHit) {
      this.endgame();

      return;
    }

    this.rectPositions.push(nextSnakeData);
    this.canvas.fillRect(nextSnakeData);

    const lastSnakeData = this.rectPositions.shift();
    if (lastSnakeData) {
      this.canvas.clearRect(lastSnakeData);
    }
  }

  private setupSnake(): void {
    this.rectPositions = [];

    const snakeStartRects = 3;

    let xPosition = Math.round(Configuration.boardWidthInPixels / 4);
    const yPosition = Math.round(Configuration.boardHeightInPixels / 2);

    for (let i = 0; i < snakeStartRects; i++) {
      const snakeData = new RectPosition(xPosition, yPosition);

      this.rectPositions.push(snakeData);
      this.canvas.fillRect(snakeData);

      const isLast: boolean = i === snakeStartRects - 1;

      if (!isLast) {
        xPosition +=
          Configuration.snakePieceSizeInPixels + Configuration.snakeRectGap;
      }
    }
  }

  private isSelfHit(nextSnakeData: RectPosition): boolean {
    const isSelfHitPredictor = (rectPosition: RectPosition) => {
      const { xPosition, yPosition } = rectPosition;
      const isSameXValue: boolean = nextSnakeData.xPosition === xPosition;
      const isSameYValue: boolean = nextSnakeData.yPosition === yPosition;

      return isSameXValue && isSameYValue;
    };

    const isSelfHit = this.rectPositions.some(isSelfHitPredictor);

    return isSelfHit;
  }
}
