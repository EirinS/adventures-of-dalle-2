import { DisplayObject, Sprite } from "pixi.js";

export interface IScene extends DisplayObject {
  clearText(): void;
  addText(text: string[]): void;
  getBackground(): Sprite;
}
