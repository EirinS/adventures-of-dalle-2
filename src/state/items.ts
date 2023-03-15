import { itemHub } from "./rooms";

export function collectKey() {
  itemHub.addItem("key");
}

export function collectCarton() {
  itemHub.addItem("carton");
}

export function collectFlashlight() {
  itemHub.addItem("flashlight");
}
