import { Graphics, Container, Rectangle, Point, Ellipse } from "pixi.js";
import { Manager } from "../scenes/Manager";
import { itemHub } from "../state/rooms";

export class HitBox extends Container {
  private graphics: Graphics;
  private actions: { [item: string]: () => void };

  constructor(
    x: number,
    y: number,
    width: number,
    height?: number,
    angle = 0,
    zIndex = 0,
    show: boolean = false,
    ellipse = false
  ) {
    super();
    this.graphics = new Graphics();
    this.graphics.interactive = true;
    this.graphics.angle = angle;
    this.graphics.position = new Point(x, y);

    this.actions = {};
    this.zIndex = zIndex;
    this.width = width;
    this.height = height ?? width;

    this.graphics.beginFill(0xff000);
    // height=undefined means it's a circle
    if (!height || ellipse) {
      this.graphics.hitArea = new Ellipse(0, 0, width, height ?? width);
      if (show) {
        this.graphics.drawEllipse(0, 0, width, height ?? width);
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

  public setHover() {
    this.graphics.cursor = "pointer";
    this.graphics.beginFill(0xfffffff);
    this.graphics.drawRoundedRect(0, 0, this.width, this.height, 10);
    this.graphics.endFill();
    this.graphics.alpha = 0;
    this.onpointerover = () => {
      this.graphics.alpha = 0.4;
    };
    this.onpointerout = () => {
      this.graphics.alpha = 0;
    };
  }

  /**
   * @param action The action to be performed
   * @param item The item that triggers the action
   * @param text Optional text to be displayed with the action
   */
  public addClickAction(
    action: () => void,
    item: string = "",
    text: string | string[] | undefined = undefined,
    textDelay = 0
  ) {
    if (text) {
      const textAction = () => {
        action();
        if (textDelay) {
          setTimeout(() => {
            Manager.currentScene.addText(this.getText(text));
          }, textDelay);
        } else {
          Manager.currentScene.addText(this.getText(text));
        }
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
