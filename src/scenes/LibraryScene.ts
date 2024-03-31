import { Sprite } from "pixi.js";
import { GameState } from "../state/GameState";
import { HitBox } from "../components/HitBox";
import { Direction, NavigationArrow } from "../components/NavigationArrow";
import { bedroom, computer, dungeon, floorplan, garden, itemHub } from "../state/rooms";
import { BaseScene } from "./BaseScene";
import { Manager } from "./Manager";

export class LibraryScene extends BaseScene {
  private plankHitBox: HitBox;
  private floorplanHitBox: HitBox;
  constructor() {
    super(Sprite.from("library"));

    const plank = new HitBox(962, 906, 110, 136);
    this.revealSecretRoom = this.revealSecretRoom.bind(this);
    plank.addClickAction(this.revealSecretRoom, "crowbar", "We really nailed it by finding this secret room.");
    plank.addClickText("This floorboard is like a stubborn jar, except instead of pickles, it's holding onto secrets.");
    this.plankHitBox = this.addChild(plank);

    const floorplan = new HitBox(1022, 934, 50, 45, 45);
    floorplan.zIndex = 1;
    this.pickUpFloorplan = this.pickUpFloorplan.bind(this);
    floorplan.addClickAction(this.pickUpFloorplan);
    this.floorplanHitBox = floorplan;

    const bookCaseText =
      "It's amazing to think that these books have survived all these years, carrying with them the history of the people who once walked these halls.";
    const bookCase = new HitBox(1370, 320, 624, 370);
    const leftBookCase = new HitBox(1130, 320, 240, 370);
    const rightBookCase = new HitBox(1754, 320, 145, 218);
    this.addChild(bookCase);
    this.addChild(rightBookCase);
    this.addChild(leftBookCase);
    bookCase.addClickText(bookCaseText);
    rightBookCase.addClickText(bookCaseText);
    leftBookCase.addClickText([
      "There is a rainbow-colored book here. Let's see what is inside. (...)",
      "The Science Behind the Pumpkin Prism Effect (...)",
      "Have you ever heard about 'Spectralux'? When you combine the invisible chemical compound Spectralux with pumpkin juice, a stunning chemical reaction occurs. It causes the (...)",
      "Spectralux to release various colored particles that mix with the pumpkin juice. This results in the pumpkin juice taking on a rainbow color as the colored particles refract the light and (...)",
      "scatters it in various directions, much like a prism. This phenomenon is known as the Pumpkin Prism effect. As the rainbow-colored juice settles, the different colors refract and bend at (...)",
      "slightly different angles, causing them to separate and form distinct shapes within the liquid. By adding certain compounds to the Spectralux mixture, it's possible to manipulate the way the (...)",
      "light is refracted and create specific shapes.",
    ]);

    const cabinetText =
      "I always thought 'bookworm' was just a figure of speech, but I think I see some real ones in there.";
    const cabinet = new HitBox(1752, 538, 165, 184);
    const cabinetBottom = new HitBox(1752, 699, 34, 100);
    cabinetBottom.addClickText(cabinetText);
    cabinet.addClickText(cabinetText);
    this.addChild(cabinetBottom);
    this.addChild(cabinet);

    const bookstackText = "These books are taking a break from the usual shelf life.";
    const bookStack = new HitBox(0, 700, 76, 96);
    bookStack.addClickText(bookstackText);
    this.addChild(bookStack);

    const tableBookText =
      "It's as if the owner of these books had a mental tornado, leaving a trail of scattered thoughts and ideas in its wake.";
    const tableOfBooks = new HitBox(540, 656, 280, 70);
    tableOfBooks.addClickText(tableBookText);
    this.addChild(tableOfBooks);

    const deskText = "Looks like someone decided to bench the chair and give the desk a new perspective.";
    const desk = new HitBox(1780, 720, 200, 200, 0, 0);
    desk.addClickText(deskText);
    this.addChild(desk);
    const deskChair = new HitBox(1760, 760, 220, 150, 23, 1);
    deskChair.addClickText(deskText);
    this.addChild(deskChair);

    const computer = new HitBox(1325, 645, 75, 75, 10, 1);
    this.viewComputer = this.viewComputer.bind(this);
    computer.addClickAction(this.viewComputer);
    computer.addClickText(
      "I don't think the computer will appreciate being turned into a pumpkin spice latte.",
      "pumpkin juice"
    );
    computer.addClickText("I don't think brute force is the answer here, Mr. Crowbar.", "crowbar");
    computer.addClickText("Using a key on a computer is like trying to unlock a door with a USB stick.", "key");
    computer.addClickText(
      "I appreciate your creative problem-solving skills, but I don't think shining a flashlight on the computer will get us anywhere.",
      "UV flashlight"
    );
    this.addChild(computer);

    const baobao = new HitBox(260, 878, 160);
    baobao.addClickText(
      "I always thought the saying 'the pen is mightier than the sword' should be updated to 'the magnifying glass is mightier than the sword'."
    );
    this.addChild(baobao);
  }

  private pickUpFloorplan() {
    this.addCutoutToEdge("removedFloorplan", false, false);

    this.removeChild(this.floorplanHitBox);
    itemHub.addItem("paper");
    floorplan.loadNavigation(Manager.currentScene);
    Manager.changeScene(floorplan);
    floorplan.addText([
      "Ah, the floorplan of the mansion. The blueprint for unraveling this mystery. (Floorplan was added to inventory)",
    ]);
  }

  private revealSecretRoom() {
    this.addCutoutToEdge("openPlank", false, false);
    this.removeChild(this.plankHitBox);
    this.addChild(this.floorplanHitBox);
  }

  public revealSecretPassage() {
    this.addCutout("openPassage", 1585, 298, 0);
    const passageClick = new HitBox(1598, 325, 120, 460, 0, 100);
    passageClick.addClickAction(() => {
      Manager.changeScene(dungeon);
      if (!GameState.visitedDungeon) {
        dungeon.addText([
          "Welcome to the heart of our mystery. These walls, those chains... it's all a bit much, isn't it? Time to uncover what went down.",
        ]);
        GameState.visitedDungeon = true;
      }
    });
    this.addChild(passageClick);
  }

  public loadNavigation() {
    this.addChild(new NavigationArrow(bedroom, Direction.Right));
    this.addChild(new NavigationArrow(garden, Direction.Left));
  }

  private viewComputer() {
    Manager.changeScene(computer);
    if (!GameState.visitedComputer) {
      computer.addText(["I love a good puzzle challenge. Let's see if this game is up to par."]);
      GameState.visitedComputer = true;
    }
  }
}
