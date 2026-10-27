/**
 * Personal E-Portfolio Website — J Sharadvardhan Acharya
 * File: script.js
 * Description: Modular Vanilla JavaScript implementing:
 *   1. initializeNavigation()
 *   2. loadProjects()
 *   3. renderProjects()
 *   4. filterProjects()
 *   5. initializeThemeSwitcher()
 *   6. initializeContactForm()
 *   7. Project Search & Category Counts
 */

// Global State
let projectsData = [];
let currentCategoryFilter = 'All';
let currentSearchTerm = '';

// Fallback student project dataset in case fetch('projects.json') is blocked (e.g. direct file:// protocol)
const fallbackProjectsData = [
  {
    id: 1,
    title: "FarmDirect",
    category: "Web Development",
    description: "FarmDirect is a farmer-to-consumer grocery platform concept designed to connect customers with farmers selling vegetables, fruits, and dairy products.",
    technologies: ["HTML", "CSS", "JavaScript", "Firebase Authentication", "Firestore"],
    features: [
      "Farmer dashboard concept for item catalog management",
      "Adding, editing, and deleting available produce items",
      "Product listing, search, and inventory management",
      "REST API operations for grocery catalog CRUD actions"
    ],
    status: "Concept / Development",
    github: "https://github.com/acharyaasharad",
    demo: ""
  },
  {
    id: 2,
    title: "AI-Based Crop Recommendation System",
    category: "Machine Learning",
    description: "An agricultural machine learning project designed to recommend suitable crops based on relevant soil and environmental parameters.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Random Forest"],
    features: [
      "Dataset preparation and exploratory data analysis",
      "Input feature preprocessing (NPK values, temperature, humidity, pH, rainfall)",
      "Model training and prediction using classification algorithms",
      "Crop recommendation based on model evaluation outputs"
    ],
    status: "Academic Project",
    github: "https://github.com/acharyaasharad",
    demo: ""
  },
  {
    id: 3,
    title: "SIT Nagpur FAQ Chatbot",
    category: "Python and AI",
    description: "A college FAQ chatbot concept that helps students find answers to common questions about admissions, courses, fees, examinations, placements, and contact information.",
    technologies: ["Python", "TF-IDF", "JSON", "Basic text processing"],
    features: [
      "FAQ knowledge base stored and queried from JSON files",
      "Matching student questions with relevant answers using text similarity",
      "Basic text retrieval and cosine similarity using TF-IDF",
      "Quick-action categories for frequently asked campus queries"
    ],
    status: "Prototype",
    github: "https://github.com/acharyaasharad",
    demo: ""
  },
  {
    id: 4,
    title: "Weather Risk Alert System",
    category: "Python and AI",
    description: "A weather risk analysis application concept that combines weather information with a risk-assessment workflow to help users understand possible weather-related hazards.",
    technologies: ["Python", "Gradio", "APIs", "Environment variables", "AI integration"],
    features: [
      "Real-time weather data retrieval via REST APIs",
      "Risk assessment workflow evaluating severity thresholds",
      "AI-assisted summary explanation of weather hazards",
      "Clean interactive web-based interface built with Gradio"
    ],
    status: "Prototype Concept",
    github: "https://github.com/acharyaasharad",
    demo: ""
  },
  {
    id: 5,
    title: "Energy Demand Forecasting and Optimization",
    category: "Machine Learning",
    description: "A learning project focused on forecasting energy demand using historical data and exploring how demand predictions can support better energy planning.",
    technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Scikit-learn"],
    features: [
      "Historical energy demand data analysis and trend visualization",
      "Forecasting models trained on time-series load records",
      "Exploration of optimization models to improve energy allocation (Planned)"
    ],
    status: "Learning Project (Planned Optimization)",
    github: "https://github.com/acharyaasharad",
    demo: ""
  },
  {
    id: 6,
    title: "Football Tactics Simulation Web App",
    category: "Simulation",
    description: "A football tactics simulation concept that explores how formations, player roles, and tactical instructions can influence simulated match outcomes.",
    technologies: ["HTML", "CSS", "JavaScript", "Simulation logic"],
    features: [
      "Interactive team formation selection and preset tactical shapes",
      "Tactical positioning, passing styles, and player role setups",
      "Turn-by-turn simulation engine calculating match events",
      "Post-match analytical breakdown and tactical statistics (Planned)"
    ],
    status: "Concept Simulation",
    github: "https://github.com/acharyaasharad",
    demo: ""
  },
  {
    id: 7,
    title: "Contract Management Prototype",
    category: "Web Development",
    description: "A contract management prototype focused on organizing contract records and helping users find contracts by identifiers, company or vendor names, and contract types.",
    technologies: ["HTML", "CSS", "JavaScript"],
    features: [
      "Instant contract search and identifier filtering",
      "Status tracking (Active, Pending, Expired) with expiry date monitors",
      "Create, edit, and delete operations for contract metadata records"
    ],
    status: "Prototype",
    github: "https://github.com/acharyaasharad",
    demo: ""
  }
];

