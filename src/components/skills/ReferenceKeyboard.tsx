// Adapted from Naresh Khatri's keyboard-scene.tsx (MIT).
// See public/licenses/naresh-khatri-3d-portfolio-MIT.txt and design/SKILLS.md.
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, RefObject } from "react";
import { ChibiScene } from "@chibi3d/runtime";
import type {
  ChibiSceneApi,
  ScenePointerEvent,
  RuntimeEvent,
} from "@chibi3d/runtime";
import { SKILLS } from "./reference/skills";
import { createKeyboardScene, resolveKeyboardAsset } from "./reference/scene";
import type { KeyboardKey, KeyboardSkill } from "./reference/scene";
import { createKeyInput, isTypingTarget } from "./reference/input";
import { createKeyboardMotion } from "./reference/motion";
import { useAdaptiveGraphics } from "./reference/use-adaptive-graphics";
import { createCounterMotion } from "./reference/counter-motion";
import { keyWear } from "./reference/wear";
import { installHoverReleaseGuard } from "./reference/hover-release";

const SceneCanvas = memo(ChibiScene);
const LOCAL_SCENE_STYLE: CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
};

type Props = {
  stage: RefObject<HTMLDivElement | null>;
  active: boolean;
  reducedMotion: boolean;
  maxDpr: number;
  playSound: (pressed: boolean) => void;
  onReady: () => void;
  onError: () => void;
  onPreview: (skill: KeyboardSkill | null) => void;
  onSelect: (skill: KeyboardSkill) => void;
};

