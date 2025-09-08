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
            
            // Functional "Read more" button
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
        });