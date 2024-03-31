import { Graphics } from "pixi.js";
import { GameState } from "../state/GameState";
import { dungeon } from "../state/rooms";

export class Hightlight extends Graphics {
  private cornerRadius: number;
  private drawWidth: number;
  private drawHeight: number;
  private alphavalue: number;
  private brickNumber: number;

  private brickSolution = [3, 5, 20, 37, 43, 51];
  private puzzleSolution = Array.from({ length: 66 }, (_, i) => this.brickSolution.includes(i));
  constructor(brickNumber: number, x = 100, y = 100, width = 200, height = 100, cornerRadius = 5, alphavalue = 0.3) {
    super();
    this.x = x;
    this.y = y;
    this.drawWidth = width;
    this.drawHeight = height;
    this.cornerRadius = cornerRadius;
    this.interactive = true;
    this.alphavalue = alphavalue;
    this.brickNumber = brickNumber;
    this.alpha = 0;

    this.drawOverlay();
    this.setupClickEvent();
  }

  drawOverlay() {
    //0x331f09
    this.beginFill(0xfffffff);
    this.drawRoundedRect(this.x, this.y, this.drawWidth, this.drawHeight, this.cornerRadius);
    this.endFill();
  }

  toggleVisibility() {
    this.alpha = this.alpha === 0 ? this.alphavalue : 0;
  }

  setupClickEvent() {
    this.on("pointertap", () => {
      this.toggleVisibility();
      const idx = this.brickNumber - 1;
      GameState.brickState[idx] = !GameState.brickState[idx];
      var isSolved = GameState.brickState.every((value, index) => value === this.puzzleSolution[index]);
      if (isSolved && !GameState.solvedDungeon) {
        GameState.solvedDungeon = true;
        dungeon.addCutout("pidestal", 1093, 643);
        setTimeout(() => {
          dungeon.addText(["Congrats, you solved it!"]);
        }, 1000);
      }
    });
  }
}
