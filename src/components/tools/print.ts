/**
 * Print one element on its own ("Save as PDF"): copy it into a root at the top
 * of <body>, hide everything else while printing, then clean up. Copying keeps
 * the page's own layout (sidebars, sticky bars) from leaking into the PDF.
 */
export function printSheet(sheet: HTMLElement, kind: string) {
	document.getElementById('sc-print-root')?.remove();
	const root = document.createElement('div');
	root.id = 'sc-print-root';
	root.appendChild(sheet.cloneNode(true));
	document.body.prepend(root);
	if (!document.getElementById('sc-print-style')) {
		const st = document.createElement('style');
		st.id = 'sc-print-style';
		st.textContent =
			'#sc-print-root{display:none}@media print{html.sc-printing,html.sc-printing body{background:#fff!important;height:auto!important;overflow:visible!important}html.sc-printing body>:not(#sc-print-root){display:none!important}html.sc-printing #sc-print-root{display:block}}';
		document.head.appendChild(st);
	}
	const html = document.documentElement;
	html.classList.add('sc-printing', kind);
	const done = () => {
		html.classList.remove('sc-printing', kind);
		root.remove();
		removeEventListener('afterprint', done);
	};
	addEventListener('afterprint', done);
	requestAnimationFrame(() => window.print());
}
