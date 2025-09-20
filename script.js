// ===== DOM ELEMENTS =====
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

// ===== MOBILE MENU TOGGLE =====
function toggleMobileMenu() {
  mobileMenu.classList.toggle("active");
  const isActive = mobileMenu.classList.contains("active");
  
  if (isActive) {
    mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    mobileMenuBtn.setAttribute('aria-label', 'Fermer le menu de navigation');
  } else {
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.setAttribute('aria-label', 'Ouvrir le menu de navigation');
  }
}

// ===== SMOOTH SCROLL =====
function smoothScrollTo(targetId) {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    const offsetTop = targetElement.offsetTop - 80; // ajuster selon la hauteur de ta navbar
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  }
}

// ===== ANIMATIONS ON SCROLL =====
function initScrollAnimations() {
  const elements = document.querySelectorAll(
    ".service-card, .project-card, .about-content"
  );

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          obs.unobserve(entry.target); // on arrête d’observer après apparition
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((el) => observer.observe(el));
}

// ===== EVENT LISTENERS =====
mobileMenuBtn.addEventListener("click", toggleMobileMenu);

mobileNavLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    smoothScrollTo(targetId);
    mobileMenu.classList.remove("active"); // ferme le menu après clic
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.setAttribute('aria-label', 'Ouvrir le menu de navigation');
  });
});

// ===== MOBILE PERFORMANCE OPTIMIZATIONS =====
function initMobileOptimizations() {
  // Detect mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
  
  if (isMobile) {
    // Reduce animation complexity on mobile
    document.documentElement.style.setProperty('--animation-duration', '0.3s');
    
    // Optimize scroll performance
    let ticking = false;
    function updateScrollPosition() {
      // Add any scroll-based optimizations here
      ticking = false;
    }
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    }, { passive: true });
    
    // Add touch feedback for interactive elements
    const touchElements = document.querySelectorAll('.btn, .service-card, .project-card, .mobile-nav-link');
    touchElements.forEach(element => {
      element.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.98)';
      }, { passive: true });
      
      element.addEventListener('touchend', function() {
        this.style.transform = '';
      }, { passive: true });
    });
  }
}

// ===== BACK TO TOP FUNCTIONALITY =====
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (backToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
      }
    }, { passive: true });
    
    // Smooth scroll to top
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// ===== IMPROVED SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const elements = document.querySelectorAll(
    ".service-card, .project-card, .about-content, .contact-info, .contact-methods"
  );

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger animations for better visual effect
          setTimeout(() => {
            entry.target.classList.add("active");
          }, index * 100);
          obs.unobserve(entry.target);
        }
      });
    },
    { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  elements.forEach((el) => observer.observe(el));
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  initScrollAnimations();
  initMobileOptimizations();
  initBackToTop();
});
