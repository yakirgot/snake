import { RectPosition } from "./_models/rect-position";
import { Configuration } from "./configuration";
import { SnakeDirectionType } from "./_types/snake-direction.type";

export class Snake {
  isSnakeOutOfBoard(rectPosition: RectPosition): boolean {
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

  isSelfHit(
    nextSnakeData: RectPosition,
    snakeRectPositions: RectPosition[]
  ): boolean {
    const isSelfHitPredictor = (rectPosition: RectPosition) => {
      const { xPosition, yPosition } = rectPosition;
      const isSameXValue: boolean = nextSnakeData.xPosition === xPosition;
      const isSameYValue: boolean = nextSnakeData.yPosition === yPosition;

      return isSameXValue && isSameYValue;
    };

    const isSelfHit = snakeRectPositions.some(isSelfHitPredictor);

    return isSelfHit;
  }

  getNewSnakeDirection(
    key: string,
    snakeDirection: SnakeDirectionType
  ): SnakeDirectionType | undefined {
    switch (key) {
      case "ArrowRight":
        if (snakeDirection !== "left") {
          return "right";
        }

        break;
      case "ArrowLeft":
        if (snakeDirection !== "right") {
          return "left";
        }

        break;
      case "ArrowUp":
        if (snakeDirection !== "down") {
          return "up";
        }

        break;
      case "ArrowDown":
        if (snakeDirection !== "up") {
          return "down";
        }

        break;
    }
  }

  getNextSnakeData(
    rectPosition: RectPosition,
    snakeDirection: SnakeDirectionType
  ): RectPosition {
    const { snakePieceSizeInPixels, snakeRectGap } = Configuration;
    const { xPosition, yPosition } = rectPosition;
    const nextSnakeData: RectPosition = { xPosition, yPosition };

    switch (snakeDirection) {
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

  getSetupSnakeRectPositions(): RectPosition[] {
    const {
      boardWidthInPixels,
      boardHeightInPixels,
      snakePieceSizeInPixels,
      snakeRectGap,
    } = Configuration;
    const snakeRectPositions: RectPosition[] = [];

    let xPosition = Math.round(boardWidthInPixels / 4);
    const yPosition = Math.round(boardHeightInPixels / 2);

    for (let i = 0; i < Configuration.snakeStartRects; i++) {
      const snakeData = { xPosition, yPosition };

      snakeRectPositions.push(snakeData);

      const isLast: boolean = i === Configuration.snakeStartRects - 1;

      if (!isLast) {
        xPosition += snakePieceSizeInPixels + snakeRectGap;
      }
    }

    return snakeRectPositions;
  }
}
