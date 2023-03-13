import { Container, Sprite, Point, Texture } from "pixi.js";

export class ItemHub extends Container {
  private numberOfItems: number;
  public selectedItem: string;
  private sprites: { [item: string]: Sprite };
  constructor() {
    super();
    this.zIndex = 1000;
    this.numberOfItems = 0;
    this.selectedItem = "";
    this.sprites = {};
  }

  public addItem(item: string) {
    const sprite = Sprite.from(item);
    sprite.interactive = true;
    sprite.position = new Point(1800 - this.numberOfItems * 100, 50);
    this.addChild(sprite);
    sprite.on("pointertap", () => this.selectItem(item));
    this.sprites[item] = sprite;
    this.numberOfItems++;
  }

  private selectItem(item: string) {
    if (this.selectedItem === item) {
      this.deselectItem(item);
    } else {
      this.deselectItem(this.selectedItem);
      this.selectedItem = item;
      this.sprites[item].texture = Texture.from(item + "Highlighted");
    }
  }

  public deselectItem(item: string) {
    if (item) {
      if (this.selectedItem === item) this.selectedItem = "";
      this.sprites[item].texture = Texture.from(item);
    }
  }
}
