import type { ResolverManifest } from "pixi.js";

export const BASE_URL = process.env.NODE_ENV === "production" ? "https://adventures-of-dalle-2.vercel.app" : ".";

export const manifest: ResolverManifest = {
  bundles: [
    {
      name: "start",
      assets: {
        startScreen: `${BASE_URL}/start_screen.png`,
      },
    },
    {
      name: "kitchen",
      assets: {
        kitchen: `${BASE_URL}/kitchen/kitchen_base.png`,
        openCupboard: `${BASE_URL}/kitchen/open_cupboard.png`,
        revealPainting: `${BASE_URL}/kitchen/revealed_painting.png`,
        removeJuice: `${BASE_URL}/kitchen/removed_juice.png`,
        removeFlashlight: `${BASE_URL}/kitchen/removed_flashlight.png`,
      },
    },
    {
      name: "livingroom",
      assets: {
        livingroom: `${BASE_URL}/livingroom/livingroom.png`,
        showSafe: `${BASE_URL}/livingroom/safe.png`,
      },
    },
    {
      name: "crystalball",
      assets: {
        crystalEmpty: `${BASE_URL}/crystalball/empty.png`,
        crystalEiffel: `${BASE_URL}/crystalball/eiffel.png`,
        crystalBook: `${BASE_URL}/crystalball/book.png`,
        crystalPumpkin: `${BASE_URL}/crystalball/pumpkin.png`,
        crystalFlamingo: `${BASE_URL}/crystalball/flamingo.png`,
        crystalDiamond: `${BASE_URL}/crystalball/diamond.png`,
        crystalBrick: `${BASE_URL}/crystalball/brickwall.png`,
      },
    },
    {
      name: "garden",
      assets: {
        garden: `${BASE_URL}/garden/garden.png`,
        removeKey: `${BASE_URL}/garden/no_key.png`,
        removeCrowbar: `${BASE_URL}/garden/headless-flamingo.png`,
      },
    },
    {
      name: "library",
      assets: {
        library: `${BASE_URL}/library/library.png`,
        openPlank: `${BASE_URL}/library/open_plank.png`,
        openPassage: `${BASE_URL}/library/library_opening.png`,
        removedFloorplan: `${BASE_URL}/library/removed_floorplan.png`,
      },
    },
    {
      name: "bedroom",
      assets: {
        bedroom: `${BASE_URL}/bedroom/bedroom.png`,
        openDrawer: `${BASE_URL}/bedroom/open_drawer.png`,
        openPumpkin: `${BASE_URL}/bedroom/open_pumpkin.png`,
        clock_0102: `${BASE_URL}/bedroom/0102.png`,
        clock_0105: `${BASE_URL}/bedroom/0105.png`,
        clock_0401: `${BASE_URL}/bedroom/0401.png`,
        clock_0408: `${BASE_URL}/bedroom/0408.png`,
        clock_0507: `${BASE_URL}/bedroom/0507.png`,
        clock_0509: `${BASE_URL}/bedroom/0509.png`,
      },
    },
    {
      name: "office",
      assets: {
        office: `${BASE_URL}/office/office.png`,
      },
    },
    {
      name: "computer",
      assets: {
        computer: `${BASE_URL}/computer/computer.png`,
        red: `${BASE_URL}/computer/red.png`,
        redPressed: `${BASE_URL}/computer/red-dark.png`,
        yellow: `${BASE_URL}/computer/yellow.png`,
        yellowPressed: `${BASE_URL}/computer/yellow-dark.png`,
        blue: `${BASE_URL}/computer/blue.png`,
        bluePressed: `${BASE_URL}/computer/blue-dark.png`,
        green: `${BASE_URL}/computer/green.png`,
        greenPressed: `${BASE_URL}/computer/green-dark.png`,
        orange: `${BASE_URL}/computer/orange.png`,
        orangePressed: `${BASE_URL}/computer/orange-dark.png`,
        purple: `${BASE_URL}/computer/purple.png`,
        purplePressed: `${BASE_URL}/computer/purple-dark.png`,
      },
    },
    {
      name: "memorystick",
      assets: {
        baby: `${BASE_URL}/memorystick/baby.png`,
        file: `${BASE_URL}/memorystick/file.png`,
        kid: `${BASE_URL}/memorystick/kid.png`,
        goodbye: `${BASE_URL}/memorystick/goodbye.png`,
        background: `${BASE_URL}/memorystick/background.png`,
        close: `${BASE_URL}/memorystick/close.png`,
      },
    },
    {
      name: "pumpkin",
      assets: {
        pumpkin: `${BASE_URL}/pumpkin/empty.png`,
        filled: `${BASE_URL}/pumpkin/filled.png`,
      },
    },
    {
      name: "safe",
      assets: {
        safe: `${BASE_URL}/safe/safe.png`,
        open: `${BASE_URL}/safe/button_unclicked.png`,
        clicked: `${BASE_URL}/safe/button_clicked_crop.png`,
      },
    },
    {
      name: "book",
      assets: {
        book: `${BASE_URL}/book/book.png`,
        riddle: `${BASE_URL}/book/riddle.png`,
      },
    },
    {
      name: "stairway",
      assets: {
        stairway: `${BASE_URL}/stairway/stairway.jpeg`,
      },
    },
    {
      name: "dungeon",
      assets: {
        memoryStickItem: `${BASE_URL}/dungeon/memory-stick.png`,
        dungeon: `${BASE_URL}/dungeon/dungeon.png`,
        pidestal: `${BASE_URL}/dungeon/pidestal.png`,
      },
    },
    {
      name: "floorplan",
      assets: {
        floorplan: `${BASE_URL}/floorplan/floorplan.png`,
      },
    },
    {
      name: "music",
      assets: {
        musicOn: `${BASE_URL}/musicicons/on.png`,
        musicOff: `${BASE_URL}/musicicons/off.png`,
      },
    },

    {
      name: "items",
      assets: {
        key: `${BASE_URL}/items/key.png`,
        "pumpkin juice": `${BASE_URL}/items/carton.png`,
        "UV flashlight": `${BASE_URL}/items/flashlight.png`,
        keyHighlighted: `${BASE_URL}/items/key-highlighted.png`,
        "pumpkin juiceHighlighted": `${BASE_URL}/items/carton-highlighted.png`,
        "UV flashlightHighlighted": `${BASE_URL}/items/flashlight-highlighted.png`,
        crowbar: `${BASE_URL}/items/crowbar.png`,
        crowbarHighlighted: `${BASE_URL}/items/crowbar-highlighted.png`,
        paper: `${BASE_URL}/items/floorplan.png`,
        "memory stick": `${BASE_URL}/items/memory-stick.png`,
        "memory stickHighlighted": `${BASE_URL}/items/memory-stick-highlighted.png`,
      },
    },
  ],
};
