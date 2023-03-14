import { Sprite } from "pixi.js";
import { HitBox } from "../components/HitBox";
import { Direction, NavigationArrow } from "../components/NavigationArrow";
import { bedroom, computer, garden } from "../state/rooms";
import { BaseScene } from "./BaseScene";
import { Manager } from "./Manager";

export class LibraryScene extends BaseScene {
  private plankHitBox: HitBox;
  private blueprintHitBox: HitBox;
  constructor() {
    super(Sprite.from("library"));

    const plank = new HitBox(962, 906, 110, 136);
    this.plankHitBox = plank;
    this.revealSecretRoom = this.revealSecretRoom.bind(this);
    plank.addClickAction(this.revealSecretRoom);
    this.addChild(plank);

    const blueprint = new HitBox(1022, 934, 50, 45, 45);
    this.blueprintHitBox = blueprint;
    blueprint.zIndex = 1;
    this.pickUpBlueprint = this.pickUpBlueprint.bind(this);
    blueprint.addClickAction(this.pickUpBlueprint);

    const computer = new HitBox(1325, 645, 75, 75, 10);
    this.viewComputer = this.viewComputer.bind(this);
    computer.addClickAction(this.viewComputer);
    this.addChild(computer);
  }

  private pickUpBlueprint() {
    this.addCutoutToEdge("removedBlueprint", false, false);
    this.removeChild(this.blueprintHitBox);
  }

  private revealSecretRoom() {
    this.addCutoutToEdge("openPlank", false, false);
    this.removeChild(this.plankHitBox);
    this.addChild(this.blueprintHitBox);
  }

  public loadNavigation() {
    this.addChild(new NavigationArrow(1750, 950, bedroom, Direction.Right));
    this.addChild(new NavigationArrow(50, 950, garden, Direction.Left));
  }

  private viewComputer() {
    Manager.changeScene(computer);
  }
}
