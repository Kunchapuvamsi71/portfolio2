"use strict";

document.addEventListener("DOMContentLoaded", () => {
	const DOCUMENTS_BASE = "../assets/documents/";

	const certifications = [
		{ title: "Certificate 1", file: "averixis-ai-ml-training-certificate.pdf", description: "AI/ML training certificate from Averixis, covering artificial intelligence and machine learning fundamentals." },
		{ title: "Certificate 2", file: "certificate-collection.pdf", description: "Combined PDF containing all my certificates in one document." },
		{ title: "Certificate 3", file: "certificate-page-01.pdf", description: "Certificate 1 from my certificate collection." },
		{ title: "Certificate 4", file: "certificate-page-02.pdf", description: "Certificate 2 from my certificate collection." },
		{ title: "Certificate 5", file: "certificate-page-03.pdf", description: "Certificate 3 from my certificate collection." },
		{ title: "Certificate 6", file: "certificate-page-04.pdf", description: "Certificate 4 from my certificate collection." },
		{ title: "Certificate 7", file: "certificate-page-05.pdf", description: "Certificate 5 from my certificate collection." },
		{ title: "Certificate 8", file: "certificate-page-06.pdf", description: "Certificate 6 from my certificate collection." },
		{ title: "Certificate 9", file: "certificate-page-07.pdf", description: "Certificate 7 from my certificate collection." },
		{ title: "Certificate 10", file: "certificate-page-08.pdf", description: "Certificate 8 from my certificate collection." }
	];

	const internships = [
		{ title: "Internship 1", file: "internship-1.pdf", description: "AI/ML internship at Averixis. Hands-on training in artificial intelligence and machine learning, confirmed by the internship completion certificate." },
		{ title: "Internship 2", file: "internship-2.pdf", description: "C++ programming internship at CodeAlpha. Practical programming experience in C++, confirmed by the internship completion certificate." }
	];

	const resumes = [
		{ title: "AI / ML Specialization", file: "Vamsi_resume_aiml.pdf", description: "Resume focused on Artificial Intelligence, Machine Learning, Computer Vision, and Python." },
		{ title: "Software Development (Java)", file: "Vamsi_Resume_java.pdf", description: "Resume focused on C++, Java, Data Structures, Algorithms, OOP, and Web Development." },
		{ title: "General / Associate Trainee", file: "vamsi_resume_associate_traine.pdf", description: "A broad technical overview for graduate engineering, trainee, and software opportunities." },
		{ title: "Business Development", file: "vkbusinessdevelopment.pdf", description: "Resume focused on business development, client engagement, and sales strategy." },
		{ title: "Digital Marketing", file: "Kunchapu_Vamsi_Krushna_Resume_DigitalMarketing.pdf", description: "Resume focused on digital marketing, online campaigns, branding, and content growth." },
		{ title: "Learning Management System (LMS)", file: "Kunchapu_Vamsi_Krushna_Resume_LMS.pdf", description: "Resume focused on LMS platform development, EdTech tools, and web interface design." },
		{ title: "Business Development Consultant (BDC)", file: "Vamsi_Krushna_Resume_bdc.pdf", description: "Resume focused on consultative selling, relationship management, and counseling." }
	];

	document.querySelectorAll("[data-year]").forEach((element) => {
		element.textContent = new Date().getFullYear();
	});

	// Supply the same accessible skip link and mobile toggle on the standalone demos.
	const main = document.querySelector("main");
	if (main && !main.id) main.id = "main-content";
	if (main && !document.querySelector(".skip-link")) {
		const skipLink = document.createElement("a");
		skipLink.className = "skip-link";
		skipLink.href = "#main-content";
		skipLink.textContent = "Skip to content";
		document.body.prepend(skipLink);
	}

	const nav = document.querySelector(".primary-navigation");
	if (nav) {
		if (!nav.id) nav.id = "primary-navigation";
		let toggle = document.querySelector(".nav-toggle");
		if (!toggle) {
			toggle = document.createElement("button");
			toggle.className = "nav-toggle";
			toggle.type = "button";
			toggle.setAttribute("aria-expanded", "false");
			toggle.setAttribute("aria-label", "Open navigation");
			toggle.setAttribute("aria-controls", nav.id);
			toggle.innerHTML = "<span></span><span></span>";
			nav.parentElement.insertBefore(toggle, nav);
		}

		const setNavigationOpen = (open) => {
			toggle.setAttribute("aria-expanded", String(open));
			toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
			nav.classList.toggle("is-open", open);
		};

		toggle.addEventListener("click", () => {
			setNavigationOpen(toggle.getAttribute("aria-expanded") !== "true");
		});
		nav.querySelectorAll("a").forEach((link) => {
			link.addEventListener("click", () => setNavigationOpen(false));
			try {
				if (new URL(link.href).pathname === window.location.pathname) {
					link.setAttribute("aria-current", "page");
				}
			} catch {
				// Leave any existing current-page state intact for unusual URLs.
			}
		});
		document.addEventListener("keydown", (event) => {
			if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
				setNavigationOpen(false);
				toggle.focus();
			}
		});
		document.addEventListener("click", (event) => {
			if (toggle.getAttribute("aria-expanded") === "true" &&
				!nav.contains(event.target) && !toggle.contains(event.target)) {
				setNavigationOpen(false);
			}
		});
		const desktopQuery = window.matchMedia("(min-width: 1081px)");
		desktopQuery.addEventListener?.("change", (event) => {
			if (event.matches) setNavigationOpen(false);
		});
	}

	// Render document cards with native, lazy-loaded PDF previews. Avoid loading
	// PDF.js and fetching every large document as soon as the page opens.
	const observer = "IntersectionObserver" in window
		? new IntersectionObserver((entries, currentObserver) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					loadDocumentPreview(entry.target);
					currentObserver.unobserve(entry.target);
				}
			});
		}, { rootMargin: "200px 0px" })
		: null;

	function loadDocumentPreview(card) {
		const path = card.dataset.documentPath;
		const preview = card.querySelector("[data-document-preview]");
		const status = card.querySelector("[data-document-status]");
		if (!path || !preview || preview.dataset.loaded === "true") return;
		preview.dataset.loaded = "true";

		const frame = document.createElement("iframe");
		frame.className = "document-iframe";
		frame.src = path + "#view=Fit&navpanes=0";
		frame.title = (card.dataset.documentTitle || "PDF document") + " preview";
		frame.loading = "lazy";
		frame.width = "100%";
		frame.height = "290";
		frame.setAttribute("allow", "fullscreen");
		preview.replaceChildren(frame);
		if (status) status.textContent = "PDF preview loaded. Use View PDF or Download PDF if needed.";
	}

	function createDocumentCard(item, folder) {
		const card = document.createElement("article");
		card.className = "document-card";
		const path = DOCUMENTS_BASE + folder + "/" + encodeURIComponent(item.file);
		card.dataset.documentPath = path;
		card.dataset.documentTitle = item.title;

		const heading = document.createElement("h2");
		heading.textContent = item.title;
		const description = document.createElement("p");
		description.textContent = item.description || "PDF document";
		const preview = document.createElement("div");
		preview.className = "document-preview";
		preview.dataset.documentPreview = "";
		const previewMessage = document.createElement("p");
		previewMessage.className = "preview-message";
		previewMessage.textContent = "PDF preview will load as you scroll.";
		preview.append(previewMessage);

		const status = document.createElement("p");
		status.className = "document-status";
		status.dataset.documentStatus = "";
		status.setAttribute("role", "status");
		status.setAttribute("aria-live", "polite");
		status.textContent = "Preview loads on demand to save bandwidth.";

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
		download.download = item.file;
		download.textContent = "Download PDF";
		actions.append(view, download);
		card.append(heading, description, preview, status, actions);

		if (observer) observer.observe(card);
		else loadDocumentPreview(card);
		return card;
	}

	function renderList(selector, items, folder) {
		const container = document.querySelector(selector);
		if (!container) return;
		if (!items.length) {
			const message = document.createElement("p");
			message.className = "preview-message";
			message.textContent = "No documents configured.";
			container.replaceChildren(message);
			return;
		}
		container.replaceChildren(...items.map((item) => createDocumentCard(item, folder)));
	}

	renderList("[data-certification-list]", certifications, "certificates");
	renderList("[data-internship-list]", internships, "internships");
	renderList("[data-resume-list]", resumes, "resumes");

	// Academic records use document paths authored in their data attributes.
	document.querySelectorAll(".record-card[data-document-file]").forEach((card) => {
		const path = card.dataset.documentFile;
		const title = card.dataset.documentTitle || "PDF document";
		const preview = card.querySelector("[data-document-preview]");
		const status = card.querySelector("[data-document-status]");
		const view = card.querySelector("[data-document-view]");
		const download = card.querySelector("[data-document-download]");
		if (!path) return;

		if (view) {
			view.href = path;
			view.target = "_blank";
			view.rel = "noopener noreferrer";
			view.hidden = false;
		}
		if (download) {
			download.href = path;
			download.setAttribute("download", "");
			download.hidden = false;
		}
		if (preview) {
			card.dataset.documentPath = path;
			card.dataset.documentTitle = title;
			if (observer) observer.observe(card);
			else loadDocumentPreview(card);
		}
	});
});
