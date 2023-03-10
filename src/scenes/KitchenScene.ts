import { Sprite } from "pixi.js";
import { HitBox } from "../components/HitBox";
import { Direction, NavigationArrow } from "../components/NavigationArrow";
import { collectCarton, collectFlashlight } from "../state/items";
import { garden, livingroom } from "../state/rooms";
import { BaseScene } from "./BaseScene";

export class KitchenScene extends BaseScene {
  private paintingHitbox: any;
  private juiceHitbox: any;
  private cupboardHitbox: any;
  private flashlightHitbox: any;

  constructor() {
    super(Sprite.from("kitchen"));

    const painting = new HitBox(1200, 45, 290, 250, -3);
    this.revealPainting = this.revealPainting.bind(this);
    painting.addClickAction(this.revealPainting, "flashlight");
    this.paintingHitbox = this.addChild(painting);

    const juice = new HitBox(580, 406, 65, 155, 0);
    this.takeJuice = this.takeJuice.bind(this);
    juice.addClickAction(this.takeJuice);
    this.juiceHitbox = this.addChild(juice);

    const cupboard = new HitBox(495, 580, 160, 325, 2);
    this.openCupboard = this.openCupboard.bind(this);
    this.removeFlashlight = this.removeFlashlight.bind(this);
    cupboard.addClickAction(this.openCupboard);
    this.cupboardHitbox = this.addChild(cupboard);
  }

  public loadNavigation() {
    this.addChild(new NavigationArrow(1750, 950, garden, Direction.Right));
    this.addChild(new NavigationArrow(50, 950, livingroom, Direction.Left));
  }

  private openCupboard() {
    this.removeChild(this.cupboardHitbox);
    super.addCutout("openCupboard", 411, 565);
    const flashlight = new HitBox(530, 625, 105, 40, 8);
    flashlight.addClickAction(this.removeFlashlight);
    this.flashlightHitbox = this.addChild(flashlight);
  }

  private removeFlashlight() {
    this.removeChild(this.flashlightHitbox);
    collectFlashlight();
    this.addCutout("removeFlashlight", 493, 597);
  }

  private revealPainting() {
    this.removeChild(this.paintingHitbox);
    this.addCutout("revealPainting", 1171, 0);
  }

  private takeJuice() {
    this.removeChild(this.juiceHitbox);
    collectCarton();
    this.addCutout("removeJuice", 563, 391);
  }
}
