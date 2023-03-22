import { Container, Sprite, Text, TextStyle } from "pixi.js";
import { HitBox } from "../components/HitBox";
import { livingroom } from "../state/rooms";
import { BaseScene } from "./BaseScene";
import { Manager } from "./Manager";

export class OfficeScene extends BaseScene {
  private hitBoxes: Container[] = [];
  constructor() {
    super(Sprite.from("office"));

    this.addText([
      "As Detective Baobao was sitting in his office, staring out the window, he received a call from a wealthy collector. The collector had just purchased a mansion from a deceased well-known russian businessman, and he had heard rumors (...)",
      "that the mansion contained a valuable and unknown Fabergé egg. The collector wanted Baobao to investigate the mansion and find the egg. Baobao, being a skilled detective, was immediately intrigued by the opportunity to solve this mystery (...)",
      "and uncover the truth about the Fabergé egg. He accepted the case and set out to investigate the mansion.",
    ]);

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

    const baobaoText = () =>
      this.addText([
        "Time to roll up my sleeves and get down to business. The hunt for clues never stops!",
      ]);
    const baobaoHead = new HitBox(1030, 290, 130);
    const baobaoBody = new HitBox(800, 350, 380, 200, 0);
    const baobaoLowerBody = new HitBox(634, 470, 580, 180);
    baobaoHead.addClickAction(baobaoText);
    baobaoBody.addClickAction(baobaoText);
    baobaoLowerBody.addClickAction(baobaoText);
    this.addChild(baobaoHead);
    this.addChild(baobaoBody);
    this.addChild(baobaoLowerBody);

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

  private defaultStyle: TextStyle = new TextStyle({
    fontFamily: "Arial",
    fontSize: 40,
    fontWeight: "bolder",
    fill: 0xffffff,
    align: "center",
    lineHeight: 45,
    wordWrap: true,
  });

  public loadNavigation() {
    const navigation = new Text("START INVESTIGATING", this.defaultStyle);
    const container = new Container();
    container.on("pointertap", () => Manager.changeScene(livingroom));
    container.x = Manager.width - navigation.width - 24;
    container.y = Manager.height - navigation.height - 24;
    container.on("mouseover", () => {
      navigation.style.fontSize = 50;
      navigation.style.lineHeight = 55;
      container.x = Manager.width - navigation.width - 24;
      container.y = Manager.height - navigation.height - 24;
    });
    container.on("mouseleave", () => {
      navigation.style.fontSize = 40;
      navigation.style.lineHeight = 45;
      container.x = Manager.width - navigation.width - 20;
      container.y = Manager.height - navigation.height - 20;
    });
    container.interactive = true;
    this.addChild(container);
    container.addChild(navigation);
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
    this.addText([
      `The time is ${date.toTimeString().split(" ")[0].slice(0, -3)}`,
    ]);
  };
}
