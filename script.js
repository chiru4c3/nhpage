// Mobile Menu and Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements with proper error checking
    const menuButton = document.getElementById('menu-button');
    const menuClose = document.getElementById('menu-close');
    const nav = document.querySelector('nav');
    const body = document.body;
    
    // Open mobile menu
    if (menuButton && nav) {
        menuButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            nav.classList.add('open');
            body.style.overflow = 'hidden';
        });
    }
    
    // Close mobile menu
    if (menuClose && nav) {
        menuClose.addEventListener('click', function(e) {
            e.preventDefault();
            nav.classList.remove('open');
            body.style.overflow = 'auto';
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (nav && menuButton && !nav.contains(e.target) && !menuButton.contains(e.target)) {
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
    
    // Functional "Read more" button
    const readMoreBtn = document.querySelector('.read-more-btn');
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Read more button clicked - functional!');
            
            // Add visual feedback
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 1000);
        });
    }
    
    // Mobile hero image handling (< 1000px)
    function handleHeroImage() {
        const heroImg = document.querySelector('.hero-img img');
        if (heroImg) {
            // For viewports under 1000px, ensure proper image display
            if (window.innerWidth < 1000) {
                heroImg.style.display = 'block';
                heroImg.style.width = '100%';
                heroImg.style.height = '100%';
                heroImg.style.objectFit = 'cover';
            }
        }
    }
    
    // Handle responsive images
    handleHeroImage();
    window.addEventListener('resize', debounce(handleHeroImage, 250));
    
    // Add smooth scrolling animations
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
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(card);
    });
    
    // Observe news items for animations
    document.querySelectorAll('.news-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
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

// Handle smooth scrolling for anchor links
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

// Add hover effects for news headlines
document.addEventListener('DOMContentLoaded', function() {
    const newsHeadlines = document.querySelectorAll('.right-block h3, .card h3');
    
    newsHeadlines.forEach(headline => {
        headline.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        headline.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});
