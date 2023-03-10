import { Sprite } from "pixi.js";
import { HitBox } from "../components/HitBox";
import { Direction, NavigationArrow } from "../components/NavigationArrow";
import { collectKey } from "../state/items";
import { kitchen, library } from "../state/rooms";
import { BaseScene } from "./BaseScene";

export class GardenScene extends BaseScene {
  private keyHitbox: any;
  constructor() {
    super(Sprite.from("garden"));

    const key = new HitBox(270, 930, 40, 50, 0, false);
    this.takeKey = this.takeKey.bind(this);
    key.addClickAction(this.takeKey);
    this.keyHitbox = this.addChild(key);
  }

  public loadNavigation() {
    this.addChild(new NavigationArrow(1750, 950, library, Direction.Right));
    this.addChild(new NavigationArrow(50, 950, kitchen, Direction.Left));
  }

  private takeKey() {
    this.removeChild(this.keyHitbox);
    this.addCutout("removeKey", 250, 857);
    collectKey();
  }
}
