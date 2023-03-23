import { Sprite } from "pixi.js";
import { GameState } from "../components/GameState";
import { HitBox } from "../components/HitBox";
import { Direction, NavigationArrow } from "../components/NavigationArrow";
import { itemHub, livingroom } from "../state/rooms";
import { BaseScene } from "./BaseScene";

export class CrystallballScene extends BaseScene {
  private hints: [string, () => boolean][] = [
    ["Eiffel", () => !GameState.safeFound],
    ["Flamingo", () => !itemHub.hasItem("crowbar")],
    ["Pumpkin", () => itemHub.hasItem("pumpkin juice") && !GameState.revealedPumkin],
    ["Book", () => itemHub.hasItem("UV flashlight") && !GameState.bookRevealed],
    ["Diamond", () => GameState.bookRevealed && !GameState.BFound],
  ];

  private hintText: string =
    "I gaze into the crystal ball and a vision emerges. It appears to be some sort of hint, though I can't quite make out what it means. I'll need to look around the mansion to understand what it means.";

  private hintIndex = this.hints.length - 1;

  constructor() {
    super(Sprite.from("crystalEmpty"));

    const ball = new HitBox(980, 400, 385);
    ball.zIndex = 1;
    ball.addClickText(this.hintText);
    this.addChild(ball);
  }

  public loadNewHint() {
    this.setBackground(Sprite.from("crystal" + this.getNextHint()));
  }

  public getNextHint() {
    let i = (this.hintIndex + 1) % this.hints.length;
    while (i != this.hintIndex) {
      if (this.hints[i][1]()) {
        this.hintText =
          "I gaze into the crystal ball and a vision emerges. It appears to be some sort of hint, though I can't quite make out what it means. I'll need to look around the mansion to understand what it means.";
        this.hintIndex = i;
        return this.hints[i][0];
      }
      i = (i + 1) % this.hints.length;
    }
    if (this.hints[i][1]()) {
      this.hintText =
        "I gaze into the crystal ball and a vision emerges. It appears to be some sort of hint, though I can't quite make out what it means. I'll need to look around the mansion to understand what it means.";
      this.hintIndex = i;
      return this.hints[i][0];
    }
    this.hintText = "There don't seem to be any more hints.";
    return "Empty";
  }

  public loadNavigation() {
    this.addChild(new NavigationArrow(925, 950, livingroom, Direction.Down));
  }
}
