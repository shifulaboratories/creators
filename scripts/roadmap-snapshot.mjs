// Saves the current roadmap (GitHub Issues) to src/data/roadmap-snapshot.json,
// the fallback the site uses when a build can't reach GitHub.
// Usage: npm run roadmap:snapshot   (set GITHUB_TOKEN to avoid the 60/hour limit)
import { writeFileSync } from 'node:fs';
import { fetchRoadmap } from '../src/lib/roadmap-core.mjs';

const items = await fetchRoadmap({ token: process.env.GITHUB_TOKEN });
writeFileSync(new URL('../src/data/roadmap-snapshot.json', import.meta.url), JSON.stringify({ generated: new Date().toISOString(), items }, null, '\t') + '\n');
console.log(`Saved ${items.length} roadmap items.`);
