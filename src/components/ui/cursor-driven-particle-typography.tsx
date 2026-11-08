"use client";

import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export interface CursorDrivenParticleTypographyProps {
  className?: string;
  text: string;
  fontSize?: number;
  fontFamily?: string;
  letterSpacing?: number;
  particleSize?: number;
  particleDensity?: number;
  dispersionStrength?: number;
  returnSpeed?: number;
  color?: string;
}

class Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx = 0;
  vy = 0;

  constructor(
    x: number,
    y: number,
    readonly size: number,
    readonly color: string,
    readonly dispersion: number,
    readonly returnSpeed: number,
  ) {
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
  }

  update(mouseX: number, mouseY: number) {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.hypot(dx, dy);
    const radius = 105;

    if (distance > 0 && distance < radius) {
      const force = ((radius - distance) / radius) * this.dispersion;
      this.vx -= (dx / distance) * force;
      this.vy -= (dy / distance) * force;
    }

    this.vx += (this.originX - this.x) * this.returnSpeed;
    this.vy += (this.originY - this.y) * this.returnSpeed;
    this.vx *= 0.82;
    this.vy *= 0.82;
    this.x += this.vx;
    this.y += this.vy;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.size, this.size);
  }

  get settled() {
    return Math.hypot(this.originX - this.x, this.originY - this.y) < 0.12
      && Math.hypot(this.vx, this.vy) < 0.08;
  }
}

export function CursorDrivenParticleTypography({
  className,
  text,
  fontSize = 120,
  fontFamily = "Switzer, sans-serif",
  letterSpacing = 0,
  particleSize = 1.5,
  particleDensity = 6,
  dispersionStrength = 15,
  returnSpeed = 0.08,
  color,
}: CursorDrivenParticleTypographyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)");
    let particles: Particle[] = [];
    let active = false;
    let visible = true;
    let mouseX = -1000;
    let mouseY = -1000;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const draw = () => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => particle.draw(context));
    };

    const stop = () => {
      if (!active) return;
      gsap.ticker.remove(tick);
      active = false;
    };

    const tick = () => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.update(mouseX, mouseY);
        particle.draw(context);
      });
      if (particles.every((particle) => particle.settled)) {
        stop();
        draw();
      }
    };

    const start = () => {
      if (active || !visible || motion.matches || coarsePointer.matches) return;
      active = true;
      gsap.ticker.add(tick);
    };

    const initialize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const ink = color || window.getComputedStyle(container).color || "#F0EEE7";
      const effectiveFontSize = Math.min(fontSize, width * 0.205);
      context.font = `700 ${effectiveFontSize}px ${fontFamily}`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = ink;
      const tracking = effectiveFontSize * letterSpacing;
      if ("letterSpacing" in context) {
        (context as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${tracking}px`;
        context.fillText(text, width / 2, height / 2, Math.max(1, width - 16));
      } else if (tracking > 0) {
        const characters = Array.from(text);
        const widths = characters.map((character) => context.measureText(character).width);
        let x = (width - widths.reduce((sum, characterWidth) => sum + characterWidth, 0) - tracking * (characters.length - 1)) / 2;
        context.textAlign = "left";
        characters.forEach((character, index) => {
          context.fillText(character, x, height / 2);
          x += widths[index] + tracking;
        });
        context.textAlign = "center";
      } else {
        context.fillText(text, width / 2, height / 2);
      }

      const pixelData = context.getImageData(0, 0, canvas.width, canvas.height);
      const step = Math.max(1, Math.floor(particleDensity * dpr));
      particles = [];
      for (let y = 0; y < pixelData.height; y += step) {
        for (let x = 0; x < pixelData.width; x += step) {
          const alpha = pixelData.data[(y * pixelData.width + x) * 4 + 3] || 0;
          if (alpha > 128) {
            particles.push(new Particle(x / dpr, y / dpr, particleSize, ink, dispersionStrength, returnSpeed));
          }
        }
      }
      context.clearRect(0, 0, width, height);
      draw();
      container.classList.toggle("is-ready", !motion.matches);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || coarsePointer.matches || motion.matches) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
      start();
    };
    const onPointerLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      start();
    };
    const onMotionChange = () => {
      if (motion.matches) {
        stop();
        container.classList.remove("is-ready");
      } else {
        container.classList.add("is-ready");
      }
      draw();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (!visible) stop();
    }, { rootMargin: "40px" });
    const resizeObserver = new ResizeObserver(() => {
      stop();
      initialize();
    });

    initialize();
    observer.observe(container);
    resizeObserver.observe(container);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    motion.addEventListener("change", onMotionChange);
    coarsePointer.addEventListener("change", onMotionChange);

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      motion.removeEventListener("change", onMotionChange);
      coarsePointer.removeEventListener("change", onMotionChange);
    };
  }, [text, fontSize, fontFamily, letterSpacing, particleSize, particleDensity, dispersionStrength, returnSpeed, color]);

  return (
    <div ref={containerRef} className={cn("componentry-particle", className)}>
      <span className="particle-fallback">{text}</span>
      <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />
    </div>
  );
}
