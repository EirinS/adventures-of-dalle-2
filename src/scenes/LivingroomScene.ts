import { Sprite } from "pixi.js";
import { HitBox } from "../components/HitBox";
import { Direction, NavigationArrow } from "../components/NavigationArrow";
import { bedroom, kitchen, safe } from "../state/rooms";
import { BaseScene } from "./BaseScene";
import { Manager } from "./Manager";

export class LivingroomScene extends BaseScene {
  private paintingHitbox: any;
  constructor() {
    super(Sprite.from("livingroom"));

    const painting = new HitBox(930, 340, 155, 110, 0);
    this.removePainting = this.removePainting.bind(this);
    painting.addClickAction(this.removePainting);
    this.paintingHitbox = this.addChild(painting);
  }

  public loadNavigation() {
    this.addChild(new NavigationArrow(1750, 950, kitchen, Direction.Right));
    this.addChild(new NavigationArrow(50, 950, bedroom, Direction.Left));
  }

  private removePainting() {
    this.removeChild(this.paintingHitbox);
    this.addCutout("showSafe", 913, 317);
    const safe = new HitBox(930, 340, 155, 110, 0);
    this.goToSafe = this.goToSafe.bind(this);
    safe.addClickAction(this.goToSafe);
    this.paintingHitbox = this.addChild(safe);
  }

  private goToSafe() {
    Manager.changeScene(safe);
  }
}
