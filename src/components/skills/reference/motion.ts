// Adapted from Naresh Khatri (MIT): Skills pose and staggered reveal only.
import gsap from "gsap";
import { Euler, Quaternion } from "three";
import type { ChibiSceneApi, Vec3 } from "@chibi3d/runtime";
import type { KeyboardScene } from "./scene";

export function createKeyboardMotion(
  api: ChibiSceneApi,
  scene: KeyboardScene,
  release: () => void,
  onActivity: (() => void) | undefined,
  stage: HTMLElement,
  reducedMotion = false,
) {
  let revealed = false;
  let active = true;
  const tweens: gsap.core.Tween[] = [];
  const transform: ChibiSceneApi["setNodeTransform"] = (id, patch) => {
    onActivity?.();
    return api.setNodeTransform(id, patch);
  };
  const pose = () => {
    // Fit the board itself, without reserving space for removed 3D labels.
    const size = Math.min(1.35, stage.clientWidth / Math.max(1, stage.clientHeight) * 1.06);
    const mobile = window.innerWidth < 768;
    const base = new Quaternion().setFromEuler(new Euler(0.119863065, 0.007200782, 0.119863065));
    const reference = new Quaternion().setFromEuler(new Euler(0, mobile ? -Math.PI / 6 : -Math.PI / 12, 0));
    const legacy = new Quaternion().setFromEuler(new Euler(0, mobile ? Math.PI / 6 : Math.PI / 12, 0));
    const rotation = new Euler().setFromQuaternion(base.multiply(reference).multiply(legacy));
    transform(scene.boardId, {
      position: [...scene.document.camera.target] as Vec3,
      rotation: [rotation.x, rotation.y, rotation.z],
      scale: [size, size, size],
    });
  };
  const visibility = () => {
    const hidden = document.hidden || !active;
    api.setPaused(hidden);
    tweens.forEach(tween => tween.paused(hidden));
  };
  const resize = () => { if (revealed) pose(); };
  const observer = new ResizeObserver(resize);
  observer.observe(stage);
  document.addEventListener("visibilitychange", visibility);
  api.setNodeVisible(scene.boardId, false);
  api.setNodeVisible(scene.catId, false);
  api.setNodeVisible(scene.labelsId, false);
  return {
    setActive(value: boolean) { active = value; visibility(); },
    setCounterEnabled(enabled: boolean) { api.setNodeVisible(scene.counterId, enabled); },
    reveal() {
      if (revealed) return;
      revealed = true;
      pose();
      api.setNodeVisible(scene.boardId, true);
      if (!reducedMotion) {
        const scale = { value: 0.001 };
        transform(scene.revealId, { scale: [scale.value, scale.value, scale.value] });
        tweens.push(gsap.to(scale, { value: 1, duration: 1.5, ease: "elastic.out(1,0.6)",
          onUpdate: () => { transform(scene.revealId, { scale: [scale.value, scale.value, scale.value] }); },
        }));
        scene.keys.forEach((key, index) => {
          const offset = { y: 150 / 296.741333 };
          transform(key.motionId, { position: [0, offset.y, 0] });
          api.setNodeVisible(key.motionId, false);
          tweens.push(gsap.delayedCall(0.9 + index * 0.07, () => { api.setNodeVisible(key.motionId, true); }));
          tweens.push(gsap.to(offset, { y: 0, delay: 1 + index * 0.07, duration: 0.5, ease: "bounce.out",
            onUpdate: () => { transform(key.motionId, { position: [0, offset.y, 0] }); },
          }));
        });
      }
      visibility();
    },
    dispose() {
      tweens.forEach(tween => tween.kill());
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      release();
      [scene.boardId, scene.revealId, ...scene.keys.map(key => key.motionId), scene.counterId].forEach(id => api.clearNodeOverrides(id));
    },
  };
}
