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

    const ePainting = new HitBox(68, 0, 300, 320);
    ePainting.addClickAction(() => this.addText(["painting"]));
    this.addChild(ePainting);

    const noActionPainting = new HitBox(1286, 10, 196, 370);
    noActionPainting.addClickAction(() => this.addText(["painting"]));
    this.addChild(noActionPainting);

    const fireplace = new HitBox(0, 428, 430, 410);
    fireplace.addClickAction(() => this.addText(["fireplace"]));
    this.addChild(fireplace);

    const lantern = new HitBox(722, 540, 88, 110);
    lantern.addClickAction(() => this.addText(["A lantern of some sort"]));
    this.addChild(lantern);

    this.clickCrystalBall = this.clickCrystalBall.bind(this);
    const crystalBall = new HitBox(848, 774, 39);
    crystalBall.addClickAction(this.clickCrystalBall);
    this.addChild(crystalBall);

    const crystallBallBase = new HitBox(802, 812, 90, 45);
    crystallBallBase.addClickAction(this.clickCrystalBall);
    this.addChild(crystallBallBase);

    this.clickLamp = this.clickLamp.bind(this);
    const lampScreen = new HitBox(536, 318, 136, 110);
    lampScreen.addClickAction(this.clickLamp);
    this.addChild(lampScreen);

    const lamp = new HitBox(588, 428, 34, 220);
    lamp.addClickAction(this.clickLamp);
    this.addChild(lamp);

    this.clickChandelier = this.clickChandelier.bind(this);
    const chandelierTop = new HitBox(1060, 0, 120, 100);
    chandelierTop.addClickAction(this.clickChandelier);
    this.addChild(chandelierTop);

    const chandelierMiddle = new HitBox(1000, 40, 238, 120);
    chandelierMiddle.addClickAction(this.clickChandelier);
    this.addChild(chandelierMiddle);

    const chandelierBottom = new HitBox(1040, 140, 166, 60);
    chandelierBottom.addClickAction(this.clickChandelier);
    this.addChild(chandelierBottom);
  }

  public loadNavigation() {
    this.addChild(new NavigationArrow(1750, 950, kitchen, Direction.Right));
    this.addChild(new NavigationArrow(50, 950, bedroom, Direction.Left));
  }

  private clickCrystalBall() {
    // get hint
  }

  private clickChandelier() {
    this.addText(["A chandelier"]);
  }

  private clickLamp() {
    this.addText(["A lamp"]);
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
