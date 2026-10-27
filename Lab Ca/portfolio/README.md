# Personal Student E-Portfolio — J Sharadvardhan Acharya

A clean, responsive, student-level personal e-portfolio website designed for **J Sharadvardhan Acharya**, a Computer Science and Engineering (CSE) undergraduate student at **Symbiosis Institute of Technology (SIT), Nagpur**.

---

## 1. Project Title
**J Sharadvardhan Acharya — Personal Student E-Portfolio**

---

## 2. Short Description
This website is a personal portfolio showcasing undergraduate coursework, technical skills, practical projects, and learning journey in Computer Science and Engineering. Built with an authentic college-student aesthetic, it emphasizes clarity, neat presentation, light blue and white visual harmony, and straightforward code structure without unnecessary complexity or bloated frameworks.

---

## 3. Technologies Used
- **HTML5**: Semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) for accessibility and structure.
- **CSS3**: Custom properties (CSS variables), Flexbox, CSS Grid, media queries, and dark theme support.
- **Vanilla JavaScript (ES6+)**: Clean, modular functions for DOM manipulation, category filtering, keyword search, and theme switching.
- **JSON**: Structured project data loaded asynchronously via the JavaScript `fetch()` API.

*No external frontend frameworks, UI component libraries, or backend runtimes (Node.js/Python) are required.*

---

## 4. Folder Structure
```text
portfolio/
├── index.html                  # Main portfolio webpage
├── style.css                   # Custom CSS styles (Light Blue & Dark themes)
├── script.js                   # Client-side JavaScript functionality
├── projects.json               # Projects dataset (JSON format)
├── assets/
│   ├── profile.jpg             # Profile photograph of J Sharadvardhan Acharya
│   └── profile-placeholder.png # Neutral student profile avatar placeholder image
└── README.md                   # Comprehensive project documentation
```

---

## 5. Main Website Features
1. **Light Blue & White Palette**: Cohesive, modern color scheme (`#0284C7`, `#0369A1`, `#F0F9FF`, `#FFFFFF`, `#BAE6FD`, `#E0F2FE`) with accessible contrast.
2. **Top Notification Status Notice**: Live status indicator displaying current undergraduate status at SIT Nagpur.
3. **Optimized Portfolio Layout Flow**:
   - **Hero Section**: Student introduction, direct CTAs, and instant social profile pills.
   - **Projects Showcase (Prominently featured up front!)**: Real-time keyword search toolbar, category filter pills with live counts (`All 7`, `Web Dev 2`, `ML 2`, `Python & AI 2`, `Simulation 1`), and project cards.
   - **Skills Matrix**: Categorized technical toolkit (Programming, Web, Databases, Tools, Machine Learning).
   - **About Me & Education**: Academic background, core interests, and SIT Nagpur undergraduate profile.
   - **Experience & Practical Learning**: Avantique Business Services trainee program and practical coursework.
   - **Contact & Connect**: Interactive validated form alongside verified profile channels.
4. **Verified Social Profiles Integrated**:
   - **LinkedIn**: [https://www.linkedin.com/in/j-sharadvardhan-acharya-83638b3b5/](https://www.linkedin.com/in/j-sharadvardhan-acharya-83638b3b5/)
   - **GitHub**: [https://github.com/acharyaasharad](https://github.com/acharyaasharad)
5. **Interactive Project Search**: Search projects in real-time by title, technology tag, or description keywords with instant feedback.
6. **Built-in Theme Switcher**: Toggle between Light Blue Theme and Dark Theme with preferences saved in `localStorage`.
7. **Responsive Navigation**: Horizontal navigation on desktop, with a smooth hamburger menu for mobile devices that automatically collapses upon link selection.
8. **Safe Offline Fallback**: If opened directly via `file://` (where browser security may restrict local fetch), the JavaScript automatically displays an integrated fallback dataset without crashing.
9. **Interactive Contact Form**: Complete client-side input validation (name, email format, minimum message length) with a transparent demonstration notice.
10. **Smooth Navigation & Back-to-Top**: Quick scrolling with back-to-top button in the footer.

---

## 6. Instructions to Run the Website

### Method A: Running with Visual Studio Code & Live Server (Recommended)
Because the portfolio uses the JavaScript `fetch()` API to read `projects.json`, running it via a local HTTP server is the best practice.

1. Open **Visual Studio Code**.
2. Go to **File → Open Folder...** and select the `portfolio` folder (or workspace folder).
3. Open the **Extensions** view (`Ctrl+Shift+X` on Windows/Linux or `Cmd+Shift+X` on macOS).
4. Search for **Live Server** (by *Ritwick Dey*) and click **Install**.
5. In the file explorer, right-click `index.html` and click **"Open with Live Server"** (or click **"Go Live"** in the bottom status bar).
6. Your default web browser will automatically open `http://127.0.0.1:5500/index.html`.

### Method B: Using Python's Built-in HTTP Server
If you have Python installed, open your terminal inside the `portfolio/` directory and run:
```bash
# Python 3
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in any web browser.

### Method C: Direct Browser Open (Double Click)
You can directly open `index.html` in Chrome, Firefox, Safari, or Edge. If the browser blocks `fetch('projects.json')` due to local CORS restrictions, the included safety fallback in `script.js` will seamlessly render the projects so that the layout never breaks.

---

## 7. Instructions to Edit Personal Details
All personal details are organized cleanly in `index.html`:
- **Name & Title**: Search for `J Sharadvardhan Acharya` in `index.html` (in the `<title>`, `.nav-brand`, and `.hero-title`).
- **Introduction**: Edit the paragraph inside `.about-intro-text` in `index.html`.
- **College & Degree**: Edit the text inside the `.education-box` in `index.html`.
- **Skills**: Add or remove `<span class="skill-tag">...</span>` elements in the `<section id="skills">` block.

---

## 8. Instructions to Add a Project through `projects.json`
To add a new project, open `projects.json` and append a new object to the array. Ensure you do not add trailing commas:

```json
[
  {
    "id": 8,
    "title": "Your Project Title",
    "category": "Web Development",
    "description": "A concise description of the project purpose and concept.",
    "technologies": ["Python", "HTML", "CSS"],
    "features": [
      "Key feature or module 1",
      "Key feature or module 2",
      "Key feature or module 3"
    ],
    "status": "In Development",
    "github": "https://github.com/acharyaasharad",
    "demo": "https://your-demo-url.com"
  }
]
```

**Supported Filter Categories**:
- `Web Development`
- `Machine Learning`
- `Python and AI`
- `Simulation`

---

## 9. Verified Profile Links
- **GitHub**: `https://github.com/acharyaasharad`
- **LinkedIn**: `https://www.linkedin.com/in/j-sharadvardhan-acharya-83638b3b5/`
- **Email**: `sharad.acharya@example.com`

---

## 10. Replacing the Profile Picture
To use your own photograph instead of the placeholder:
1. Save your photo in the `portfolio/assets/` folder (e.g., `portfolio/assets/my-photo.jpg`).
2. Open `index.html`.
3. Locate line containing `<img src="assets/profile-placeholder.png" ...>` in `#hero`.
4. Update the `src` attribute to `assets/my-photo.jpg`.

---

## 11. Known Limitations
- **Client-Side Form**: The contact form provides client-side validation and friendly confirmation feedback, but does not send external emails because no backend server is configured.
- **Local file:// Fetch Restrictions**: Browsers restrict `fetch()` requests on the `file://` protocol for security reasons. While the built-in fallback dataset ensures the website works even when double-clicked locally, using VS Code Live Server is the recommended way to test dynamic JSON loading.
