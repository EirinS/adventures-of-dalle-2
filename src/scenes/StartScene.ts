import { Graphics, Sprite, Text, TextStyle } from "pixi.js";
import { office } from "../state/rooms";
import { BaseScene } from "./BaseScene";
import { Manager } from "./Manager";

const titleStyle: TextStyle = new TextStyle({
  fontFamily: "Arial",
  fontSize: 100,
  fontWeight: "bold",
  fill: 0xffffff,
  stroke: 0x000000,
  strokeThickness: 15,
  align: "center",
  lineHeight: 100,
  letterSpacing: 5,
  wordWrap: true,
  wordWrapWidth: 1900,
});

const startStyle: TextStyle = new TextStyle({
  fontFamily: "Arial",
  fontSize: 50,
  fontWeight: "bold",
  fill: 0x000000,
  align: "center",
  lineHeight: 100,
});

export class StartScene extends BaseScene {
  constructor() {
    super(Sprite.from("startScreen"));

    const title = new Text("THE ADVENTURES OF DETECTIVE BAOBAO", titleStyle);
    title.position.x = (Manager.width - title.width) / 2;
    title.position.y = 24;

    const button = new Graphics();
    const startGame = new Text("START GAME", startStyle);

    button.x = Manager.width - startGame.width - 100;
    button.y = 400;
    button.beginFill(0xfbe07f);
    button.drawRoundedRect(-24, -6, startGame.width + 48, startGame.height + 12, 20);
    button.endFill();

    button.interactive = true;
    button.on("mouseover", () => {
      button.width = button.width + 24;
      button.height = button.height + 24;
      button.position.x = button.position.x - 12;
      button.position.y = button.position.y - 12;
    });

    button.on("mouseleave", () => {
      button.width = button.width - 24;
      button.height = button.height - 24;
      button.position.x = button.position.x + 12;
      button.position.y = button.position.y + 12;
    });

    button.on("pointertap", () => Manager.changeScene(office));

    this.addChild(button);
    button.addChild(startGame);
    this.addChild(title);
  }
}
