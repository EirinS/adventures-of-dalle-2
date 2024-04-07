import { Container, TextStyle, Text, Graphics, Rectangle } from "pixi.js";
import { Manager } from "../scenes/Manager";

/**
 * Text box that can contain up to two lines of text
 * The box is not interactive by default.
 * Interaction must be handled where it is used.
 */
export class TextBox extends Container {
  private text: Text;
  private textArray: string[];
  private showingTextIndex: number = 0;
  private background: Graphics;

  // Text position
  private border: number = 10;
  private margin: number = 30;
  private minBoxHeight: number = 150;
  private boxHeight: number = 150;
  private boxWidth: number = Manager.width;
  private callBack: (() => void) | undefined;

  private defaultStyle: TextStyle = new TextStyle({
    fontFamily: "Arial",
    fontSize: 44,
    fill: 0x000000,
    align: "left",
    lineHeight: 58,
    wordWrap: true,
  });

  constructor(text: string[]) {
    super();

    this.zIndex = 3;

    this.defaultStyle.wordWrapWidth = this.boxWidth - this.margin * 2;
    this.text = new Text(text[0], this.defaultStyle);
    this.boxHeight = Math.max(this.minBoxHeight, this.text.height * 2 + this.margin * 2);

    this.text.x = this.margin;
    this.text.y = Manager.height - this.boxHeight + this.margin;

    this.background = new Graphics();
    this.background.beginFill(0xfbe07f);
    this.background.lineStyle(this.border, 0xebc961, 1, 0);
    this.background.drawRoundedRect(0, Manager.height - this.boxHeight, this.boxWidth, this.boxHeight, 20);
    this.background.endFill();

    this.addChild(this.background);
    this.addChild(this.text);

    this.textArray = text;
    this.hitArea = new Rectangle(0, 0, Manager.width, Manager.height);
    this.on("pointertap", this.showNextText);

    this.visible = false;
    this.interactive = false;
  }

  public showNextText(): void {
    if (this.showingTextIndex + 1 >= this.textArray.length) {
      this.visible = false;
      if (this.callBack) this.callBack();
      return;
    }
    this.showingTextIndex += 1;
    this.text.text = this.textArray[this.showingTextIndex];
  }

  public setText(text: string[], callBack?: () => void) {
    this.text.text = text[0];
    this.textArray = text;
    this.showingTextIndex = 0;
    this.visible = true;
    this.interactive = true;
    this.callBack = callBack;
  }
}
