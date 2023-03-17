import { Sprite } from "pixi.js";
import { HitBox } from "../components/HitBox";
import { Direction, NavigationArrow } from "../components/NavigationArrow";
import { itemHub, kitchen, library } from "../state/rooms";
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

    const snakeStatue = new HitBox(1100, 440, 84, 160);
    snakeStatue.addClickAction(() => this.addText(["A snake statue"]));
    this.addChild(snakeStatue);

    const flamingoBody = new HitBox(1310, 698, 118, 50);
    flamingoBody.addClickAction(() => this.addText(["A decorative garden flamingo"]));
    this.addChild(flamingoBody);

    const chair = new HitBox(1654, 860, 166, 120, 0, 0);
    chair.addClickAction(() => this.addText(["No time to rest now..."]));
    this.addChild(chair);

    const blinds = new HitBox(248, 210, 142, 400, 0);
    blinds.addClickAction(() => this.addText(["I think we will leave that open"]));
    this.addChild(blinds);

    const largeWindow = new HitBox(0, 200, 260, 400, 2);
    largeWindow.addClickAction(() => this.addText(["The library is right behind that window"]));
    this.addChild(largeWindow);

    const smallWindow = new HitBox(520, 284, 50, 190);
    smallWindow.addClickAction(() => this.addText(["We can see inside from here"]));
    this.addChild(smallWindow);

    const treeTop = new HitBox(1630, 450, 250, undefined);
    treeTop.addClickAction(() => this.addText(["A pretty tree"]));
    this.addChild(treeTop);

    const spireText = () => this.addText(["Very decorative, but not related to our case"]);
    const spire = new HitBox(1144, 8, 10, 100);
    spire.addClickAction(spireText);
    this.addChild(spire);

    const spireHorizontal = new HitBox(1134, 58, 32, 10);
    spireHorizontal.addClickAction(spireText);
    this.addChild(spireHorizontal);

    const baobaoText = () => this.addText(["This is the garden"]);

    const baobao = new HitBox(510, 662, 340, 220);
    baobao.addClickAction(baobaoText);
    this.addChild(baobao);

    const baobaoMiddle = new HitBox(550, 880, 320, 120);
    baobaoMiddle.addClickAction(baobaoText);
    this.addChild(baobaoMiddle);

    const baobaoLegs = new HitBox(570, 950, 214, 150);
    baobaoLegs.addClickAction(baobaoText);
    this.addChild(baobaoLegs);

    const baobaoHead = new HitBox(690, 610, 90);
    baobaoHead.addClickAction(baobaoText);
    this.addChild(baobaoHead);
  }

  public loadNavigation() {
    this.addChild(new NavigationArrow(1750, 950, library, Direction.Right));
    this.addChild(new NavigationArrow(50, 950, kitchen, Direction.Left));
  }

  private takeKey() {
    this.removeChild(this.keyHitbox);
    this.addCutout("removeKey", 250, 857);
    itemHub.addItem("key");
  }

  private takeCrowbar() {
    this.removeChild(this.crowbarHitbox);
    this.addCutoutToEdge("removeCrowbar", false, true);
    itemHub.addItem("crowbar");
  }
}
