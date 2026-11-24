// The Funniest Sick-Day Excuse — make.fun entry
// Writes one line, a sick-day excuse that is half believable with the
// twist landing at the end, to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Node 22, no dependencies, deterministic: the same line every run.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Can't come in today - my immune system called in sick first, so I'm covering its shift from bed.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

const codePoints = [...LINE];
if (codePoints.length < 1 || codePoints.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${codePoints.length}`);
}
if (LINE.trim().length === 0 || LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single non-blank line");
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Round-trip validation: read back exactly what was written.
// No trailing newline: the file is exactly the one line, so its byte
// count is the line's byte count (tie-break favours fewer bytes).
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("round-trip check failed: entry.txt differs from the entry");
}
