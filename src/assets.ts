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
      name: "livingroom",
      assets: {
        livingroom: "./livingroom/livingroom.png",
        showSafe: "./livingroom/safe.png",
      },
    },
    {
      name: "garden",
      assets: {
        garden: "./garden/garden.png",
        removeKey: "./garden/no_key.png",
      },
    },
    {
      name: "library",
      assets: {
        library: "./library/library.png",
      },
    },
    {
      name: "bedroom",
      assets: {
        bedroom: "./bedroom/bedroom.png",
        openDrawer: "./bedroom/open_drawer.png",
        openPumpkin: "./bedroom/open_pumpkin.png",
      },
    },
    {
      name: "office",
      assets: {
        office: "./office/office.png",
      },
    },
    {
      name: "computer",
      assets: {
        computer: "./computer/computer.png",
      },
    },
    {
      name: "pumpkin",
      assets: {
        pumpkin: "./pumpkin/empty.png",
        filled: "./pumpkin/filled.png",
      },
    },
    {
      name: "safe",
      assets: {
        safe: "./safe/safe.png",
      },
    },
    {
      name: "book",
      assets: {
        book: "./book/book.png",
        riddle: "./book/riddle.png",
      },
    },
  ],
};
