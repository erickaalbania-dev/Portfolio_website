// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initThemeToggle();
    initSkillsAnimation();
    initSmoothScrolling();
    initContactForm();
    initScrollAnimations();
    initBubbles(); 
    initPortfolioFiltering(); // New interactive feature
    initHeroTypewriter();     // Typewriter effect for hero title
    initSectionTitleTypewriter(); // Typewriter effect for section titles
    initResumeDownload();     // Force resume to download
});

// Hero title typewriter animation
function initHeroTypewriter() {
    const titleEl = document.querySelector('.hero-title');
    if (!titleEl) return;

    const fullText = titleEl.textContent.trim();
    titleEl.setAttribute('aria-label', fullText);
    titleEl.textContent = '';
    titleEl.classList.add('typing');

    let index = 0;
    const speed = 70;       // milliseconds per character
    const pauseEnd = 1800;  // pause when full text is shown

    function typeNextChar() {
        if (index <= fullText.length) {
            titleEl.textContent = fullText.slice(0, index);
            index++;
            setTimeout(typeNextChar, speed);
        } else {
            // After showing full text, pause, then smoothly fade out and restart the typing loop
            setTimeout(() => {
                titleEl.classList.add('fade-out');
                setTimeout(() => {
                    index = 0;
                    titleEl.textContent = '';
                    titleEl.classList.remove('fade-out');
                    typeNextChar();
                }, 400); // match CSS transition
            }, pauseEnd);
        }
    }

    typeNextChar();
}

// Section titles typewriter animation (looping)
function initSectionTitleTypewriter() {
    const titles = document.querySelectorAll('.section-title');
    if (!titles.length) return;

    titles.forEach((titleEl, idx) => {
        const fullText = titleEl.textContent.trim();
        titleEl.setAttribute('aria-label', fullText);
        titleEl.textContent = '';
        titleEl.classList.add('typing');

        let index = 0;
        const speed = 80;      // ms per character
        const pauseEnd = 1600; // pause after full text
        const startDelay = idx * 400; // staggered start per section

        function typeNextChar() {
            if (index <= fullText.length) {
                titleEl.textContent = fullText.slice(0, index);
                index++;
                setTimeout(typeNextChar, speed);
            } else {
                setTimeout(() => {
                    titleEl.classList.add('fade-out');
                    setTimeout(() => {
                        index = 0;
                        titleEl.textContent = '';
                        titleEl.classList.remove('fade-out');
                        typeNextChar();
                    }, 400);
                }, pauseEnd);
            }
        }

        setTimeout(typeNextChar, startDelay);
    });
}

// Force resume.pdf to download instead of open in new tab
function initResumeDownload() {
    const downloadLinks = document.querySelectorAll('.download-resume-link');
    if (!downloadLinks.length) return;

    downloadLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                const response = await fetch('resume.pdf');
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.href = url;
                a.download = 'Ericka-Albania-Resume.pdf';
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
            } catch (err) {
                console.error('Resume download failed:', err);
                // Fallback: navigate to the file
                window.location.href = 'resume.pdf';
            }
        });
    });
}

