import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import {
  getSkillDetails,
  SKILL_DETAILS,
} from "../src/components/skills/skillDetails.ts";
import { SKILLS } from "../src/components/skills/reference/skills.ts";
import {
  createKeyInput,
  defaultShortcut,
} from "../src/components/skills/reference/input.ts";
import type { KeyboardKey } from "../src/components/skills/reference/scene.ts";
import { createKeyWell } from "../src/components/skills/reference/key-well.ts";
import { counterDigits } from "../src/components/skills/reference/counter-model.ts";
import { createAdaptiveQuality } from "../src/components/skills/reference/adaptive-graphics.ts";
import { installHoverReleaseGuard } from "../src/components/skills/reference/hover-release.ts";
import { _roots } from "@react-three/fiber";
import {
  BoxGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  OrthographicCamera,
} from "three";

const skills = Object.values(SKILLS);
const keys: KeyboardKey[] = skills.map((skill) => ({
  skill,
  nodeId: skill.name,
  motionId: skill.name + "-motion",
  materialId: skill.name + "-material",
  pressedStateId: skill.name + "-pressed",
  labelId: skill.name + "-label",
}));

test("all configured skills have sequential IDs, local SVG icons and unique physical shortcuts", () => {
  assert.deepEqual(
    skills.map((skill) => skill.id),
    Array.from({ length: 24 }, (_, i) => i + 1),
  );
  for (const skill of skills) {
    assert.ok(skill.icon.startsWith("/assets/keyboard/logos/"));
    assert.equal(skill.icon, skill.keyboardIcon);
    const svg = readFileSync(
      new URL("../public" + skill.icon, import.meta.url),
      "utf8",
    );
    assert.match(svg, /<svg\b/);
    assert.match(svg, /viewBox=/);
    assert.match(svg, /width="512"/);
    assert.match(svg, /height="512"/);
  }
  assert.equal(createKeyInput(keys, 6).shortcuts.size, 24);
});

test("every keyboard key has separate panel content and future keys have a safe fallback", () => {
  assert.deepEqual(
    Object.keys(SKILL_DETAILS).sort(),
    skills.map((skill) => skill.name).sort(),
  );
  for (const skill of skills) {
    const details = getSkillDetails(skill);
    assert.ok(details.category.length > 0 && details.description.length > 50);
    assert.equal(details.uses.length, 3);
  }
  assert.deepEqual(
    getSkillDetails({
      name: "future-ai",
      label: "Future AI",
      shortDescription: "An additional AI technology.",
      color: "#fff",
      icon: "",
    }),
    {
      category: "Technology",
      description: "An additional AI technology.",
      uses: [],
    },
  );
});

test("the requested 24 skills follow the specified order and four physical keyboard rows", () => {
  assert.equal(skills.length, 24);
  assert.deepEqual(
    skills.map((skill) => skill.name),
    [
      "js",
      "ts",
      "react",
      "nextjs",
      "tailwind",
      "redux",
      "python",
      "fastapi",
      "nodejs",
      "postgres",
      "mongodb",
      "express",
      "langgraph",
      "langchain",
      "rag",
      "ollama",
      "pgvector",
      "huggingface",
      "docker",
      "git",
      "linux",
      "aws",
      "sqlalchemy",
      "vectordb",
    ],
  );
  assert.deepEqual(
    [0, 6, 12, 18].map((index) => defaultShortcut(index, 6, 24)),
    ["Digit1", "KeyQ", "KeyA", "KeyZ"],
  );
  assert.equal(
    new Set(skills.map((skill) => skill.keyboardColor)).size > 10,
    true,
  );
});

test("hover and touch/key sources hold a cap until the last source releases", () => {
  const input = createKeyInput(keys, 6);
  const changes: string[] = [];
  input.subscribe((key, down) => changes.push(`${key.nodeId}:${down}`));
  input.press("hover", "react");
  input.press("pointer:1", "react");
  input.release("hover", "react");
  assert.deepEqual(changes, ["react:true"]);
  input.release("pointer:1");
  assert.deepEqual(changes, ["react:true", "react:false"]);
  input.press("key:KeyQ", "tailwind");
  input.press("pointer:2", "docker");
  input.releaseAll();
  assert.ok(
    changes.includes("tailwind:false") && changes.includes("docker:false"),
  );
});

