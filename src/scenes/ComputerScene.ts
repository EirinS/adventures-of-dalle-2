import { Sprite } from "pixi.js";
import { Direction, NavigationArrow } from "../components/NavigationArrow";
import { library } from "../state/rooms";
import { BaseScene } from "./BaseScene";

export class ComputerScene extends BaseScene {
  constructor() {
    super(Sprite.from("computer"));
  }
  public loadNavigation() {
    this.addChild(new NavigationArrow(925, 950, library, Direction.Down));
  }
}
