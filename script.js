// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get menu elements
    const menuButton = document.getElementById('menu-button');
    const menuClose = document.getElementById('menu-close');
    const mobileNav = document.querySelector('.mobile-nav');
    const menuOverlay = document.querySelector('.menu-overlay');
    const body = document.body;

    // Function to open mobile menu
    function openMobileMenu() {
        mobileNav.classList.add('open');
        menuOverlay.classList.add('active');
        body.style.overflow = 'hidden'; // Prevent body scroll when menu is open
    }

    // Function to close mobile menu
    function closeMobileMenu() {
        mobileNav.classList.remove('open');
        menuOverlay.classList.remove('active');
        body.style.overflow = ''; // Restore body scroll
    }

    // Event listeners
    if (menuButton) {
        menuButton.addEventListener('click', openMobileMenu);
    }

    if (menuClose) {
        menuClose.addEventListener('click', closeMobileMenu);
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking on navigation links (mobile)
    const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Handle window resize - close mobile menu if screen becomes large
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    // Handle escape key to close mobile menu
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && mobileNav.classList.contains('open')) {
            closeMobileMenu();
        }
    });

    // Smooth scrolling for anchor links (if any are added later)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active state handling for navigation items
    const allNavLinks = document.querySelectorAll('.nav-link');
    
    // Set home as active by default
    const homeLinks = document.querySelectorAll('.nav-link[href="#"], .nav-link:first-child');
    homeLinks.forEach(link => {
        link.classList.add('active');
    });

    // Handle navigation link clicks
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            allNavLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // Add active class to clicked link and its counterpart (desktop/mobile)
            const linkText = this.textContent.trim();
            const matchingLinks = document.querySelectorAll('.nav-link');
            matchingLinks.forEach(matchingLink => {
                if (matchingLink.textContent.trim() === linkText) {
                    matchingLink.classList.add('active');
                }
            });
        });
    });

    // Add hover effects for read more button (additional enhancement)
    const readMoreBtn = document.querySelector('.read-more-btn');
    if (readMoreBtn) {
        readMoreBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
        });
        
        readMoreBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }

    // Add click handlers for news articles (placeholder functionality)
    const newsArticles = document.querySelectorAll('.right-block article, .card');
    newsArticles.forEach(article => {
        article.addEventListener('click', function() {
            // Add a subtle click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Intersection Observer for animations on scroll (optional enhancement)
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe cards for animation
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
});