import { Container, Sprite } from "pixi.js";
import { HitBox } from "../components/HitBox";
import { Direction, NavigationArrow } from "../components/NavigationArrow";
import { livingroom } from "../state/rooms";
import { BaseScene } from "./BaseScene";

export class OfficeScene extends BaseScene {
  private hitBoxes: Container[] = [];
  constructor() {
    super(Sprite.from("office"));

    const clock = new HitBox(1614, 85, 55);
    clock.addClickAction(this.showTime);
    this.hitBoxes.push(clock);

    const diploma = new HitBox(1275, 35, 200, 240);
    diploma.addClickAction(this.clickDiploma);
    this.hitBoxes.push(diploma);

    const firstCabinet = new HitBox(1675, 380, 120, 110, 1);
    firstCabinet.addClickAction(this.clickFirstCabinet);
    this.hitBoxes.push(firstCabinet);

    const secondCabinet = new HitBox(1675, 520, 120, 115, 1);
    secondCabinet.addClickAction(this.clickSecondCabinet);
    this.hitBoxes.push(secondCabinet);

    const thirdCabinet = new HitBox(1675, 650, 120, 115, 1);
    thirdCabinet.addClickAction(this.clickThirdCabinet);
    this.hitBoxes.push(thirdCabinet);

    const fourthCabinet = new HitBox(1675, 800, 120, 130, 2);
    fourthCabinet.addClickAction(this.clickFourthCabinet);
    this.hitBoxes.push(fourthCabinet);

    // Add notebook in sections because of perspective
    const noteBook = new HitBox(780, 625, 40, 200, 70);
    const noteBook1 = new HitBox(840, 635, 40, 200, 70);
    const noteBook2 = new HitBox(900, 640, 40, 200, 70);
    noteBook.addClickAction(this.clickNotebook);
    noteBook1.addClickAction(this.clickNotebook);
    noteBook2.addClickAction(this.clickNotebook);
    this.hitBoxes.push(noteBook);
    this.hitBoxes.push(noteBook1);
    this.hitBoxes.push(noteBook2);

    const iPad = new HitBox(470, 710, 260, 70, 0);
    iPad.addClickAction(this.clickIPad);
    this.hitBoxes.push(iPad);

    this.hitBoxes.forEach((hitBox) => {
      this.addChild(hitBox);
    });
  }

  public loadNavigation() {
    const navigation = new NavigationArrow(1750, 950, livingroom, Direction.Right);
    this.addChild(navigation);
  }

  private clickNotebook = () => {
    this.addText([
      "My notebook is my weapon in the fight against crime, like bamboo is a panda's weapon in the fight for survival!",
    ]);
  };

  private clickFirstCabinet = () => {
    this.addText([
      "That is the case files for the missing bamboo case. I was called in to investigate a local bamboo grove that was stripped bare overnight. Everyone thought it was the monkeys, but I knew something was not right.",
    ]);
  };

  private clickSecondCabinet = () => {
    this.addText([
      "That is the case files for when Mr. Wu disappeared. He was a very wealthy businessman. When he disappeared, there was a trail of cryptic clues left behind and it became my job to uncover the truth.",
    ]);
  };

  private clickThirdCabinet = () => {
    this.addText([
      "That is the case files for the art forger ring. A group of art forgers produced high-quality fake paintings and sold them for millions! I went undercover as a wealthy art collector to infiltrate the group and bring them to justice.",
    ]);
  };

  private clickFourthCabinet = () => {
    this.addText([
      "That is the case files for the case of the great dumpling heist. A notorious gang of thieves were stealing dumplings from all the best restuarants in town, leaving the chefs in panic. I went undercover as a chef to catch the culprits.",
    ]);
  };

  private clickDiploma = () => {
    this.addText(["Diploma of Private Investigation"]);
  };

  private clickIPad = () => {
    this.addText(["That one is broken. Leave it alone."]);
  };

  private showTime = () => {
    const date = new Date();
    this.addText([`The time is ${date.toTimeString().split(" ")[0].slice(0, -3)}`]);
  };
}
