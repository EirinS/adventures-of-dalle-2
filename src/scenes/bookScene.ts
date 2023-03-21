import { Sprite } from "pixi.js";
import { HitBox } from "../components/HitBox";
import { Direction, NavigationArrow } from "../components/NavigationArrow";
import { bedroom } from "../state/rooms";
import { BaseScene } from "./BaseScene";

export class BookScene extends BaseScene {
  private pageHitbox: any;
  constructor() {
    super(Sprite.from("book"));

    const page = new HitBox(180, 30, 1500, 1000, -2);
    this.revealRiddle = this.revealRiddle.bind(this);
    page.addClickAction(this.revealRiddle, "UV flashlight");
    this.pageHitbox = this.addChild(page);
  }

  public loadNavigation() {
    this.addChild(new NavigationArrow(925, 920, bedroom, Direction.Down));
  }

  private revealRiddle() {
    this.removeChild(this.pageHitbox);
    this.addCutout("riddle", 320, 380);
  }
}
