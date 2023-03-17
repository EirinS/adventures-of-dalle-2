import { Sprite } from "pixi.js";
import { HitBox } from "../components/HitBox";
import { Direction, NavigationArrow } from "../components/NavigationArrow";
import { items } from "../state/items";
import { bedroom, itemHub, kitchen, safe } from "../state/rooms";
import { BaseScene } from "./BaseScene";
import { Manager } from "./Manager";

export class LivingroomScene extends BaseScene {
  private paintingHitbox: any;
  constructor() {
    super(Sprite.from("livingroom"));

    const baobaoText = () => this.addText(["The living room"]);
    const baobaoHead = new HitBox(1220, 330, 90);
    const baobaoHorizontal = new HitBox(1050, 470, 360, 260);
    const baobaoUpperBody = new HitBox(1090, 400, 280, 500);
    const baobaoLegs = new HitBox(1130, 900, 200, 130);
    baobaoHead.addClickAction(baobaoText);
    baobaoHorizontal.addClickAction(baobaoText);
    baobaoUpperBody.addClickAction(baobaoText);
    baobaoLegs.addClickAction(baobaoText);
    this.addChild(baobaoHead);
    this.addChild(baobaoUpperBody);
    this.addChild(baobaoLegs);
    this.addChild(baobaoHorizontal);

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
    this.burnItems.bind(this.burnItems);
    items.forEach((item) => {
      fireplace.addClickAction(
        () => this.burnItems(item),
        item,
        "Throwing things into the fire is like a primitive form of stress relief. It's like I'm letting go of all my troubles."
      );
    });

    this.addChild(fireplace);

    const lantern = new HitBox(722, 540, 88, 110);
    lantern.addClickAction(() =>
      this.addText(["This lantern lamp looks like it belongs in a museum, a testament to a bygone era of lighting."])
    );
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

    const chairText = () =>
      this.addText([
        "Well, that's a bit of a letdown. I was hoping for a clue hidden under the pillow, but it looks like this chair is just a place to rest your tush.",
      ]);
    const chair = new HitBox(1600, 670, 320, 230);
    const upperChair = new HitBox(1780, 556, 140, 140);
    chair.addClickAction(chairText);
    upperChair.addClickAction(chairText);
    this.addChild(upperChair);
    this.addChild(chair);

    this.clickChandelier = this.clickChandelier.bind(this);
    const chandelierTop = new HitBox(1060, 0, 120, 100);
    const chandelierMiddle = new HitBox(1000, 40, 238, 120);
    const chandelierBottom = new HitBox(1040, 140, 166, 60);
    chandelierTop.addClickAction(this.clickChandelier);
    chandelierMiddle.addClickAction(this.clickChandelier);
    chandelierBottom.addClickAction(this.clickChandelier);
    this.addChild(chandelierTop);
    this.addChild(chandelierMiddle);
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
    this.addText(["Wonder how many gems had to be mined and polished to make this chandelier shine so brightly."]);
  }

  private clickLamp() {
    this.addText([
      "I'm pretty sure this lamp could double as a genie's lamp - it's definitely got that kind of magic to it.",
    ]);
  }

  private burnItems(item: string) {
    this.addText([
      `You threw ${item} in the fire. Unless you are certain you don't need it, I suggest you restart the game.`,
    ]);
    itemHub.removeItem(item);
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
