// ===== DOM ELEMENTS =====
const navbar = document.getElementById("navbar");
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const backToTopBtn = document.getElementById("back-to-top");
const contactForm = document.getElementById("contact-form");
const navLinks = document.querySelectorAll(".nav-link");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function showNotification(message, type = "success") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  // Create new notification
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Add liquid glass effect
  notification.style.background =
    type === "success" ? "rgba(16, 185, 129, 0.9)" : "rgba(239, 68, 68, 0.9)";
  notification.style.backdropFilter = "blur(15px)";
  notification.style.border =
    type === "success"
      ? "1px solid rgba(16, 185, 129, 0.3)"
      : "1px solid rgba(239, 68, 68, 0.3)";
  notification.style.color = "white";
  notification.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";

  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateX(100%)";
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// ===== MOBILE MENU TOGGLE =====
function toggleMobileMenu() {
  const isOpen = mobileMenu.classList.contains("hidden");

  if (isOpen) {
    mobileMenu.classList.remove("hidden");
    mobileMenu.style.display = "block";
    mobileMenuBtn.innerHTML = '<i class="fas fa-times text-xl"></i>';
  } else {
    mobileMenu.classList.add("hidden");
    mobileMenu.style.display = "none";
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
  }
}

// ===== NAVIGATION ACTIVE STATE =====
function updateActiveNavLink() {
  const scrollPosition = window.scrollY + 100;

  navLinks.forEach((link) => {
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      const sectionTop = targetSection.offsetTop;
      const sectionBottom = sectionTop + targetSection.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    }
  });
}

// ===== SMOOTH SCROLLING =====
function smoothScrollTo(targetId) {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }
}

// ===== BACK TO TOP BUTTON =====
function toggleBackToTop() {
  if (window.scrollY > 300) {
    backToTopBtn.style.opacity = "1";
    backToTopBtn.style.visibility = "visible";
    backToTopBtn.style.transform = "translateY(0)";
  } else {
    backToTopBtn.style.opacity = "0";
    backToTopBtn.style.visibility = "hidden";
    backToTopBtn.style.transform = "translateY(10px)";
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// ===== SCROLL ANIMATIONS =====
function handleScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

        // Add liquid glass glow effect
        if (
          entry.target.classList.contains("service-card") ||
          entry.target.classList.contains("project-card")
        ) {
          entry.target.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.37)";
        }
      }
    });
  }, observerOptions);

  // Observe service and project cards
  document.querySelectorAll(".service-card, .project-card").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition =
      "opacity 0.6s ease, transform 0.6s ease, box-shadow 0.6s ease";
    observer.observe(el);
  });

  // Observe other animated elements
  document
    .querySelectorAll(
      ".animate-fade-in, .animate-slide-in-left, .animate-slide-in-right"
    )
    .forEach((el) => {
      if (
        !el.classList.contains("service-card") &&
        !el.classList.contains("project-card")
      ) {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        observer.observe(el);
      }
    });
}

// ===== FORM VALIDATION AND SUBMISSION =====
function validateForm(formData) {
  const errors = [];

  if (!formData.get("name").trim()) {
    errors.push("Le nom est requis");
  }

  if (!formData.get("email").trim()) {
    errors.push("L'email est requis");
  } else if (!isValidEmail(formData.get("email"))) {
    errors.push("L'email n'est pas valide");
  }

  if (!formData.get("message").trim()) {
    errors.push("Le message est requis");
  }

  return errors;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function handleFormSubmission(e) {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const errors = validateForm(formData);

  if (errors.length > 0) {
    showNotification(errors.join(", "), "error");
    return;
  }

  // Simulate form submission
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<div class="loading"></div> Envoi...';

  // Simulate API call
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;

    showNotification(
      "Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais."
    );
    contactForm.reset();

    // Add liquid glass effect to form inputs
    contactForm.querySelectorAll("input, textarea").forEach((input) => {
      input.style.background = "rgba(255, 255, 255, 0.1)";
      input.style.backdropFilter = "blur(15px)";
    });
  }, 2000);
}

