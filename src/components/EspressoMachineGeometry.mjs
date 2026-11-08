import * as k from './iso/iso-kit.mjs';

// Parts: four two-piece feet; plinth, trim, four fasteners; rear wall and two
// columns; six side vents; tray, nine grate bars and four screws; saucer, cup,
// lip, inner well and handle; brew neck, two head collars, basket, two spouts,
// four lock studs and a three-piece portafilter handle; bridge, lid, warming
// tray, eleven ribs and four lid screws; gauge, thirteen ticks and needle;
// two controls, pilot lamp; steam collar, tube, grip and nozzle.

const W = 570;
const H = 430;
const BASE = { x: -96, y: -64, w: 192, d: 132, r: 8 };
const TRAY = { x: -66, y: -37, w: 132, d: 91, r: 4 };
const BRIDGE = { x: -86, y: -52, w: 172, d: 94, r: 6 };
const CUP = [0, 4];
const HEAD = [0, 4];
const GAUGE = [1, 42.3, 130];

const P = k.fitProjection(
  [
    ...k.boxCorners(BASE, -12, 12),
    ...k.boxCorners(BRIDGE, 114, 153),
    [0, 87, 79],
    [94, 57, 92],
  ],
  W,
  H,
  { pad: 29, azimuth: 43, elevation: 32 },
);

const at = (point) => k.iso(point, P);
const S = (shape, tone = 'mid', more = {}) => k.solidSvg(shape, { tone, ...more });
const L = (path, tone = 'lo', more = {}) => k.lineSvg(path, { tone, ...more });
const D = (points, size = .52, tone = 'mid') => k.dotsSvg(points.map(at), { size, tone });
const closedFace = (points, className) => `<path class="${className}" d="${k.pathOf(points.map(at), true)}"/>`;

export const needlePath = (amount = 0) => {
  const angle = -.88 + Math.max(0, Math.min(1, amount)) * 1.55;
  const [x, y, z] = GAUGE;
  return k.segment([x, y + .25, z], [x + Math.sin(angle) * 8.1, y + .25, z + Math.cos(angle) * 8.1], P);
};

export const streamPath = (lane, seconds = 0, pressure = 0) => {
  const x = lane === 0 ? -6.5 : 6.5;
  const drift = Math.sin(seconds * 5.2 + lane * 1.7) * pressure * 1.15;
  return k.pathOf([
    [x, HEAD[1], 72.8],
    [x + drift * .22, HEAD[1], 68],
    [x + drift, HEAD[1], 62],
    [x + drift * .68, HEAD[1], 57],
  ].map(at));
};

export const dropletAt = (lane, particle, seconds) => {
  const progress = (seconds * 1.35 + particle * .5 + lane * .23) % 1;
  const x = (lane === 0 ? -6.5 : 6.5) + Math.sin(seconds * 4.5 + lane) * .65;
  return at([x, HEAD[1], 72.4 - progress * 15.2]);
};

