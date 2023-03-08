import { Graphics, Point } from "pixi.js";
import { IScene, Manager } from "../scenes/Manager";

export enum Direction {
  Up = "UP",
  Right = "RIGHT",
  Down = "DOWN",
  Left = "LEFT",
}

export class NavigationArrow extends Graphics {
  private rightArrowCoords = [
    0, 30, 64, 30, 64, 0, 110, 50, 64, 100, 64, 70, 0, 70,
  ];
  private downArrowCoords = [
    70, 0, 70, 64, 100, 64, 50, 110, 0, 64, 30, 64, 30, 0,
  ];

  private leftArrowCoords = [
    120, 30, 120, 70, 54, 70, 54, 100, 10, 50, 54, 0, 54, 30, 120, 30,
  ];

  private upArrowCoords = [
    30, 120, 30, 54, 0, 54, 50, 10, 100, 54, 70, 54, 70, 120, 30, 120,
  ];

  public nextScene: IScene;
  private color: number;
  private hoverColor: number;
  private outlineColor: number;

  constructor(
    x: number,
    y: number,
    nextScene: IScene,
    direction: Direction,
    color: number = 0x406d9f,
    hoverColor: number = 0x26415f,
    outlineColor = 0x000000
  ) {
    super();
    this.position = new Point(x, y);
    this.color = color;
    this.hoverColor = hoverColor;
    this.outlineColor = outlineColor;
    this.nextScene = nextScene;
    this.interactive = true;
    this.onpointertap = this.goToNextScene;
    this.onmouseover = () => this.drawArrow(this.hoverColor, direction);
    this.onmouseout = () => this.drawArrow(this.color, direction);
    this.drawArrow(this.color, direction);
  }

  private goToNextScene() {
    Manager.changeScene(this.nextScene);
  }

  private drawArrow(color: number, direction: Direction) {
    this.lineStyle(4, this.outlineColor, 1);
    this.beginFill(color);
    switch (direction) {
      case Direction.Up:
        this.drawPolygon(this.upArrowCoords);
        break;
      case Direction.Right:
        this.drawPolygon(this.rightArrowCoords);
        break;
      case Direction.Down:
        this.drawPolygon(this.downArrowCoords);
        break;
      case Direction.Left:
        this.drawPolygon(this.leftArrowCoords);
        break;
    }
    this.endFill();
  }
}
