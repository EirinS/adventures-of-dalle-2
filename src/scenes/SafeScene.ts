import { DisplayObject, Graphics, Sprite, Text, TextStyle } from "pixi.js";
import { HitBox } from "../components/HitBox";
import { Direction, NavigationArrow } from "../components/NavigationArrow";
import { livingroom } from "../state/rooms";
import { BaseScene } from "./BaseScene";

export class SafeScene extends BaseScene {
  private currentCode: Text;
  private navigationArrow: DisplayObject = new Graphics();

  private defaultStyle: TextStyle = new TextStyle({
    fontFamily: "Seven Segment",
    fontSize: 180,
    fill: "#fbeb1e",
    align: "left",
    lineHeight: 50,
    wordWrap: true,
  });
  constructor() {
    super(Sprite.from("safe"));

    const k = new HitBox(1105, 310, 125);
    this.pressButton = this.pressButton.bind(this);
    k.addClickAction(() => this.pressButton("K"));
    this.addChild(k);

    const b = new HitBox(1360, 310, 125);
    this.pressButton = this.pressButton.bind(this);
    b.addClickAction(() => this.pressButton("B"));
    this.addChild(b);

    const r = new HitBox(1615, 310, 125);
    this.pressButton = this.pressButton.bind(this);
    r.addClickAction(() => this.pressButton("R"));
    this.addChild(r);

    const f = new HitBox(1105, 562, 125);
    this.pressButton = this.pressButton.bind(this);
    f.addClickAction(() => this.pressButton("F"));
    this.addChild(f);

    const e = new HitBox(1360, 562, 125);
    this.pressButton = this.pressButton.bind(this);
    e.addClickAction(() => this.pressButton("E"));
    this.addChild(e);

    const s = new HitBox(1615, 562, 125);
    this.pressButton = this.pressButton.bind(this);
    s.addClickAction(() => this.pressButton("S"));
    this.addChild(s);

    const u = new HitBox(1105, 814, 125);
    this.pressButton = this.pressButton.bind(this);
    u.addClickAction(() => this.pressButton("U"));
    this.addChild(u);

    const t = new HitBox(1360, 814, 125);
    this.pressButton = this.pressButton.bind(this);
    t.addClickAction(() => this.pressButton("T"));
    this.addChild(t);

    const i = new HitBox(1615, 814, 125);
    this.pressButton = this.pressButton.bind(this);
    i.addClickAction(() => this.pressButton("I"));
    this.addChild(i);

    this.currentCode = new Text("", this.defaultStyle);
    this.currentCode.x = 300;
    this.currentCode.y = 300;
    this.addChild(this.currentCode);
  }
  public loadNavigation() {
    this.navigationArrow = this.addChild(new NavigationArrow(925, 950, livingroom, Direction.Down));
  }

  private pressButton(letter: string) {
    if (this.currentCode.text.length < 5) {
      this.currentCode.text += letter;
    }
    if (this.currentCode.text.length === 5) {
      if (this.currentCode.text === "REBUS") {
        this.defaultStyle.fill = "#48d508";
        setTimeout(() => {
          this.setBackground(Sprite.from("open"));
          this.addText([
            "The rumors were true, this egg is a masterpiece. The details are so fine and precise, it's hard to believe it was made by human hands. It's a true treasure.",
          ]);
          this.removeChild(this.navigationArrow);
        }, 1000);
      } else {
        this.defaultStyle.fill = "#f60824";
      }
      setTimeout(() => {
        this.defaultStyle.fill = "#fbeb1e";
        this.currentCode.text = "";
      }, 1000);
    }
  }
}
