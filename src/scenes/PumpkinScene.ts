import { Sprite } from "pixi.js";
import { HitBox } from "../components/HitBox";
import { Direction, NavigationArrow } from "../components/NavigationArrow";
import { bedroom } from "../state/rooms";
import { BaseScene } from "./BaseScene";

export class PumpkinScene extends BaseScene {
  private bowlHitbox: any;
  constructor() {
    super(Sprite.from("pumpkin"));

    const bowl = new HitBox(500, 100, 900, 900, 0, false);
    this.fillBowl = this.fillBowl.bind(this);
    bowl.addClickAction(this.fillBowl, "carton");
    this.bowlHitbox = this.addChild(bowl);
  }

  public loadNavigation() {
    this.addChild(new NavigationArrow(50, 950, bedroom, Direction.Down));
  }

  private fillBowl() {
    this.removeChild(this.bowlHitbox);
    this.addCutout("filled", 487, 158);
  }
}
