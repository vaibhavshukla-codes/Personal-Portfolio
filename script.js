// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const contactForm = document.getElementById('contact-form');
const skillBars = document.querySelectorAll('.skill-progress');
const languageBars = document.querySelectorAll('.language-progress');

// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.bindEvents();
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const icon = themeToggleBtn.querySelector('i');
        
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
        
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    bindEvents() {
        themeToggleBtn.addEventListener('click', () => this.toggleTheme());
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleScroll();
    }

    bindEvents() {
        navToggle.addEventListener('click', () => this.toggleMenu());
        
        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isMenuOpen) {
                    this.closeMenu();
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Handle scroll for active nav link
        window.addEventListener('scroll', () => {
            this.handleScroll();
            this.updateActiveNavLink();
        });
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    }

    closeMenu() {
        this.isMenuOpen = false;
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }

    handleScroll() {
        const navbar = document.querySelector('.navbar');
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        
        if (window.scrollY > 50) {
            if (isDarkMode) {
                navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            }
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            if (isDarkMode) {
                navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
}

// Smooth Scrolling
class SmoothScrollManager {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Animation Manager
class AnimationManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.animateSkillBars();
    }

    setupIntersectionObserver() {
        // Disabled intersection observer to fix visibility issues
        // const observer = new IntersectionObserver((entries) => {
        //     entries.forEach(entry => {
        //         if (entry.isIntersecting) {
        //             entry.target.classList.add('animated');
        //             
        //             // Special handling for skill bars
        //             if (entry.target.classList.contains('skill-progress')) {
        //                 this.animateSkillBar(entry.target);
        //             }
        //             
        //             // Special handling for language bars
        //             if (entry.target.classList.contains('language-progress')) {
        //                 this.animateLanguageBar(entry.target);
        //             }
        //         }
        //     });
        // }, this.observerOptions);

        // Observe elements for animation
        // document.querySelectorAll('.animate-on-scroll').forEach(el => {
        //     observer.observe(el);
        // });
        
        // Animate skill bars immediately instead of on scroll
        this.animateAllSkillBars();
    }

        // Add animate-on-scroll class to elements that should animate (disabled for now)
        // document.querySelectorAll('.project-card, .timeline-item, .cert-item, .skill-category, .language-item, .interest-item, .achievement-item').forEach(el => {
        //     el.classList.add('animate-on-scroll');
        // });
    }

    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.setProperty('--target-width', `${width}%`);
        });
    }

    animateSkillBar(bar) {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = `${width}%`;
        }, 200);
    }

    animateLanguageBar(bar) {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = `${width}%`;
        }, 200);
    }

    animateAllSkillBars() {
        // Animate skill bars immediately
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.getAttribute('data-width');
                bar.style.width = `${width}%`;
            }, index * 100); // Stagger the animations
        });

        // Animate language bars immediately
        const languageBars = document.querySelectorAll('.language-progress');
        languageBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.getAttribute('data-width');
                bar.style.width = `${width}%`;
            }, (skillBars.length + index) * 100);
        });
    }
}

// Contact Form Manager
class ContactFormManager {
    constructor() {
        this.init();
    }

    init() {
        if (contactForm) {
            this.bindEvents();
        }
    }

    bindEvents() {
        contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Simulate form submission
        this.showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    }

    showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        messageDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(messageDiv);
            }, 300);
        }, 3000);
    }
}

// Typing Animation for Hero Section
class TypingAnimation {
    constructor() {
        this.texts = [
            'Full-Stack Developer',
            'Problem Solver',
            'Tech Enthusiast',
            'Continuous Learner'
        ];
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        const typingElement = document.querySelector('.hero-subtitle');
        if (typingElement) {
            this.element = typingElement;
            this.type();
        }
    }

    type() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }

        let typeSpeed = this.isDeleting ? 50 : 100;

        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            typeSpeed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Particle Background (Optional Enhancement)
class ParticleBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.init();
    }

    init() {
        this.createCanvas();
        this.createParticles();
        this.animate();
        this.bindEvents();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.1;
        `;
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 10000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
    }
}

// Performance Optimizer - Disabled to fix visibility issues
// class PerformanceOptimizer {
//     constructor() {
//         this.init();
//     }

//     init() {
//         this.lazyLoadImages();
//         this.preloadCriticalResources();
//     }

//     lazyLoadImages() {
//         const images = document.querySelectorAll('img[data-src]');
        
//         if ('IntersectionObserver' in window) {
//             const imageObserver = new IntersectionObserver((entries) => {
//                 entries.forEach(entry => {
//                     if (entry.isIntersecting) {
//                         const img = entry.target;
//                         img.src = img.dataset.src;
//                         img.classList.remove('lazy');
//                         imageObserver.unobserve(img);
//                     }
//                 });
//             });

//             images.forEach(img => imageObserver.observe(img));
//         }
//     }

//     preloadCriticalResources() {
//         // Preload critical CSS and fonts
//         const criticalResources = [
//             'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
//             'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
//         ];

//         criticalResources.forEach(resource => {
//             const link = document.createElement('link');
//             link.rel = 'preload';
//             link.as = 'style';
//             link.href = resource;
//             document.head.appendChild(link);
//         });
//     }
// }

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core managers
    new ThemeManager();
    new NavigationManager();
    new SmoothScrollManager();
    new ContactFormManager();

    // Add loading animation
    document.body.classList.add('loaded');
    
    // Immediately show all content
    showAllContent();
    
    // Animate skill bars
    setTimeout(() => {
        animateSkillBars();
    }, 300);
});

function showAllContent() {
    // Force all sections to be visible
    const sections = ['skills', 'projects', 'education', 'languages'];
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'block';
            section.style.visibility = 'visible';
            section.style.opacity = '1';
        }
    });
    
    // Force all containers to be visible
    document.querySelectorAll('.skills-container, .projects-grid, .education-timeline, .cert-grid, .achievement-grid, .languages-interests-content').forEach(container => {
        container.style.display = 'block';
        container.style.visibility = 'visible';
        container.style.opacity = '1';
    });
    
    // Force all cards and items to be visible
    document.querySelectorAll('.skill-category, .project-card, .timeline-item, .cert-item, .achievement-item, .language-item, .interest-item').forEach(item => {
        item.style.display = 'block';
        item.style.visibility = 'visible';
        item.style.opacity = '1';
    });
    
    // Remove any problematic classes
    document.querySelectorAll('.animate-on-scroll, .animated').forEach(el => {
        el.classList.remove('animate-on-scroll', 'animated');
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            if (width) {
                bar.style.width = `${width}%`;
            }
        }, index * 50);
    });

    const languageBars = document.querySelectorAll('.language-progress');
    languageBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            if (width) {
                bar.style.width = `${width}%`;
            }
        }, (skillBars.length + index) * 50);
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .nav-link.active {
        color: var(--primary-color);
    }

    .nav-link.active::after {
        width: 100%;
    }

    body.loaded {
        animation: fadeIn 0.5s ease-out;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }

    .lazy.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, reduce animations
        document.body.style.animationPlayState = 'paused';
    } else {
        // Page is visible, resume animations
        document.body.style.animationPlayState = 'running';
    }
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
