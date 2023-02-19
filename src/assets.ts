import type { ResolverManifest } from "pixi.js";

export const manifest: ResolverManifest = {
  bundles: [
    {
      name: "office",
      assets: {
        "panda-office": "./office/office.png",
        livingroom: "./livingroom/livingroom.png",
      },
    },
  ],
};
