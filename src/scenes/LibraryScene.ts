import { Sprite } from "pixi.js";
import { Direction, NavigationArrow } from "../components/NavigationArrow";
import { bedroom, garden } from "../state/rooms";
import { BaseScene } from "./BaseScene";

export class LibraryScene extends BaseScene {
  constructor() {
    super(Sprite.from("library"));
  }

  public loadNavigation() {
    this.addChild(new NavigationArrow(1750, 950, bedroom, Direction.Right));
    this.addChild(new NavigationArrow(50, 950, garden, Direction.Left));
  }
}
