import { Container, Sprite, Point } from "pixi.js";
import { HitBox } from "../components/HitBox";
import { NavigationArrow } from "../components/NavigationArrow";
import { TextBox } from "../components/TextBox";
import { LivingroomScene } from "./LivingroomScene";
import { IScene, Manager } from "./Manager";

export class OfficeScene extends Container implements IScene {
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

    const firstCabinet = new HitBox(1660, 300, 130, 180);
    firstCabinet.on("pointertap", this.clickFirstCabinet);
    this.hitBoxes.push(firstCabinet);

    const secondCabinet = new HitBox(1640, 480, 150, 140);
    secondCabinet.on("pointertap", this.clickSecondCabinet);
    this.hitBoxes.push(secondCabinet);

    const thirdCabinet = new HitBox(1640, 620, 150, 140, 0);
    thirdCabinet.on("pointertap", this.clickThirdCabinet);
    this.hitBoxes.push(thirdCabinet);

    const fourthCabinet = new HitBox(1640, 760, 150, 140, 0);
    fourthCabinet.on("pointertap", this.clickFourthCabinet);
    this.hitBoxes.push(fourthCabinet);

    const noteBook = new HitBox(370, 600, 60, 100, 70);
    noteBook.on("pointertap", this.clickNotebook);
    this.hitBoxes.push(noteBook);

    const navigation = new NavigationArrow(1750, 950, new LivingroomScene());
    this.addChild(navigation);

    this.hitBoxes.forEach((hitBox) => {
      this.addChild(hitBox);
    });

    this.textBox = new TextBox("");
    this.textBox.interactive = true;
  }

  public addText = (text: string) => {
    this.textBox.setText(text);
    this.addChild(this.textBox);

    this.textBox.on("pointertap", () => {
      this.removeChild(this.textBox);
    });
  };

  public clickNotebook = () => {
    this.addText(
      "My notebook is my weapon in the fight against crime, like bamboo is a panda's weapon in the fight for survival!"
    );
  };

  public clickFirstCabinet = () => {
    this.addText(
      "That is the case files for the missing bamboo case. I was called in to investigate a local bamboo grove that was stripped bare overnight. Everyone thought it was the monkeys, but I knew something was not right."
    );
  };

  public clickSecondCabinet = () => {
    this.addText(
      "That is the case files for when Mr. Wu disappeared. He was a very wealthy businessman. When he disappeared, there was a trail of cryptic clues left behind and it became my job to uncover the truth."
    );
  };

  public clickThirdCabinet = () => {
    this.addText(
      "That is the case files for the art forger ring. A group of art forgers produced high-quality fake paintings and sold them for millions! I went undercover as a wealthy art collector to infiltrate the group and bring them to justice."
    );
  };

  public clickFourthCabinet = () => {
    this.addText(
      "That is the case files for the case of the great dumpling heist. A notorious gang of thieves were stealing dumplings from all the best restuarants in town, leaving the chefs in panic. I went undercover as a chef to catch the culprits."
    );
  };

  public clickComputer = () => {
    this.addText("That one is broken. Leave it alone.");
  };

  public showTime = () => {
    const date = new Date();
    this.addText(`The time is ${date.toTimeString().split(" ")[0].slice(0, -3)}`);
  };
}