// ===== LIQUID GLASS EFFECTS =====
function addLiquidGlassEffects() {
  // Add hover effects to interactive elements
  document.querySelectorAll("a, button").forEach((element) => {
    if (
      !element.classList.contains("nav-link") &&
      !element.classList.contains("mobile-nav-link")
    ) {
      element.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-2px)";
        this.style.boxShadow = "0 8px 25px rgba(99, 102, 241, 0.3)";
      });

      element.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
        this.style.boxShadow = "";
      });
    }
  });

  // Add parallax effect to background elements
  window.addEventListener(
    "scroll",
    debounce(() => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll(".animate-float");

      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + index * 0.1;
        element.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
      });
    }, 10)
  );

  // Add glow effect to primary elements
  document.querySelectorAll(".bg-primary/20").forEach((element) => {
    element.addEventListener("mouseenter", function () {
      this.style.boxShadow = "0 0 20px rgba(99, 102, 241, 0.4)";
    });

    element.addEventListener("mouseleave", function () {
      this.style.boxShadow = "";
    });
  });
}

// ===== NAVBAR SCROLL EFFECT =====
function handleNavbarScroll() {
  const scrollY = window.scrollY;

  if (scrollY > 50) {
    navbar.classList.add("scrolled");
    navbar.style.background = "rgba(255, 255, 255, 0.12)";
    navbar.style.backdropFilter = "blur(30px)";
    navbar.style.borderColor = "rgba(255, 255, 255, 0.25)";
    navbar.style.boxShadow =
      "0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.15) inset";
  } else {
    navbar.classList.remove("scrolled");
    navbar.style.background = "rgba(255, 255, 255, 0.08)";
    navbar.style.backdropFilter = "blur(25px)";
    navbar.style.borderColor = "rgba(255, 255, 255, 0.15)";
    navbar.style.boxShadow =
      "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset";
  }
}

// ===== ACCESSIBILITY IMPROVEMENTS =====
function improveAccessibility() {
  // Add keyboard navigation support
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      // Close mobile menu if open
      if (!mobileMenu.classList.contains("hidden")) {
        toggleMobileMenu();
      }
    }
  });

  // Add focus management
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setTimeout(() => {
        mobileMenuBtn.focus();
      }, 100);
    });
  });

  // Add ARIA labels
  backToTopBtn.setAttribute("aria-label", "Retour en haut de la page");
  mobileMenuBtn.setAttribute("aria-label", "Menu de navigation");
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function optimizePerformance() {
  // Use passive event listeners for scroll events
  window.addEventListener("scroll", debounce(updateActiveNavLink, 10), {
    passive: true,
  });
  window.addEventListener("scroll", debounce(toggleBackToTop, 10), {
    passive: true,
  });
  window.addEventListener("scroll", debounce(handleNavbarScroll, 10), {
    passive: true,
  });

  // Preload critical resources
  const criticalImages = [
    // Add any critical images here
  ];

  criticalImages.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  });
}

// ===== SCROLL INDICATOR =====
function createScrollIndicator() {
  const scrollIndicator = document.createElement("div");
  scrollIndicator.className = "scroll-indicator";
  document.body.appendChild(scrollIndicator);

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollIndicator.style.width = scrollPercent + "%";
  });
}

// ===== INITIALIZATION =====
function init() {
  // Event listeners
  mobileMenuBtn.addEventListener("click", toggleMobileMenu);
  backToTopBtn.addEventListener("click", scrollToTop);
  contactForm.addEventListener("submit", handleFormSubmission);

  // Navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      smoothScrollTo(targetId);
    });
  });

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      smoothScrollTo(targetId);
      toggleMobileMenu(); // Close mobile menu after click
    });
  });

  // Initialize features
  handleScrollAnimations();
  addLiquidGlassEffects();
  improveAccessibility();
  optimizePerformance();
  createScrollIndicator();

  // Initial state
  updateActiveNavLink();
  toggleBackToTop();
  handleNavbarScroll();
}

// ===== STARTUP =====
document.addEventListener("DOMContentLoaded", init);

// ===== EXPORT FOR TESTING =====
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    showNotification,
    validateForm,
    isValidEmail,
    debounce,
  };
}
