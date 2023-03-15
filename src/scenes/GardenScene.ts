import { Sprite } from "pixi.js";
import { HitBox } from "../components/HitBox";
import { Direction, NavigationArrow } from "../components/NavigationArrow";
import { collectCrowbar, collectKey } from "../state/items";
import { kitchen, library } from "../state/rooms";
import { BaseScene } from "./BaseScene";

export class GardenScene extends BaseScene {
  private keyHitbox: any;
  private crowbarHitbox: any;
  constructor() {
    super(Sprite.from("garden"));

    const key = new HitBox(270, 930, 40, 50, 0);
    this.takeKey = this.takeKey.bind(this);
    key.addClickAction(this.takeKey);
    this.keyHitbox = this.addChild(key);

    const crowbar = new HitBox(1430, 636, 40, 100, 0);
    this.takeCrowbar = this.takeCrowbar.bind(this);
    crowbar.addClickAction(this.takeCrowbar);
    this.crowbarHitbox = this.addChild(crowbar);
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

  private takeCrowbar() {
    this.removeChild(this.crowbarHitbox);
    this.addCutout("removeCrowbar", 1279, 588);
    collectCrowbar();
  }
}
