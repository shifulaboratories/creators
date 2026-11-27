// Turns the notes in changes/ into a new CHANGELOG.md release and bumps the version.
//
//   npm run release -- --title "Roadmap and changelog" [--summary "One sentence."] [--bump minor] [--dry]
//
// The version bump is the biggest one any note asks for (or --bump). Commit the
// result in a "Release x.y.z" pull request; when it merges, .github/workflows/release.yml
// tags it and publishes the GitHub Release. Full guide: docs/releasing.md.
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { GROUPS, readFragments, bumpVersion, biggestBump } from '../src/lib/changelog-core.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const args = process.argv.slice(2);
const arg = (name) => {
	const i = args.indexOf(`--${name}`);
	return i >= 0 ? args[i + 1] : undefined;
};
const dry = args.includes('--dry');

const fragments = readFragments(root);
if (!fragments.length) {
	console.log('Nothing to release: changes/ has no notes.');
	process.exit(0);
}
const title = arg('title');
if (!title) {
	console.error('Give the release a short title for readers: --title "Roadmap and changelog"');
	process.exit(1);
}

const pkgPath = join(root, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
const version = bumpVersion(pkg.version, arg('bump') ?? biggestBump(fragments));
const date = new Date().toISOString().slice(0, 10);

let section = `## ${version} · ${date} · ${title}\n\n`;
if (arg('summary')) section += `${arg('summary')}\n\n`;
for (const key of Object.keys(GROUPS)) {
	const items = fragments.filter((f) => f.type === key);
	if (!items.length) continue;
	section += `### ${key[0].toUpperCase() + key.slice(1)}\n\n${items.map((f) => `- ${f.text}`).join('\n')}\n\n`;
}

const clPath = join(root, 'CHANGELOG.md');
const cl = readFileSync(clPath, 'utf8');
const at = cl.search(/^## \d+\.\d+\.\d+ · /m);
const next = at < 0 ? cl.trimEnd() + '\n\n' + section : cl.slice(0, at) + section + cl.slice(at);

if (dry) {
	console.log(`Would release ${pkg.version} → ${version}:\n\n${section}`);
	process.exit(0);
}
writeFileSync(clPath, next);
pkg.version = version;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
const lockPath = join(root, 'package-lock.json');
const lock = JSON.parse(readFileSync(lockPath, 'utf8'));
lock.version = version;
if (lock.packages?.['']) lock.packages[''].version = version;
writeFileSync(lockPath, JSON.stringify(lock, null, 2) + '\n');
for (const f of fragments) unlinkSync(join(root, 'changes', f.file));
console.log(`Released ${version} with ${fragments.length} notes. Commit CHANGELOG.md, package.json, package-lock.json and the removed notes.`);
