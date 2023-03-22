import type { ResolverManifest } from "pixi.js";

export const manifest: ResolverManifest = {
  bundles: [
    {
      name: "start",
      assets: {
        startScreen: "./start_screen.png",
      },
    },
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
      name: "crystalball",
      assets: {
        crystalEmpty: "./crystalball/empty.png",
        crystalEiffel: "./crystalball/eiffel.png",
        crystalBook: "./crystalball/book.png",
        crystalPumpkin: "./crystalball/pumpkin.png",
        crystalFlamingo: "./crystalball/flamingo.png",
        crystalDiamond: "./crystalball/diamond.png",
      },
    },
    {
      name: "garden",
      assets: {
        garden: "./garden/garden.png",
        removeKey: "./garden/no_key.png",
        removeCrowbar: "./garden/headless-flamingo.png",
      },
    },
    {
      name: "library",
      assets: {
        library: "./library/library.png",
        openPlank: "./library/open_plank.png",
        removedFloorplan: "./library/removed_floorplan.png",
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
        open: "./safe/opensafe.png",
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
      name: "floorplan",
      assets: {
        floorplan: "./floorplan/floorplan.png",
      },
    },
    {
      name: "items",
      assets: {
        key: "./items/key.png",
        "pumpkin juice": "./items/carton.png",
        "UV flashlight": "./items/flashlight.png",
        keyHighlighted: "./items/key-highlighted.png",
        "pumpkin juiceHighlighted": "./items/carton-highlighted.png",
        "UV flashlightHighlighted": "./items/flashlight-highlighted.png",
        crowbar: "./items/crowbar.png",
        crowbarHighlighted: "./items/crowbar-highlighted.png",
        paper: "./items/floorplan.png",
      },
    },
  ],
};
