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

    const baobaoText = () => this.addText(["The kitchen"]);
    const baobaoHead = new HitBox(266, 200, 105);
    const baobaoBody = new HitBox(120, 280, 300, 770);
    const baobaoArms = new HitBox(66, 340, 390, 250);
    baobaoHead.addClickAction(baobaoText);
    baobaoBody.addClickAction(baobaoText);
    baobaoArms.addClickAction(baobaoText);
    this.addChild(baobaoArms);
    this.addChild(baobaoBody);
    this.addChild(baobaoHead);

    const painting = new HitBox(1200, 45, 290, 250, -3);
    this.revealPainting = this.revealPainting.bind(this);
    painting.addClickAction(this.revealPainting, "flashlight");
    this.paintingHitbox = this.addChild(painting);

    const juice = new HitBox(580, 406, 65, 155, 0);
    this.takeJuice = this.takeJuice.bind(this);
    juice.addClickAction(this.takeJuice);
    this.juiceHitbox = this.addChild(juice);

    const cupboard = new HitBox(495, 580, 170, 330, 4);
    this.openCupboard = this.openCupboard.bind(this);
    this.removeFlashlight = this.removeFlashlight.bind(this);
    cupboard.addClickAction(this.openCupboard);
    this.cupboardHitbox = this.addChild(cupboard);

    const cupboardRight = new HitBox(660, 590, 170, 360, 4);
    cupboardRight.addClickAction(this.openCupboard);
    this.addChild(cupboardRight);

    this.clickPan = this.clickPan.bind(this);
    const panLeft = new HitBox(1300, 480, 80, 60);
    panLeft.addClickAction(this.clickPan);
    this.addChild(panLeft);

    const panRight = new HitBox(1400, 486, 80, 60);
    panRight.addClickAction(this.clickPan);
    this.addChild(panRight);

    const panCupboardText = () => this.addText(["A cupboard of old cooking pans"]);
    const panCupboard = new HitBox(1240, 600, 200, 70, 4);
    panCupboard.addClickAction(panCupboardText);
    this.addChild(panCupboard);

    const panCupboardBottom = new HitBox(1310, 668, 120, 100, 8);
    panCupboardBottom.addClickAction(panCupboardText);
    this.addChild(panCupboardBottom);

    const oven = new HitBox(1240, 540, 220, 60, 4);
    oven.addClickAction(() => this.addText(["An oven"]));
    this.addChild(oven);

    const lampText = () => this.addText(["A lamp"]);
    const frontLamp = new HitBox(726, 208, 102, 80);
    frontLamp.addClickAction(lampText);
    this.addChild(frontLamp);

    const lampStringFront = new HitBox(774, 0, 12, 220);
    lampStringFront.addClickAction(lampText);
    this.addChild(lampStringFront);

    const lampStringBack = new HitBox(926, 0, 12, 220);
    lampStringBack.addClickAction(lampText);
    this.addChild(lampStringBack);

    const backLamp = new HitBox(880, 208, 102, 80);
    backLamp.addClickAction(lampText);
    this.addChild(backLamp);

    const windowText = () => this.addText(["A window"]);
    const window = new HitBox(372, 100, 200, 240);
    window.addClickAction(windowText);
    this.addChild(window);

    const windowBottom = new HitBox(430, 330, 140, 110);
    window.addClickAction(windowText);
    this.addChild(windowBottom);

    const drawer = new HitBox(1420, 600, 250, 100, 4);
    drawer.addClickAction(() => this.addText(["It contains some kitchen utils"]));
    this.addChild(drawer);

    const cookingPans = new HitBox(1420, 660, 250, 250, 4);
    cookingPans.addClickAction(() => this.addText(["Some cooking pans"]));
    this.addChild(cookingPans);

    const oblongPainting = new HitBox(596, 204, 122, 84, 2);
    oblongPainting.addClickAction(() => this.addText(["A minimalistic painting"]));
    this.addChild(oblongPainting);

    const squarePainting = new HitBox(934, 284, 152, 128, -2);
    squarePainting.addClickAction(() => this.addText(["A minimalistic painting"]));
    this.addChild(squarePainting);

    const flowerText = () => this.addText(["A vase of fake flowers"]);
    const flowers = new HitBox(820, 470, 80);
    const flowerPot = new HitBox(786, 510, 70, 50);
    flowers.addClickAction(flowerText);
    flowerPot.addClickAction(flowerText);
    this.addChild(flowerPot);
    this.addChild(flowers);

    const rightFlowerVase = new HitBox(1542, 500, 54, 70);
    rightFlowerVase.addClickAction(flowerText);
    const rightFlowers = new HitBox(1570, 470, 72);
    rightFlowers.addClickAction(flowerText);
    this.addChild(rightFlowers);
    this.addChild(rightFlowerVase);
  }

  public loadNavigation() {
    this.addChild(new NavigationArrow(1750, 950, garden, Direction.Right));
    this.addChild(new NavigationArrow(50, 950, livingroom, Direction.Left));
  }

  private clickPan() {
    this.addText(["A pan"]);
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
