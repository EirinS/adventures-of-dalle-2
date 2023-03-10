import { Sprite } from "pixi.js";
import { HitBox } from "../components/HitBox";
import { Direction, NavigationArrow } from "../components/NavigationArrow";
import { book, library, livingroom, pumpkin } from "../state/rooms";
import { BaseScene } from "./BaseScene";
import { Manager } from "./Manager";

export class BedroomScene extends BaseScene {
  private unOpenedPumpkinHitbox: any;
  private lockedDrawerHitbox: any;
  constructor() {
    super(Sprite.from("bedroom"));

    const pumpkin = new HitBox(65, 485, 150, 170, 0, false);
    this.openPumpkin = this.openPumpkin.bind(this);
    pumpkin.addClickAction(this.openPumpkin);
    this.unOpenedPumpkinHitbox = this.addChild(pumpkin);

    const drawer = new HitBox(-30, 845, 410, 90, -25, false);
    this.openDrawer = this.openDrawer.bind(this);
    drawer.addClickAction(this.openDrawer, "key");
    this.lockedDrawerHitbox = this.addChild(drawer);

    const book = new HitBox(1368, 385, 80, 125, 0, false);
    this.openBook = this.openBook.bind(this);
    book.addClickAction(this.openBook);
    this.addChild(book);
  }

  public loadNavigation() {
    this.addChild(new NavigationArrow(1750, 950, livingroom, Direction.Right));
    this.addChild(new NavigationArrow(50, 950, library, Direction.Left));
  }

  private openPumpkin() {
    this.addCutout("openPumpkin", 25, 448);
    this.removeChild(this.unOpenedPumpkinHitbox);
    const pumpkin = new HitBox(65, 550, 150, 120, 0, false);
    this.lookIntoPumpkin = this.lookIntoPumpkin.bind(this);
    pumpkin.addClickAction(this.lookIntoPumpkin);
    this.addChild(pumpkin);
  }

  private lookIntoPumpkin() {
    Manager.changeScene(pumpkin);
  }

  private openDrawer() {
    this.removeChild(this.lockedDrawerHitbox);
    this.addCutout("openDrawer", 0, 640);
  }

  private openBook() {
    Manager.changeScene(book);
  }
}
