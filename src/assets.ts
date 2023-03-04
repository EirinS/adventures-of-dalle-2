import type { ResolverManifest } from "pixi.js";

export const manifest: ResolverManifest = {
  bundles: [
    {
      name: "office",
      assets: {
        office: "./office/office.png",
      },
    },
  ],
};
