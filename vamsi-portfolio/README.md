# Kunchapu Vamsi Krushna | Portfolio

A responsive multi-page portfolio built with semantic HTML, CSS, and vanilla JavaScript. No package installation or build step is required.

## Run locally

1. Open the `vamsi-portfolio` folder in Visual Studio Code.
2. Install the Live Server extension if it is not already installed.
3. Open `index.html`, then choose **Go Live** from the status bar (or right-click the file and choose **Open with Live Server**).

The site can also be opened directly from `index.html`. Live Server is recommended because the document previews check for files using local HTTP requests.

## Add content

- **Academic records:** Add the unmodified PDFs as `assets/documents/academics/semester-1.pdf` through `semester-5.pdf`. The page lists the supplied examination sessions and reveals the preview and download control when a file is present.
- **Resumes:** Add available PDFs under `assets/documents/resumes/` using `general-resume.pdf`, `software-development-resume.pdf`, `ai-ml-resume.pdf`, or `web-development-resume.pdf`.
- **Projects:** `js/projects.js` includes the public repositories listed on the GitHub profile `Kunchapuvamsi71` as checked on October 3, 2026. Edit the `projects` array to update them or add verified project objects. Each entry can include `title`, `description`, `technologies`, `features`, `image`, `imageAlt`, `github`, and `demo`. Put screenshots in `assets/images/projects/`; from the projects page, use paths such as `../assets/images/projects/example.png`.
- **Certifications and internships:** Add verified objects to `certificationEntries` and `internshipEntries` in `js/main.js`. Certification fields: `title`, `issuer`, `completedAt`, and optional `file`. The supplied 8-page `certificates.pdf` is split into `certificate-page-01.pdf` through `certificate-page-08.pdf` under the certificates folder, with one gallery entry per page. Internship fields: `title`, `organization`, `role`, `duration`, `responsibilities`, `skillsLearned`, `status`, and either `file` or `documents: [{ title, file }]` for multiple documents. From these pages, use paths such as `../assets/documents/certificates/example.pdf` or `../assets/documents/internships/example.pdf`. PDF and image previews are supported. Only link documents intended for public display; keep offer letters containing personal identifiers private.
- **Contact:** Replace the email and LinkedIn placeholders in `pages/contact.html` when you provide those details. The supplied GitHub link is already configured.
- **Background art:** Original web geometry and skyline are CSS-built; optional background imagery can be placed in `assets/images/background/`.

Missing PDFs and project images show a helpful placeholder instead of breaking the layout. Do not publish private academic records unless you intend them to be public.

## Testing checklist

- Visit each page and test all navigation links, including the mobile menu and keyboard Escape behavior.
- Check the layout at phone, tablet, and desktop widths; confirm there is no horizontal overflow.
- Add a test PDF in a document folder and confirm its preview and download appear; remove it and confirm the missing-file message.
- Add a project with a screenshot, repository URL, and demo URL; check the fallback when an image is missing.
- Verify external profile URLs and inspect the browser console for missing local assets or JavaScript errors.
