import { Graphics } from "pixi.js";
import { dungeon } from "../state/rooms";

export class Hightlight extends Graphics {
  private cornerRadius: number;
  private drawWidth: number;
  private drawHeight: number;
  private alphavalue: number;
  private brickNumber: number;

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
      // To make this more generic, this function should be (optionally) passed to the highlight
      dungeon.checkDungeonPuzzle(idx);
    });
  }
}
