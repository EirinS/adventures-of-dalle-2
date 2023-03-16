import { Manager } from "./scenes/Manager";
import { LoaderScene } from "./scenes/LoaderScene";

Manager.initialize(1920, 1080, 0x000000);

const loader: LoaderScene = new LoaderScene();
Manager.changeScene(loader);
