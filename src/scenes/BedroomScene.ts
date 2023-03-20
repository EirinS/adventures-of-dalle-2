import { Sprite } from "pixi.js";
import { GameState } from "../components/GameState";
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

    const pumpkinMug = new HitBox(94, 322, 130, 256);
    pumpkinMug.addClickAction(() =>
      this.addText(["This mug may be shaped like a pumpkin, but I'm not going to let it squash my detective skills."])
    );
    this.addChild(pumpkinMug);

    const pumpkin = new HitBox(65, 485, 150, 170, 0);
    this.openPumpkin = this.openPumpkin.bind(this);
    pumpkin.addClickAction(this.openPumpkin);
    this.unOpenedPumpkinHitbox = this.addChild(pumpkin);

    const drawer = new HitBox(-30, 845, 410, 90, -25);
    this.openDrawer = this.openDrawer.bind(this);
    drawer.addClickAction(
      this.openDrawer,
      "key",
      "A locked drawer always makes me curious. What could be so important that it needs to be locked away?"
    );
    this.lockedDrawerHitbox = this.addChild(drawer);

    const baobaoText = () =>
      this.addText([
        "The way a person chooses to decorate their bedroom can be a window into their personality. It's always interesting to see how people express themselves through their living spaces.",
      ]);
    const baobao = new HitBox(1600, 340, 286, 620);
    const baobaoHead = new HitBox(1750, 250, 110);
    baobao.addClickAction(baobaoText);
    baobaoHead.addClickAction(baobaoText);
    this.addChild(baobaoHead);
    this.addChild(baobao);

    const painting = new HitBox(460, 118, 310, 230);
    painting.addClickAction(() =>
      this.addText([
        "These mountain paintings are so impressive, I almost feel bad for the real mountains that have to live up to their beauty.",
      ])
    );
    this.addChild(painting);

    const pillows = new HitBox(854, 400, 340, 150);
    pillows.addClickAction(() => this.addText(["If pillows had personalities, these ones would be very supportive."]));
    this.addChild(pillows);

    const leftCupboard = new HitBox(410, 446, 370, 300);
    leftCupboard.addClickAction(() =>
      this.addText([
        "I can't help but wonder why this dresser is tucked away in this dark corner. Is it because it's hiding something, or because it's just out of fashion?",
      ])
    );
    this.addChild(leftCupboard);

    const rightCupboard = new HitBox(1340, 540, 226, 346, 0, 0);
    rightCupboard.addClickAction(() =>
      this.addText([
        "This nightstand might not look like much, but it's probably seen more action than most people in this mansion.",
      ])
    );
    this.addChild(rightCupboard);

    const bedText = () =>
      this.addText([
        "They say the best things in life are free, but I'd argue that a good night's sleep on a comfy bed is worth its weight in gold.",
      ]);
    const bedLeft = new HitBox(830, 500, 150, 260, 35);
    const bedMiddle = new HitBox(830, 500, 360, 260);
    const bedRight = new HitBox(1100, 500, 100, 270, -15);
    this.addChild(bedLeft);
    this.addChild(bedMiddle);
    this.addChild(bedRight);
    bedLeft.addClickAction(bedText);
    bedMiddle.addClickAction(bedText);
    bedRight.addClickAction(bedText);

    const lamp = new HitBox(1236, 330, 100, 190);
    lamp.addClickAction(() => this.addText(["What a bright idea to have a lamp like this by your bed."]));
    this.addChild(lamp);

    const mountainPainting = new HitBox(1338, 134, 200, 204);
    mountainPainting.addClickAction(() =>
      this.addText([
        "These paintings are the peak of perfection, capturing the majesty of the mountains with every brush stroke.",
      ])
    );
    this.addChild(mountainPainting);

    const book = new HitBox(1368, 385, 80, 125, 0);
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
    this.addText(["I wasn't expecting that to open. It's like a pumpkin but with secret compartments!"]);
    this.removeChild(this.unOpenedPumpkinHitbox);
    const pumpkin = new HitBox(65, 550, 150, 120, 0);
    this.lookIntoPumpkin = this.lookIntoPumpkin.bind(this);
    pumpkin.addClickAction(this.lookIntoPumpkin);
    this.addChild(pumpkin);
  }

  private lookIntoPumpkin() {
    Manager.changeScene(pumpkin);
    if (!GameState.revealedPumkin) {
      pumpkin.addText(["I feel like I'm looking into the soul of a pumpkin, but it's just an empty bowl."]);
    } else {
      pumpkin.addText([
        "Who knew that pouring pumpkin juice into a pumpkin-shaped container could produce such a beautiful and mesmerizing display of colors? This pumpkin prism reaction is truly a sight to behold.",
      ]);
    }
  }

  private openDrawer() {
    this.removeChild(this.lockedDrawerHitbox);
    this.addText([
      "I feel like a detective uncovering a clue! These colors only appear when the drawer is opened, but what do they mean? I'm on the case!",
    ]);
    this.addCutout("openDrawer", 0, 640);
  }

  private openBook() {
    Manager.changeScene(book);
  }
}
