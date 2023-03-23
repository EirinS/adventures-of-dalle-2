import { Container, DisplayObject, Sprite } from "pixi.js";

export interface IScene extends DisplayObject {
  clearText(): void;
  addText(text: string[]): void;
  getBackground(): Sprite;
  addChildContainer(item: Container): void;
}