// Initialize all modules when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();
  initializeThemeSwitcher();
  loadProjects();
  initializeContactForm();
});

/**
 * 1. initializeNavigation
 * Manages mobile hamburger menu toggling, smooth scrolling, and active link states
 */
function initializeNavigation() {
  const hamburgerBtn = document.querySelector('#hamburger-btn');
  const navMenu = document.querySelector('#nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.querySelector('#back-to-top-btn');

  // Toggle mobile menu
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isExpanded = hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Close mobile menu when a navigation link is clicked
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        if (hamburgerBtn) {
          hamburgerBtn.classList.remove('active');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Back to top button smooth scroll
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Highlight active link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  });
}

/**
 * 2. loadProjects
 * Asynchronously loads project data from projects.json using fetch()
 * Falls back to local dataset if fetch encounters an error (e.g. file:// CORS restriction)
 */
async function loadProjects() {
  const statusMsg = document.querySelector('#projects-status');

  try {
    const response = await fetch('projects.json');
    if (!response.ok) {
      throw new Error(`Failed to load projects.json: Status ${response.status}`);
    }
    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      projectsData = data;
    } else {
      throw new Error('Loaded JSON is not a non-empty array.');
    }

    if (statusMsg) {
      statusMsg.textContent = `Displaying ${projectsData.length} engineering & academic projects`;
    }
  } catch (error) {
    console.info('Loaded fallback project dataset (CORS/file:// safety fallback):', error.message);
    projectsData = fallbackProjectsData;

    if (statusMsg) {
      statusMsg.textContent = `Displaying ${projectsData.length} projects (Loaded from safe fallback dataset)`;
    }
  } finally {
    updateCategoryCounts();
    setupCategoryFilterButtons();
    setupProjectSearch();
    filterAndRenderProjects();
  }
}

/**
 * Updates project counts on category buttons
 */
function updateCategoryCounts() {
  const counts = {
    'All': projectsData.length,
    'Web Development': projectsData.filter((p) => p.category.toLowerCase().includes('web')).length,
    'Machine Learning': projectsData.filter((p) => p.category.toLowerCase().includes('machine learning')).length,
    'Python and AI': projectsData.filter((p) => p.category.toLowerCase().includes('python') || p.category.toLowerCase().includes('ai')).length,
    'Simulation': projectsData.filter((p) => p.category.toLowerCase().includes('simulation')).length
  };

  const countPills = document.querySelectorAll('[data-category-count]');
  countPills.forEach((pill) => {
    const category = pill.getAttribute('data-category-count');
    if (counts[category] !== undefined) {
      pill.textContent = counts[category];
    }
  });
}

/**
 * Setup Category Filter Button Event Listeners
 */
function setupCategoryFilterButtons() {
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      const selectedCategory = button.getAttribute('data-category');
      filterProjects(selectedCategory);
    });
  });
}

/**
 * Setup Real-Time Project Search Input
 */
function setupProjectSearch() {
  const searchInput = document.querySelector('#project-search-input');
  const clearBtn = document.querySelector('#clear-search-btn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchTerm = e.target.value.trim().toLowerCase();

      if (clearBtn) {
        clearBtn.style.display = currentSearchTerm.length > 0 ? 'inline-flex' : 'none';
      }

      filterAndRenderProjects();
    });
  }

  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      currentSearchTerm = '';
      clearBtn.style.display = 'none';
      searchInput.focus();
      filterAndRenderProjects();
    });
  }
}

/**
 * 4. filterProjects
 * Updates active category and triggers rendering
 * @param {string} category - Category name ('All', 'Web Development', etc.)
 */
function filterProjects(category) {
  currentCategoryFilter = category;
  filterAndRenderProjects();
}

/**
 * Combined Filter (Category + Search query)
 */
