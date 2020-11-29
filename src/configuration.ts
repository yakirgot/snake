export class Configuration {
  static boardWidthInSnakeUnits = 24;
  static boardHeightInSnakeUnits = 16;
  static snakePieceSizeInPixels = 20;
  static movementDelayInMs = 250;
  static snakeRectGap = 5;
  static snakeStartRects = 3;

  static get boardWidthInPixels(): number {
    const { snakePieceSizeWithGap, boardWidthInSnakeUnits } = Configuration;
    const boardWidth = snakePieceSizeWithGap * boardWidthInSnakeUnits;

    return boardWidth;
  }

  static get boardHeightInPixels(): number {
    const { snakePieceSizeWithGap, boardHeightInSnakeUnits } = Configuration;
    const boardHeight = snakePieceSizeWithGap * boardHeightInSnakeUnits;

    return boardHeight;
  }

  private static get snakePieceSizeWithGap(): number {
    const { snakePieceSizeInPixels, snakeRectGap } = Configuration;

    return snakePieceSizeInPixels + snakeRectGap;
  }
}
