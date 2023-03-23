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
    key.addClickAction(
      this.takeKey,
      "",
      "You've picked up a key. There's no telling what this key unlocks, but it could be worth holding onto. (Key was added to inventory)"
    );
    this.keyHitbox = this.addChild(key);

    const crowbar = new HitBox(1430, 636, 40, 100, 0);
    this.takeCrowbar = this.takeCrowbar.bind(this);
    crowbar.addClickAction(
      this.takeCrowbar,
      "",
      "The creativity of this flamingo head design is impressive. It's not every day you see a garden decoration that can also be used as a crowbar. (Crowbar was added to inventory)"
    );
    this.crowbarHitbox = this.addChild(crowbar);

    const snakeStatue = new HitBox(1100, 440, 84, 160);
    snakeStatue.addClickText(
      "The fact that the statue is still intact and in relatively good condition after all these years speaks to its value and importance to the people who once possessed it."
    );
    this.addChild(snakeStatue);

    const flamingoBody = new HitBox(1310, 698, 118, 50);
    flamingoBody.addClickText(
      "The body of this flamingo statue is impeccably sculpted, but the head looks like it was an afterthought."
    ); // alternatively the more obvious "looks like it was taken from a completely different bird.";
    this.addChild(flamingoBody);

    const chair = new HitBox(1654, 860, 166, 120, 0, 0);
    chair.addClickText(
      "The garden chair looks inviting, but there is a case to solve. Perhaps it's better to keep moving."
    );
    this.addChild(chair);

    const blinds = new HitBox(248, 210, 142, 400, 0);
    blinds.addClickText(
      "Not saying these covers are clingy, but it's definitely stuck on the idea of staying open. Best leave it that way."
    );
    this.addChild(blinds);

    const largeWindow = new HitBox(0, 200, 260, 400, 2);
    largeWindow.addClickText(
      "Wonder how many literary masterpieces have been penned in the quiet solitude of the library behind the window."
    );
    this.addChild(largeWindow);

    const smallWindow = new HitBox(520, 284, 50, 190);
    smallWindow.addClickText("This window is pane-fully small.");
    this.addChild(smallWindow);

    const treeTop = new HitBox(1630, 450, 250, undefined);
    treeTop.addClickText(
      "Judging by the unique shape of its leaves, this tree is likely a rare and valuable species. Someone with a keen eye for botanical beauty clearly selected it for this garden."
    );
    this.addChild(treeTop);

    const spireText =
      "This is an interesting detail. It seems to have no practical purpose, perhaps just a decorative addition to the structure.";
    const spire = new HitBox(1144, 8, 10, 100);
    spire.addClickText(spireText);
    this.addChild(spire);

    const spireHorizontal = new HitBox(1134, 58, 32, 10);
    spireHorizontal.addClickText(spireText);
    this.addChild(spireHorizontal);

    const baobaoText =
      "Ah, the garden. This reminds me of the time we solved the case of the missing gnome hidden in the rose bushes.";
    const baobao = new HitBox(510, 662, 340, 220);
    const baobaoMiddle = new HitBox(550, 880, 320, 120);
    const baobaoLegs = new HitBox(570, 950, 214, 150);
    const baobaoHead = new HitBox(690, 610, 90);
    baobao.addClickText(baobaoText);
    baobaoMiddle.addClickText(baobaoText);
    baobaoLegs.addClickText(baobaoText);
    baobaoHead.addClickText(baobaoText);
    this.addChild(baobao);
    this.addChild(baobaoMiddle);
    this.addChild(baobaoLegs);
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
