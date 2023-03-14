import { Manager } from "./Manager";
import { Container, Sprite, Point } from "pixi.js";
import { TextBox } from "../components/TextBox";
import { IScene } from "./IScene";

export class BaseScene extends Container implements IScene {
  protected background: Sprite;
  protected backgroundScale: number;
  private textBox: TextBox;

  constructor(background: Sprite) {
    super();

    // Allow z-index
    this.sortableChildren = true;

    // Set scene background
    this.background = background;
    this.backgroundScale = Math.min(Manager.width / this.background.texture.width, 1);
    this.background.scale.set(this.backgroundScale);
    this.background.anchor.set(0, 0);
    this.background.position = new Point(0, 0);
    this.addChild(this.background);

    // Set textBox
    this.textBox = new TextBox([""]);
    this.addChild(this.textBox);
  }

  protected addText = (text: string[]) => {
    this.textBox.setText(text);
  };

  public clearText(): void {
    this.textBox.removeChild(this.textBox);
  }

  public getBackground(): Sprite {
    return Sprite.from(this.background.texture);
  }

  protected addCutout(spriteName: string, x: number, y: number): void {
    const cutout = Sprite.from(spriteName);
    cutout.scale.set(this.backgroundScale);
    cutout.position = new Point(x, y);
    this.addChild(cutout);
  }
}
