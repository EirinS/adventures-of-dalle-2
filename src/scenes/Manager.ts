import { Application, DisplayObject } from "pixi.js";
import { itemHub } from "../state/rooms";

export class Manager {
  private constructor() {}

  private static app: Application;
  private static currentScene: IScene;

  private static _width: number;
  private static _height: number;

  public static get width(): number {
    return Manager._width;
  }
  public static get height(): number {
    return Manager._height;
  }

  public static initialize(
    width: number,
    height: number,
    background: number
  ): void {
    Manager._width = width;
    Manager._height = height;

    Manager.app = new Application({
      view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
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
    const screenWidth = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    const screenHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );

    // uniform scale for our game
    const scale = Math.min(
      screenWidth / Manager.width,
      screenHeight / Manager.height
    );

    // the "uniformly englarged" size for our game
    const enlargedWidth = Math.floor(scale * Manager.width);
    const enlargedHeight = Math.floor(scale * Manager.height);

    // margins for centering our game
    const horizontalMargin = (screenWidth - enlargedWidth) / 2;
    const verticalMargin = (screenHeight - enlargedHeight) / 2;

    // now we use css trickery to set the sizes and margins
    const viewWrapper = document.getElementById("pixi-content") as HTMLElement;

    if (Manager.app.view.style) {
      Manager.app.view.style.width = `${enlargedWidth}px`;
      Manager.app.view.style.height = `${enlargedHeight}px`;
      viewWrapper.style.marginLeft =
        viewWrapper.style.marginRight = `${horizontalMargin}px`;
      viewWrapper.style.marginTop =
        viewWrapper.style.marginBottom = `${verticalMargin}px`;
    }
  }

  // Call this function when you want to go to a new scene
  public static changeScene(newScene: IScene): void {
    // Remove and destroy old scene... if we had one..
    if (Manager.currentScene) {
      Manager.app.stage.removeChild(Manager.currentScene);
      // Manager.currentScene.destroy();
    }

    // Add the new one
    Manager.currentScene = newScene;
    Manager.currentScene.clearText();
    Manager.app.stage.addChild(Manager.currentScene);
  }

  public static showItemhub() {
    Manager.app.stage.sortableChildren = true;
    Manager.app.stage.addChild(itemHub);
  }
}

// This could have a lot more generic functions that you force all your scenes to have. Update is just an example.
// Also, this could be in its own file...
export interface IScene extends DisplayObject {
  clearText(): void;
}
