import { Exploded, Hub, Loupe, Plot, Relay, Settle, Terrain } from '@lucasmarkes/hairline/react';

const figures = { Exploded, Hub, Loupe, Plot, Relay, Settle, Terrain };

export default function HairlineFigure({ kind, label, play = false, className = '' }) {
  const Figure = figures[kind];
  if (!Figure) return null;
  return <Figure className={`hairline-figure ${className}`} theme="dark" intensity={0.55} label={label} play={play} />;
}
