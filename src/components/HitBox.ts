import { Graphics, Container, Circle, Rectangle, Point } from "pixi.js";

export class HitBox extends Container {
  private graphics: Graphics;

  constructor(x: number, y: number, width: number, height?: number, angle = 0, show: boolean = false) {
    super();
    this.graphics = new Graphics();
    this.graphics.interactive = true;
    this.graphics.angle = angle;
    this.graphics.position = new Point(x, y);
    this.graphics.beginFill(0xff000);

    // This is a circle
    if (!height) {
      this.graphics.hitArea = new Circle(0, 0, width);

      if (show) {
        this.graphics.drawCircle(0, 0, width);
      }
    } else {
      this.graphics.hitArea = new Rectangle(0, 0, width, height);

      if (show) {
        this.graphics.drawRect(0, 0, width, height);
      }
    }

    this.graphics.endFill();
    this.addChild(this.graphics);
  }
}
