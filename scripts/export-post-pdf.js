#!/usr/bin/env bun

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, extname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = resolve(import.meta.dirname, '..');
const POSTS_DIR = join(ROOT, 'src', 'posts');
const OUT_DIR = join(ROOT, 'output', 'pdf');
const TMP_DIR = join(ROOT, 'tmp', 'pdf-export');

const input = process.argv[2];
const outputArg = process.argv[3];

if (!input) {
	console.error('Usage: bun run export:post-pdf <slug-or-path> [output.pdf]');
	process.exit(1);
}

const sourcePath = resolveSourcePath(input);
const slug = basename(sourcePath, extname(sourcePath));
const outputPath = outputArg ? resolve(ROOT, outputArg) : join(OUT_DIR, `${slug}.pdf`);
const preparedMarkdownPath = join(TMP_DIR, `${slug}.pdf.md`);

const source = readFileSync(sourcePath, 'utf8');
const { frontmatter, markdown } = splitFrontmatter(source);
const title = frontmatter.title ?? slug;
const description = frontmatter.description ?? '';

requireCommand('pandoc');
requireCommand('typst');

mkdirSync(OUT_DIR, { recursive: true });
mkdirSync(TMP_DIR, { recursive: true });
writeFileSync(preparedMarkdownPath, renderMarkdown({ title, description, markdown }), 'utf8');

const result = spawnSync(
	'pandoc',
	[
		preparedMarkdownPath,
		'--from',
		'gfm',
		'--to',
		'pdf',
		'--pdf-engine',
		'typst',
		'--standalone',
		'--metadata',
		`title=${title}`,
		'--variable',
		'papersize=us-letter',
		'--variable',
		'mainfont=New Computer Modern',
		'--output',
		outputPath
	],
	{ encoding: 'utf8' }
);

if (result.status !== 0) {
	console.error(result.stderr || result.stdout || 'Pandoc PDF export failed.');
	process.exit(result.status ?? 1);
}

console.log(`Exported ${relativeToRoot(outputPath)}`);

function resolveSourcePath(value) {
	const candidates = [
		resolve(ROOT, value),
		resolve(ROOT, `${value}.md`),
		join(POSTS_DIR, value),
		join(POSTS_DIR, `${value}.md`)
	];

	const found = candidates.find((candidate) => existsSync(candidate));
	if (!found) {
		console.error(`Unable to find Markdown post for "${value}".`);
		console.error('Pass a slug like "post-agentic-libraries" or a path to a Markdown file.');
		process.exit(1);
	}

	return found;
}

function splitFrontmatter(source) {
	if (!source.startsWith('---\n')) return { frontmatter: {}, markdown: source };

	const end = source.indexOf('\n---', 4);
	if (end === -1) return { frontmatter: {}, markdown: source };

	const frontmatterSource = source.slice(4, end).trim();
	const markdown = source.slice(end + 4).trim();
	const frontmatter = {};

	for (const line of frontmatterSource.split('\n')) {
		const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
		if (!match) continue;

		const [, key, rawValue] = match;
		frontmatter[key] = rawValue.trim().replace(/^['"]|['"]$/g, '');
	}

	return { frontmatter, markdown };
}

function renderMarkdown({ title, description, markdown }) {
	const titleBlock = [`# ${title}`];

	if (description) {
		titleBlock.push('', `_${description}_`);
	}

	const body = markdown.replace(/^# .+?$(\r?\n)+/, '').trim();
	return `${titleBlock.join('\n')}\n\n${body}\n`;
}

function requireCommand(command) {
	const result = spawnSync('which', [command], { encoding: 'utf8' });
	if (result.status !== 0) {
		console.error(`Missing required command: ${command}`);
		console.error(`Install ${command} and rerun the export.`);
		process.exit(1);
	}
}

function relativeToRoot(path) {
	return path.startsWith(ROOT) ? path.slice(ROOT.length + 1) : path;
}
