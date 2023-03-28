import { sound } from "@pixi/sound";
import { Container, Sprite, Texture } from "pixi.js";

export class MusicHub extends Container {
  private musicIcon: Sprite;
  private playing: boolean = true;
  constructor() {
    super();
    this.musicIcon = Sprite.from("musicOn");
    this.musicIcon.x = 30;
    this.musicIcon.y = 30;
    this.musicIcon.zIndex = 2;
    this.addChild(this.musicIcon);
    this.musicIcon.interactive = true;
    this.musicIcon.on("pointertap", () => this.toggleMusic());
  }

  private toggleMusic() {
    if (this.playing) {
      sound.pause("mansion");
      this.playing = false;
      this.musicIcon.texture = Texture.from("musicOff");
    } else {
      sound.play("mansion");
      this.playing = true;
      this.musicIcon.texture = Texture.from("musicOn");
    }
  }
}
