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
        openPlank: "./library/open_plank.png",
        removedBlueprint: "./library/removed_blueprint.png",
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
        red: "./computer/red.png",
        redPressed: "./computer/red-dark.png",
        yellow: "./computer/yellow.png",
        yellowPressed: "./computer/yellow-dark.png",
        blue: "./computer/blue.png",
        bluePressed: "./computer/blue-dark.png",
        green: "./computer/green.png",
        greenPressed: "./computer/green-dark.png",
        orange: "./computer/orange.png",
        orangePressed: "./computer/orange-dark.png",
        purple: "./computer/purple.png",
        purplePressed: "./computer/purple-dark.png",
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
    {
      name: "items",
      assets: {
        key: "./items/key.png",
        carton: "./items/carton.png",
        flashlight: "./items/flashlight.png",
        keyHighlighted: "./items/key-highlighted.png",
        cartonHighlighted: "./items/carton-highlighted.png",
        flashlightHighlighted: "./items/flashlight-highlighted.png",
      },
    },
  ],
};
