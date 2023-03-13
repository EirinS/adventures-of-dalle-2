import { DisplayObject, Sprite } from "pixi.js";

export interface IScene extends DisplayObject {
  clearText(): void;
  getBackground(): Sprite;
}
