import { Container, Graphics, Assets, Sprite } from "pixi.js";
import { manifest } from "../assets";
import { loadRooms, startScreen } from "../state/rooms";
import { IScene } from "./IScene";
import { Manager } from "./Manager";

export class LoaderScene extends Container implements IScene {
  private loaderBar: Container;
  private loaderBarBoder: Graphics;
  private loaderBarFill: Graphics;
  constructor() {
    super();

    const loaderBarWidth = Manager.width * 0.8;

    this.loaderBarFill = new Graphics();
    this.loaderBarFill.beginFill(0x008800, 1);
    this.loaderBarFill.drawRect(0, 0, loaderBarWidth, 50);
    this.loaderBarFill.endFill();
    this.loaderBarFill.scale.x = 0;

    this.loaderBarBoder = new Graphics();
    this.loaderBarBoder.lineStyle(10, 0xffffff, 1);
    this.loaderBarBoder.drawRect(0, 0, loaderBarWidth, 50);

    this.loaderBar = new Container();
    this.loaderBar.addChild(this.loaderBarFill);
    this.loaderBar.addChild(this.loaderBarBoder);
    this.loaderBar.position.x = (Manager.width - this.loaderBar.width) / 2;
    this.loaderBar.position.y = (Manager.height - this.loaderBar.height) / 2;
    this.addChild(this.loaderBar);
    this.initializeLoader().then(() => {
      this.gameLoaded();
    });
  }
  addText(text: string[]): void {
    throw new Error("Method not implemented." + " (" + text) + ")";
  }

  private async initializeLoader(): Promise<void> {
    await Assets.init({ manifest: manifest });

    const bundleIds = manifest.bundles.map((bundle) => bundle.name);

    await Assets.loadBundle(bundleIds, this.downloadProgress.bind(this));
  }

  private downloadProgress(progressRatio: number): void {
    this.loaderBarFill.scale.x = progressRatio;
  }

  public getBackground(): Sprite {
    return new Sprite();
  }

  public clearText(): void {}

  private gameLoaded(): void {
    loadRooms();
    Manager.changeScene(startScreen);
    Manager.showItemhub();
  }
}
