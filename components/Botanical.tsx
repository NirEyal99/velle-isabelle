/**
 * Hand-drawn style botanical line illustrations, drawn in code so they stay
 * crisp on every screen. Decorative only (hidden from screen readers).
 */

export type Plant = "rosemary" | "peppermint" | "rice" | "aloe" | "argan";

type P = { x: number; y: number };

// Point and direction along a quadratic curve.
function quad(a: P, c: P, b: P, t: number) {
  const u = 1 - t;
  return {
    x: u * u * a.x + 2 * u * t * c.x + t * t * b.x,
    y: u * u * a.y + 2 * u * t * c.y + t * t * b.y,
    dx: 2 * u * (c.x - a.x) + 2 * t * (b.x - c.x),
    dy: 2 * u * (c.y - a.y) + 2 * t * (b.y - c.y),
  };
}

const r = (n: number) => Math.round(n * 10) / 10;

/** A leaf shape from `base`, pointing in `angle` (radians), with given length and width. */
function leaf(base: P, angle: number, len: number, width: number, bend = 0) {
  const tip = { x: base.x + Math.cos(angle) * len, y: base.y + Math.sin(angle) * len };
  const mid = { x: (base.x + tip.x) / 2, y: (base.y + tip.y) / 2 };
  const nx = -Math.sin(angle);
  const ny = Math.cos(angle);
  const c1 = { x: mid.x + nx * (width + bend), y: mid.y + ny * (width + bend) };
  const c2 = { x: mid.x - nx * (width - bend), y: mid.y - ny * (width - bend) };
  return `M${r(base.x)} ${r(base.y)}Q${r(c1.x)} ${r(c1.y)} ${r(tip.x)} ${r(tip.y)}Q${r(c2.x)} ${r(c2.y)} ${r(base.x)} ${r(base.y)}Z`;
}

function rosemary() {
  const a = { x: 60, y: 296 }, c = { x: 40, y: 150 }, b = { x: 74, y: 8 };
  const paths: string[] = [`M${a.x} ${a.y}Q${c.x} ${c.y} ${b.x} ${b.y}`];
  for (let i = 0; i < 34; i++) {
    const t = 0.05 + (i / 34) * 0.93;
    const p = quad(a, c, b, t);
    const dir = Math.atan2(p.dy, p.dx);
    const len = 44 - t * 28;
    const side = i % 2 ? 1 : -1;
    paths.push(leaf(p, dir + side * 0.62, len, 3.2, side * 0.8));
  }
  return { viewBox: "0 0 120 300", paths, fills: [] as string[] };
}

function peppermint() {
  const paths = ["M80 296C78 220 84 140 80 40"];
  const nodes = [
    { y: 240, len: 62, w: 22 },
    { y: 175, len: 54, w: 19 },
    { y: 115, len: 44, w: 16 },
    { y: 68, len: 32, w: 12 },
  ];
  nodes.forEach((n, i) => {
    const x = 80 + (i % 2 ? 2 : -1);
    for (const side of [-1, 1]) {
      const angle = side === 1 ? -0.45 : Math.PI + 0.45;
      const base = { x, y: n.y };
      paths.push(leaf(base, angle, n.len, n.w, 3 * side));
      // centre vein
      paths.push(`M${x} ${n.y}L${r(x + Math.cos(angle) * n.len * 0.85)} ${r(n.y + Math.sin(angle) * n.len * 0.85)}`);
    }
  });
  // small leaves at the top
  paths.push(leaf({ x: 80, y: 42 }, -1.9, 26, 8, 0), leaf({ x: 80, y: 42 }, -1.2, 26, 8, 0));
  return { viewBox: "0 0 160 300", paths, fills: [] as string[] };
}

function rice() {
  const paths = [
    "M50 316C52 220 58 120 78 60",
    // long grass blades
    "M50 316C40 240 18 170 6 120",
    "M51 316C64 250 92 200 128 170",
    "M50 316C46 260 34 220 26 196",
  ];
  const fills: string[] = [];
  // grains hanging along the arching tip
  const a = { x: 78, y: 60 }, c = { x: 124, y: 0 }, b = { x: 128, y: 150 };
  for (let i = 0; i < 18; i++) {
    const t = 0.12 + (i / 18) * 0.88;
    const p = quad(a, c, b, t);
    const dir = Math.atan2(p.dy, p.dx);
    const side = i % 2 ? 1 : -1;
    const ang = dir + side * 0.9;
    const cx = p.x + Math.cos(ang) * 9;
    const cy = p.y + Math.sin(ang) * 9;
    fills.push(`${r(cx)},${r(cy)},${r((ang * 180) / Math.PI)}`);
  }
  paths.push(`M${a.x} ${a.y}Q${c.x} ${c.y} ${b.x} ${b.y}`);
  return { viewBox: "0 0 140 320", paths, fills };
}

function aloe() {
  const paths: string[] = [];
  const base = { x: 110, y: 214 };
  const leaves = [
    { a: -2.75, len: 120, w: 13 },
    { a: -2.35, len: 160, w: 15 },
    { a: -1.95, len: 190, w: 16 },
    { a: -1.6, len: 205, w: 16 },
    { a: -1.25, len: 185, w: 16 },
    { a: -0.85, len: 155, w: 15 },
    { a: -0.42, len: 118, w: 13 },
  ];
  leaves.forEach((l, i) => paths.push(leaf(base, l.a, l.len, l.w, i % 2 ? 4 : -4)));
  paths.push("M50 214H170");
  return { viewBox: "0 0 220 220", paths, fills: [] as string[] };
}

function argan() {
  const paths = ["M6 120Q120 92 214 40"];
  const fills: string[] = [];
  const a = { x: 6, y: 120 }, c = { x: 120, y: 92 }, b = { x: 214, y: 40 };
  for (let i = 0; i < 9; i++) {
    const t = 0.1 + (i / 9) * 0.88;
    const p = quad(a, c, b, t);
    const dir = Math.atan2(p.dy, p.dx);
    // a pair of leaves at each node
    paths.push(leaf(p, dir - 0.9, 30 - t * 8, 7, -1), leaf(p, dir + 0.9, 28 - t * 8, 7, 1));
  }
  // fruits hanging on short stalks
  for (const t of [0.34, 0.42, 0.7]) {
    const p = quad(a, c, b, t);
    const fx = p.x + 6, fy = p.y + 26;
    paths.push(`M${r(p.x)} ${r(p.y)}Q${r(p.x + 8)} ${r(p.y + 10)} ${r(fx)} ${r(fy - 8)}`);
    fills.push(`${r(fx)},${r(fy)},0`);
  }
  return { viewBox: "0 0 220 160", paths, fills };
}

const drawings = { rosemary, peppermint, rice, aloe, argan };

export function Botanical({ plant, className = "" }: { plant: Plant; className?: string }) {
  const { viewBox, paths, fills } = drawings[plant]();
  return (
    <svg viewBox={viewBox} className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {paths.map((d, i) => (
        <path key={i} d={d} fill={d.endsWith("Z") ? "currentColor" : "none"} fillOpacity={0.12} />
      ))}
      {fills.map((f, i) => {
        const [x, y, rot] = f.split(",").map(Number);
        return plant === "argan" ? (
          <circle key={i} cx={x} cy={y} r={8} fill="currentColor" fillOpacity={0.25} />
        ) : (
          <ellipse key={i} cx={x} cy={y} rx={8} ry={3.6} transform={`rotate(${rot} ${x} ${y})`} fill="currentColor" fillOpacity={0.2} />
        );
      })}
    </svg>
  );
}
