import { Canvas } from "./canvas";
import { RectPosition } from "./_models/rect-position";
import { container } from "tsyringe";
import { GameConfiguration } from "./configuration";
import { Snake } from "./snake";
import { GameModel } from "./_models/game.model";
import { SnakeDirectionType } from "./_types/snake-direction.type";
import { Food } from "./food";

export class Game {
  private readonly canvas: Canvas;
  private readonly game: GameModel;
  private readonly snake: Snake;
  private readonly food: Food;
  /**
   * prevents the snake from going to the opposite direction on fast clicks
   */
  private hasSnakeDirectionChanged: boolean;
  private snakePartsToGrow: number;
  private moveSnakeInterval: number | undefined;

  constructor() {
    this.canvas = container.resolve<Canvas>(Canvas);
    this.game = new GameModel();
    this.snake = new Snake();
    this.food = new Food();

    this.hasSnakeDirectionChanged = false;
    this.snakePartsToGrow = 0;

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

  private startGame(): void {
    this.game.snakeDirection = "right";
    this.hasSnakeDirectionChanged = false;

    this.game.freeRectPositions = this.food.getAllPossibleFreeRectPositions();

    this.setupSnake();
    this.placeFoodOnBoard();

    this.moveSnakeInterval = window.setInterval(() => {
      this.moveSnake();

      this.hasSnakeDirectionChanged = false;
    }, GameConfiguration.movementDelayInMs);
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
    this.addSnakeRectPosition(nextSnakeData);

    const isNextMoveFood: boolean =
      this.game.foodRectPosition.xPosition === nextSnakeData.xPosition &&
      this.game.foodRectPosition.yPosition === nextSnakeData.yPosition;
    if (isNextMoveFood) {
      this.snakePartsToGrow += GameConfiguration.snakePartsToGrow;

      this.placeFoodOnBoard();
    }

    if (this.snakePartsToGrow === 0) {
      const lastSnakeData = this.game.snakeRectPositions.shift();
      if (lastSnakeData) {
        this.removeSnakeRectPosition(lastSnakeData);
      }
    } else {
      this.snakePartsToGrow--;
    }
  }

  private setupSnake(): void {
    this.game.snakeRectPositions = this.snake.getSetupSnakeRectPositions();

    this.game.snakeRectPositions.forEach((rectPosition: RectPosition) => {
      this.addSnakeRectPosition(rectPosition);
    });
  }

  private addSnakeRectPosition(rectPosition: RectPosition): void {
    this.canvas.snakeFillRect(rectPosition);

    this.game.freeRectPositions.delete(JSON.stringify(rectPosition));
  }

  private removeSnakeRectPosition(rectPosition: RectPosition): void {
    this.canvas.clearRect(rectPosition);

    this.game.freeRectPositions.add(JSON.stringify(rectPosition));
  }

  private placeFoodOnBoard(): void {
    const randomFreeRectPosition: RectPosition = this.food.getRandomFreeRectPosition(
      this.game.freeRectPositions
    );

    this.game.foodRectPosition = randomFreeRectPosition;
    this.canvas.foodFillRect(randomFreeRectPosition);
  }
}
