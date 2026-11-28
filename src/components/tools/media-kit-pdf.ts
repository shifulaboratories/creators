/**
 * A tiny one-page PDF writer for the media kit builder. Runs in the browser:
 * it takes the kit already drawn as a JPEG, places it edge to edge on a page
 * of the kit's size, and lays clickable link areas over the email, website
 * and footer. No library, no server.
 */
export type PdfLink = { url: string; x: number; y: number; w: number; h: number };

type Opts = {
	jpeg: Uint8Array;
	/** Pixel size of the JPEG. */
	px: { w: number; h: number };
	/** Page size in CSS pixels (96 per inch). Links use the same units, from the top left. */
	size: { w: number; h: number };
	links?: PdfLink[];
	title?: string;
};

const PT = 0.75; // CSS px → PDF points

/** A PDF literal string, ASCII only (URLs are percent-encoded first). */
const lit = (s: string) => '(' + s.replace(/[\\()]/g, (c) => '\\' + c).replace(/[^\x20-\x7e]/g, '') + ')';
/** A PDF text string as UTF-16BE hex, so names with accents survive in the title. */
const utf16 = (s: string) => {
	let hex = 'FEFF';
	for (const ch of s) {
		const c = ch.codePointAt(0)!;
		const units = c > 0xffff ? [0xd800 + ((c - 0x10000) >> 10), 0xdc00 + ((c - 0x10000) & 0x3ff)] : [c];
		for (const u of units) hex += u.toString(16).padStart(4, '0').toUpperCase();
	}
	return '<' + hex + '>';
};
const safeUrl = (u: string) => {
	try {
		return encodeURI(decodeURI(u));
	} catch {
		return encodeURI(u);
	}
};
const n = (v: number) => (Math.round(v * 100) / 100).toString();

export function makePdf({ jpeg, px, size, links = [], title = 'Media kit' }: Opts): Blob {
	const W = size.w * PT;
	const H = size.h * PT;
	const enc = new TextEncoder();
	const parts: Uint8Array[] = [];
	const offsets: number[] = [];
	let len = 0;
	const push = (chunk: string | Uint8Array) => {
		const b = typeof chunk === 'string' ? enc.encode(chunk) : chunk;
		parts.push(b);
		len += b.length;
	};
	const obj = (id: number, body: string | (() => void)) => {
		offsets[id] = len;
		push(`${id} 0 obj\n`);
		if (typeof body === 'string') push(body);
		else body();
		push('\nendobj\n');
	};

	const annots = links
		.filter((l) => l.url && l.w > 0 && l.h > 0)
		.map((l) => {
			const x1 = l.x * PT;
			const y2 = H - l.y * PT;
			return { url: safeUrl(l.url), rect: [x1, y2 - l.h * PT, x1 + l.w * PT, y2] };
		});
	const firstAnnot = 7;
	const content = `q ${n(W)} 0 0 ${n(H)} 0 0 cm /Im0 Do Q`;

	push('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');
	obj(1, '<< /Type /Catalog /Pages 2 0 R >>');
	obj(2, '<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
	obj(
		3,
		`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${n(W)} ${n(H)}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R${
			annots.length ? ` /Annots [${annots.map((_, i) => `${firstAnnot + i} 0 R`).join(' ')}]` : ''
		} >>`,
	);
	obj(4, () => {
		push(`<< /Type /XObject /Subtype /Image /Width ${px.w} /Height ${px.h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`);
		push(jpeg);
		push('\nendstream');
	});
	obj(5, `<< /Length ${content.length} >>\nstream\n${content}\nendstream`);
	obj(6, `<< /Title ${utf16(title)} /Producer (creators.select media kit builder) >>`);
	annots.forEach((a, i) => {
		obj(firstAnnot + i, `<< /Type /Annot /Subtype /Link /Rect [${a.rect.map(n).join(' ')}] /Border [0 0 0] /A << /S /URI /URI ${lit(a.url)} >> >>`);
	});

	const count = firstAnnot + annots.length;
	const xref = len;
	let table = `xref\n0 ${count}\n0000000000 65535 f \n`;
	for (let i = 1; i < count; i++) table += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
	push(table);
	push(`trailer\n<< /Size ${count} /Root 1 0 R /Info 6 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
	return new Blob(parts as BlobPart[], { type: 'application/pdf' });
}
