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
    snakeStatue.addClickAction(() =>
      this.addText([
        "A carved snake statue. It is not particularly lifelike, but it stands out in the mids of the other decorations.",
      ])
    );
    this.addChild(snakeStatue);

    const flamingoBody = new HitBox(1310, 698, 118, 50);
    flamingoBody.addClickAction(() =>
      this.addText([
        "A statue resembling a flamingo. Its head appears peculiarly shaped. A closer examination may be warranted.",
      ])
    );
    this.addChild(flamingoBody);

    const chair = new HitBox(1654, 860, 166, 120, 0, 0);
    chair.addClickAction(() =>
      this.addText([
        "The garden chair looks inviting, but there is a case to solve. Perhaps it's better to keep moving.",
      ])
    );
    this.addChild(chair);

    const blinds = new HitBox(248, 210, 142, 400, 0);
    blinds.addClickAction(() =>
      this.addText(["These covers seem to be stuck in place. Perhaps they're meant to be left open for a reason."])
    );
    this.addChild(blinds);

    const largeWindow = new HitBox(0, 200, 260, 400, 2);
    largeWindow.addClickAction(() =>
      this.addText(["The window is massive. There is a room on the other side, most likely the library."])
    );
    this.addChild(largeWindow);

    const smallWindow = new HitBox(520, 284, 50, 190);
    smallWindow.addClickAction(() =>
      this.addText([
        "The small window offers a glimpse inside the building. It's hard to make out any details from this angle, but it's clear that the space beyond is well-lit.",
      ])
    );
    this.addChild(smallWindow);

    const treeTop = new HitBox(1630, 450, 250, undefined);
    treeTop.addClickAction(() =>
      this.addText([
        "This tree is very pretty with its white leaves and delicate branches. It's a charming addition to the garden.",
      ])
    );
    this.addChild(treeTop);

    const spireText = () =>
      this.addText([
        "This is an interesting detail. It seems to have no practical purpose, perhaps just a decorative addition to the structure.",
      ]);
    const spire = new HitBox(1144, 8, 10, 100);
    spire.addClickAction(spireText);
    this.addChild(spire);

    const spireHorizontal = new HitBox(1134, 58, 32, 10);
    spireHorizontal.addClickAction(spireText);
    this.addChild(spireHorizontal);

    const baobaoText = () =>
      this.addText([
        "Hmm, it seems like there's more to this garden than meets the eye. I need to keep my wits about me if I'm going to solve this case.",
      ]);

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
    this.addText([
      "You've picked up a key. There's no telling what this key unlocks, but it could be worth holding onto.",
    ]);
    this.addCutout("removeKey", 250, 857);
    itemHub.addItem("key");
  }

  private takeCrowbar() {
    this.addText([
      "Wow, who would have thought that the head of this flamingo could be hiding a crowbar? Brilliant! The crowbar is now in the inventory and ready to aid in uncovering the mansion's secrets.",
    ]);
    this.removeChild(this.crowbarHitbox);
    this.addCutoutToEdge("removeCrowbar", false, true);
    itemHub.addItem("crowbar");
  }
}
