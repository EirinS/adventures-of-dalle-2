import { Graphics, Container, Circle, Rectangle, Point } from "pixi.js";
import { Manager } from "../scenes/Manager";
import { itemHub } from "../state/rooms";

export class HitBox extends Container {
  private graphics: Graphics;
  private actions: { [item: string]: () => void };

  constructor(x: number, y: number, width: number, height?: number, angle = 0, zIndex = 0, show: boolean = false) {
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

    this.on("pointertap", () => this.doActionUpdated());
  }

  private getText(text: string | string[]): string[] {
    if (typeof text === "string") return [text];
    return text;
  }

  /**
   * @param action The action to be performed
   * @param item The item that triggers the action
   * @param text Optional text to be displayed with the action
   */
  public addClickAction(action: () => void, item: string = "", text: string | string[] | undefined = undefined) {
    if (text) {
      const textAction = () => {
        action();
        Manager.currentScene.addText(this.getText(text));
      };
      this.actions[item] = textAction;
    } else {
      this.actions[item] = action;
    }
  }

  /**
   * Simplified way to add text to a hitbox hit.
   * @param text The text to be shown
   * @param item The item that triggers the text
   */
  public addClickText(text: string[] | string, item: string = "") {
    // If it is used together with clickAction, don't override action but add text to action
    if (this.actions[item])
      this.actions[item] = () => {
        this.actions[item];
        Manager.currentScene.addText(this.getText(text));
      };
    else {
      this.actions[item] = () => Manager.currentScene.addText(this.getText(text));
    }
  }

  private doActionUpdated() {
    if (this.actions?.[itemHub.selectedItem]) {
      this.actions[itemHub.selectedItem]();
    } else {
      // Default text if none is set
      if (itemHub.selectedItem !== "") {
        Manager.currentScene.addText([`You can not use the ${itemHub.selectedItem} here.`]);
      }
    }

    // deselect an item after trying to use it
    itemHub.deselectItem(itemHub.selectedItem);
  }
}