function build() {
  const out = [];

  // Feet and a substantial base keep the drawing grounded.
  out.push(`<path class="iso-halo" d="${k.haloOf(BASE, -12, 12, P)}"/>`);
  const feet = k.corners(BASE, 16).sort((a, b) => k.depthOf([a[0], a[1], -12], P) - k.depthOf([b[0], b[1], -12], P));
  for (const [x, y] of feet) {
    out.push(S(k.cylinder(x, y, 8, -12, 2, P, 24), 'lo'));
    out.push(S(k.cylinder(x, y, 5.8, -10, 6, P, 24), 'mid'));
  }
  out.push(S(k.slabOf(BASE, -4, 13, P, 8, 1.2), 'mid'));
  out.push(L(k.planOutline(k.insetPlan(BASE, 5), 9, P), 'faint'));
  const baseScrews = k.corners(BASE, 10);
  out.push(L(baseScrews.map(([x, y]) => k.ring(x, y, 1.9, 9, P, 16)).join(''), 'lo'));
  out.push(D(baseScrews.map(([x, y]) => [x, y, 9]), .5));
  out.push(S(k.slabOf({ x: -80, y: 55, w: 19, d: 7, r: 1 }, 9, .55, P, 3), 'lo', { crease: 'none' }));
  out.push(k.faceTextSvg(k.topMatrix([-70.5, 59], 9.6, P), 'DS', { size: 3, tone: 'hi', anchor: 'middle' }));

  // Open body: back wall and two pillars leave a real brew bay.
  out.push(S(k.slabOf({ x: -72, y: -51, w: 144, d: 9, r: 3 }, 9, 105, P, 5, .7), 'lo'));
  out.push(S(k.slabOf({ x: -86, y: -52, w: 19, d: 94, r: 3 }, 9, 105, P, 5, .8), 'mid'));
  out.push(S(k.slabOf({ x: 67, y: -52, w: 19, d: 94, r: 3 }, 9, 105, P, 5, .8), 'mid'));
  for (let i = 0; i < 6; i += 1) {
    const z = 39 + i * 10;
    out.push(closedFace([[86.1, -28, z], [86.1, 23, z], [86.1, 23, z + 2], [86.1, -28, z + 2]], 'espresso-vent'));
  }
  out.push(closedFace([[86.2, -43, 42], [86.2, -35, 42], [86.2, -35, 98], [86.2, -43, 98]], 'espresso-water-window'));
  out.push(closedFace([[86.3, -42, 46], [86.3, -36, 46], [86.3, -36, 73], [86.3, -42, 73]], 'espresso-water-level'));

  // Removable tray, grating, and the cup sitting directly on it.
  out.push(S(k.slabOf(TRAY, 9, 8, P, 5, .6), 'hi'));
  out.push(L(k.planOutline(k.insetPlan(TRAY, 4), 17, P), 'faint'));
  for (let i = 0; i < 9; i += 1) {
    const x = -54 + i * 13.5;
    out.push(S(k.slabOf({ x, y: -31, w: 2.7, d: 76, r: .8 }, 17, .7, P, 3), 'lo', { crease: 'none' }));
  }
  out.push(D(k.corners(TRAY, 7).map(([x, y]) => [x, y, 17.7]), .48));
  out.push(S(k.cylinder(CUP[0], CUP[1], 25, 17.7, 2.3, P, 48), 'hi'));
  out.push(L(k.ring(CUP[0], CUP[1], 22.2, 20, P, 48), 'lo'));
  out.push(S(k.cylinder(CUP[0], CUP[1], 18.4, 20, 36, P, 56, .8), 'hi', { crease: 'lo' }));
  out.push(`<path class="espresso-cup-well" d="${k.ring(CUP[0], CUP[1], 16.2, 56.1, P, 56)}"/>`);
  out.push(`<path data-part="coffee-surface" class="espresso-coffee-surface" d="${k.ring(CUP[0], CUP[1], 12.5, 56.2, P, 48)}"/>`);
  out.push(`<path data-part="crema-ring" class="espresso-crema-ring" d="${k.ring(CUP[0], CUP[1], 9.7, 56.3, P, 48)}"/>`);
  out.push(L(k.ring(CUP[0], CUP[1], 17.3, 56.3, P, 56), 'hi'));
  out.push(`<path class="espresso-cup-handle" d="${k.sideRing([20.5, 4, 39], 11, 'x', P, 40)}"/>`);
  out.push(`<path class="espresso-cup-handle-inner" d="${k.sideRing([20.5, 4, 39], 6.4, 'x', P, 40)}"/>`);
  for (const x of [-11, 11]) {
    const [sx, sy] = at([x, CUP[1], 58]);
    const [a, b] = at([x - 3, CUP[1], 66]);
    const [c, d] = at([x + 3, CUP[1], 73]);
    const [ex, ey] = at([x, CUP[1], 81]);
    out.push(`<path class="espresso-vapor" d="M${sx} ${sy} C${a} ${b} ${c} ${d} ${ex} ${ey}"/>`);
  }

  // The group is genuinely over the cup. The handle locks forward from it.
  out.push(S(k.cylinder(HEAD[0], HEAD[1], 9, 104, 11, P, 36), 'hi'));
  out.push(S(k.cylinder(HEAD[0], HEAD[1], 24, 97, 7, P, 56, .8), 'hi'));
  out.push(L(k.sideArc(HEAD[0], HEAD[1], 24, 99.5, P, 36), 'faint'));
  out.push(S(k.cylinder(HEAD[0], HEAD[1], 20.5, 85, 12, P, 48), 'mid'));
  out.push(S(k.cylinder(HEAD[0], HEAD[1], 23, 79, 6, P, 56, .6), 'hi'));
  out.push(L(k.sideArc(HEAD[0], HEAD[1], 23, 81, P, 36), 'lo'));
  const lockStuds = [[-19, -5], [19, -5], [-19, 13], [19, 13]];
  out.push(D(lockStuds.map(([x, y]) => [x, y, 85]), .52));
  for (const x of [-6.5, 6.5]) {
    out.push(S(k.cylinder(x, HEAD[1], 2.8, 73, 6, P, 20), 'hi'));
  }
  out.push(S(k.slabOf({ x: -4.4, y: 19, w: 8.8, d: 43, r: 3 }, 79.5, 4, P, 5, .4), 'hi'));
  out.push(S(k.cylinder(0, 61, 6.2, 78.4, 6, P, 28), 'mid'));
  out.push(S(k.slabOf({ x: -7.6, y: 61, w: 15.2, d: 26, r: 5.4 }, 78, 6.5, P, 8, .6), 'lo'));
  out.push(L(k.planOutline({ x: -5.5, y: 64, w: 11, d: 20, r: 4 }, 84.6, P), 'faint'));
  for (const y of [68, 73, 78, 83]) {
    out.push(S(k.slabOf({ x: -7, y, w: 14, d: .7, r: .25 }, 84.55, .18, P, 3), 'mid', { crease: 'none' }));
  }

  // Only the stream and coffee surface animate when the user starts a shot.
  for (let lane = 0; lane < 2; lane += 1) {
    out.push(`<path data-part="espresso-stream" class="espresso-stream" d="${streamPath(lane)}"/>`);
    for (let particle = 0; particle < 2; particle += 1) {
      const [cx, cy] = dropletAt(lane, particle, 0);
      out.push(`<circle data-part="espresso-droplet" class="espresso-droplet" cx="${cx}" cy="${cy}" r="1.15"/>`);
    }
  }

  // Upper bridge, panel seams, warming surface, vents and fasteners.
  out.push(S(k.slabOf(BRIDGE, 114, 34, P, 7, 1.1), 'mid', {
    inner: L(k.sideSeam(BRIDGE, 120, P, 7), 'faint'),
  }));
  out.push(S(k.slabOf(k.insetPlan(BRIDGE, 2), 148, 2.6, P, 7, .6), 'hi'));
  out.push(L(k.planOutline(k.insetPlan(BRIDGE, 6), 150.6, P), 'faint'));
  for (let i = 0; i < 11; i += 1) {
    const x = -64 + i * 12.7;
    out.push(S(k.slabOf({ x, y: -37, w: 2.1, d: 61, r: .7 }, 150.6, .35, P, 3), 'lo', { crease: 'none' }));
  }
  const lidScrews = k.corners(k.insetPlan(BRIDGE, 8), 1);
  out.push(L(lidScrews.map(([x, y]) => k.ring(x, y, 1.8, 150.8, P, 14)).join(''), 'lo'));
  out.push(D(lidScrews.map(([x, y]) => [x, y, 150.8]), .45));
  out.push(S(k.cylinder(59, -29, 10, 150.6, 2.3, P, 40), 'mid'));
  out.push(L(k.knurl(59, -29, 10, 150.8, 152.8, 34, P), 'lo'));
  out.push(L(k.ring(59, -29, 7.5, 152.9, P, 36), 'faint'));

  // An inset front gauge, physical brew control, and power indicator.
  out.push(`<path class="espresso-gauge-body" d="${k.sideRing(GAUGE, 13.6, 'y', P, 56)}"/>`);
  out.push(`<path class="espresso-gauge-face" d="${k.sideRing([GAUGE[0], GAUGE[1] + .12, GAUGE[2]], 11.2, 'y', P, 56)}"/>`);
  for (let i = 0; i <= 12; i += 1) {
    const angle = -1.14 + i * (2.28 / 12);
    const x1 = GAUGE[0] + Math.sin(angle) * 8.9;
    const z1 = GAUGE[2] + Math.cos(angle) * 8.9;
    const x2 = GAUGE[0] + Math.sin(angle) * 10.7;
    const z2 = GAUGE[2] + Math.cos(angle) * 10.7;
    out.push(L(k.segment([x1, 42.55, z1], [x2, 42.55, z2], P), i % 3 ? 'lo' : 'mid'));
  }
  out.push(`<path data-part="gauge-needle" class="espresso-gauge-needle" d="${needlePath(0)}"/>`);
  out.push(`<circle class="espresso-gauge-hub" cx="${at([GAUGE[0], 42.6, GAUGE[2]])[0]}" cy="${at([GAUGE[0], 42.6, GAUGE[2]])[1]}" r="2"/>`);
  for (const x of [-47, 47]) {
    out.push(`<path class="espresso-control" d="${k.sideRing([x, 42.3, 130], 7.2, 'y', P, 40)}"/>`);
    out.push(`<path class="espresso-control-inner" d="${k.sideRing([x, 42.4, 130], 4.9, 'y', P, 40)}"/>`);
    out.push(`<circle class="espresso-control-hub" cx="${at([x, 42.5, 130])[0]}" cy="${at([x, 42.5, 130])[1]}" r="1.6"/>`);
  }
  out.push(D([[-76, 42.6, 120], [76, 42.6, 120]], .58));
  out.push(`<circle data-part="pilot-lamp" class="espresso-pilot" cx="${at([68, 42.6, 132])[0]}" cy="${at([68, 42.6, 132])[1]}" r="2.8"/>`);

  // Steam wand: a collar, side-mounted swivel, jacket, tip and nozzle.
  out.push(S(k.cylinder(80, 25, 5.4, 92, 4, P, 28), 'hi'));
  out.push(L(k.ring(80, 25, 3.8, 96, P, 24), 'lo'));
  const wandRoute = [[80, 25, 94], [88, 29, 94], [90, 43, 79], [88, 53, 43], [84, 56, 34]];
  const wandD = k.pathOf(wandRoute.map(at));
  out.push(`<path class="espresso-wand-shadow" d="${wandD}"/>`);
  out.push(`<path class="espresso-wand" d="${wandD}"/>`);
  out.push(S(k.cylinder(88, 53, 4.8, 42, 11, P, 24), 'lo'));
  out.push(S(k.cylinder(88, 53, 5, 45, .7, P, 24), 'mid'));
  out.push(S(k.cylinder(88, 53, 5, 49, .7, P, 24), 'mid'));
  out.push(S(k.cylinder(84, 56, 2.7, 31, 4, P, 20), 'hi'));
  out.push(L(k.sideArc(84, 56, 2.7, 32.5, P, 16), 'lo'));

  return k.figureSvg({
    width: W,
    height: H,
    label: 'Detailed isometric espresso machine with portafilter, pressure gauge, steam wand and a cup beneath the brew head.',
    body: out,
    className: 'espresso-svg',
  });
}

export const ESPRESSO_SVG = build();