test("the original recessed well keeps the full key skirt clear", () => {
  const well = createKeyWell(
    3.67448,
    2.57744,
    5 * 1.04468 + 1,
    3 * 1.04468 + 1,
  );
  for (const mesh of [well.edge, well.shelf, well.body, well.plate]) {
    assert.ok(
      mesh.positions.length > 0 && mesh.positions.every(Number.isFinite),
    );
    assert.ok(
      mesh.faces.every(
        (face) =>
          face.length >= 3 &&
          face.every(
            (index) =>
              Number.isInteger(index) &&
              index >= 0 &&
              index < mesh.positions.length / 3,
          ),
      ),
    );
  }
});

test("reference counter formatting and adaptive graphics behave safely", () => {
  assert.equal(counterDigits(42, true), "000042");
  assert.equal(counterDigits(42, false), "------");
  assert.equal(counterDigits(-1, true), "------");
  const quality = createAdaptiveQuality();
  assert.equal(quality.observe({ mean: 40, p95: 60 }), 0);
  for (let i = 0; i < 6; i++)
    assert.equal(quality.observe({ mean: 12, p95: 15 }), null);
});

test("upstream models, all logos, press/release recordings and 3D font are byte-identical", () => {
  const manifest = JSON.parse(
    readFileSync(
      new URL("../design/reference-keyboard.json", import.meta.url),
      "utf8",
    ).replace(/^\uFEFF/, ""),
  );
  assert.equal(manifest.commit, "19a1f148edc0fc07efd6c728adc91a649bf5d0d7");
  assert.ok(manifest.assets.length >= 31);
  for (const asset of manifest.assets) {
    const path =
      asset.path === "LICENSE"
        ? "public/licenses/naresh-khatri-3d-portfolio-MIT.txt"
        : asset.path;
    const bytes = readFileSync(new URL("../" + path, import.meta.url));
    const hash = createHash("sha1")
      .update(`blob ${bytes.length}\0`)
      .update(bytes)
      .digest("hex");
    assert.equal(hash, asset.gitBlob, path);
  }
});

test("resting-cap hover stays held through repeated mouse movement and releases outside without moving the cap", async () => {
  const canvas = new (class extends EventTarget {
    getBoundingClientRect() {
      return { left: 0, top: 0, width: 400, height: 400 };
    }
  })() as unknown as HTMLCanvasElement;
  const camera = new OrthographicCamera(-2, 2, 2, -2, 0.1, 100);
  camera.position.set(0, 5, 0);
  camera.up.set(0, 0, -1);
  camera.lookAt(0, 0, 0);
  camera.updateMatrixWorld();
  const key = new Group() as Group & {
    __r3f: { handlers: { onPointerOut: () => void } };
  };
  key.__r3f = { handlers: { onPointerOut: () => undefined } };
  key.position.y = -0.45774;
  const mesh = new Mesh(new BoxGeometry(1, 0.5, 1), new MeshBasicMaterial());
  key.add(mesh);
  key.updateMatrixWorld(true);
  const root = {
    store: { getState: () => ({ camera, internal: { interaction: [key] } }) },
  };
  _roots.set(canvas, root as unknown as Parameters<typeof _roots.set>[1]);
  const oldRequest = globalThis.requestAnimationFrame;
  const oldCancel = globalThis.cancelAnimationFrame;
  globalThis.requestAnimationFrame = (callback) =>
    Number(setTimeout(() => callback(0), 0));
  globalThis.cancelAnimationFrame = (id) => clearTimeout(id);
  let releases = 0;
  const input = createKeyInput(keys, 6);
  const changes: string[] = [];
  input.subscribe((key, down) => changes.push(`${key.nodeId}:${down}`));
  const cleanup = installHoverReleaseGuard(canvas, (hit) => {
    if (hit) input.press("hover", "react");
    else {
      input.release("hover");
      releases++;
    }
  });
  try {
    const move = async (x: number, y: number) => {
      const event = Object.assign(new Event("pointermove"), {
        pointerType: "mouse",
        clientX: x,
        clientY: y,
      });
      canvas.dispatchEvent(event);
      await new Promise((resolve) => setTimeout(resolve, 10));
    };
    await move(200, 200);
    assert.equal(releases, 0);
    // Repeated motion inside a depressed cap must not play/animate/count again.
    for (let x = 180; x <= 220; x += 2) await move(x, 200);
    assert.deepEqual(changes, ["react:true"]);
    await move(10, 10);
    assert.equal(releases, 1);
    assert.deepEqual(changes, ["react:true", "react:false"]);
    assert.equal(key.position.y, -0.45774);
  } finally {
    cleanup();
    _roots.delete(canvas);
    mesh.geometry.dispose();
    mesh.material.dispose();
    globalThis.requestAnimationFrame = oldRequest;
    globalThis.cancelAnimationFrame = oldCancel;
  }
});
