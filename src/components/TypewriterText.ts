import { Text, TextStyle } from "pixi.js";
import { BaseScene } from "../scenes/BaseScene";
export class TypewriterText {
  private textObject: Text;
  private text: string;
  private interval: number;
  private currentIndex: number;
  private onComplete: (() => void) | undefined;

  constructor(parent: BaseScene, text: string, x: number, y: number, interval = 100, isTitle = false) {
    const style = new TextStyle({
      dropShadow: true,
      dropShadowAlpha: 0.2,
      dropShadowAngle: 0.7,
      dropShadowDistance: 4,
      fill: "#cd9b38",
      fontFamily: '"Courier New", Courier, monospace',
      fontWeight: "900",
      fontVariant: isTitle ? "small-caps" : "normal",
      fontSize: isTitle ? 64 : 48,
      letterSpacing: 5,
      lineHeight: 80,
    });
    this.textObject = new Text("", style);
    this.textObject.position.set(x, y);
    parent.addChild(this.textObject); // Add directly to the stage or a specific container

    this.text = text;
    this.interval = interval;
    this.currentIndex = 0;
  }

  public setOnComplete(onComplete: () => void) {
    this.onComplete = onComplete;
  }

  public start() {
    const length = this.text.length;
    const typingInterval = setInterval(() => {
      this.textObject.text += this.text.charAt(this.currentIndex);
      this.currentIndex++;

      if (this.currentIndex >= length) {
        clearInterval(typingInterval);
        if (this.onComplete) this.onComplete();
      }
    }, this.interval);
  }
}
