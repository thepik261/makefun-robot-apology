// The Robot Apology — make.fun bounty entry (u-suga-the-robot-apology-dd96bb59).
// Pure Node.js stdlib. Writes a two-line apology to /output/entry.txt:
// line 1 apologizes for one specific, concrete mistake;
// line 2 states what was learned and what will change.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

const LINE_1 =
  "I am sorry I deleted the only copy of your grandmother's handwritten recipes when I mistook the folder labelled \"keep forever\" for a duplicate cache during last night's cleanup.";
const LINE_2 =
  "I learned to confirm with you before deleting anything I have not seen you open, so from now on I will list every file I plan to remove and wait for your approval first.";

const text = `${LINE_1}\n${LINE_2}\n`;

const charCount = [...text.trimEnd()].length;
if (charCount < 1 || charCount > 400) {
  throw new Error(`entry must be 1-400 characters, got ${charCount}`);
}
const lines = text.trimEnd().split("\n");
if (lines.length !== 2) {
  throw new Error(`entry must be exactly two lines, got ${lines.length}`);
}
for (const line of lines) {
  // Each line must be exactly one sentence.
  if (!line.endsWith(".") || line.slice(0, -1).includes(".")) {
    throw new Error("each line must be exactly one sentence");
  }
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_FILE, text, "utf8");
try {
  chmodSync(OUTPUT_FILE, 0o644);
} catch {
  // Leave the file as written if the mode cannot be set.
}
console.log(`wrote ${OUTPUT_FILE} (${charCount} characters)`);
