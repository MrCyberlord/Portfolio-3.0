import { _roots } from "@react-three/fiber";
import { Raycaster, Vector2 } from "three";
import type { Object3D } from "three";

type InteractiveObject = Object3D & {
  __r3f?: { handlers?: { onPointerOut?: unknown } };
};

/** Own mouse hover using resting cap geometry. Animated caps and their child
 * meshes must never generate additional release/press pairs as the mouse moves.
 * Touch/click input stays with the runtime. Requires the pinned R3F renderer.
 */
export function installHoverReleaseGuard(
  canvas: HTMLCanvasElement,
  onHover: (key: Object3D | null) => void,
) {
  const ray = new Raycaster();
  const pointer = new Vector2();
  let frame = 0;
  const move = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    cancelAnimationFrame(frame);
    const x = event.clientX,
      y = event.clientY;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const state = _roots.get(canvas)?.store.getState();
      if (!state) return;
      const bounds = canvas.getBoundingClientRect();
      const keys = state.internal.interaction.filter((object) =>
        Boolean((object as InteractiveObject).__r3f?.handlers?.onPointerOut),
      );
      if (!keys.length) return;
      pointer.set(
        ((x - bounds.left) / bounds.width) * 2 - 1,
        1 - ((y - bounds.top) / bounds.height) * 2,
      );
      ray.setFromCamera(pointer, state.camera);
      const positions = keys.map((key) => key.position.y);
      try {
        // The source key depresses on hover. Its hit target should remain at
        // the resting cap, rather than moving away from the visitor's cursor.
        keys.forEach((key) => {
          key.position.y = 0;
          key.updateWorldMatrix(true, true);
        });
        const hit = ray.intersectObjects(keys, true)[0];
        let target: Object3D | null = hit?.object ?? null;
        while (target && !keys.includes(target as typeof keys[number])) target = target.parent;
        onHover(target);
      } finally {
        keys.forEach((key, index) => {
          key.position.y = positions[index];
          key.updateWorldMatrix(true, true);
        });
      }
    });
  };
  const leave = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    onHover(null);
  };
  canvas.addEventListener("pointermove", move, { passive: true });
  canvas.addEventListener("pointerleave", leave);
  return () => {
    cancelAnimationFrame(frame);
    canvas.removeEventListener("pointermove", move);
    canvas.removeEventListener("pointerleave", leave);
  };
}
