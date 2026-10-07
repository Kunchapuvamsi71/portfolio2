"use strict";

document.addEventListener("DOMContentLoaded", function () {

  // ============================================================
  // SETTINGS
  // ============================================================

  // Pages are inside /pages/, so we go one level up
  // to reach /assets/documents/
  const DOCUMENTS_BASE = "../assets/documents/";

  // ============================================================
  // RESUMES
  // ============================================================

  const resumes = [
    {
      title: "AI / ML Engineer",
      file: "Vamsi_AIML_Engineer_Resume.pdf",
      description:
        "A focused resume for Artificial Intelligence and Machine Learning roles."
    },
    {
      title: "Software Developer",
      file: "Vamsi_Software_Developer_Resume_2Page.pdf",
      description:
        "A focused resume for software development and programming roles."
    },
    {
      title: "Data Analyst",
      file: "Vamsi_Data_Analyst_Resume_2Page.pdf",
      description:
        "A focused resume for data analysis, Python, Pandas and visualization roles."
    },
    {
      title: "Business Development",
      file: "Vamsi_Business_Development_Resume_2Page.pdf",
      description:
        "A focused resume for business development and related opportunities."
    }
  ];

  // ============================================================
  // ACADEMICS
  // ============================================================

  const academics = [
    {
      degree:
        "Bachelor of Technology in Artificial Intelligence and Machine Learning",
      institution: "Dhanalakshmi Srinivasan University",
      duration: "2023 - 2027",
      score: "CGPA: 8.23"
    },
    {
      degree: "Intermediate",
      institution:
        "Sri Gayathri Junior College, Anantapur District",
      duration: "2021 - 2023",
      score: "Percentage: 85%"
    },
    {
      degree: "SSC",
      institution:
        "ZPH High School, Siddarampuram, Anantapur District",
      duration: "2020 - 2021",
      score: "Percentage: 93%"
    }
  ];

  // ============================================================
  // CERTIFICATIONS
  // ============================================================
  //
  // IMPORTANT:
  // Keep your existing certificate filenames here.
  // These are the filenames visible in your existing main.js.
  //

  const certifications = [
    {
      title: "Certificate 1",
      file: "averixis-ai-ml-training-certificate.pdf",
      description:
        "AI/ML training certificate from Averixis."
    },
    {
      title: "Certificate 2",
      file: "certificate-collection.pdf",
      description:
        "Combined PDF containing all my certificates in one document."
    },
    {
      title: "Certificate 3",
      file: "certificate-page-01.pdf",
      description:
        "Certificate document."
    }
  ];

  // ============================================================
  // INTERNSHIPS
  // ============================================================

  const internships = [
    {
      role: "AI/ML Intern",
      company: "Averixis Solutions Pvt. Ltd.",
      duration: "Apr 1 - May 31, 2026",
      description: [
        "Worked on artificial intelligence and machine learning related tasks.",
        "Worked with Python and data-processing tools.",
        "Collaborated with mentors and peers to complete assigned work."
      ]
    },
    {
      role: "C++ Programming Intern",
      company: "CodeAlpha",
      duration: "Jul 1 - Jul 31, 2026",
      description: [
        "Worked on core C++ programming and software-development fundamentals.",
        "Applied data structures, algorithms and object-oriented programming.",
        "Practiced writing and testing modular code."
      ]
    }
  ];

  // ============================================================
  // PROJECTS
  // ============================================================

  const projects = [
    {
      title: "Activity Performance Monitor",
      description:
        "A computer-vision based project for extracting and processing activity-related features.",
      technologies:
        "Python, OpenCV, Pandas, NumPy, Matplotlib"
    },
    {
      title: "Customer Churn Prediction",
      description:
        "Machine-learning project for predicting customer churn using cleaned and processed data.",
      technologies:
        "Python, scikit-learn, Pandas"
    },
    {
      title: "Sentiment Analysis of Product Reviews",
      description:
        "Natural-language-processing project that classifies product reviews as positive or negative.",
      technologies:
        "Python, scikit-learn, NLTK"
    }
  ];

  // ============================================================
  // HELPER FUNCTIONS
  // ============================================================

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getElement(...ids) {
    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) {
        return element;
      }
    }

    return null;
  }

  function setHTML(element, html) {
    if (element) {
      element.innerHTML = html;
    }
  }

  // ============================================================
  // MOBILE NAVIGATION
  // ============================================================

  const menuButton = document.querySelector(
    ".menu-toggle, .hamburger, #menu-toggle, #hamburger"
  );

  const navMenu = document.querySelector(
    ".nav-links, .navbar-nav, #nav-links, #nav-menu"
  );

  if (menuButton && navMenu) {
    menuButton.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      menuButton.classList.toggle("active");
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("active");
        menuButton.classList.remove("active");
      });
    });
  }

  // ============================================================
  // ACTIVE NAVIGATION LINK
  // ============================================================

  const currentPage =
    window.location.pathname.split("/").pop().toLowerCase();

  document.querySelectorAll("nav a, .nav-links a").forEach(function (link) {
    const href = link.getAttribute("href");

    if (!href) return;

    const cleanHref = href
      .split("#")[0]
      .split("?")[0]
      .split("/")
      .pop()
      .toLowerCase();

    if (
      cleanHref &&
      cleanHref === currentPage
    ) {
      link.classList.add("active");
    }
  });

  // ============================================================
  // RESUME RENDERING
  // ============================================================

  function renderResumes(container) {
    if (!container) return;

    container.innerHTML = resumes
      .map(function (resume) {
        const pdfPath = DOCUMENTS_BASE + "resumes/" + resume.file;

        return `
          <article class="resume-card">
            <div class="resume-card-content">

              <h3>${escapeHTML(resume.title)}</h3>

              <p>
                ${escapeHTML(resume.description)}
              </p>

              <div class="resume-actions">

                <a
                  href="${pdfPath}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn"
                >
                  View PDF
                </a>

                <a
                  href="${pdfPath}"
                  download
                  class="btn"
                >
                  Download PDF
                </a>

              </div>

            </div>
          </article>
        `;
      })
      .join("");
  }

  // ============================================================
  // ACADEMICS RENDERING
  // ============================================================

  function renderAcademics(container) {
    if (!container) return;

    container.innerHTML = academics
      .map(function (item) {
        return `
          <article class="academic-card">

            <h3>
              ${escapeHTML(item.degree)}
            </h3>

            <p>
              <strong>
                ${escapeHTML(item.institution)}
              </strong>
            </p>

            <p>
              ${escapeHTML(item.duration)}
            </p>

            <p>
              ${escapeHTML(item.score)}
            </p>

          </article>
        `;
      })
      .join("");
  }

  // ============================================================
  // CERTIFICATIONS RENDERING
  // ============================================================

  function renderCertifications(container) {
    if (!container) return;

    container.innerHTML = certifications
      .map(function (certificate) {

        const certificatePath =
          DOCUMENTS_BASE + certificate.file;

        return `
          <article class="certificate-card">

            <h3>
              ${escapeHTML(certificate.title)}
            </h3>

            <p>
              ${escapeHTML(certificate.description)}
            </p>

            <div class="certificate-actions">

              <a
                href="${certificatePath}"
                target="_blank"
                rel="noopener noreferrer"
                class="btn"
              >
                View Certificate
              </a>

              <a
                href="${certificatePath}"
                download
                class="btn"
              >
                Download
              </a>

            </div>

          </article>
        `;
      })
      .join("");
  }

  // ============================================================
  // INTERNSHIPS RENDERING
  // ============================================================

  function renderInternships(container) {
    if (!container) return;

    container.innerHTML = internships
      .map(function (internship) {

        const points = internship.description
          .map(function (point) {
            return `<li>${escapeHTML(point)}</li>`;
          })
          .join("");

        return `
          <article class="internship-card">

            <h3>
              ${escapeHTML(internship.role)}
            </h3>

            <h4>
              ${escapeHTML(internship.company)}
            </h4>

            <p>
              ${escapeHTML(internship.duration)}
            </p>

            <ul>
              ${points}
            </ul>

          </article>
        `;
      })
      .join("");
  }

  // ============================================================
  // PROJECTS RENDERING
  // ============================================================

  function renderProjects(container) {
    if (!container) return;

    container.innerHTML = projects
      .map(function (project) {

        return `
          <article class="project-card">

            <h3>
              ${escapeHTML(project.title)}
            </h3>

            <p>
              ${escapeHTML(project.description)}
            </p>

            <p>
              <strong>Technologies:</strong>
              ${escapeHTML(project.technologies)}
            </p>

          </article>
        `;
      })
      .join("");
  }

  // ============================================================
  // FIND COMMON CONTAINER IDs
  // ============================================================

  const resumesContainer = getElement(
    "resumes-container",
    "resume-container",
    "resumes",
    "resume-list"
  );

  const academicsContainer = getElement(
    "academics-container",
    "academic-container",
    "academics",
    "education-container"
  );

  const certificationsContainer = getElement(
    "certifications-container",
    "certification-container",
    "certifications",
    "certificate-container"
  );

  const internshipsContainer = getElement(
    "internships-container",
    "internship-container",
    "internships",
    "experience-container"
  );

  const projectsContainer = getElement(
    "projects-container",
    "project-container",
    "projects",
    "project-list"
  );

  // ============================================================
  // RENDER ALL SECTIONS
  // ============================================================

  renderResumes(resumesContainer);
  renderAcademics(academicsContainer);
  renderCertifications(certificationsContainer);
  renderInternships(internshipsContainer);
  renderProjects(projectsContainer);

  // ============================================================
  // PDF LINKS
  // ============================================================

  document.querySelectorAll("[data-pdf]").forEach(function (link) {

    const file = link.getAttribute("data-pdf");

    if (!file) return;

    link.setAttribute(
      "href",
      DOCUMENTS_BASE + file
    );

  });

  // ============================================================
  // FOOTER YEAR
  // ============================================================

  document.querySelectorAll(
    "#current-year, .current-year"
  ).forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  // ============================================================
  // SMOOTH SCROLL
  // ============================================================

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });

});
