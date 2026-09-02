// One-off: download real bytes for Lovable *.asset.json pointers into src/assets/.
// Usage: node scripts/pull-assets.mjs https://<slug>.lovable.app
// ponytail: throwaway script, delete after assets are pulled.
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const origin = process.argv[2]?.replace(/\/$/, "");
if (!origin) {
  console.error("Pass the Lovable site origin, e.g.\n  node scripts/pull-assets.mjs https://your-app.lovable.app");
  process.exit(1);
}

const dir = "src/assets";
const pointers = (await readdir(dir)).filter((f) => f.endsWith(".asset.json"));
let ok = 0, fail = 0;

for (const p of pointers) {
  const meta = JSON.parse(await readFile(join(dir, p), "utf8"));
  const url = origin + meta.url;
  try {
    const res = await fetch(url);
    if (!res.ok) { console.error(`FAIL ${res.status}  ${meta.original_filename}  <- ${url}`); fail++; continue; }
    await writeFile(join(dir, meta.original_filename), Buffer.from(await res.arrayBuffer()));
    console.log(`ok   ${meta.original_filename}  (${(+meta.size || 0) / 1000 | 0} KB)`);
    ok++;
  } catch (e) {
    console.error(`ERR  ${meta.original_filename}: ${e.message}`); fail++;
  }
}
console.log(`\n${ok}/${pointers.length} downloaded, ${fail} failed.`);
process.exit(fail ? 1 : 0);
