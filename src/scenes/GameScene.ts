import { Container, Sprite, Point } from "pixi.js";
import { HitBox } from "../components/HitBox";
import { TextBox } from "../components/TextBox";
import { IScene, Manager } from "./Manager";

export class GameScene extends Container implements IScene {
  private office: Sprite;
  private hitBoxes: Container[] = [];
  private textBox: TextBox;
  constructor() {
    super();

    this.office = Sprite.from("panda-office");
    this.office.scale.set(Math.min(Manager.width / this.office.texture.width, 1));
    this.office.anchor.set(0, 0);
    this.office.position = new Point(0, 0);
    this.addChild(this.office);

    const clock = new HitBox(1612, 102, 50, undefined);
    clock.on("pointertap", this.showTime);
    this.hitBoxes.push(clock);

    const computer = new HitBox(680, 300, 190, 160);
    computer.on("pointertap", this.clickComputer);
    this.hitBoxes.push(computer);

    this.hitBoxes.forEach((hitBox) => {
      this.addChild(hitBox);
    });

    this.textBox = new TextBox("");
    this.textBox.interactive = true;
  }

  public clickComputer = () => {
    const text = "That one is broken. Leave it alone.";
    this.textBox.setText(text);
    this.addChild(this.textBox);

    this.textBox.on("pointertap", () => {
      this.removeChild(this.textBox);
    });
  };

  public showTime = () => {
    const date = new Date();
    const text = `The time is ${date.toTimeString().split(" ")[0].slice(0, -3)}`;
    this.textBox.setText(text);
    this.addChild(this.textBox);

    this.textBox.on("pointertap", () => {
      this.removeChild(this.textBox);
    });
  };
}