function filterAndRenderProjects() {
  const statusMsg = document.querySelector('#projects-status');

  const filtered = projectsData.filter((project) => {
    // 1. Category match
    let matchesCategory = true;
    if (currentCategoryFilter !== 'All') {
      matchesCategory = project.category.toLowerCase().includes(currentCategoryFilter.toLowerCase());
    }

    if (!matchesCategory) return false;

    // 2. Search match across title, description, and technologies
    if (currentSearchTerm !== '') {
      const titleMatch = project.title.toLowerCase().includes(currentSearchTerm);
      const descMatch = project.description.toLowerCase().includes(currentSearchTerm);
      const techMatch = project.technologies.some((t) => t.toLowerCase().includes(currentSearchTerm));
      const catMatch = project.category.toLowerCase().includes(currentSearchTerm);

      return titleMatch || descMatch || techMatch || catMatch;
    }

    return true;
  });

  if (statusMsg) {
    if (currentSearchTerm) {
      statusMsg.textContent = `Found ${filtered.length} project(s) matching "${currentSearchTerm}" in ${currentCategoryFilter}`;
    } else {
      statusMsg.textContent = `Displaying ${filtered.length} of ${projectsData.length} projects`;
    }
  }

  renderProjects(filtered);
}

/**
 * 3. renderProjects
 * Dynamically builds HTML cards for the given array of projects
 * @param {Array} projects - Array of project objects
 */
