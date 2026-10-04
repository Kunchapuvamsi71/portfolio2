"use strict";

document.addEventListener("DOMContentLoaded", function () {

	// =====================================================
	// SETTINGS - EDIT THESE
	// =====================================================

	// Folder path from the PAGE (html file) to the documents folder.
	// - Pages inside a subfolder (e.g. pages/certifications.html): "../assets/documents/"
	// - Pages in the same folder as index.html and assets:         "assets/documents/"
	const DOCUMENTS_BASE = "../assets/documents/";

	// Put your PDFs here:
	//   assets/documents/certificates/<file>
	//   assets/documents/internships/<file>
	// "file" must match the real filename EXACTLY (capitals, spaces, .pdf)

	const certifications = [
		{
			title: "Certificate 1",
			file: "averixis-ai-ml-training-certificate.pdf",
			description: "AI/ML training certificate from Averixis, covering artificial intelligence and machine learning fundamentals."
		},
		{
			title: "Certificate 2",
			file: "certificate-collection.pdf",
			description: "Combined PDF containing all my certificates in one document."
		},
		{
			title: "Certificate 3",
			file: "certificate-page-01.pdf",
			description: "Certificate 1 from my certificate collection."
		},
		{
			title: "Certificate 4",
			file: "certificate-page-02.pdf",
			description: "Certificate 2 from my certificate collection."
		},
		{
			title: "Certificate 5",
			file: "certificate-page-03.pdf",
			description: "Certificate 3 from my certificate collection."
		},
		{
			title: "Certificate 6",
			file: "certificate-page-04.pdf",
			description: "Certificate 4 from my certificate collection."
		},
		{
			title: "Certificate 7",
			file: "certificate-page-05.pdf",
			description: "Certificate 5 from my certificate collection."
		},
		{
			title: "Certificate 8",
			file: "certificate-page-06.pdf",
			description: "Certificate 6 from my certificate collection."
		},
		{
			title: "Certificate 9",
			file: "certificate-page-07.pdf",
			description: "Certificate 7 from my certificate collection."
		},
		{
			title: "Certificate 10",
			file: "certificate-page-08.pdf",
			description: "Certificate 8 from my certificate collection."
		}
		// Add more: { title: "...", file: "...", description: "..." },
	];

	const internships = [
		{
			title: "Internship 1",
			file: "internship-1.pdf",
			description: "AI/ML internship at Averixis. Hands-on training in artificial intelligence and machine learning, confirmed by the internship completion certificate."
		},
		{
			title: "Internship 2",
			file: "internship-2.pdf",
			description: "C++ programming internship at CodeAlpha. Practical programming experience in C++, confirmed by the internship completion certificate."
		}
		// Add more: { title: "...", file: "...", description: "..." },
	];

	// =====================================================
	// FOOTER YEAR
	// =====================================================
	document.querySelectorAll("[data-year]").forEach(function (el) {
		el.textContent = new Date().getFullYear();
	});

	// =====================================================
	// MOBILE NAVIGATION
	// =====================================================
	const toggle = document.querySelector(".nav-toggle");
	const nav = document.querySelector(".primary-navigation");

	if (toggle && nav) {
		toggle.addEventListener("click", function () {
			const open = toggle.getAttribute("aria-expanded") !== "true";
			toggle.setAttribute("aria-expanded", String(open));
			toggle.setAttribute(
				"aria-label",
				open ? "Close navigation" : "Open navigation"
			);
			nav.classList.toggle("is-open", open);
		});

		nav.querySelectorAll("a").forEach(function (link) {
			link.addEventListener("click", function () {
				toggle.setAttribute("aria-expanded", "false");
				toggle.setAttribute("aria-label", "Open navigation");
				nav.classList.remove("is-open");
			});
		});
	}

	// =====================================================
	// ACADEMICS + RESUME PDF PREVIEWS
	// =====================================================
	document.querySelectorAll(
		".record-card[data-document-file], .document-card[data-document-file]"
	).forEach(function (card) {
		const file = card.dataset.documentFile;
		const title = card.dataset.documentTitle || "PDF document";
		const preview = card.querySelector("[data-document-preview]");
		const status = card.querySelector("[data-document-status]");
		const view = card.querySelector("[data-document-view]");
		const download = card.querySelector("[data-document-download]");

		if (!file) return;

		if (view) {
			view.href = file;
			view.target = "_blank";
			view.rel = "noopener noreferrer";
			view.hidden = false;
		}

		if (download) {
			download.href = file;
			download.setAttribute("download", "");
			download.hidden = false;
		}

		if (preview) {
			const iframe = document.createElement("iframe");
			iframe.src = file;
			iframe.title = title + " PDF preview";
			iframe.className = "document-iframe";
			iframe.width = "100%";
			iframe.height = "420";
			iframe.loading = "lazy";
			iframe.setAttribute("style", "border:0; width:100%;");
			preview.replaceChildren(iframe);
		}

		fetch(file, { method: "HEAD" })
			.then(function (response) {
				if (!response.ok) {
					throw new Error("PDF not found");
				}
				if (status) status.textContent = "PDF file found.";
			})
			.catch(function () {
				if (status) {
					status.textContent =
						"PDF not found. Check the filename and relative path.";
				}
			});
	});

	// =====================================================
	// PDF PREVIEW (fits the whole page inside the card)
	// =====================================================
	const PDFJS_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
	const PDFJS_WORKER = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
	let pdfJsPromise = null;

	function loadPdfJs() {
		if (pdfJsPromise) return pdfJsPromise;
		pdfJsPromise = new Promise(function (resolve, reject) {
			if (window.pdfjsLib) {
				resolve(window.pdfjsLib);
				return;
			}
			const script = document.createElement("script");
			script.src = PDFJS_URL;
			script.onload = function () {
				window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
				resolve(window.pdfjsLib);
			};
			script.onerror = function () {
				reject(new Error("Could not load PDF.js"));
			};
			document.head.appendChild(script);
		});
		return pdfJsPromise;
	}

	function fallbackIframe(path, preview, title) {
		const iframe = document.createElement("iframe");
		iframe.className = "document-iframe";
		iframe.src = path + "#view=Fit&navpanes=0";
		iframe.title = title + " PDF preview";
		iframe.width = "100%";
		iframe.height = "420";
		iframe.setAttribute("style", "border:0; width:100%;");
		preview.replaceChildren(iframe);
	}

	function renderPdfPreview(path, preview, title) {
		preview.textContent = "Loading preview...";

		loadPdfJs()
			.then(function (pdfjsLib) {
				return pdfjsLib.getDocument(path).promise;
			})
			.then(function (pdf) {
				return pdf.getPage(1);
			})
			.then(function (page) {
				const baseViewport = page.getViewport({ scale: 1 });
				const cardWidth = preview.clientWidth || 600;
				const ratio = window.devicePixelRatio || 1;
				const viewport = page.getViewport({
					scale: (cardWidth / baseViewport.width) * ratio
				});

				const canvas = document.createElement("canvas");
				canvas.width = viewport.width;
				canvas.height = viewport.height;
				canvas.style.width = "100%";
				canvas.style.height = "auto";
				canvas.style.display = "block";
				canvas.setAttribute("role", "img");
				canvas.setAttribute("aria-label", title + " PDF preview");

				return page
					.render({
						canvasContext: canvas.getContext("2d"),
						viewport: viewport
					})
					.promise.then(function () {
						preview.replaceChildren(canvas);
					});
			})
			.catch(function () {
				fallbackIframe(path, preview, title);
			});
	}

	// =====================================================
	// CERTIFICATIONS + INTERNSHIPS
	// =====================================================
	function createCard(item, folder) {
		const card = document.createElement("article");
		card.className = "document-card";

		const title = document.createElement("h2");
		title.textContent = item.title;

		const description = document.createElement("p");
		description.textContent = item.description || "PDF document";

		// encodeURIComponent handles spaces/special characters in filenames
		const path = DOCUMENTS_BASE + folder + "/" + encodeURIComponent(item.file);

		const preview = document.createElement("div");
		preview.className = "document-preview";

		// Draw page 1 of the PDF as an image that fits the card width.
		// If that fails (e.g. no internet), fall back to a normal PDF viewer.
		renderPdfPreview(path, preview, item.title);

		const status = document.createElement("p");
		status.className = "preview-message";
		status.textContent = "Checking PDF...";

		fetch(path, { method: "HEAD" })
			.then(function (response) {
				if (!response.ok) throw new Error("PDF not found");
				status.textContent = "PDF file found.";
			})
			.catch(function () {
				status.textContent =
					"PDF not found. Check the filename and folder: " + path;
			});

		const actions = document.createElement("div");
		actions.className = "document-actions";

		const view = document.createElement("a");
		view.className = "button-small";
		view.href = path;
		view.target = "_blank";
		view.rel = "noopener noreferrer";
		view.textContent = "View PDF";

		const download = document.createElement("a");
		download.className = "button-small";
		download.href = path;
		download.setAttribute("download", item.file);
		download.textContent = "Download PDF";

		actions.append(view, download);
		card.append(title, description, preview, status, actions);

		return card;
	}

	function renderList(selector, items, folder) {
		const container = document.querySelector(selector);
		if (!container) return;

		if (items.length > 0) {
			container.replaceChildren(
				...items.map(function (item) {
					return createCard(item, folder);
				})
			);
		} else {
			const message = document.createElement("p");
			message.className = "preview-message";
			message.textContent =
				"No documents configured. Add your PDF filenames to main.js.";
			container.replaceChildren(message);
		}
	}

	renderList("[data-certification-list]", certifications, "certificates");
	renderList("[data-internship-list]", internships, "internships");

});