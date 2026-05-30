"use client";

import { useEffect, useRef } from "react";
import type * as THREE from "three";

function createEngravingTexture(
  THREE: typeof import("three"),
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#3d3008";

  ctx.font = "600 36px Georgia, serif";
  ctx.fillText("PARPIA GOLD", canvas.width / 2, canvas.height / 2 - 120);

  ctx.font = "700 110px Georgia, serif";
  ctx.fillText("999.9", canvas.width / 2, canvas.height / 2);

  ctx.font = "600 30px Georgia, serif";
  ctx.fillText("FINE GOLD", canvas.width / 2, canvas.height / 2 + 120);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  return texture;
}

function createShadowTexture(
  THREE: typeof import("three"),
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, "rgba(0,0,0,0.55)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(canvas);
}

export default function GoldBarViewer() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let frameId = 0;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const THREE = await import("three");
      const { RoundedBoxGeometry } = await import(
        "three/examples/jsm/geometries/RoundedBoxGeometry.js"
      );
      const { RoomEnvironment } = await import(
        "three/examples/jsm/environments/RoomEnvironment.js"
      );

      if (disposed) return;

      const width = mount.clientWidth || 400;
      const height = mount.clientHeight || 400;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
      camera.position.set(0, 0.1, 4.6);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.domElement.style.display = "block";
      mount.appendChild(renderer.domElement);

      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      pmrem.dispose();

      scene.add(new THREE.AmbientLight(0xffffff, 0.3));

      const spot = new THREE.SpotLight(0xfff8e7, 2.4, 20, 0.35, 0.8);
      spot.position.set(3, 5, 5);
      scene.add(spot);

      const goldPoint = new THREE.PointLight(0xc9a227, 1, 20);
      goldPoint.position.set(-3, 1, 3);
      scene.add(goldPoint);

      const fill = new THREE.DirectionalLight(0xffeaa0, 0.7);
      fill.position.set(0, 3, -5);
      scene.add(fill);

      const barGroup = new THREE.Group();
      barGroup.rotation.set(0.06, 0.28, 0);
      scene.add(barGroup);

      const targetRotation = { x: 0.06, y: 0.28 };

      const goldMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#e8c547"),
        metalness: 1,
        roughness: 0.14,
        reflectivity: 1,
        clearcoat: 0.45,
        clearcoatRoughness: 0.08,
        envMapIntensity: 1.8,
      });

      // Vertical ingot: width × height × depth
      const barWidth = 0.88;
      const barHeight = 2.35;
      const barDepth = 0.46;

      const barGeometry = new RoundedBoxGeometry(
        barWidth,
        barHeight,
        barDepth,
        6,
        0.024,
      );
      const bar = new THREE.Mesh(barGeometry, goldMaterial);
      bar.castShadow = true;
      bar.receiveShadow = true;
      barGroup.add(bar);

      const engraving = createEngravingTexture(THREE);
      const label = new THREE.Mesh(
        new THREE.PlaneGeometry(barWidth * 0.82, barHeight * 0.72),
        new THREE.MeshBasicMaterial({
          map: engraving,
          transparent: true,
          depthWrite: false,
          toneMapped: false,
        }),
      );
      label.position.z = barDepth / 2 + 0.002;
      barGroup.add(label);

      const shadowTex = createShadowTexture(THREE);
      const shadow = new THREE.Mesh(
        new THREE.PlaneGeometry(1.6, 1.6),
        new THREE.MeshBasicMaterial({
          map: shadowTex,
          transparent: true,
          depthWrite: false,
        }),
      );
      shadow.rotation.x = -Math.PI / 2;
      shadow.position.y = -barHeight / 2 - 0.08;
      scene.add(shadow);

      const onPointerMove = (e: PointerEvent) => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = (e.clientY / window.innerHeight) * 2 - 1;
        targetRotation.x = -ny * 0.18 + 0.06;
        targetRotation.y = nx * 0.3 + 0.28;
      };
      window.addEventListener("pointermove", onPointerMove);

      const timer = new THREE.Timer();
      timer.connect(document);

      const animate = (timestamp: number) => {
        frameId = requestAnimationFrame(animate);
        timer.update(timestamp);
        const t = timer.getElapsed();

        barGroup.position.y = Math.sin(t * 0.9) * 0.05;
        barGroup.rotation.x = THREE.MathUtils.lerp(
          barGroup.rotation.x,
          targetRotation.x,
          0.06,
        );
        barGroup.rotation.y = THREE.MathUtils.lerp(
          barGroup.rotation.y,
          targetRotation.y + Math.sin(t * 0.5) * 0.03,
          0.06,
        );
        renderer.render(scene, camera);
      };
      frameId = requestAnimationFrame(animate);

      const onResize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        if (!w || !h) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      const resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(mount);

      cleanup = () => {
        window.removeEventListener("pointermove", onPointerMove);
        resizeObserver.disconnect();
        cancelAnimationFrame(frameId);
        timer.dispose();
        barGeometry.dispose();
        goldMaterial.dispose();
        engraving.dispose();
        shadowTex.dispose();
        renderer.dispose();
        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}
