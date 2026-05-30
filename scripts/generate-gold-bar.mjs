/**
 * Generates a beveled gold ingot GLB for the hero scene.
 * Run: node scripts/generate-gold-bar.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

// Minimal browser API polyfills for GLTFExporter in Node
if (typeof globalThis.FileReader === "undefined") {
  globalThis.Blob = class Blob {
    constructor(parts) {
      this._buffer = Buffer.concat(
        parts.map((part) =>
          Buffer.isBuffer(part) ? part : Buffer.from(part),
        ),
      );
    }
    arrayBuffer() {
      return Promise.resolve(
        this._buffer.buffer.slice(
          this._buffer.byteOffset,
          this._buffer.byteOffset + this._buffer.byteLength,
        ),
      );
    }
  };

  globalThis.FileReader = class FileReader {
    readAsArrayBuffer(blob) {
      blob.arrayBuffer().then((buffer) => {
        this.result = buffer;
        this.onloadend?.({ target: this });
      });
    }
  };
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "models");
const outFile = path.join(outDir, "gold-bar.glb");

fs.mkdirSync(outDir, { recursive: true });

const scene = new THREE.Scene();

// Standard ingot proportions (length × width × thickness), beveled edges
const geometry = new RoundedBoxGeometry(2.4, 0.2, 1.12, 6, 0.028);
const material = new THREE.MeshStandardMaterial({
  color: 0xd4af37,
  metalness: 1,
  roughness: 0.22,
  envMapIntensity: 1.2,
});

const bar = new THREE.Mesh(geometry, material);
bar.name = "GoldBar";
bar.castShadow = true;
bar.receiveShadow = true;
scene.add(bar);

const exporter = new GLTFExporter();

exporter.parse(
  scene,
  (buffer) => {
    fs.writeFileSync(outFile, Buffer.from(buffer));
    console.log(`Wrote ${outFile} (${buffer.byteLength} bytes)`);
  },
  (error) => {
    console.error("Export failed:", error);
    process.exit(1);
  },
  { binary: true },
);
