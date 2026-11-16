"use strict";

const projects = [
	{
		title: "Activity Performance Monitor",
		description: "Real-time computer vision pipeline engineered using OpenCV for feature extraction, activity classification, and multivariate time-series performance analytics.",
		technologies: ["Python", "OpenCV", "Pandas", "NumPy", "Matplotlib", "Computer Vision"],
		features: ["Real-time video feature extraction", "Multivariate activity classification pipeline", "Matplotlib analytics dashboard for trend reporting"],
		github: "https://github.com/Kunchapuvamsi71/portfolio2/tree/main/projects/activity-performance-monitor",
		demo: "../pages/demo-activity-monitor.html"
	},
	{
		title: "AI Resume ATS & Skill Gap Optimizer",
		description: "AI-powered application that analyzes resume text against target job descriptions, calculates ATS match scores, extracts missing skill keywords, and generates actionable tailoring recommendations.",
		technologies: ["Python", "FastAPI", "scikit-learn", "Google Gemini", "JavaScript", "HTML5", "CSS3"],
		features: ["Real-time semantic ATS match scoring", "Matched vs. missing skill breakdown badges", "Actionable AI bullet-point tailoring recommendations"],
		github: "https://github.com/Kunchapuvamsi71/portfolio2/tree/main/projects/ai-resume-ats-optimizer",
		demo: "../pages/demo-ats-optimizer.html"
	},
	{
		title: "ChurnWise 2.0 (Customer Churn ML Predictor)",
		description: "Full-stack predictive machine learning system for customer churn risk analysis featuring model explainability, feature importance rankings, and an interactive risk simulation demo.",
		technologies: ["Python", "scikit-learn", "XGBoost", "Flask", "React", "Chart.js", "SQLite"],
		features: ["Predicts customer churn risk and probability", "Feature-importance breakdown", "Single and batch prediction history tracking"],
		github: "https://github.com/Kunchapuvamsi71/ChurnWise",
		demo: "../pages/demo-churnwise.html"
	},
	{
		title: "Movie Universe Graph Explorer",
		description: "Graph search engine and recommendation system exploring actor co-starring connections with BFS and Dijkstra algorithms, alongside TF-IDF cosine-similarity recommendations.",
		technologies: ["Python", "Streamlit", "NetworkX", "scikit-learn", "Pandas"],
		features: ["Finds actor connection paths with BFS", "Weighted graph traversal with Dijkstra", "Content-based movie recommendations"],
		github: "https://github.com/Kunchapuvamsi71/movie-graph-explorer",
		demo: "https://movie-graph-explorer-6ufrejc8vsbzyexmquwqwv.streamlit.app/"
	},
	{
		title: "Webwing (AI Travel Itinerary Planner)",
		description: "Full-stack AI travel planner that turns trip preferences into customized day-by-day itineraries and budget breakdowns using Google Gemini AI.",
		technologies: ["Python", "Flask", "React", "Tailwind CSS", "SQLite", "Google Gemini API"],
		features: ["Generates structured AI itineraries and budget plans", "Supports live Gemini AI and offline mock modes", "Saves and manages trip plans in SQLite"],
		github: "https://github.com/Kunchapuvamsi71/webwing"
	},
	{
		title: "Personal Data Leak Detector",
		description: "Local-first security application that scans text and uploaded files for sensitive personal data and secret API keys, automatically redacting flagged values.",
		technologies: ["Python", "FastAPI", "JavaScript", "HTML", "Regex Engine"],
		features: ["Scans text inputs and document uploads", "Automatically redacts detected secrets", "Local-first execution with no data retention"],
		github: "https://github.com/Kunchapuvamsi71/personal-data-leak-detector"
	}
];

function createImagePlaceholder() {
	const placeholder = document.createElement("span");
	placeholder.className = "image-placeholder";
	placeholder.textContent = "Interactive Project";
	return placeholder;
}

function createProjectCard(project) {
	const card = document.createElement("article");
	card.className = "project-card";

	const imageArea = document.createElement("div");
	imageArea.className = "project-image";
	if (project.image) {
		const image = document.createElement("img");
		image.src = project.image;
		image.alt = project.imageAlt || `${project.title} project screenshot`;
		image.loading = "lazy";
		image.decoding = "async";
		image.addEventListener("error", () => image.replaceWith(createImagePlaceholder()), { once: true });
		imageArea.append(image);
	} else {
		imageArea.append(createImagePlaceholder());
	}

	const body = document.createElement("div");
	body.className = "project-body";
	const title = document.createElement("h2");
	title.textContent = project.title;
	const description = document.createElement("p");
	description.textContent = project.description;
	body.append(title, description);

	if (project.technologies?.length) {
		const list = document.createElement("ul");
		list.className = "project-meta";
		project.technologies.forEach((technology) => {
			const item = document.createElement("li");
			item.textContent = technology;
			list.append(item);
		});
		body.append(list);
	}
	if (project.features?.length) {
		const list = document.createElement("ul");
		list.className = "project-features";
		project.features.forEach((feature) => {
			const item = document.createElement("li");
			item.textContent = feature;
			list.append(item);
		});
		body.append(list);
	}

	const links = document.createElement("div");
	links.className = "project-links";
	[["GitHub repository", project.github], ["Live demo", project.demo]].forEach(([label, url]) => {
		if (!url) return;
		const link = document.createElement("a");
		link.className = "text-link";
		link.href = url;
		if (/^https?:\/\//i.test(url)) {
			link.target = "_blank";
			link.rel = "noopener noreferrer";
		}
		link.textContent = label;
		links.append(link);
	});
	if (links.childElementCount) body.append(links);
	card.append(imageArea, body);
	return card;
}

const projectGrid = document.querySelector("[data-project-grid]");
if (projectGrid) {
	if (projects.length) {
		projectGrid.replaceChildren(...projects.map(createProjectCard));
	} else {
		const empty = document.createElement("section");
		empty.className = "empty-state project-empty";
		const heading = document.createElement("h2");
		heading.textContent = "Projects will appear here";
		const description = document.createElement("p");
		description.textContent = "Project details have not been supplied yet.";
		empty.append(heading, description);
		projectGrid.append(empty);
	}
}
