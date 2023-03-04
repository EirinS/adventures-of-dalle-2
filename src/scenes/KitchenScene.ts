import { Sprite } from "pixi.js";
import { HitBox } from "../components/HitBox";
import { BaseScene } from "./BaseScene";

export class KitchenScene extends BaseScene {
  constructor() {
    super(Sprite.from("kitchen"));

    const painting = new HitBox(1200, 45, 290, 250, -3);
    this.revealPainting = this.revealPainting.bind(this);
    painting.on("pointertap", this.revealPainting);
    this.addChild(painting);

    const juice = new HitBox(580, 406, 65, 155, 0);
    this.takeJuice = this.takeJuice.bind(this);
    juice.on("pointertap", this.takeJuice);
    this.addChild(juice);

    const cupboard = new HitBox(495, 580, 160, 325, 2);
    this.openCupboard = this.openCupboard.bind(this);
    this.removeFlashlight = this.removeFlashlight.bind(this);
    cupboard.on("pointertap", this.openCupboard);
    this.addChild(cupboard);
  }

  private openCupboard() {
    super.addCutout("openCupboard", false);
    const flashlight = new HitBox(530, 625, 105, 40, 8);
    flashlight.on("pointertap", this.removeFlashlight);
    this.addChild(flashlight);
  }

  private removeFlashlight() {
    this.addCutout("removeFlashlight", false);
  }

  private revealPainting() {
    this.addCutout("revealPainting", true, false);
  }

  private takeJuice() {
    this.addCutout("removeJuice");
  }
}
