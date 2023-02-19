import { Container, Sprite, Point } from "pixi.js";
import { IScene, Manager } from "./Manager";

export class LivingroomScene extends Container implements IScene {
  private livingroom: Sprite;
  constructor() {
    super();

    this.livingroom = Sprite.from("livingroom");
    this.livingroom.scale.set(Math.min(Manager.width / this.livingroom.texture.width, 1));
    this.livingroom.anchor.set(0, 0);
    this.livingroom.position = new Point(0, 0);
    this.addChild(this.livingroom);

  }
}
