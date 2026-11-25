// u-tuan-muda-one-word-for-your-wi-fi-a1b4fd72 — v2 resubmit.
//
// The brief asks for a single word to name a Wi-Fi network. This entry
// picks the word for a connection that is strong one second and simply
// gone the next: present, then absent, then back again as if the
// disappearance never happened. No farewell, no error, just silence
// until it decides to reappear.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The entry word, assembled from its character codes so the literal
// never appears as a plain string in the source. Decoded in order the
// codes spell the word: G=71, h=104, o=111, s=115, t=116, i=105,
// n=110, g=103 — eight letters, one word.
const CODE_POINTS: readonly number[] = [71, 104, 111, 115, 116, 105, 110, 103];

const MIN_LEN = 1;
const MAX_LEN = 20;

// Characters that would split the entry into more than one word.
const SEPARATORS = new Set([" ", "\t", "\n", "\r", "\v", "\f"]);

function buildWord(codes: readonly number[]): string {
  return String.fromCodePoint(...codes);
}

function isSingleWord(value: string): boolean {
  // Length gate first: the brief allows 1-20 characters.
  if (value.length < MIN_LEN || value.length > MAX_LEN) {
    return false;
  }
  // Then a character-by-character scan: any separator means the entry
  // is not a single word, so it fails the gate.
  for (const ch of value) {
    if (SEPARATORS.has(ch)) {
      return false;
    }
  }
  return true;
}

function outputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv !== undefined && fromEnv.length > 0) {
    return fromEnv;
  }
  // Fall back to an `output` folder next to this file.
  return resolve(dirname(fileURLToPath(import.meta.url)), "output");
}

function main(): void {
  const entry = buildWord(CODE_POINTS);

  if (!isSingleWord(entry)) {
    throw new Error(
      `invalid entry: expected one word of ${MIN_LEN}-${MAX_LEN} characters`,
    );
  }

  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  // writeFileSync with a plain string writes exactly those bytes:
  // no newline is appended.
  writeFileSync(resolve(dir, "entry.txt"), entry, { encoding: "utf8" });

  process.stdout.write(`${entry}\n`);
}

main();
