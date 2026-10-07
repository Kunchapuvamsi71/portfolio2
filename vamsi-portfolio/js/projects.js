const projects = [
	{
		title: "AI Resume ATS & Skill Gap Optimizer",
		description: "AI-powered application that analyzes resume text against target job descriptions, calculates real-time ATS match scores, extracts missing skill keywords, and generates actionable tailoring recommendations.",
		technologies: ["Python", "FastAPI", "scikit-learn", "Google Gemini", "JavaScript", "HTML5", "CSS3"],
		features: ["Real-time semantic ATS match scoring", "Matched vs. missing skill breakdown badges", "Actionable AI bullet-point tailoring recommendations"],
		github: "https://github.com/Kunchapuvamsi71/ai-resume-ats-optimizer",
		demo: "../pages/demo-ats-optimizer.html"
	},
	{
		title: "ChurnWise 2.0 (Customer Churn ML Predictor)",
		description: "Full-stack predictive machine learning system for customer churn risk analysis featuring SHAP model explainability, feature importance rankings, and an interactive risk simulation dashboard.",
		technologies: ["Python", "scikit-learn", "XGBoost", "Flask", "React", "Chart.js", "SQLite"],
		features: ["Predicts customer churn risk & probability", "SHAP feature importance breakdown", "Single & batch prediction history tracking"],
		github: "https://github.com/Kunchapuvamsi71/ChurnWise",
		demo: "../pages/demo-churnwise.html"
	},
	{
		title: "Movie Universe Graph Explorer",
		description: "Graph search engine and recommendation system that explores actor co-starring connections using BFS and Dijkstra algorithms, paired with TF-IDF cosine similarity for movie recommendations.",
		technologies: ["Python", "Streamlit", "NetworkX", "scikit-learn", "Pandas"],
		features: ["Finds actor connection paths with BFS", "Weighted graph traversal with Dijkstra", "Content-based movie recommendation engine"],
		github: "https://github.com/Kunchapuvamsi71/movie-graph-explorer",
		demo: "https://movie-graph-explorer-6ufrejc8vsbzyexmquwqwv.streamlit.app/"
	},
	{
		title: "Webwing (AI Travel Itinerary Planner)",
		description: "Full-stack AI travel planner that processes trip preferences into customized day-by-day itineraries and budget breakdowns using Google Gemini AI.",
		technologies: ["Python", "Flask", "React", "Tailwind CSS", "SQLite", "Google Gemini API"],
		features: ["Generates structured AI itineraries & budget plans", "Supports live Gemini AI & offline mock modes", "Saves and manages trip plans in SQLite database"],
		github: "https://github.com/Kunchapuvamsi71/webwing"
	},
	{
		title: "Personal Data Leak Detector",
		description: "Local-first security application that scans raw text and uploaded files for sensitive personal data (PII) and secret API keys, automatically redacting flagged values.",
		technologies: ["Python", "FastAPI", "JavaScript", "HTML", "Regex Engine"],
		features: ["Scans text inputs & document uploads", "Automatic inline redaction of detected secrets", "Local-first execution with zero data retention"],
		github: "https://github.com/Kunchapuvamsi71/personal-data-leak-detector"
	}
];

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
		image.addEventListener("error", () => {
			image.replaceWith(createImagePlaceholder());
		}, { once: true });
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
		const technologies = document.createElement("ul");
		technologies.className = "project-meta";
		for (const technology of project.technologies) {
			const item = document.createElement("li");
			item.textContent = technology;
			technologies.append(item);
		}
		body.append(technologies);
	}

	if (project.features?.length) {
		const featureList = document.createElement("ul");
		featureList.className = "project-features";
		for (const feature of project.features) {
			const item = document.createElement("li");
			item.textContent = feature;
			featureList.append(item);
		}
		body.append(featureList);
	}

	const links = document.createElement("div");
	links.className = "project-links";
	for (const [label, url] of [["GitHub repository", project.github], ["Live demo", project.demo]]) {
		if (!url) continue;
		const link = document.createElement("a");
		link.className = "text-link";
		link.href = url;
		if (url.startsWith("http")) {
			link.target = "_blank";
			link.rel = "noreferrer";
		}
		link.textContent = label;
		links.append(link);
	}
	if (links.children.length) body.append(links);
	card.append(imageArea, body);
	return card;
}

function createImagePlaceholder() {
	const placeholder = document.createElement("span");
	placeholder.className = "image-placeholder";
	placeholder.textContent = "Interactive Project";
	return placeholder;
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