// Portfolio Filtering and Interaction
function initPortfolioFiltering() {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const viewAllLink = document.querySelector('.view-all-link');
    
    // Initially show only the first 3 cards on ALL screen sizes
    portfolioCards.forEach((card, index) => {
        if (index > 2) {
            card.style.display = 'none';
        } else {
            card.style.display = 'flex';
        }
    });

    if (viewAllLink) {
        viewAllLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Toggle text
            const isExpanded = this.getAttribute('data-expanded') === 'true';
            
            if (!isExpanded) {
                // Show all cards with a stagger animation
                portfolioCards.forEach((card, index) => {
                    card.style.display = 'flex';
                    // Small delay for smooth appearance
                    setTimeout(() => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        requestAnimationFrame(() => {
                            card.style.transition = 'all 0.5s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        });
                    }, index * 50);
                });
                
                this.innerHTML = 'Show Less';
                this.setAttribute('data-expanded', 'true');
            } else {
                // Collapse back to initial state: show only first 3 cards
                portfolioCards.forEach((card, index) => {
                    if (index > 2) {
                        card.style.display = 'none';
                    } else {
                        card.style.display = 'flex';
                    }
                });
                
                this.innerHTML = 'View all Projects';
                this.setAttribute('data-expanded', 'false');
                
                // Smooth scroll back to portfolio section so user sees top of list
                const portfolioSection = document.querySelector('#portfolio');
                if (portfolioSection) {
                    portfolioSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }
}

// Create dynamic bubbles for background
function initBubbles() {
    const bubblesContainer = document.getElementById('bubbles');
    if (!bubblesContainer) return;

    // Create 15 bubbles
    const bubbleCount = 15;

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        // Randomize size between 20px and 100px
        const size = Math.random() * 80 + 20;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Randomize position (left 0 to 100%)
        bubble.style.left = `${Math.random() * 100}%`;
        
        // Randomize animation duration (10s to 25s) for varying speeds
        bubble.style.animationDuration = `${Math.random() * 15 + 10}s`;
        
        // Randomize delay so they don't all start at once
        bubble.style.animationDelay = `${Math.random() * 10}s`;
        
        bubblesContainer.appendChild(bubble);
    }
}

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (hamburger && navMenu && !hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Theme Toggle functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    updateThemeIcon(currentTheme);
    
    if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    }
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
}

function toggleTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) themeToggle.click();
}

// Skills Animation
function initSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate skill bars
                const progressBar = entry.target.querySelector('.progress');
                if (progressBar) {
                    const width = progressBar.style.width;
                    progressBar.style.width = '0';
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 100);
                }
            }
        });
    }, { threshold: 0.5 });
    
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        observer.observe(item);
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form functionality with EmailJS
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    // CONFIGURATION: REPLACE THESE VALUES WITH YOUR EMAILJS ACCOUNT DETAILS
    const publicKey = "aOwgHiIgew4z0oXrB"; // e.g. "user_123456"
    const serviceID = "service_cepj75d"; // Updated with provided ID
    const templateID = "template_oke0rbk"; // Updated with provided ID

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(publicKey);
    }
    
    if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
            // Check if user has configured the keys
            if (publicKey === "YOUR_PUBLIC_KEY" || serviceID === "YOUR_SERVICE_ID" || templateID === "YOUR_TEMPLATE_ID") {
                showNotification('Configuration Required: Please open script.js and add your EmailJS keys.', 'error');
                console.error('EmailJS not configured. Please edit script.js lines inside initContactForm()');
            return;
        }
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
            // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
            // Prepare template parameters
            const templateParams = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Send email using EmailJS
            emailjs.send(serviceID, templateID, templateParams)
                .then(function() {
                    showNotification('Message sent successfully! I will get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
                }, function(error) {
                    console.error('FAILED...', error);
                    // Show the specific error message from EmailJS to help debugging
                    const errorMessage = error.text || "Check your keys and internet connection.";
                    showNotification(`Failed: ${errorMessage}`, 'error');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
}

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const basicAnimatedElements = document.querySelectorAll('.section-title, .contact-content, .hero-content');
    basicAnimatedElements.forEach(el => {
        el.classList.add('reveal-element');
        observer.observe(el);
    });

    // Portfolio: staggered reveal
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach((card, index) => {
        card.classList.add('reveal-element');
        // used by CSS to stagger animations
        card.style.setProperty('--reveal-delay', `${Math.min(index, 10) * 90}ms`);
        observer.observe(card);
    });
}

// Add CSS for reveal animation
const revealCSS = `
    .reveal-element {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .reveal-element.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;

const revealStyle = document.createElement('style');
revealStyle.textContent = revealCSS;
document.head.appendChild(revealStyle);

// Add navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
        navbar.style.boxShadow = 'var(--shadow-sm)';
    }
});
