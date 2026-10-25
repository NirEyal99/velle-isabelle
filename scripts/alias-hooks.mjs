// Lets plain Node understand the project's "@/..." import shortcut (used by the tests).
import { pathToFileURL } from "node:url";
const root = pathToFileURL(process.cwd() + "/");
export async function resolve(specifier, context, next) {
  if (specifier.startsWith("@/")) {
    const file = specifier.slice(2) + (/\.\w+$/.test(specifier) ? "" : ".ts");
    return next(new URL(file, root).href, context);
  }
  return next(specifier, context);
}
