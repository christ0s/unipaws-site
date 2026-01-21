/**
 * UniPaws Website - Main JavaScript
 * Modern, clean interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });
  }
  
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check on load
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Counter animation for stats
        if (entry.target.classList.contains('stat-number')) {
          animateCounter(entry.target);
        }
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    '.feature-card, .step, .testimonial-card, .stat-item, .value-card, .team-member, .impact-card'
  );
  
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
  
  // Counter animation function
  function animateCounter(element) {
    const target = element.textContent;
    const isPlus = target.includes('+');
    const isK = target.includes('K');
    const isPercent = target.includes('%');
    
    let number = parseInt(target.replace(/[^0-9]/g, ''));
    let duration = 2000;
    let increment = number / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= number) {
        current = number;
        clearInterval(timer);
      }
      
      let displayValue = Math.floor(current);
      
      if (isK) {
        displayValue = displayValue + 'K';
      }
      if (isPlus) {
        displayValue = displayValue + '+';
      }
      if (isPercent) {
        displayValue = displayValue + '%';
      }
      
      element.textContent = displayValue;
    }, 16);
  }
  
  // Add animate-in class styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (mobileMenu && mobileMenu.classList.contains('active')) {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
      }
    }
  });
  
  // Add loading state to download buttons
  const downloadButtons = document.querySelectorAll('.btn-primary[href*="store"], .store-badge');
  downloadButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // Show loading state briefly
      const originalText = this.innerHTML;
      this.style.opacity = '0.7';
      this.style.pointerEvents = 'none';
      
      setTimeout(() => {
        this.style.opacity = '1';
        this.style.pointerEvents = 'auto';
      }, 500);
    });
  });
  
  console.log('🐾 UniPaws Website Loaded Successfully!');
});
