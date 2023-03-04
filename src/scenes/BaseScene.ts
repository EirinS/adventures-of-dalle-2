import { IScene, Manager } from "./Manager";
import { Container, Sprite, Point } from "pixi.js";
import { TextBox } from "../components/TextBox";

export class BaseScene extends Container implements IScene {
  protected background: Sprite;
  protected backgroundScale: number;
  private textBox: TextBox;

  constructor(background: Sprite) {
    super();
    // Set scene background
    this.background = background;
    this.backgroundScale = Math.min(Manager.width / this.background.texture.width, 1);
    this.background.scale.set(this.backgroundScale);
    this.background.anchor.set(0, 0);
    this.background.position = new Point(0, 0);
    this.addChild(this.background);

    // Set textBox
    this.textBox = new TextBox("");
    this.textBox.interactive = true;
  }

  protected addText = (text: string) => {
    this.textBox.setText(text);
    this.addChild(this.textBox);

    this.textBox.on("pointertap", () => {
      this.removeChild(this.textBox);
    });
  };

  protected addCutout(spriteName: string, top: boolean = true, left: boolean = true): void {
    const cutout = Sprite.from(spriteName);
    cutout.scale.set(this.backgroundScale);
    const x = left ? 0 : Manager.width - cutout.width;
    const y = top ? 0 : Manager.height - cutout.height;
    cutout.position = new Point(x, y);
    this.addChild(cutout);
  }
}
