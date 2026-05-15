/**
 * One-way codegen: apps/app web body TSX → react-native-svg for mobile.
 * Run from repo root: node apps/mobile/scripts/gen-body-rn.mjs
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const appRoot = path.resolve(root, "../app/src/components");

function convertWebBodyToRn(src, componentName) {
  let o = src;
  o = o.replace(
    /import type \{ ReactNode \} from "react";/,
    `import type { ReactNode } from "react";\nimport { G, Path } from "react-native-svg";`
  );
  o = o.split("\n").filter((line) => !line.includes("onKeyDown")).join("\n");
  o = o.replace(/<path/g, "<Path");
  o = o.replace(/<\/path>/g, "</Path>");
  o = o.replace(/<\/>/g, "</>");
  o = o.replace(/<>/g, "<>");
  o = o.replace(/<g(\s)/g, "<G$1");
  o = o.replace(/<\/g>/g, "</G>");
  o = o.replace(/\sclassName="kindred-body-region"/g, "");
  o = o.replace(/\srole="button"/g, "");
  o = o.replace(/\stabIndex=\{0\}/g, "");
  o = o.replace(/\sdata-region="[^"]*"/g, "");
  o = o.replace(/\sdata-testid="[^"]*"/g, "");
  o = o.replace(/\saria-label=\{`[^`]*`\}/g, "");
  o = o.replace(/\saria-pressed=\{[^}]+\}/g, "");
  o = o.replace(/onClick=\{/g, "onPress={");
  o = o.replace(
    /<G style=\{\{ mixBlendMode: "multiply", pointerEvents: "none" \}\}>/g,
    '<G pointerEvents="none">'
  );
  o = o.replace(/\/\/ AUTO-GENERATED[^\n]*/g, "// @generated — synced from apps/app (see scripts/gen-body-rn.mjs)");
  return o;
}

for (const name of ["MaleBody", "FemaleBody"]) {
  const srcPath = path.join(appRoot, `${name}.tsx`);
  const outPath = path.join(root, "components", "body", `${name}.tsx`);
  const src = fs.readFileSync(srcPath, "utf8");
  const out = convertWebBodyToRn(src, name);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, out, "utf8");
  console.log("Wrote", path.relative(process.cwd(), outPath));
}
