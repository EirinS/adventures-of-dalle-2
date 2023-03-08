import { BedroomScene } from "../scenes/bedroomScene";
import { GardenScene } from "../scenes/GardenScene";
import { KitchenScene } from "../scenes/KitchenScene";
import { LibraryScene } from "../scenes/LibraryScene";
import { LivingroomScene } from "../scenes/LivingroomScene";
import { OfficeScene } from "../scenes/OfficeScene";

export let kitchen: KitchenScene;
export let livingroom: LivingroomScene;
export let office: OfficeScene;
export let garden: GardenScene;
export let bedroom: BedroomScene;
export let library: LibraryScene;

export function loadRooms() {
  kitchen = new KitchenScene();
  livingroom = new LivingroomScene();
  office = new OfficeScene();
  garden = new GardenScene();
  bedroom = new BedroomScene();
  library = new LibraryScene();
  kitchen.loadNavigation();
  livingroom.loadNavigation();
  office.loadNavigation();
  garden.loadNavigation();
  bedroom.loadNavigation();
  library.loadNavigation();
}
