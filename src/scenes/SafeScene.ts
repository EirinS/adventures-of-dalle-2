import { Sprite } from "pixi.js";
import { Direction, NavigationArrow } from "../components/NavigationArrow";
import { livingroom } from "../state/rooms";
import { BaseScene } from "./BaseScene";

export class SafeScene extends BaseScene {
  constructor() {
    super(Sprite.from("safe"));
  }
  public loadNavigation() {
    this.addChild(new NavigationArrow(925, 950, livingroom, Direction.Down));
  }
}
