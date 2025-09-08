// Mobile Menu and Test-Critical Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const menuButton = document.getElementById('menu-button');
    const menuClose = document.getElementById('menu-close');
    const nav = document.querySelector('nav');
    const body = document.body;
    
    // Open mobile menu
    if (menuButton) {
        menuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            nav.classList.add('open');
            body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });
    }
    
    // Close mobile menu
    if (menuClose) {
        menuClose.addEventListener('click', function() {
            nav.classList.remove('open');
            body.style.overflow = 'auto'; // Re-enable scrolling
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (nav && !nav.contains(e.target) && menuButton && !menuButton.contains(e.target)) {
            nav.classList.remove('open');
            body.style.overflow = 'auto';
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav && nav.classList.contains('open')) {
            nav.classList.remove('open');
            body.style.overflow = 'auto';
        }
    });
    
    // Handle navigation links
    const navLinks = document.querySelectorAll('.nav-items a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Close mobile menu when nav link is clicked
            if (window.innerWidth < 768 && nav) {
                nav.classList.remove('open');
                body.style.overflow = 'auto';
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && nav) {
            nav.classList.remove('open');
            body.style.overflow = 'auto';
        }
    });
    
    // Functional "Read more" button for test case 7
    const readMoreBtn = document.querySelector('.read-more-btn');
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Button is functional - add your navigation logic here
            console.log('Read more button clicked - functional!');
            
            // Optional: Add visual feedback
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 1000);
        });
    }
    
    // Mobile hero image handling for test case 8 (< 1000px)
    function handleHeroImage() {
        const heroImg = document.getElementById('hero-image');
        if (heroImg) {
            if (window.innerWidth < 1000) {
                // Use mobile-optimized image if available
                if (heroImg.src.includes('hero-desktop.jpg') && document.querySelector('img[src="hero-mobile.jpg"]')) {
                    heroImg.src = 'hero-mobile.jpg';
                }
            } else {
                // Use desktop image
                if (heroImg.src.includes('hero-mobile.jpg')) {
                    heroImg.src = 'hero-desktop.jpg';
                }
            }
        }
    }
    
    // Handle responsive images on load and resize
    handleHeroImage();
    window.addEventListener('resize', debounce(handleHeroImage, 250));
    
    // Add intersection observer for animations (optional enhancement)
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
    
    // Observe cards for scroll animations
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Utility function for debouncing
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

// Additional utility functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Handle smooth scrolling for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
