const projects = [
	{
		title: "Webwing",
		description: "Full-stack AI travel planner that turns trip preferences into day-by-day itineraries and budget plans.",
		technologies: ["Python", "Flask", "SQLite", "SQLAlchemy", "HTML", "CSS", "JavaScript", "Google Gemini"],
		features: ["Generates structured itineraries and budgets", "Supports live AI and offline mock modes", "Stores saved trips in SQLite"],
		github: "https://github.com/Kunchapuvamsi71/webwing"
	},
	{
		title: "ChurnWise",
		description: "Full-stack customer churn prediction system with a trained machine-learning model and analytics dashboard.",
		technologies: ["JavaScript", "Python", "React", "Flask", "SQLite", "scikit-learn"],
		features: ["Predicts customer churn risk", "Tracks prediction history", "Compares model evaluation metrics"],
		github: "https://github.com/Kunchapuvamsi71/ChurnWise"
	},
	{
		title: "Personal Data Leak Detector",
		description: "Local-first application that scans pasted text and uploaded files for common personal data and secrets.",
		technologies: ["Python", "JavaScript", "HTML", "FastAPI"],
		features: ["Scans text and uploaded files", "Redacts detected values", "Does not persist scan results by default"],
		github: "https://github.com/Kunchapuvamsi71/personal-data-leak-detector"
	},
	{
		title: "Movie Universe Graph Explorer",
		description: "Explores actor connections with graph search and recommends similar movies using TF-IDF and cosine similarity.",
		technologies: ["Python", "Streamlit", "scikit-learn"],
		features: ["Finds actor connections with BFS", "Includes weighted paths with Dijkstra", "Recommends movies by content similarity"],
		github: "https://github.com/Kunchapuvamsi71/movie-graph-explorer",
		demo: "https://movie-graph-explorer-6ufrejc8vsbzyexmquwqwv.streamlit.app/"
	},
	{
		title: "Carbon Footprint Tracker",
		description: "Web app to calculate carbon emissions.",
		technologies: ["HTML"],
		github: "https://github.com/Kunchapuvamsi71/carbon-footprint-tracker-",
		demo: "https://deluxe-lamington-2fafad.netlify.app/"
	},
	{
		title: "BatTrip",
		description: "Public repository with frontend, backend, data, and machine-learning folders; GitHub does not provide a project summary.",
		technologies: ["HTML", "Python", "JavaScript", "CSS"],
		github: "https://github.com/Kunchapuvamsi71/BatTrip"
	},
	{
		title: "Webwingapp",
		description: "Responsive travel app homepage with destination browsing, itinerary planning, saved trips, and interactive navigation.",
		technologies: ["React", "JavaScript", "Vite", "Tailwind CSS", "lucide-react"],
		features: ["Destination carousel and search", "Interactive app navigation", "Saved destinations"],
		github: "https://github.com/Kunchapuvamsi71/Webwingapp"
	},
	{
		title: "Portfolio1",
		description: "Single-page personal portfolio built with plain HTML, CSS, and JavaScript.",
		technologies: ["HTML", "CSS", "JavaScript"],
		github: "https://github.com/Kunchapuvamsi71/Portfolio1"
	},
	{
		title: "portfolio-",
		description: "Static portfolio website with separate about, projects, and resume pages.",
		technologies: ["HTML", "CSS"],
		github: "https://github.com/Kunchapuvamsi71/portfolio-"
	},
	{
		title: "Webwing1",
		description: "Repository includes an HTML entry page, stylesheet, and JavaScript file; no project description is published.",
		technologies: ["HTML", "CSS", "JavaScript"],
		github: "https://github.com/Kunchapuvamsi71/Webwing1"
	},
	{
		title: "Population Area Explorer",
		description: "Repository currently has only a placeholder README title; no project description or source language is published.",
		technologies: [],
		github: "https://github.com/Kunchapuvamsi71/population-area-explorer"
	},
	{
		title: "AI Travel Planner",
		description: "This public repository is currently empty on GitHub, so no implementation details are available yet.",
		technologies: [],
		github: "https://github.com/Kunchapuvamsi71/ai-travel-planner"
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
		link.target = "_blank";
		link.rel = "noreferrer";
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
	placeholder.textContent = "Project image not added";
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
		description.textContent = "Project details have not been supplied yet. Add verified project entries in js/projects.js; add screenshots under assets/images/projects/.";
		empty.append(heading, description);
		projectGrid.append(empty);
	}
}
