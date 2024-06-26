import { Sprite } from "pixi.js";
import { Direction, NavigationArrow, Position } from "../components/NavigationArrow";
import { BaseScene } from "./BaseScene";
import { itemHub, stairway } from "../state/rooms";
import { HitBox } from "../components/HitBox";
import { Hightlight } from "../components/Highlight";
import { GameState } from "../state/GameState";

export class DungeonScene extends BaseScene {
  private memoryStickCutout: Sprite;
  private brickSolution = [3, 5, 20, 37, 43, 51];
  private puzzleSolution = Array.from({ length: 66 }, (_, i) => this.brickSolution.includes(i));
  private clickCounter: number = 0;

  constructor() {
    super(Sprite.from("dungeon"));
    this.memoryStickCutout = Sprite.from("memoryStickItem");
    this.addText([
      "Welcome to the heart of our mystery. These walls, those chains... it's all a bit much, isn't it? Time to uncover what went down.",
    ]);

    this.loadHitBoxes();
    this.loadPuzzleHitBoxes();
  }

  public loadNavigation() {
    this.addChild(new NavigationArrow(stairway, Direction.Left, Position.BottomLeft));
  }

  public checkDungeonPuzzle(idx: number, highlight: Hightlight) {
    this.clickCounter += 1;
    if (GameState.brickState.filter((value) => value).length >= 10 && !highlight.isVisible()) {
      this.addText([
        "Clicking every brick, really? Look, I admire the dedication, really, but there is a puzzle to solve, not just a game of 'press all the things and see what happens'. Let's look for clues instead.",
      ]);
      return;
    }
    highlight.toggleVisibility();
    GameState.brickState[idx] = !GameState.brickState[idx];
    var isSolved = GameState.brickState.every((value, index) => value === this.puzzleSolution[index]);
    if (isSolved && !GameState.solvedDungeon) {
      this.finishDungeonPuzzle();
      return;
    }

    if (this.clickCounter === 40) {
      this.addText([
        "I saw something interesting in the bedroom that could be the clue we need. Let's not ignore it; might be smarter to check that out than tapping on bricks like we're trying to summon a genie.",
      ]);
    }
    if (this.clickCounter === 80) {
      this.addText([
        "Notice that clock in the bedroom? Could be more than just a timepiece; might be the clue we've been after. And hey, if all else fails, there's always the crystal ball for a hint.",
      ]);
    }
    if (this.clickCounter === 150) {
      this.addText([
        "Six numbers on the alarm clock, that would mean six bricks on the wall. Looks like each number might just be the key to which brick to press.",
      ]);
    }
    if (this.clickCounter >= 300 && this.clickCounter % 10 === 0) {
      this.addText([
        "I think I've got it! Each number on the clock corresponds to a brick. The first number is how far to count in the horizontal direction, the second number is how far to count in the vertical (...)",
        "direction. For example, 01:02 equals the brick that is the 1st on the left side, and on the 2nd row of bricks. Start counting from the bottom left.",
      ]);
    }
  }

  private finishDungeonPuzzle() {
    GameState.solvedDungeon = true;
    this.addCutout("pidestal", 1093, 643);
    this.addCutoutSprite(this.memoryStickCutout, 1235, 620);

    const memoryStick = new HitBox(1235, 624, 90, 30, 0, 0, false);
    this.takeMemoryStick = this.takeMemoryStick.bind(this);
    memoryStick.addClickAction(
      () => this.takeMemoryStick(memoryStick),
      "",
      "This could be the final piece of the puzzle. Time to find out what it contains. (Memory stick was added to inventory)"
    );
    this.addChild(memoryStick);
  }

  private takeMemoryStick(memoryStick: HitBox) {
    this.removeChild(memoryStick);
    this.removeChild(this.memoryStickCutout);
    itemHub.addItem("memory stick");
  }

  private loadHitBoxes() {
    const baobao = new HitBox(185, 320, 250, 620, 0, 0);
    const baobaoHead = new HitBox(330, 220, 110, undefined, 0, 0);
    const text =
      "I've heard of chilling tales, but this is ridiculous. Let's find what we're here for and bounce out like we're on a pogo stick.";
    baobao.addClickText(text);
    baobaoHead.addClickText(text);
    this.addChild(baobao);
    this.addChild(baobaoHead);
  }