function renderProjects(projects) {
  const projectsContainer = document.querySelector('#projects-grid');
  if (!projectsContainer) return;

  // Clear existing content
  projectsContainer.innerHTML = '';

  // Handle empty state
  if (!projects || projects.length === 0) {
    projectsContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <p class="empty-state-text">No projects matched your criteria.</p>
        <button class="btn btn-secondary btn-sm" onclick="resetProjectFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  // Render cards
  projects.forEach((project) => {
    const card = document.createElement('article');
    card.className = 'project-card';

    // Build technology badges
    const techTagsHtml = project.technologies
      .map((tech) => `<span class="project-tech-tag">${tech}</span>`)
      .join('');

    // Build features list
    const featuresListHtml = project.features
      .map((feature) => `<li>${feature}</li>`)
      .join('');

    // GitHub action button linking directly to verified repository/profile
    const githubUrl = project.github && project.github.trim() !== ''
      ? project.github
      : 'https://github.com/acharyaasharad';

    const githubButtonHtml = `
      <a href="${githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" title="View code on GitHub (acharyaasharad)">
        <svg viewBox="0 0 24 24" class="btn-svg-icon" aria-hidden="true"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
        <span>View Code</span>
      </a>
    `;

    const demoButtonHtml = project.demo && project.demo.trim() !== ''
      ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Live Demo</a>`
      : `<span class="btn btn-disabled btn-sm" title="Live demo link not currently deployed">Demo (Concept)</span>`;

    card.innerHTML = `
      <div class="project-card-header">
        <span class="project-category-badge">${project.category}</span>
        <span class="project-status-badge">${project.status || 'Student Project'}</span>
      </div>

      <h3 class="project-title">${project.title}</h3>
      <p class="project-description">${project.description}</p>

      <div class="project-features-block">
        <h4 class="project-features-title">Key Highlights:</h4>
        <ul class="project-features-list">
          ${featuresListHtml}
        </ul>
      </div>

      <div class="project-tech-tags">
        ${techTagsHtml}
      </div>

      <div class="project-card-actions">
        ${githubButtonHtml}
        ${demoButtonHtml}
      </div>
    `;

    projectsContainer.appendChild(card);
  });
}

/**
 * Resets project search and filter to initial state
 */
window.resetProjectFilters = function () {
  currentCategoryFilter = 'All';
  currentSearchTerm = '';

  const searchInput = document.querySelector('#project-search-input');
  const clearBtn = document.querySelector('#clear-search-btn');
  if (searchInput) searchInput.value = '';
  if (clearBtn) clearBtn.style.display = 'none';

  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-category') === 'All');
  });

  filterAndRenderProjects();
};

/**
 * 5. initializeThemeSwitcher
 * Handles switching between Light Blue Theme (default) and Dark Theme using data-theme attribute
 * Persists user preference in localStorage
 */
function initializeThemeSwitcher() {
  const themeToggleBtn = document.querySelector('#theme-toggle-btn');
  const themeIcon = document.querySelector('#theme-toggle-icon');
  const themeText = document.querySelector('#theme-toggle-text');

  // Check saved theme or default to light blue
  const savedTheme = localStorage.getItem('portfolio-theme') || 'light-blue';

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeIcon) themeIcon.textContent = '☀️';
      if (themeText) themeText.textContent = 'Light Blue';
      if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'Switch to Light Blue Theme');
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeIcon) themeIcon.textContent = '🌙';
      if (themeText) themeText.textContent = 'Dark Theme';
      if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'Switch to Dark Theme');
    }
  }

  // Apply on startup
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light-blue' : 'dark';

      applyTheme(newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }
}

/**
 * 6. initializeContactForm
 * If a contact form is present, validates inputs on client-side and displays feedback
 */
function initializeContactForm() {
  const contactForm = document.querySelector('#contact-form');
  if (!contactForm) return;

  const nameInput = document.querySelector('#contact-name');
  const emailInput = document.querySelector('#contact-email');
  const messageInput = document.querySelector('#contact-message');
  const alertBox = document.querySelector('#form-status-alert');

  // Simple regex for email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateInput(input, isValid, errorMsgElement) {
    if (isValid) {
      input.classList.remove('error');
      if (errorMsgElement) errorMsgElement.style.display = 'none';
      return true;
    } else {
      input.classList.add('error');
      if (errorMsgElement) errorMsgElement.style.display = 'block';
      return false;
    }
  }

  // Live validation on blur & input
  if (nameInput) {
    nameInput.addEventListener('blur', () => {
      const errorMsg = document.querySelector('#error-name');
      validateInput(nameInput, nameInput.value.trim().length >= 2, errorMsg);
    });
    nameInput.addEventListener('input', () => {
      if (nameInput.classList.contains('error')) {
        const errorMsg = document.querySelector('#error-name');
        validateInput(nameInput, nameInput.value.trim().length >= 2, errorMsg);
      }
    });
  }

  if (emailInput) {
    emailInput.addEventListener('blur', () => {
      const errorMsg = document.querySelector('#error-email');
      validateInput(emailInput, emailRegex.test(emailInput.value.trim()), errorMsg);
    });
    emailInput.addEventListener('input', () => {
      if (emailInput.classList.contains('error')) {
        const errorMsg = document.querySelector('#error-email');
        validateInput(emailInput, emailRegex.test(emailInput.value.trim()), errorMsg);
      }
    });
  }

  if (messageInput) {
    messageInput.addEventListener('blur', () => {
      const errorMsg = document.querySelector('#error-message');
      validateInput(messageInput, messageInput.value.trim().length >= 10, errorMsg);
    });
    messageInput.addEventListener('input', () => {
      if (messageInput.classList.contains('error')) {
        const errorMsg = document.querySelector('#error-message');
        validateInput(messageInput, messageInput.value.trim().length >= 10, errorMsg);
      }
    });
  }

  // Form submission handler
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateInput(
      nameInput,
      nameInput.value.trim().length >= 2,
      document.querySelector('#error-name')
    );

    const isEmailValid = validateInput(
      emailInput,
      emailRegex.test(emailInput.value.trim()),
      document.querySelector('#error-email')
    );

    const isMessageValid = validateInput(
      messageInput,
      messageInput.value.trim().length >= 10,
      document.querySelector('#error-message')
    );

    if (isNameValid && isEmailValid && isMessageValid) {
      const senderName = nameInput.value.trim();

      // Show clear demo notice (does NOT claim an email was actually delivered)
      if (alertBox) {
        alertBox.className = 'form-status-alert success';
        alertBox.innerHTML = `
          <strong>✓ Thank you, ${senderName}!</strong><br>
          Your input has been successfully validated. <em>(Frontend Demonstration Note: As this is a client-side student project without a backend email server, your message was verified locally and not dispatched to an external mailbox.)</em>
        `;
      }

      // Reset form fields
      contactForm.reset();
      [nameInput, emailInput, messageInput].forEach((inp) => inp.classList.remove('error'));

      // Hide message after 10 seconds
      setTimeout(() => {
        if (alertBox) {
          alertBox.className = 'form-status-alert';
          alertBox.innerHTML = '';
        }
      }, 10000);
    } else {
      if (alertBox) {
        alertBox.className = 'form-status-alert error';
        alertBox.innerHTML = '<strong>Please correct the highlighted errors above before submitting.</strong>';
      }
    }
  });
}
