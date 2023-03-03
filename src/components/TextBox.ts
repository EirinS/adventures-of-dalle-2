import { Container, TextStyle, Text, Graphics } from "pixi.js";
import { Manager } from "../scenes/Manager";

/**
 * Text box that can contain up to two lines of text
 * The box is not interactive by default.
 * Interaction must be handled where it is used.
 */
export class TextBox extends Container {
  private text: Text;
  private background: Graphics;
  private border: number = 10;
  // Margin to text
  private margin: number = 26;
  private boxHeight: number = 150;
  private boxWidth: number = Manager.width;

  private defaultStyle: TextStyle = new TextStyle({
    fontFamily: "Arial",
    fontSize: 34,
    fill: 0x000000,
    align: "left",
    lineHeight: 50,
    wordWrap: true,
  });

  constructor(text: string) {
    super();

    this.background = new Graphics();
    this.background.beginFill(0xfbe07f);
    this.background.lineStyle(this.border, 0xebc961, 1, 0);
    this.background.drawRoundedRect(0, Manager.height - this.boxHeight, this.boxWidth, this.boxHeight, 20);
    this.background.endFill();
    this.addChild(this.background);

    this.defaultStyle.wordWrapWidth = this.boxWidth - this.margin * 2;
    this.text = new Text(text, this.defaultStyle);
    this.text.x = this.margin;
    this.text.y = Manager.height - this.boxHeight + this.margin;
    this.addChild(this.text);
  }

  public setText(text: string) {
    this.text.text = text;
  }
}