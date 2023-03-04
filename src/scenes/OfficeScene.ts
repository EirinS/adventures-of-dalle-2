import { Container, Sprite } from "pixi.js";
import { HitBox } from "../components/HitBox";
import { NavigationArrow } from "../components/NavigationArrow";
import { BaseScene } from "./BaseScene";
import { KitchenScene } from "./KitchenScene";

export class OfficeScene extends BaseScene {
  private hitBoxes: Container[] = [];
  constructor() {
    super(Sprite.from("office"));

    const clock = new HitBox(1612, 102, 50);
    clock.on("pointertap", this.showTime);
    this.hitBoxes.push(clock);

    const diploma = new HitBox(1280, 50, 190, 240);
    diploma.on("pointertap", this.clickDiploma);
    this.hitBoxes.push(diploma);

    const firstCabinet = new HitBox(1665, 400, 120, 110, 1);
    firstCabinet.on("pointertap", this.clickFirstCabinet);
    this.hitBoxes.push(firstCabinet);

    const secondCabinet = new HitBox(1665, 540, 120, 115, 1);
    secondCabinet.on("pointertap", this.clickSecondCabinet);
    this.hitBoxes.push(secondCabinet);

    const thirdCabinet = new HitBox(1665, 670, 120, 115, 1);
    thirdCabinet.on("pointertap", this.clickThirdCabinet);
    this.hitBoxes.push(thirdCabinet);

    const fourthCabinet = new HitBox(1665, 820, 120, 125, 2);
    fourthCabinet.on("pointertap", this.clickFourthCabinet);
    this.hitBoxes.push(fourthCabinet);

    // Add notebook in sections because of perspective
    const noteBook = new HitBox(780, 640, 40, 180, 70);
    const noteBook1 = new HitBox(860, 650, 40, 180, 70);
    const noteBook2 = new HitBox(920, 660, 40, 180, 70);
    noteBook.on("pointertap", this.clickNotebook);
    noteBook1.on("pointertap", this.clickNotebook);
    this.hitBoxes.push(noteBook);
    this.hitBoxes.push(noteBook1);
    this.hitBoxes.push(noteBook2);

    const iPad = new HitBox(480, 720, 250, 70, 0);
    iPad.on("pointertap", this.clickIPad);
    this.hitBoxes.push(iPad);

    const navigation = new NavigationArrow(1750, 950, new KitchenScene());
    this.addChild(navigation);

    this.hitBoxes.forEach((hitBox) => {
      this.addChild(hitBox);
    });
  }

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

  public clickDiploma = () => {
    this.addText("Diploma of Private Investigation");
  };

  public clickIPad = () => {
    this.addText("That one is broken. Leave it alone.");
  };

  public showTime = () => {
    const date = new Date();
    this.addText(`The time is ${date.toTimeString().split(" ")[0].slice(0, -3)}`);
  };
}
