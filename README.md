# Kunchapu Vamsi Krushna - Portfolio

A personal portfolio website built with plain HTML, CSS and JavaScript. It showcases my skills, projects, academics, resume, certifications and internships.

## Live Demo

**https://kunchapuvamsi71.github.io/portfolio2/vamsi-portfolio/**

## Pages

- **Home** (`index.html`)
- **About** (`pages/about.html`)
- **Skills** (`pages/skills.html`)
- **Projects** (`pages/projects.html`)
- **Academics** (`pages/academics.html`)
- **Resume** (`pages/resume.html`)
- **Certifications** (`pages/certifications.html`)
- **Internships** (`pages/internships.html`)
- **Contact** (`pages/contact.html`)

## Project structure

```
vamsi-portfolio/
├── index.html
├── pages/            # All other pages
├── css/
│   ├── style.css
│   ├── pages.css
│   └── responsive.css
├── js/
│   └── main.js       # Navigation, PDF previews, certificates and internships lists
└── assets/
    ├── documents/
    │   ├── certificates/
    │   ├── internships/
    │   └── resumes/
    ├── icons/
    └── images/
        ├── background/
        └── projects/
```

## Run locally

1. Install the **Live Server** extension in VS Code.
2. Open the project folder in VS Code.
3. Right-click `index.html` and choose **Open with Live Server**.

## Add or change certificates and internships

Open `js/main.js` and edit the `certifications` or `internships` list near the top:

```js
{
    title: "Certificate Title",
    file: "file-name.pdf",
    description: "Short description"
}
```

Then put the PDF in the matching folder:

- Certificates: `assets/documents/certificates/`
- Internships: `assets/documents/internships/`

The `file` value must match the real filename exactly, including capitals and `.pdf`.

## Features

- Responsive layout with a mobile navigation menu
- PDF previews with **View** and **Download** buttons for certificates, internships, academics and resume
- Automatic footer year

## Author

**Kunchapu Vamsi Krushna**

- GitHub: [kunchapuvamsi71](https://github.com/kunchapuvamsi71)
- LinkedIn: [Kunchapu Vamsi Krushna](https://www.linkedin.com/in/kunchapu-vamsi-krushna-8703a7327)
- Email: [kunchapuvamsi71@gmail.com](mailto:kunchapuvamsi71@gmail.com)
- Portfolio: https://kunchapuvamsi71.github.io/portfolio2/vamsi-portfolio/
-
