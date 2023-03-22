import { Graphics, Container, Circle, Rectangle, Point } from "pixi.js";
import { Manager } from "../scenes/Manager";
import { itemHub } from "../state/rooms";

export class HitBox extends Container {
  private graphics: Graphics;
  private actions: { [item: string]: (item: string) => void };

  constructor(
    x: number,
    y: number,
    width: number,
    height?: number,
    angle = 0,
    zIndex = 0,
    show: boolean = false
  ) {
    super();
    this.graphics = new Graphics();
    this.graphics.interactive = true;
    this.graphics.angle = angle;
    this.graphics.position = new Point(x, y);
    this.graphics.beginFill(0xff000);
    this.actions = {};
    this.zIndex = zIndex;

    // This is a circle
    if (!height) {
      this.graphics.hitArea = new Circle(0, 0, width);

      if (show) {
        this.graphics.drawCircle(0, 0, width);
      }
    } else {
      this.graphics.hitArea = new Rectangle(0, 0, width, height);

      if (show) {
        this.graphics.drawRect(0, 0, width, height);
      }
    }

    this.graphics.endFill();
    this.addChild(this.graphics);
  }

  // add action function to be called on click.
  // specify which item is needed to trigger the action (defaults to no item selected needed)
  // possible to add different actions for different items
  public addClickAction(
    action: () => void,
    item: string = "",
    noItemText: string = ""
  ) {
    this.on("pointertap", () => this.doAction(noItemText));
    this.actions[item] = action;
  }

  public addClickActionMultipleItems(
    action: (item: string) => void,
    items: string[],
    noItemText: string = ""
  ) {
    this.on("pointertap", () =>
      this.doAction(noItemText, itemHub.selectedItem)
    );
    items.forEach((actionItem) => {
      this.actions[actionItem] = action;
    });
  }

  private doAction(noItemText: string = "", item: string = "") {
    if (this.actions?.[itemHub.selectedItem]) {
      this.actions[itemHub.selectedItem](item);
    } else {
      if (itemHub.selectedItem !== "") {
        Manager.currentScene.addText([
          `You can not use the ${itemHub.selectedItem} here.`,
        ]);
      } else if (noItemText !== "" && itemHub.selectedItem === "") {
        Manager.currentScene.addText([noItemText]);
      }
    }
    itemHub.deselectItem(itemHub.selectedItem);
  }
}
