export let hasCarton = false;
export let hasKey = false;
export let hasFlashlight = false;

export function collectKey() {
  hasKey = true;
}

export function collectCarton() {
  hasCarton = true;
}

export function collectFlashlight() {
  hasFlashlight = true;
}
