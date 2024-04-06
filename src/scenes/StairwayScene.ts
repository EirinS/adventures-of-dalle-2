import { Sprite } from "pixi.js";
import { Direction, NavigationArrow, Position } from "../components/NavigationArrow";
import { dungeon, library } from "../state/rooms";
import { BaseScene } from "./BaseScene";
import { GameState } from "../state/GameState";

export class StairwayScene extends BaseScene {
  constructor() {
    super(Sprite.from("stairway"));
  }

  public loadNavigation() {
    this.addChild(new NavigationArrow(library, Direction.Up, Position.TopMiddle));
    this.addChild(
      new NavigationArrow(dungeon, Direction.Down, Position.BottomMiddle, () => {
        if (!GameState.visitedDungeon) {
          GameState.visitedDungeon = true;
        }
      })
    );
  }
}
