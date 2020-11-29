export class GameConfiguration {
  static boardWidthInSnakeUnits = 24;
  static boardHeightInSnakeUnits = 16;
  static snakePieceSizeInPixels = 20;
  static movementDelayInMs = 200;
  static snakeRectGap = 5;
  static snakeStartRects = 3;
  static snakePartsToGrow = 3;

  static get boardWidthInPixels(): number {
    const { snakePieceSizeWithGap, boardWidthInSnakeUnits } = GameConfiguration;
    const boardWidth = snakePieceSizeWithGap * boardWidthInSnakeUnits;

    return boardWidth;
  }

  static get boardHeightInPixels(): number {
    const {
      snakePieceSizeWithGap,
      boardHeightInSnakeUnits,
    } = GameConfiguration;
    const boardHeight = snakePieceSizeWithGap * boardHeightInSnakeUnits;

    return boardHeight;
  }

  static get snakePieceSizeWithGap(): number {
    const { snakePieceSizeInPixels, snakeRectGap } = GameConfiguration;

    return snakePieceSizeInPixels + snakeRectGap;
  }
}
