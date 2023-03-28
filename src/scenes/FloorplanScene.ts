import { Sprite } from "pixi.js";
import { Direction, NavigationArrow } from "../components/NavigationArrow";
import { BaseScene } from "./BaseScene";
import { IScene } from "./IScene";

export class FloorplanScene extends BaseScene {
  private navigationArrow: any;
  constructor() {
    super(Sprite.from("floorplan"));
  }

  public loadNavigation(scene: IScene) {
    this.removeChild(this.navigationArrow);
    this.navigationArrow = this.addChild(new NavigationArrow(scene, Direction.Down));
  }
}
