import { Canvas } from "./canvas";
import { RectPosition } from "./_models/rect-position";
import { container } from "tsyringe";
import { Configuration } from "./configuration";
import { Snake } from "./snake";
import { GameModel } from "./_models/game.model";
import { SnakeDirectionType } from "./_types/snake-direction.type";

export class Game {
  private readonly canvas: Canvas;
  private readonly game: GameModel;
  private readonly snake: Snake;
  /**
   * prevents the snake from going to the opposite direction on fast clicks
   */
  private hasSnakeDirectionChanged: boolean;
  private moveSnakeInterval: number | undefined;

  constructor() {
    this.canvas = container.resolve<Canvas>(Canvas);
    this.game = new GameModel();
    this.snake = new Snake();

    this.hasSnakeDirectionChanged = false;

    this.startGame();

    addEventListener("keyup", this.changeSnakeDirection.bind(this));

    // temp just for dev
    addEventListener("keyup", (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.code === "Space") {
        this.endgame();

        this.startGame();
      }
    });
  }

  private startGame(): void {
    this.game.snakeDirection = "right";
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

    const newSnakeDirection:
      | SnakeDirectionType
      | undefined = this.snake.getNewSnakeDirection(
      keyboardEvent.key,
      this.game.snakeDirection
    );

    if (newSnakeDirection) {
      this.game.snakeDirection = newSnakeDirection;

      this.hasSnakeDirectionChanged = true;
    }
  }

  private endgame(): void {
    clearInterval(this.moveSnakeInterval);

    this.canvas.resetBoard();

    console.log(`Game over! ${this.game.snakeRectPositions.length} points :-)`);
  }

  private moveSnake(): void {
    const firstSnakeData = this.game.snakeRectPositions[
      this.game.snakeRectPositions.length - 1
    ];
    const nextSnakeData: RectPosition = this.snake.getNextSnakeData(
      firstSnakeData,
      this.game.snakeDirection
    );

    const isOutOfBoard = this.snake.isSnakeOutOfBoard(nextSnakeData);
    const isSelfHit = this.snake.isSelfHit(
      nextSnakeData,
      this.game.snakeRectPositions
    );

    if (isOutOfBoard || isSelfHit) {
      this.endgame();

      return;
    }

    this.game.snakeRectPositions.push(nextSnakeData);
    this.canvas.snakeFillRect(nextSnakeData);

    const lastSnakeData = this.game.snakeRectPositions.shift();
    if (lastSnakeData) {
      this.canvas.clearRect(lastSnakeData);
    }
  }

  private setupSnake(): void {
    this.game.snakeRectPositions = this.snake.getSetupSnakeRectPositions();

    this.game.snakeRectPositions.forEach((rectPosition: RectPosition) => {
      this.canvas.snakeFillRect(rectPosition);
    });
  }
}
