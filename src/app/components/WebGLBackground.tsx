"use client";
import { useEffect, useRef } from "react";

/**
 * Global fixed background layer.
 *
 * Reproduces the reference site's background: a slowly rotating 3D starfield
 * (380 depth-attenuated white points) plus 20 drifting orbs in the brand
 * purple (#B026FF) and pink (#FF1493), rendered with a real perspective
 * projection on a 2D canvas so it needs no WebGL dependency.
 *
 * The projection mirrors the reference's camera setup (position [0,0,10],
 * fov 75), its tints, material opacities (0.8 for stars, 0.6 for orbs) and
 * rotation rate (elapsed * 0.02).
 *
 * Star and orb counts are deliberately below the reference's 1000/50. At
 * 1:1 the field reads as flat dust rather than a starfield: the points are
 * small enough that no individual star is distinguishable, so the eye sees
 * noise instead of depth. Fewer, better-separated stars let the perspective
 * attenuation actually do its job and read as space. It also cuts per-frame
 * arc() calls by ~60%, which matters on mobile.
 *
 * Star size is deliberately scaled down from the reference's 0.15: the
 * reference gets away with it because WebGL renders points through a soft
 * sprite, whereas a hard-edged 2D arc at that size reads as a white blob.
 */

type Star = { x: number; y: number; depth: number };
type Orb = { x: number; y: number; depth: number; speed: number; tint: 0 | 1; phase: number };

const STAR_COUNT = 380;
const ORB_COUNT = 20;
const FOV = 75;
const CAM_Z = 10;
const STAR_SIZE = 0.045; // world units; tuned so depth attenuation stays visible
const ORB_RADIUS = 0.1; // world units, matches the reference sphereGeometry
const ROTATION_SPEED = 0.02; // reference: rotation.y = elapsed * 0.02
const STAR_ALPHA = 0.8; // reference: pointsMaterial opacity
const ORB_ALPHA = 0.6; // reference: meshBasicMaterial opacity
const TINTS = ["176, 38, 255", "255, 20, 147"]; // #B026FF, #FF1493
const MIN_DEPTH = 4;
const MAX_DEPTH = 30;
const OVERSCAN = 1.15;

const WebGLBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let focal = 0;
    let stars: Star[] = [];
    let orbs: Orb[] = [];
    let sprites: HTMLCanvasElement[] = [];
    let raf = 0;
    let start = 0;

    // Pre-rendered orb glow so we do not build a gradient every frame.
    const buildSprites = () => {
      sprites = TINTS.map((rgb) => {
        const size = 128;
        const c = document.createElement("canvas");
        c.width = size;
        c.height = size;
        const g = c.getContext("2d");
        if (g) {
          const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
          grad.addColorStop(0, `rgba(${rgb}, 1)`);
          grad.addColorStop(0.18, `rgba(${rgb}, 0.75)`);
          grad.addColorStop(0.45, `rgba(${rgb}, 0.22)`);
          grad.addColorStop(1, `rgba(${rgb}, 0)`);
          g.fillStyle = grad;
          g.fillRect(0, 0, size, size);
        }
        return c;
      });
    };

    // Distribute points across the view frustum so the field fills the screen
    // evenly instead of clustering in the middle of the volume.
    const buildField = () => {
      const aspect = width / Math.max(height, 1);
      const tanY = Math.tan(((FOV * Math.PI) / 180) / 2);
      const halfH = (d: number) => d * tanY;
      const halfW = (d: number) => d * tanY * aspect;

      stars = Array.from({ length: STAR_COUNT }, () => {
        const depth = MIN_DEPTH + Math.random() * (MAX_DEPTH - MIN_DEPTH);
        return {
          x: (Math.random() * 2 - 1) * halfW(depth) * OVERSCAN,
          y: (Math.random() * 2 - 1) * halfH(depth) * OVERSCAN,
          depth,
        };
      });

      orbs = Array.from({ length: ORB_COUNT }, () => {
        const depth = 3 + Math.random() * 22;
        return {
          x: (Math.random() * 2 - 1) * halfW(depth) * 1.1,
          y: (Math.random() * 2 - 1) * halfH(depth) * 1.1,
          depth,
          speed: Math.random() * 0.02 + 0.01, // reference: Math.random() * 0.02 + 0.01
          tint: Math.random() > 0.5 ? 1 : 0,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      focal = height / 2 / Math.tan(((FOV * Math.PI) / 180) / 2);
      buildField();
    };

    const render = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, width, height);

      const a = t * ROTATION_SPEED;
      const ca = Math.cos(a);
      const sa = Math.sin(a);
      const cx = width / 2;
      const cy = height / 2;
      // Resolution-relative ceiling. Uncapped, a near star reaches
      // STAR_SIZE * focal / depth, which renders as a hard white blob rather
      // than a star. Sized so only the closest stars touch it.
      const maxStarR = focal * 0.01;

      // ── Starfield ──
      for (const s of stars) {
        // Rotate the field about the Y axis.
        const zw = CAM_Z - s.depth;
        const x = s.x * ca + zw * sa;
        const depth = CAM_Z - (-s.x * sa + zw * ca);
        if (depth < 0.5) continue;

        const scale = focal / depth;
        const sx = cx + x * scale;
        const sy = cy + s.y * scale;
        if (sx < -4 || sx > width + 4 || sy < -4 || sy > height + 4) continue;

        const r = Math.min(Math.max((STAR_SIZE * focal) / depth, 0.6), maxStarR);
        // Fade with depth so near stars read as bright and far ones as dust.
        const fade = 1 - ((depth - MIN_DEPTH) / (MAX_DEPTH - MIN_DEPTH)) * 0.6;
        ctx.globalAlpha = STAR_ALPHA * fade;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Floating orbs ──
      for (const o of orbs) {
        const drift = Math.sin(t * o.speed * 60 + o.phase) * 0.9;
        const scale = focal / o.depth;
        const sx = cx + o.x * scale;
        const sy = cy + (o.y + drift) * scale;
        const r = (ORB_RADIUS * focal) / o.depth;
        if (r < 0.4) continue;

        const d = r * 3;
        ctx.globalAlpha = ORB_ALPHA * (0.8 + Math.sin(t * 0.7 + o.phase) * 0.2);
        ctx.drawImage(sprites[o.tint], sx - d / 2, sy - d / 2, d, d);
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(render);
    };

    buildSprites();
    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      start = performance.now();
      render(start);
      cancelAnimationFrame(raf);
      raf = 0;
    } else {
      start = performance.now();
      raf = requestAnimationFrame(render);
    }

    // Stop burning frames while the tab is in the background.
    const onVisibility = () => {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        start = performance.now();
        raf = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      <canvas ref={canvasRef} className="block" />
    </div>
  );
};

export default WebGLBackground;
