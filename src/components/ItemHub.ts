import { Container, Sprite, Point, Texture } from "pixi.js";
import { Manager } from "../scenes/Manager";
import { floorplan } from "../state/rooms";

export class ItemHub extends Container {
  private numberOfItems: number;
  public selectedItem: string;
  public spriteScale = new Point(1, 1);
  private sprites: { [item: string]: Sprite };
  constructor() {
    super();
    this.zIndex = 2;
    this.numberOfItems = 0;
    this.selectedItem = "";
    this.sprites = {};
  }

  public addItem(item: string) {
    const sprite = Sprite.from(item);
    sprite.scale = this.spriteScale;
    const margin = sprite.width / 4;
    sprite.interactive = true;
    sprite.position = new Point(
      Manager.width -
        sprite.width -
        margin -
        this.numberOfItems * (sprite.width + margin),
      50
    );
    this.addChild(sprite);
    sprite.on("pointertap", () => this.selectItem(item));
    this.sprites[item] = sprite;
    this.numberOfItems++;
  }

  public removeItem(item: string) {
    if (item && this.selectedItem === item) this.selectedItem = "";
    this.removeChild(this.sprites[item]);
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
}
