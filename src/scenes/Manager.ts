import { Application } from "pixi.js";
import { itemHub } from "../state/rooms";
import { IScene } from "./IScene";

export class Manager {
  private static app: Application;
  static prevScene: IScene;
  public static currentScene: IScene;

  private static _width: number;
  private static _height: number;

  public static get width(): number {
    return Manager._width;
  }
  public static get height(): number {
    return Manager._height;
  }

  public static initialize(width: number, height: number, background: number): void {
    Manager._width = width;
    Manager._height = height;

    Manager.app = new Application({
      view: document.querySelector<HTMLCanvasElement>("canvas") ?? undefined,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundColor: background,
      width: width,
      height: height,
    });

    // listen for the browser telling us that the screen size changed
    window.addEventListener("resize", Manager.resize);

    // call it manually once so we are sure we are the correct size after starting
    Manager.resize();
  }

  public static resize(): void {
    // current screen size
    const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    // uniform scale for our game
    const scale = Math.min(screenWidth / Manager.width, screenHeight / Manager.height);

    // the "uniformly enlarged" size for our game
    const enlargedWidth = Math.floor(scale * Manager.width);
    const enlargedHeight = Math.floor(scale * Manager.height);

    // margins for centering our game
    const horizontalMargin = (screenWidth - enlargedWidth) / 2;
    const verticalMargin = (screenHeight - enlargedHeight) / 2;

    // now we use css trickery to set the sizes and margins
    const appView = Manager.app.view as HTMLCanvasElement;
    if (appView.style) {
      appView.style.width = `${enlargedWidth}px`;
      appView.style.height = `${enlargedHeight}px`;
      appView.style.marginLeft = appView.style.marginRight = `${horizontalMargin}px`;
      appView.style.marginTop = appView.style.marginBottom = `${verticalMargin}px`;
    }
  }

  public static changeScene(newScene: IScene): void {
    if (Manager.currentScene) {
      Manager.app.stage.removeChild(Manager.currentScene);
    }

    // Add the new one
    Manager.prevScene = Manager.currentScene;
    Manager.currentScene = newScene;
    Manager.currentScene.clearText();
    Manager.app.stage.addChild(Manager.currentScene);
    Manager.currentScene.addChildContainer(itemHub);
  }
}
