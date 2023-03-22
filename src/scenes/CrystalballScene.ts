import { Sprite } from "pixi.js";
import { GameState } from "../components/GameState";
import { Direction, NavigationArrow } from "../components/NavigationArrow";
import { itemHub, livingroom } from "../state/rooms";
import { BaseScene } from "./BaseScene";

export class CrystallballScene extends BaseScene {
  private hints: [string, () => boolean][] = [
    ["Eiffel", () => !GameState.safeFound],
    ["Flamingo", () => !itemHub.hasItem("crowbar")],
    [
      "Pumpkin",
      () => itemHub.hasItem("pumpkin juice") && !GameState.revealedPumkin,
    ],
    ["Book", () => itemHub.hasItem("flashlight") && !GameState.bookRevealed],
  ];

  private hintIndex = this.hints.length - 1;

  constructor() {
    super(Sprite.from("crystalEmpty"));
  }

  public loadNewHint() {
    this.setBackground(Sprite.from("crystal" + this.getNextHint()));
  }

  public getNextHint() {
    let i = (this.hintIndex + 1) % this.hints.length;
    while (i != this.hintIndex) {
      if (this.hints[i][1]()) {
        this.hintIndex = i;
        return this.hints[i][0];
      }
      i = (i + 1) % this.hints.length;
    }
    if (this.hints[i][1]()) {
      this.hintIndex = i;
      return this.hints[i][0];
    }
    return "Empty";
  }

  public loadNavigation() {
    this.addChild(new NavigationArrow(925, 950, livingroom, Direction.Down));
  }
}
