import { Sprite } from "pixi.js";
import { BaseScene } from "./BaseScene";

export class LivingroomScene extends BaseScene {
  constructor() {
    super(Sprite.from("livingroom"));
  }
}
