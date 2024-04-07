import { Sprite } from "pixi.js";
import { Direction, NavigationArrow, Position } from "../components/NavigationArrow";
import { dungeon, library } from "../state/rooms";
import { BaseScene } from "./BaseScene";
import { GameState } from "../state/GameState";
import { HitBox } from "../components/HitBox";
import { Manager } from "./Manager";

export class StairwayScene extends BaseScene {
  constructor() {
    super(Sprite.from("stairway"));
    this.addText([
      "Looks like there is nothing here, just shadows and silence. Let's keep moving. We need to find out what's down here.",
    ]);

    const doorOpening = new HitBox(1080, 500, 150, 300);
    doorOpening.addClickAction(() => {
      GameState.visitedDungeon = true;
      Manager.changeScene(dungeon);
    });
    this.addChild(doorOpening);
  }

  public loadNavigation() {
    this.addChild(new NavigationArrow(library, Direction.Up, Position.TopMiddle));
    this.addChild(
      new NavigationArrow(dungeon, Direction.Down, Position.BottomMiddle, () => {
        GameState.visitedDungeon = true;
      })
    );
  }
}
