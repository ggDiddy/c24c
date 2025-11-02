// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      const isExpanded = nav.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isExpanded);
      menuToggle.textContent = isExpanded ? '✕' : '☰';
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.header-container')) {
        nav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = '☰';
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && nav.classList.contains('active')) {
        nav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = '☰';
        menuToggle.focus();
      }
    });
  }

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(function(question) {
    question.addEventListener('click', function() {
      const faqItem = this.parentElement;
      const isActive = faqItem.classList.contains('active');
      
      // Close all other FAQ items
      document.querySelectorAll('.faq-item').forEach(function(item) {
        item.classList.remove('active');
        item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      
      // Toggle current item
      if (!isActive) {
        faqItem.classList.add('active');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const emailInput = this.querySelector('.newsletter-input');
      const message = this.querySelector('.newsletter-message');
      const email = emailInput.value.trim();
      
      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!email) {
        showMessage(message, 'Please enter your email address.', 'error');
        return;
      }
      
      if (!emailRegex.test(email)) {
        showMessage(message, 'Please enter a valid email address.', 'error');
        return;
      }
      
      // Success (mock - no backend)
      showMessage(message, 'Thank you for subscribing! Check your inbox soon.', 'success');
      emailInput.value = '';
      
      // Hide message after 5 seconds
      setTimeout(function() {
        message.style.display = 'none';
      }, 5000);
    });
  }

  function showMessage(element, text, type) {
    element.textContent = text;
    element.className = 'newsletter-message ' + type;
    element.style.display = 'block';
  }

  // Search Form
  const searchForm = document.getElementById('search-form');
  
  if (searchForm) {
    searchForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const searchInput = this.querySelector('.search-input');
      const query = searchInput.value.trim();
      
      if (query) {
        // Redirect to same page with query parameter
        const baseUrl = window.location.origin + window.location.pathname;
        window.location.href = baseUrl + '?q=' + encodeURIComponent(query);
      }
    });
  }

  // Set active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});