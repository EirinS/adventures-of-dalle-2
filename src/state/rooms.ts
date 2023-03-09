import { BedroomScene } from "../scenes/bedroomScene";
import { SafeScene } from "../scenes/SafeScene";
import { KitchenScene } from "../scenes/KitchenScene";
import { LibraryScene } from "../scenes/LibraryScene";
import { LivingroomScene } from "../scenes/LivingroomScene";
import { OfficeScene } from "../scenes/OfficeScene";
import { GardenScene } from "../scenes/GardenScene";
import { BookScene } from "../scenes/bookScene";
import { PumpkinScene } from "../scenes/pumpkinScene";
import { ComputerScene } from "../scenes/ComputerScene";

export let kitchen: KitchenScene;
export let livingroom: LivingroomScene;
export let office: OfficeScene;
export let garden: GardenScene;
export let bedroom: BedroomScene;
export let library: LibraryScene;

export let safe: SafeScene;
export let book: BookScene;
export let pumpkin: PumpkinScene;
export let computer: ComputerScene;

export function loadRooms() {
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
}
