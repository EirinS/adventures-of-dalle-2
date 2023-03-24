import { Container, Sprite, Point, Texture } from "pixi.js";
import { Manager } from "../scenes/Manager";
import { floorplan, kitchen, livingroom } from "../state/rooms";

export class ItemHub extends Container {
  public selectedItem: string;
  public spriteScale = new Point(1.5, 1.5);
  private sprites: { [item: string]: Sprite };
  constructor() {
    super();
    this.zIndex = 2;
    this.selectedItem = "";
    this.sprites = {};
  }

  public addItem(item: string) {
    const sprite = Sprite.from(item);
    sprite.scale = this.spriteScale;
    sprite.interactive = true;
    this.addChild(sprite);
    sprite.on("pointertap", () => this.selectItem(item));
    this.sprites[item] = sprite;
    this.arrangeItems();
  }

  public removeItem(item: string) {
    if (item && this.selectedItem === item) this.selectedItem = "";
    this.removeChild(this.sprites[item]);
    delete this.sprites[item];
  }

  public hasItem(item: string) {
    return this.sprites[item] !== undefined;
  }

  private selectItem(item: string) {
    if (this.selectedItem === item) {
      this.deselectItem(item);
    } else {
      this.deselectItem(this.selectedItem);
      if (item === "paper") {
        this.selectFloorPlan();
      } else {
        this.selectedItem = item;
        this.sprites[item].texture = Texture.from(item + "Highlighted");
      }
    }
  }

  private selectFloorPlan() {
    if (Manager.currentScene === floorplan) {
      Manager.changeScene(Manager.prevScene);
    } else {
      floorplan.loadNavigation(Manager.currentScene);
      Manager.changeScene(floorplan);
    }
  }

  public deselectItem(item: string) {
    if (item) {
      if (this.selectedItem === item) this.selectedItem = "";
      this.sprites[item].texture = Texture.from(item);
    }
  }

  public arrangeItems() {
    Object.keys(this.sprites).forEach((key: string, i: number) => {
      let sprite = this.sprites[key];
      const margin = sprite.width / 4;
      if (
        Manager.currentScene !== kitchen &&
        Manager.currentScene !== livingroom &&
        Manager.currentScene !== floorplan
      ) {
        sprite.position = new Point(
          Manager.width - sprite.width - margin - i * (sprite.width + margin),
          margin
        );
      } else {
        sprite.position = new Point(
          Manager.width -
            sprite.width -
            margin -
            (i % 3) * (sprite.width + margin),
          margin + (sprite.width + margin) * Math.floor(i / 3)
        );
      }
    });
  }
}