export default function ReferenceKeyboard({
  stage,
  active,
  reducedMotion,
  maxDpr,
  playSound,
  onReady,
  onError,
  onPreview,
  onSelect,
}: Props) {
  const api = useRef<ChibiSceneApi>(null);
  const failed = useRef(false);
  const motion = useRef<ReturnType<typeof createKeyboardMotion> | null>(null);
  const counterMotion = useRef<ReturnType<typeof createCounterMotion> | null>(
    null,
  );
  const [loadVersion, setLoadVersion] = useState(0);
  const ready = loadVersion > 0;
  const scene = useMemo(
    () =>
      createKeyboardScene(
        Object.values(SKILLS).map((skill) => ({
          ...skill,
          icon: skill.keyboardIcon ?? skill.icon,
        })),
        6,
        { labels: false, bongo: false },
      ),
    [],
  );
  const { settings: graphics, markActive } = useAdaptiveGraphics(
    ready && active,
  );
  const environment = useMemo(
    () => ({
      ...scene.document.environment,
      shadows: graphics.shadows,
      softShadows: graphics.softShadows,
      ao: graphics.ao,
      bloom: graphics.bloom,
      contactShadows: false,
      vignette: false,
      preset: graphics.lighting ? scene.document.environment.preset : null,
    }),
    [scene, graphics],
  );
  const dpr = useMemo<[number, number]>(
    () => [0.5, Math.min(graphics.dpr, maxDpr)],
    [graphics.dpr, maxDpr],
  );
  const input = useMemo(
    () => createKeyInput(scene.keys, scene.columns),
    [scene],
  );
  const hoverSlots = useMemo(() => scene.keys.map(key => ({
    key,
    position: Object.values(scene.document.nodes).find(node =>
      node.children.includes(key.motionId),
    )!.transform.position,
  })), [scene]);
  const heldKeys = useRef<KeyboardKey[]>([]);
  // The upstream shared counter needs its private server. This port retains
  // the same counter/wear visuals, counting this browser session locally.
  const counts = useRef<Record<string, number>>({});
  const total = useRef(0);

  useEffect(() => {
    if (!ready || !api.current || !stage.current) return;
    const controller = createKeyboardMotion(
      api.current,
      scene,
      () => input.releaseAll(),
      markActive,
      stage.current,
      reducedMotion,
    );
    const counter = createCounterMotion(api.current, scene.counter, markActive);
    motion.current = controller;
    counterMotion.current = counter;
    controller.setCounterEnabled(true);
    counter.update(total.current, true);
    controller.reveal();
    return () => {
      controller.dispose();
      counter.dispose();
      motion.current = null;
      counterMotion.current = null;
    };
  }, [ready, loadVersion, scene, input, markActive, stage, reducedMotion]);

  useEffect(() => {
    motion.current?.setActive(active);
    if (!active) input.releaseAll();
  }, [active, input, ready, loadVersion, reducedMotion]);

  useEffect(() => {
    const canvas = stage.current?.querySelector("canvas");
    if (!ready || !canvas) return;
    return installHoverReleaseGuard(canvas, (object) => {
      if (!active || !object) {
        input.release("hover");
        return;
      }
      // The interactive cap sits inside its motion group and fixed grid slot.
      // Match that stable slot, independent of animated cap or material state.
      const slot = object.parent?.parent?.position;
      const key = hoverSlots.find(({ position }) => slot &&
        Math.abs(slot.x - position[0]) < 0.00001 &&
        Math.abs(slot.z - position[2]) < 0.00001,
      )?.key;
      canvas.style.cursor = key ? "pointer" : "";
      if (key) input.press("hover", key.nodeId);
      else input.release("hover");
    });
  }, [ready, loadVersion, stage, input, hoverSlots, active]);

  useEffect(
    () =>
      input.subscribe((key, pressed) => {
        markActive();
        api.current?.transitionNodeTo(
          key.nodeId,
          pressed ? key.pressedStateId : "base",
          { duration: reducedMotion ? 0 : 0.1, ease: "easeInOut" },
        );
        api.current?.setMaterial(key.materialId, {
          emissive: scene.document.materials[key.materialId].color,
          emissiveIntensity: pressed ? 0.7 : 0,
        });
        heldKeys.current = heldKeys.current.filter((held) => held !== key);
        if (pressed) {
          heldKeys.current.push(key);
          counts.current[key.skill.name] =
            (counts.current[key.skill.name] ?? 0) + 1;
          total.current += 1;
          counterMotion.current?.update(total.current, true);
          api.current?.setMaterial(
            key.materialId,
            keyWear(counts.current[key.skill.name]),
          );
        }
        const shown = heldKeys.current.at(-1) ?? null;
        onPreview(shown?.skill ?? null);
        playSound(pressed);
      }),
    [input, scene, markActive, onPreview, playSound, reducedMotion],
  );

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (
        !active ||
        event.defaultPrevented ||
        event.repeat ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        isTypingTarget(event.target)
      )
        return;
      const key = input.shortcuts.get(event.code);
      if (key) {
        input.press(`key:${event.code}`, key.nodeId);
        onSelect(key.skill);
      }
    };
    const up = (event: KeyboardEvent) => input.release(`key:${event.code}`);
    // Keep release ownership at the host too: adaptive renderer updates can
    // replace the runtime pointer tracker between down and up. release() is
    // idempotent, so the normal runtime event and this guard cannot double-play.
    const pointerUp = (event: PointerEvent) =>
      input.release(`pointer:${event.pointerId}`);
    const release = () => input.releaseAll();
    const visibility = () => {
      if (document.hidden) release();
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("pointerup", pointerUp, true);
    window.addEventListener("pointercancel", pointerUp, true);
    window.addEventListener("blur", release);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("pointerup", pointerUp, true);
      window.removeEventListener("pointercancel", pointerUp, true);
      window.removeEventListener("blur", release);
      document.removeEventListener("visibilitychange", visibility);
      release();
    };
  }, [input, active, onSelect]);

  const onPointerEvent = useCallback(
    (event: ScenePointerEvent) => {
      if (!active) return;
      const pointer = `pointer:${event.pointerId}`;
      switch (event.type) {
        case "click": {
          const key = scene.keys.find((key) => key.nodeId === event.nodeId);
          if (key) onSelect(key.skill);
          break;
        }
        case "hoverEnter":
          // Mouse hover belongs to the resting-geometry tracker.
          break;
        case "hoverExit":
          // Runtime exits can fire when a depressed cap moves under the cursor.
          break;
        case "pointerDown":
          input.press(pointer, event.nodeId);
          break;
        case "pointerUp":
        case "pointerCancel":
          input.release(pointer);
          break;
      }
    },
    [input, active, scene, onSelect],
  );
  const loaded = useCallback(() => {
    if (failed.current) return;
    setLoadVersion((version) => version + 1);
    onReady();
  }, [onReady]);
  const errored = useCallback(() => {
    failed.current = true;
    onError();
  }, [onError]);
  const event = useCallback(
    (event: RuntimeEvent) => {
      if (event.type === "contextLost") errored();
    },
    [errored],
  );

  return (
    <SceneCanvas
      document={scene.document}
      environment={environment}
      resolveAsset={resolveKeyboardAsset}
      api={api}
      style={LOCAL_SCENE_STYLE}
      dpr={dpr}
      transparent
      orbit={false}
      orthographic
      pointerTargets={scene.pointerTargets}
      onPointerEvent={onPointerEvent}
      onLoad={loaded}
      onError={errored}
      onEvent={event}
    />
  );
}
