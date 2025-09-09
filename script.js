// DOM Elements
const menuButton = document.getElementById('menu-button');
const menuClose = document.getElementById('menu-close');
const navMenu = document.getElementById('nav-menu');
const heroImage = document.getElementById('hero-image');

// Mobile menu functionality
function openMenu() {
    navMenu.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
}

function closeMenu() {
    navMenu.classList.remove('open');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Event listeners for menu toggle
menuButton.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);

// Close menu when clicking on nav links (for better UX)
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close menu when clicking outside (on overlay)
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && 
        !navMenu.contains(e.target) && 
        !menuButton.contains(e.target)) {
        closeMenu();
    }
});

// Responsive hero image functionality
function updateHeroImage() {
    const screenWidth = window.innerWidth;
    
    if (screenWidth >= 1000) {
        // Desktop view
        heroImage.src = 'hero-desktop.jpg';
        heroImage.alt = 'Desktop Hero Image';
    } else {
        // Mobile view
        heroImage.src = 'hero-mobile.jpg';
        heroImage.alt = 'Mobile Hero Image';
    }
}

// Update hero image on page load
document.addEventListener('DOMContentLoaded', updateHeroImage);

// Update hero image on window resize
window.addEventListener('resize', updateHeroImage);

// Handle window resize for menu
window.addEventListener('resize', () => {
    const screenWidth = window.innerWidth;
    
    // Close mobile menu if screen becomes desktop size
    if (screenWidth >= 1000 && navMenu.classList.contains('open')) {
        closeMenu();
    }
});

// Smooth scrolling for anchor links (if needed in future)
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

// Add keyboard navigation support for accessibility
document.addEventListener('keydown', (e) => {
    // Close menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMenu();
    }
    
    // Open menu with Enter or Space when menu button is focused
    if ((e.key === 'Enter' || e.key === ' ') && 
        document.activeElement === menuButton) {
        e.preventDefault();
        openMenu();
    }
});

// Enhanced button interactions
const readMoreBtn = document.querySelector('.read-more-btn');
if (readMoreBtn) {
    readMoreBtn.addEventListener('click', () => {
        // Add click functionality if needed
        console.log('Read More clicked');
    });
}

// News item click handlers for better interactivity
const newsItems = document.querySelectorAll('.news-item h3, .second-section .card h3');
newsItems.forEach(item => {
    item.addEventListener('click', () => {
        // Add click functionality if needed
        console.log('News item clicked:', item.textContent);
    });
});

// Initialize the application
function initApp() {
    // Set initial hero image
    updateHeroImage();
    
    // Ensure menu is closed on load
    navMenu.classList.remove('open');
    document.body.style.overflow = 'auto';
    
    // Add loaded class for any CSS animations
    document.body.classList.add('loaded');
}

// Run initialization when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}