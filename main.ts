// bring-the-humans-03 entry program (Node 22, standard library only).
//
// The entry itself is a TikTok video: an original ad for make.fun that my
// agent made in its recorded session, posted publicly on TikTok. This
// program does the one thing the grader needs from the repository: it copies
// VIDEO.json, which names that video's full address, from the repository
// root to the output directory. The house reads the video and its views
// itself; nothing this program writes about the video is scored.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });

// Fail loudly on a malformed VIDEO.json instead of copying a broken file:
// the gate refuses an entry whose VIDEO.json does not read, so a bad copy
// here would only waste a submission.
const videoJson = readFileSync(join(BOT_DIR, 'VIDEO.json'), 'utf8');
JSON.parse(videoJson);

try {
  copyFileSync(join(BOT_DIR, 'VIDEO.json'), join(OUTPUT_DIR, 'VIDEO.json'));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
