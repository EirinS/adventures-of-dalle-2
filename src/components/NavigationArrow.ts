import { Graphics, Point, Sprite } from "pixi.js";
import { IScene } from "../scenes/IScene";
import { Manager } from "../scenes/Manager";

export enum Direction {
  Up = "UP",
  Right = "RIGHT",
  Down = "DOWN",
  Left = "LEFT",
}

export enum Position {
  BottomLeft,
  BottomRight,
  BottomMiddle,
  MiddleLeft,
  TopMiddle,
  Automatic,
}

export class NavigationArrow extends Graphics {
  private rightArrowCoords = [0, 30, 64, 30, 64, 0, 110, 50, 64, 100, 64, 70, 0, 70];
  private downArrowCoords = [70, 0, 70, 64, 100, 64, 50, 110, 0, 64, 30, 64, 30, 0];
  private leftArrowCoords = [120, 30, 120, 70, 54, 70, 54, 100, 10, 50, 54, 0, 54, 30, 120, 30];
  private upArrowCoords = [30, 120, 30, 54, 0, 54, 50, 10, 100, 54, 70, 54, 70, 120, 30, 120];

  public nextScene: IScene;
  private color: number = 0xffffff;
  private hoverColor: number = 0x26415f;
  private outlineColor: number = 0xffffff;
  private nextSceneBackground: Sprite;
  private direction: Direction;
  private arrowPosition: Position;
  private margin: number;
  private callback: (() => void) | undefined;

  constructor(
    nextScene: IScene,
    direction: Direction,
    position: Position = Position.Automatic,
    callback: (() => void) | undefined = undefined
  ) {
    super();
    this.zIndex = 2;
    this.nextSceneBackground = nextScene.getBackground();
    this.nextScene = nextScene;
    this.interactive = true;
    this.onpointertap = this.goToNextScene;
    this.direction = direction;
    this.arrowPosition = position;
    this.margin = 24;
    this.callback = callback;

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

    const scale = Manager.isSmallScreen() ? 1.5 : 1.0;
    this.scale = new Point(scale, scale);

    this.drawArrow(this.color, direction);
  }

  private goToNextScene() {
    this.removeChild(this.nextSceneBackground);
    this.drawArrow(this.color, this.direction);
    Manager.changeScene(this.nextScene);
    if (this.callback) this.callback();
  }

  private drawMiniature(direction: Direction) {
    const height = Manager.height / 10;
    const width = Manager.width / 10;
    this.nextSceneBackground.height = height;
    this.nextSceneBackground.width = width;

    switch (direction) {
      case Direction.Up:
        if (this.arrowPosition === Position.TopMiddle) {
          this.nextSceneBackground.position = new Point(-width / 4, height + 40);
        } else {
          this.nextSceneBackground.position = new Point(-width / 4, -130);
        }
        break;
      case Direction.Right:
        this.nextSceneBackground.position = new Point(-50, -height - this.margin);
        break;
      case Direction.Down:
        this.nextSceneBackground.position = new Point(-width / 4, -130);
        break;
      case Direction.Left:
        this.nextSceneBackground.position = new Point(-30, -height - this.margin);
        break;
    }

    this.addChild(this.nextSceneBackground);
  }

  private drawArrow(color: number, direction: Direction) {
    this.lineStyle(4, this.outlineColor, 1);
    this.beginFill(color, 0.7);
    let arrowPosition = Position.BottomRight;
    switch (direction) {
      case Direction.Up:
        this.drawPolygon(this.upArrowCoords);
        break;
      case Direction.Right:
        arrowPosition = Position.BottomRight;
        this.drawPolygon(this.rightArrowCoords);
        break;
      case Direction.Down:
        arrowPosition = Position.BottomMiddle;
        this.drawPolygon(this.downArrowCoords);
        break;
      case Direction.Left:
        arrowPosition = Position.BottomLeft;
        this.drawPolygon(this.leftArrowCoords);
        break;
    }
    arrowPosition = this.arrowPosition === Position.Automatic ? arrowPosition : this.arrowPosition;
    this.setPosition(arrowPosition);
    this.endFill();
  }

  private setPosition(position: Position) {
    switch (position) {
      case Position.BottomLeft:
        this.position = new Point(this.margin, Manager.height - this.height - this.margin);
        break;
      case Position.BottomMiddle:
        this.position = new Point(Manager.width / 2 - this.width / 2, Manager.height - this.height - this.margin);
        break;
      case Position.BottomRight:
        this.position = new Point(Manager.width - this.width - this.margin, Manager.height - this.height - this.margin);
        break;
      case Position.MiddleLeft:
        this.position = new Point(this.margin, Manager.height / 2 - this.height / 2);
        break;
      case Position.TopMiddle:
        this.position = new Point(Manager.width / 2 - this.width / 2, this.margin);
        break;
    }
  }
}
