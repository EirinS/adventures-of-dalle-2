import type { ResolverManifest } from "pixi.js";

export const manifest: ResolverManifest = {
  bundles: [
    {
      name: "kitchen",
      assets: {
        kitchen: "./kitchen/kitchen_base.png",
        openCupboard: "./kitchen/open_cupboard.png",
        revealPainting: "./kitchen/revealed_painting.png",
        removeJuice: "./kitchen/removed_juice.png",
        removeFlashlight: "./kitchen/removed_flashlight.png",
      },
    },
    {
      name: "office",
      assets: {
        office: "./office/office.png",
      },
    },
  ],
};
