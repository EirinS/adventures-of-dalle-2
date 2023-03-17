import { Sprite } from "pixi.js";
import { HitBox } from "../components/HitBox";
import { Direction, NavigationArrow } from "../components/NavigationArrow";
import { bedroom, computer, garden, itemHub } from "../state/rooms";
import { BaseScene } from "./BaseScene";
import { Manager } from "./Manager";

export class LibraryScene extends BaseScene {
  private plankHitBox: HitBox;
  private floorplanHitBox: HitBox;
  constructor() {
    super(Sprite.from("library"));

    const plank = new HitBox(962, 906, 110, 136);
    this.revealSecretRoom = this.revealSecretRoom.bind(this);
    plank.addClickAction(
      this.revealSecretRoom,
      "crowbar",
      "This floorboard is like a stubborn jar, except instead of pickles, it's holding onto secrets."
    );
    this.plankHitBox = this.addChild(plank);

    const floorplan = new HitBox(1022, 934, 50, 45, 45);
    floorplan.zIndex = 1;
    this.pickUpFloorplan = this.pickUpFloorplan.bind(this);
    floorplan.addClickAction(this.pickUpFloorplan);
    this.floorplanHitBox = floorplan;

    const bookCaseText = () =>
      this.addText([
        "It's amazing to think that these books have survived all these years, carrying with them the history of the people who once walked these halls.",
      ]);
    const bookCase = new HitBox(1130, 320, 624, 370);
    const rightBookCase = new HitBox(1754, 320, 145, 218);
    this.addChild(bookCase);
    this.addChild(rightBookCase);
    bookCase.addClickAction(bookCaseText);
    rightBookCase.addClickAction(bookCaseText);

    const cabinetText = () =>
      this.addText([
        "I always thought 'bookworm' was just a figure of speech, but I think I see some real ones in there.",
      ]);
    const cabinet = new HitBox(1752, 538, 165, 184);
    const cabinetBottom = new HitBox(1752, 699, 34, 100);
    cabinetBottom.addClickAction(cabinetText);
    cabinet.addClickAction(cabinetText);
    this.addChild(cabinetBottom);
    this.addChild(cabinet);

    const bookstackText = () => this.addText(["These books are taking a break from the usual shelf life."]);
    const bookStack = new HitBox(0, 700, 76, 96);
    bookStack.addClickAction(bookstackText);
    this.addChild(bookStack);

    const tableBookText = () =>
      this.addText([
        "It's as if the owner of these books had a mental tornado, leaving a trail of scattered thoughts and ideas in its wake.",
      ]);
    const tableOfBooks = new HitBox(540, 656, 280, 70);
    tableOfBooks.addClickAction(tableBookText);
    this.addChild(tableOfBooks);

    const deskText = () =>
      this.addText(["Looks like someone decided to bench the chair and give the desk a new perspective."]);
    const desk = new HitBox(1780, 720, 200, 200, 0, 0);
    desk.addClickAction(deskText);
    this.addChild(desk);
    const deskChair = new HitBox(1760, 760, 220, 150, 23, 1);
    deskChair.addClickAction(deskText);
    this.addChild(deskChair);

    const computer = new HitBox(1325, 645, 75, 75, 10, 1);
    this.viewComputer = this.viewComputer.bind(this);
    computer.addClickAction(this.viewComputer);
    this.addChild(computer);
  }

  private pickUpFloorplan() {
    this.addCutoutToEdge("removedFloorplan", false, false);
    this.removeChild(this.floorplanHitBox);
    itemHub.addItem("paper");
  }

  private revealSecretRoom() {
    this.addCutoutToEdge("openPlank", false, false);
    this.removeChild(this.plankHitBox);
    this.addChild(this.floorplanHitBox);
  }

  public loadNavigation() {
    this.addChild(new NavigationArrow(1750, 950, bedroom, Direction.Right));
    this.addChild(new NavigationArrow(50, 950, garden, Direction.Left));
  }

  private viewComputer() {
    Manager.changeScene(computer);
  }
}
