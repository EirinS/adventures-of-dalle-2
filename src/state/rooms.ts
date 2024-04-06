import { BedroomScene } from "../scenes/BedroomScene";
import { SafeScene } from "../scenes/SafeScene";
import { KitchenScene } from "../scenes/KitchenScene";
import { LibraryScene } from "../scenes/LibraryScene";
import { LivingroomScene } from "../scenes/LivingroomScene";
import { OfficeScene } from "../scenes/OfficeScene";
import { GardenScene } from "../scenes/GardenScene";
import { BookScene } from "../scenes/BookScene";
import { PumpkinScene } from "../scenes/PumpkinScene";
import { ComputerScene } from "../scenes/ComputerScene";
import { ItemHub } from "../components/ItemHub";
import { StartScene } from "../scenes/StartScene";
import { FloorplanScene } from "../scenes/FloorplanScene";
import { CrystallballScene } from "../scenes/CrystalballScene";
import { MusicHub } from "../components/MusicHub";
import { DungeonScene } from "../scenes/DungeonScene";
import { StairwayScene } from "../scenes/StairwayScene";

export let itemHub: ItemHub;

export let musicHub: MusicHub;

export let kitchen: KitchenScene;
export let livingroom: LivingroomScene;
export let office: OfficeScene;
export let garden: GardenScene;
export let bedroom: BedroomScene;
export let library: LibraryScene;
export let startScreen: StartScene;
export let safe: SafeScene;
export let book: BookScene;
export let pumpkin: PumpkinScene;
export let computer: ComputerScene;
export let floorplan: FloorplanScene;
export let crystalBall: CrystallballScene;
export let dungeon: DungeonScene;
export let stairway: StairwayScene;

export const getAllRooms = () => [
  kitchen,
  livingroom,
  office,
  garden,
  bedroom,
  library,
  safe,
  book,
  pumpkin,
  computer,
  floorplan,
  crystalBall,
  dungeon,
  stairway,
];

export function loadRooms() {
  itemHub = new ItemHub();
  musicHub = new MusicHub();
  kitchen = new KitchenScene();
  livingroom = new LivingroomScene();
  office = new OfficeScene();
  garden = new GardenScene();
  bedroom = new BedroomScene();
  library = new LibraryScene();
  safe = new SafeScene();
  book = new BookScene();
  pumpkin = new PumpkinScene();
  computer = new ComputerScene();
  startScreen = new StartScene();
  floorplan = new FloorplanScene();
  crystalBall = new CrystallballScene();
  dungeon = new DungeonScene();
  stairway = new StairwayScene();
  kitchen.loadNavigation();
  livingroom.loadNavigation();
  office.loadNavigation();
  garden.loadNavigation();
  bedroom.loadNavigation();
  library.loadNavigation();
  safe.loadNavigation();
  book.loadNavigation();
  pumpkin.loadNavigation();
  computer.loadNavigation();
  crystalBall.loadNavigation();
  dungeon.loadNavigation();
  stairway.loadNavigation();
}
