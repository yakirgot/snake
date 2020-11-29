import { RectPosition } from "./_models/rect-position";
import { Canvas } from "./canvas";
import { container } from "tsyringe";
import { GameConfiguration } from "./configuration";

export class Food {
  private readonly canvas: Canvas;
  private foodRectPosition: RectPosition;

  constructor() {
    this.canvas = container.resolve<Canvas>(Canvas);
    this.foodRectPosition = { xPosition: 0, yPosition: 0 };
  }

  getRandomFreeRectPosition(freeRectPositions: Set<string>): RectPosition {
    const freeRectPositionsArray: string[] = [...freeRectPositions];
    const randomIndex: number = Math.floor(
      Math.random() * Math.floor(freeRectPositionsArray.length - 1)
    );
    const randomFreeRectPositionString = freeRectPositionsArray[randomIndex];
    const randomFreeRectPosition = JSON.parse(randomFreeRectPositionString);

    return randomFreeRectPosition as RectPosition;
  }

  getAllPossibleFreeRectPositions(): Set<string> {
    const freeRectPositions = new Set<string>();

    const { boardWidthInPixels, boardHeightInPixels } = GameConfiguration;
    const snakePieceSizeWithGap = GameConfiguration.snakePieceSizeWithGap;

    for (
      let xPosition = 0;
      xPosition < boardWidthInPixels;
      xPosition += snakePieceSizeWithGap
    ) {
      for (
        let yPosition = 0;
        yPosition < boardHeightInPixels;
        yPosition += snakePieceSizeWithGap
      ) {
        freeRectPositions.add(JSON.stringify({ xPosition, yPosition }));
      }
    }

    return freeRectPositions;
  }
}
