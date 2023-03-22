import { Graphics, Point, Sprite, Texture } from "pixi.js";
import { HitBox } from "../components/HitBox";
import { Direction, NavigationArrow } from "../components/NavigationArrow";
import { library } from "../state/rooms";
import { BaseScene } from "./BaseScene";

export class ComputerScene extends BaseScene {
  private red: Sprite;
  private yellow: Sprite;
  private blue: Sprite;
  private green: Sprite;
  private orange: Sprite;
  private purple: Sprite;
  private lines: Graphics[] = [];

  constructor() {
    super(Sprite.from("computer"));
    this.red = Sprite.from("red");
    this.red.name = "red";
    this.red.scale.set(this.backgroundScale);
    this.red.interactive = true;
    this.red.position = new Point(698, 211);
    this.red.zIndex = 1;
    this.addChild(this.red);
    this.red.on("pointertap", () => this.pressButton(this.red));

    this.yellow = Sprite.from("yellow");
    this.yellow.name = "yellow";
    this.yellow.scale.set(this.backgroundScale);
    this.yellow.interactive = true;
    this.yellow.position = new Point(1122, 197);
    this.yellow.zIndex = 1;
    this.addChild(this.yellow);
    this.yellow.on("pointertap", () => this.pressButton(this.yellow));

    this.blue = Sprite.from("blue");
    this.blue.name = "blue";
    this.blue.scale.set(this.backgroundScale);
    this.blue.interactive = true;
    this.blue.position = new Point(703, 460);
    this.blue.zIndex = 1;
    this.addChild(this.blue);
    this.blue.on("pointertap", () => this.pressButton(this.blue));

    this.green = Sprite.from("green");
    this.green.name = "green";
    this.green.scale.set(this.backgroundScale);
    this.green.interactive = true;
    this.green.position = new Point(1129, 446);
    this.green.zIndex = 1;
    this.addChild(this.green);
    this.green.on("pointertap", () => this.pressButton(this.green));

    this.orange = Sprite.from("orange");
    this.orange.name = "orange";
    this.orange.scale.set(this.backgroundScale);
    this.orange.interactive = true;
    this.orange.position = new Point(704, 738);
    this.orange.zIndex = 1;
    this.addChild(this.orange);
    this.orange.on("pointertap", () => this.pressButton(this.orange));

    this.purple = Sprite.from("purple");
    this.purple.name = "purple";
    this.purple.scale.set(this.backgroundScale);
    this.purple.interactive = true;
    this.purple.position = new Point(1136, 720);
    this.purple.zIndex = 1;
    this.addChild(this.purple);
    this.purple.on("pointertap", () => this.pressButton(this.purple));

    const clear = new HitBox(325, 475, 98);
    this.clearPuzzle = this.clearPuzzle.bind(this);
    clear.addClickAction(this.clearPuzzle);
    this.addChild(clear);
  }

  public loadNavigation() {
    this.addChild(new NavigationArrow(925, 950, library, Direction.Down));
  }

  private pressButton(sprite: Sprite) {
    sprite.texture = Texture.from(sprite.name + "Pressed");
    sprite.interactive = false;
    if (this.lines && this.lines.length === 0) {
      //first line is just a start point and isn't rendered
      const line = new Graphics();
      line.position.set(sprite.x + 50, sprite.y + 50);
      this.lines.push(line);
    } else if (this.lines) {
      const line = new Graphics();
      line.position.set(sprite.x + 50, sprite.y + 50);
      line
        .lineStyle(20, 0xd4d4d4)
        .lineTo(
          this.lines[this.lines.length - 1].x - line.x,
          this.lines[this.lines.length - 1].y - line.y
        );
      this.lines.push(line);
      this.addChild(line);
    }
  }

  private clearPuzzle() {
    this.red.texture = Texture.from("red");
    this.red.interactive = true;
    this.yellow.texture = Texture.from("yellow");
    this.yellow.interactive = true;
    this.blue.texture = Texture.from("blue");
    this.blue.interactive = true;
    this.green.texture = Texture.from("green");
    this.green.interactive = true;
    this.orange.texture = Texture.from("orange");
    this.orange.interactive = true;
    this.purple.texture = Texture.from("purple");
    this.purple.interactive = true;
    this.lines.forEach((x) => this.removeChild(x));
    this.lines = [];
  }
}
