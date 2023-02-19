import { Graphics, Point } from "pixi.js";
import { IScene, Manager } from "../scenes/Manager";

export class NavigationArrow extends Graphics {
  private arrowCoords = [0, 30, 64, 30, 64, 0, 110, 50, 64, 100, 64, 70, 0, 70];
  private nextScene: IScene;
  private color: number;
  private hoverColor: number;
  private outlineColor: number;

  constructor(
    x: number,
    y: number,
    nextScene: IScene,
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
    this.onmouseover = () => this.drawArrow(this.hoverColor);
    this.onmouseout = () => this.drawArrow(this.color);
    this.drawArrow(this.color);
  }

  private goToNextScene() {
    Manager.changeScene(this.nextScene);
  }

  private drawArrow(color: number) {
    this.lineStyle(4, this.outlineColor, 1);
    this.beginFill(color);
    this.drawPolygon(this.arrowCoords);
    this.endFill();
  }
}
