import { Sprite } from "pixi.js";
import { HitBox } from "../components/HitBox";
import { Direction, NavigationArrow } from "../components/NavigationArrow";
import { library, livingroom } from "../state/rooms";
import { BaseScene } from "./BaseScene";

export class BedroomScene extends BaseScene {
  private unOpenedPumpkin: any;
  private lockedDrawer: any;
  constructor() {
    super(Sprite.from("bedroom"));

    const pumpkin = new HitBox(65, 485, 150, 170, 0, false);
    this.openPumpkin = this.openPumpkin.bind(this);
    pumpkin.on("pointertap", this.openPumpkin);
    this.unOpenedPumpkin = this.addChild(pumpkin);

    const drawer = new HitBox(-30, 845, 410, 90, -25, false);
    this.openDrawer = this.openDrawer.bind(this);
    drawer.on("pointertap", this.openDrawer);
    this.lockedDrawer = this.addChild(drawer);
  }

  public loadNavigation() {
    this.addChild(new NavigationArrow(1750, 950, livingroom, Direction.Right));
    this.addChild(new NavigationArrow(50, 950, library, Direction.Left));
  }

  private openPumpkin() {
    this.addCutout("openPumpkin", 25, 448);
    this.removeChild(this.unOpenedPumpkin);
    const pumpkin = new HitBox(65, 550, 150, 120, 0, false);
    this.lookIntoPumpkin = this.lookIntoPumpkin.bind(this);
    pumpkin.on("pointertap", this.lookIntoPumpkin);
    this.addChild(pumpkin);
  }

  private lookIntoPumpkin() {
    console.log("look into pumpkin");
  }

  private openDrawer() {
    this.removeChild(this.lockedDrawer);
    this.addCutout("openDrawer", 0, 640);
  }
}
