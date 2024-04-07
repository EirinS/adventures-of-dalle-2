import { Sprite } from "pixi.js";
import { BaseScene } from "./BaseScene";
import { HitBox } from "../components/HitBox";
import { TypewriterText } from "../components/TypewriterText";
import { TypewriterManager } from "../components/TypeWriterManager";

export class MemoryStickScene extends BaseScene {
  private shownCutout: number = 0;
  private memoryStickCutouts: Sprite[] = [Sprite.from("baby"), Sprite.from("kid"), Sprite.from("goodbye")];
  private intervalId: NodeJS.Timer | undefined;
  constructor() {
    super(Sprite.from("background"));
    const fileSprite = Sprite.from("file");
    this.addCutoutSprite(fileSprite, 567, 83);

    this.addText(
      [
        "You did it! After all that hard work, you've cracked the case wide open with the secret folder on the memory stick. This isn't just any folder; it's the proof that Delara's stories of royalty are (...)",
        "rooted in truth. Let us comb through the contents and send this straight to the government.",
      ],
      () => {
        setTimeout(() => {
          this.startImageLoop();
        }, 1000);
      }
    );

    const sendEvidence = new HitBox(1180, 85, 185, 35, 0, 1, true);
    this.loadEnding.bind(this);

    sendEvidence.addClickAction(() => {
      this.removeChild(sendEvidence);
      const closeButton = Sprite.from("close");
      this.addText([
        "This moment? It's the payoff for every puzzle solved, every clue hunted down. You've turned the whispers of legend into solid, irrefutable fact. Let close up and go home!",
      ]);
      this.addCutoutSprite(closeButton, 1190, 88, 1);
      const close = new HitBox(1200, 85, 165, 35, 0, 1, true);
      close.setHover();
      close.addClickAction(() => {
        this.stopImageLoop();
        this.removeChild(fileSprite);
        this.removeChild(closeButton);
        this.removeChild(close);
        this.loadEnding();
      });
      this.addChild(close);
    });
    sendEvidence.setHover();
    this.addChild(sendEvidence);
  }

  public loadNavigation() {}

  private loadEnding() {
    const textManager = new TypewriterManager();
    const congrats = new TypewriterText(this, "Congratulations!", 680, 40, undefined, true);
    const congratsText = new TypewriterText(this, "Dedication and", 240, 180);
    const congratsText1 = new TypewriterText(this, "skill have", 300, 280);
    const congratsText2 = new TypewriterText(this, "unveiled the", 190, 380);
    const congratsText3 = new TypewriterText(this, "truth.", 440, 480);
    const congratsText4 = new TypewriterText(this, "A true detective", 150, 580);
    const congratsText5 = new TypewriterText(this, " at heart!", 480, 680);
    textManager.addText(congrats);
    textManager.addText(congratsText);
    textManager.addText(congratsText1);
    textManager.addText(congratsText2);
    textManager.addText(congratsText3);
    textManager.addText(congratsText4);
    textManager.addText(congratsText5);

    const creators = new TypewriterText(this, "Creators:", 1260, 300, undefined, true);
    const eirin = new TypewriterText(this, "Eirin Sognnes", 1280, 400);
    const markus = new TypewriterText(this, "Markus Løland", 1250, 500);
    textManager.addText(creators);
    textManager.addText(eirin);
    textManager.addText(markus);

    textManager.start();
  }

  private rotateImage() {
    this.removeChild(this.memoryStickCutouts[this.shownCutout]);
    this.shownCutout = (this.shownCutout + 1) % this.memoryStickCutouts.length;
    this.addCutoutSprite(this.memoryStickCutouts[this.shownCutout], 567, 120);
  }

  private stopImageLoop() {
    clearInterval(this.intervalId);
    this.removeChild(this.memoryStickCutouts[this.shownCutout]);
  }

  private startImageLoop() {
    this.addCutoutSprite(this.memoryStickCutouts[this.shownCutout], 567, 120);
    this.intervalId = setInterval(() => this.rotateImage(), 3000);
  }
}
