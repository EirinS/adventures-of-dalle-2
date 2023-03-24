import { Graphics, Point, Sprite } from "pixi.js";
import { IScene } from "../scenes/IScene";
import { Manager } from "../scenes/Manager";

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
  private nextSceneBackground: Sprite;
  private direction: Direction;

  constructor(
    x: number,
    y: number,
    nextScene: IScene,
    direction: Direction,
    color: number = 0xffffff,
    hoverColor: number = 0x26415f,
    outlineColor = 0xffffff
  ) {
    super();
    this.zIndex = 2;
    this.nextSceneBackground = nextScene.getBackground();
    this.position = new Point(x, y);
    this.color = color;
    this.hoverColor = hoverColor;
    this.outlineColor = outlineColor;
    this.nextScene = nextScene;
    this.interactive = true;
    this.onpointertap = this.goToNextScene;
    this.direction = direction;
    this.onmouseover = () => {
      this.clear();
      this.drawArrow(this.hoverColor, direction);
      this.drawMiniature(direction);
    };
    this.onmouseout = () => {
      this.removeChild(this.nextSceneBackground);
      this.clear();
      this.drawArrow(this.color, direction);
    };
    this.drawArrow(this.color, direction);
  }

  private goToNextScene() {
    this.removeChild(this.nextSceneBackground);
    this.drawArrow(this.color, this.direction);
    Manager.changeScene(this.nextScene);
  }

  private drawMiniature(direction: Direction) {
    const height = Manager.height / 10;
    const width = Manager.width / 10;
    this.nextSceneBackground.height = height;
    this.nextSceneBackground.width = width;

    switch (direction) {
      case Direction.Up:
        this.nextSceneBackground.position = new Point(-width / 4, -130);
        break;
      case Direction.Right:
        this.nextSceneBackground.position = new Point(-50, -height - 24);
        break;
      case Direction.Down:
        this.nextSceneBackground.position = new Point(-width / 4, -130);
        break;
      case Direction.Left:
        this.nextSceneBackground.position = new Point(-30, -height - 24);
        break;
    }

    this.addChild(this.nextSceneBackground);
  }

  private drawArrow(color: number, direction: Direction) {
    this.lineStyle(4, this.outlineColor, 1);
    this.beginFill(color, 0.7);
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
