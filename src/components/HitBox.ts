import { Graphics, Container, Circle, Rectangle } from "pixi.js";

export class HitBox extends Container {
  private graphics: Graphics;

  constructor(x: number, y: number, width: number, height?: number, show: boolean = false) {
    super();
    this.graphics = new Graphics();

    // This is a circle
    if (!height) {
      this.graphics.hitArea = new Circle(x, y, width);
      this.graphics.interactive = true;

      if (show) {
        this.graphics.beginFill(0xff000);
        this.graphics.drawCircle(x, y, width);
        this.graphics.endFill();
      }
    } else {
      this.graphics.hitArea = new Rectangle(x, y, width, height);
      this.graphics.interactive = true;

      if (show) {
        this.graphics.beginFill(0xff000);
        this.graphics.drawRect(x, y, width, height);
        this.graphics.endFill();
      }
    }
    this.addChild(this.graphics);
  }
}
