// Builds the single-file live preview: preview/dist/velle.html
// Run with: npm run preview:build   (it runs the normal site build first)
import { build } from "esbuild";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "preview/dist/velle.html");

// ---- 1. styles: the site's compiled CSS, with fonts embedded ----
const homeHtml = readFileSync(join(root, ".next/server/app/index.html"), "utf8");
const cssFiles = [...homeHtml.matchAll(/<link rel="stylesheet" href="\/_next\/(static\/[^"]+\.css)"/g)].map((m) => m[1]);
if (!cssFiles.length) throw new Error("No compiled CSS found. Run `npm run build` first.");
let css = cssFiles.map((f) => readFileSync(join(root, ".next", f), "utf8")).join("\n");
css = css.replace(/url\((\.\.\/media\/[^)]+\.woff2)\)/g, (_, rel) => {
  const file = join(root, ".next/static/media", rel.split("/").pop());
  return `url(data:font/woff2;base64,${readFileSync(file).toString("base64")})`;
});
const fontClass = /<html[^>]*class="([^"]*)"/.exec(homeHtml)?.[1] ?? "";

// ---- 2. photos: embedded, with their real width and height ----
function jpegSize(buf) {
  let i = 2;
  while (i < buf.length) {
    const marker = buf[i + 1];
    const len = buf.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    i += 2 + len;
  }
  throw new Error("not a JPEG");
}
const images = {
  name: "embed-images",
  setup(b) {
    b.onLoad({ filter: /\.jpe?g$/ }, (args) => {
      const buf = readFileSync(args.path);
      const { width, height } = jpegSize(buf);
      const src = `data:image/jpeg;base64,${buf.toString("base64")}`;
      return { contents: `export default ${JSON.stringify({ src, width, height })};`, loader: "js" };
    });
  },
};

// ---- 3. the site's code, with preview stand-ins for Next.js links, images and navigation ----
const result = await build({
  entryPoints: [join(root, "preview/App.tsx")],
  bundle: true,
  write: false,
  format: "iife",
  minify: true,
  target: "es2020",
  jsx: "automatic",
  tsconfig: join(root, "tsconfig.json"),
  define: { "process.env.NODE_ENV": '"production"' },
  alias: {
    "next/link": join(root, "preview/shims/next-link.tsx"),
    "next/image": join(root, "preview/shims/next-image.tsx"),
    "next/navigation": join(root, "preview/shims/next-navigation.ts"),
  },
  plugins: [images],
  logOverride: { "unsupported-directive": "silent" },
});
const js = result.outputFiles[0].text.replace(/<\/script/gi, "<\\/script");

// ---- 4. one page ----
const extraCss = `
body { background: #F7F2EC; color: #3B2B24; }
header.sticky { top: env(safe-area-inset-top, 0px); }
`;
const page = `<title>velle</title>
<meta name="description" content="velle: hair you can't stop touching. elite, scalp-first hair care.">
<style>${css}${extraCss}</style>
<div id="velle-root" class="${fontClass} flex min-h-dvh flex-col font-sans"></div>
<script>${js}</script>
`;
if (!existsSync(dirname(out))) mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, page);
console.log(`preview built: ${out} (${(Buffer.byteLength(page) / 1e6).toFixed(2)} MB)`);
