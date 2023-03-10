import { itemHub } from "./rooms";

export let hasCarton = false;
export let hasKey = false;
export let hasFlashlight = false;

export function collectKey() {
  itemHub.addItem("key");
  hasKey = true;
}

export function collectCarton() {
  itemHub.addItem("carton");
  hasCarton = true;
}

export function collectFlashlight() {
  itemHub.addItem("flashlight");
  hasFlashlight = true;
}
