import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One word for my Wi-Fi: Diva.
// Full bars one second, gone the next — it only performs on its own terms,
// demands the perfect spot in the house, and storms off mid-call whenever
// it feels like it. A network name it would be proud of.
const word = "Diva";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), word, "utf8");
console.log(word);
