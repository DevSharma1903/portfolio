import { useEffect, useRef, useState } from 'react';
import { dropletAt, ESPRESSO_SVG, needlePath, streamPath } from './EspressoMachineGeometry.mjs';
import './iso/iso.css';
import './EspressoMachine.css';

export function EspressoMachine() {
  const rootRef = useRef(null);
  const pressureRef = useRef(0);
  const startedAtRef = useRef(0);
  const vaporTimerRef = useRef(0);
  const [brewing, setBrewing] = useState(false);

  useEffect(() => () => window.clearTimeout(vaporTimerRef.current), []);

  useEffect(() => {
    const root = rootRef.current;
    const needle = root?.querySelector('[data-part="gauge-needle"]');
    const streams = root?.querySelectorAll('[data-part="espresso-stream"]');
    const droplets = root?.querySelectorAll('[data-part="espresso-droplet"]');
    if (!root || !needle || !streams || !droplets) return;

    const target = brewing ? 1 : 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      pressureRef.current = target;
      needle.setAttribute('d', needlePath(target));
      root.dataset.flowing = String(brewing);
      if (brewing) root.dataset.coffee = 'true';
      return;
    }

    let frame = 0;
    let last = performance.now();
    let visible = true;
    const schedule = () => {
      if (visible && !document.hidden && !frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    const tick = (now) => {
      frame = 0;
      const dt = Math.min(Math.max((now - last) / 1000, 0), 1 / 30);
      last = now;
      pressureRef.current += (target - pressureRef.current) * (1 - Math.exp(-dt / .34));
      if (Math.abs(target - pressureRef.current) < .002) pressureRef.current = target;
      needle.setAttribute('d', needlePath(pressureRef.current));

      if (brewing) {
        const seconds = Math.max(0, (now - startedAtRef.current) / 1000);
        const flowing = pressureRef.current > .16;
        root.dataset.flowing = String(flowing);
        if (seconds > 1.05) root.dataset.coffee = 'true';
        streams.forEach((stream, lane) => stream.setAttribute('d', streamPath(lane, seconds, pressureRef.current)));
        droplets.forEach((drop, index) => {
          const [x, y] = dropletAt(Math.floor(index / 2), index % 2, seconds);
          drop.setAttribute('cx', x);
          drop.setAttribute('cy', y);
        });
      }

      if (brewing || pressureRef.current !== target) schedule();
    };
    const observer = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      if (visible) schedule();
      else if (frame) { cancelAnimationFrame(frame); frame = 0; }
    }, { rootMargin: '100px 0px' });
    const onVisibility = () => {
      if (document.hidden && frame) { cancelAnimationFrame(frame); frame = 0; }
      else schedule();
    };
    observer.observe(root);
    document.addEventListener('visibilitychange', onVisibility);
    schedule();
    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [brewing]);

  const toggleBrew = () => {
    const root = rootRef.current;
    window.clearTimeout(vaporTimerRef.current);
    if (brewing) {
      if (root) {
        root.dataset.flowing = 'false';
        root.dataset.vapor = root.dataset.coffee === 'true' ? 'true' : 'false';
        if (root.dataset.vapor === 'true') {
          vaporTimerRef.current = window.setTimeout(() => { root.dataset.vapor = 'false'; }, 4200);
        }
      }
      setBrewing(false);
      return;
    }
    startedAtRef.current = performance.now();
    if (root) {
      root.dataset.coffee = 'false';
      root.dataset.vapor = 'false';
    }
    setBrewing(true);
  };

  return (
    <figure className="espresso-figure iso" ref={rootRef} data-brewing={brewing}>
      <div className="espresso-plate">
        <div className="espresso-plate-top" aria-hidden="true"><span>STUDY</span><span>PRESSURE / FLOW</span></div>
        <div className="espresso-art" dangerouslySetInnerHTML={{ __html: ESPRESSO_SVG }} />
        <div className="espresso-plate-bottom">
          <div className="espresso-readout"><span className="espresso-status">{brewing ? 'Extracting' : 'Ready'}</span></div>
          <span className="sr-only" role="status" aria-live="polite">{brewing ? 'Espresso extraction started' : 'Espresso extraction stopped'}</span>
          <button type="button" className="espresso-brew-button" aria-pressed={brewing} onClick={toggleBrew}>{brewing ? 'Stop shot' : 'Pull a shot'}</button>
        </div>
      </div>
      <figcaption>Portafilter, pressure gauge, and steam wand.</figcaption>
    </figure>
  );
}