  private loadPuzzleHitBoxes() {
    // x = 1, y = 1, nedre venstre hjørne
    // ROW 1
    this.addChild(new Hightlight(1, 464, 390, 87, 55));
    this.addChild(new Hightlight(2, 510, 390, 105, 55));
    this.addChild(new Hightlight(3, 565, 390, 147, 55));
    this.addChild(new Hightlight(4, 641, 390, 156, 55));
    this.addChild(new Hightlight(5, 722, 390, 110, 55));

    // ROW 2
    this.addChild(new Hightlight(6, 476, 360, 130, 58));
    this.addChild(new Hightlight(7, 543, 360, 135, 58));
    this.addChild(new Hightlight(8, 613, 360, 154, 58));
    this.addChild(new Hightlight(9, 693, 360, 160, 58));

    // ROW 3
    this.addChild(new Hightlight(10, 464, 329, 85, 58));
    this.addChild(new Hightlight(11, 509, 329, 135, 58));
    this.addChild(new Hightlight(12, 579, 329, 128, 58));
    this.addChild(new Hightlight(13, 645, 329, 149, 58));
    this.addChild(new Hightlight(14, 722, 329, 110, 58));
    this.addChild(new Hightlight(15, 780, 329, 45, 58));

    // ROW 4
    this.addChild(new Hightlight(16, 478, 297, 116, 58));
    this.addChild(new Hightlight(17, 539, 297, 125, 58));
    this.addChild(new Hightlight(18, 603, 297, 140, 58));
    this.addChild(new Hightlight(19, 675, 297, 147, 58));
    this.addChild(new Hightlight(20, 753, 297, 98, 58));

    // ROW 5
    this.addChild(new Hightlight(21, 464, 266, 100, 57));
    this.addChild(new Hightlight(22, 516, 266, 90, 57));
    this.addChild(new Hightlight(23, 564, 266, 158, 57));
    this.addChild(new Hightlight(24, 645, 266, 138, 57));
    this.addChild(new Hightlight(25, 717, 266, 100, 57));
    this.addChild(new Hightlight(26, 769, 266, 65, 57));

    // ROW 6
    this.addChild(new Hightlight(27, 464, 236, 35, 55));
    this.addChild(new Hightlight(28, 485, 236, 126, 55));
    this.addChild(new Hightlight(29, 552, 236, 76, 55));
    this.addChild(new Hightlight(30, 592, 236, 107, 55));
    this.addChild(new Hightlight(31, 648, 236, 130, 55));
    this.addChild(new Hightlight(32, 715, 236, 87, 55));
    this.addChild(new Hightlight(33, 760, 236, 84, 55));

    // ROW 7
    this.addChild(new Hightlight(34, 464, 205, 120, 57));
    this.addChild(new Hightlight(35, 526, 205, 94, 57));
    this.addChild(new Hightlight(36, 575, 205, 94, 57));
    this.addChild(new Hightlight(37, 624, 205, 90, 57));
    this.addChild(new Hightlight(38, 672, 205, 125, 57));
    this.addChild(new Hightlight(39, 736, 205, 86, 57));
    this.addChild(new Hightlight(40, 780, 205, 44, 57));

    // ROW 8
    this.addChild(new Hightlight(41, 464, 175, 69, 53));
    this.addChild(new Hightlight(42, 500, 175, 102, 53));
    this.addChild(new Hightlight(43, 552, 175, 76, 53));
    this.addChild(new Hightlight(44, 592, 175, 107, 53));
    this.addChild(new Hightlight(45, 648, 175, 118, 53));
    this.addChild(new Hightlight(46, 710, 175, 95, 53));
    this.addChild(new Hightlight(47, 760, 175, 84, 53));

    // ROW 9
    this.addChild(new Hightlight(48, 464, 148, 85, 48));
    this.addChild(new Hightlight(49, 508, 148, 115, 48));
    this.addChild(new Hightlight(50, 568, 148, 115, 48));
    this.addChild(new Hightlight(51, 628, 148, 136, 48));
    this.addChild(new Hightlight(52, 699, 148, 75, 48));
    this.addChild(new Hightlight(53, 740, 148, 120, 48));

    // ROW 10
    this.addChild(new Hightlight(54, 464, 123, 128, 45));
    this.addChild(new Hightlight(55, 530, 123, 110, 45));
    this.addChild(new Hightlight(56, 588, 123, 120, 45));
    this.addChild(new Hightlight(57, 650, 123, 121, 45));
    this.addChild(new Hightlight(58, 713, 123, 142, 45));
    this.addChild(new Hightlight(59, 786, 123, 29, 45));

    // ROW 11
    this.addChild(new Hightlight(60, 464, 100, 90, 42));
    this.addChild(new Hightlight(61, 510, 100, 90, 42));
    this.addChild(new Hightlight(62, 556, 100, 110, 42));
    this.addChild(new Hightlight(63, 613, 100, 114, 42));
    this.addChild(new Hightlight(64, 672, 100, 139, 42));
    this.addChild(new Hightlight(65, 744, 100, 114, 42));
  }
}
