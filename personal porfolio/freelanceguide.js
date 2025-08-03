// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll animations
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
    
    // Observe all skill cards, tip cards, and other elements
    const animatedElements = document.querySelectorAll('.skill-card, .tip-card, .step-card, .tool-category, .highlight');
    
    animatedElements.forEach((el, index) => {
        // Initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.3s ease-out ${index * 0.1}s, transform 0.3s ease-out ${index * 0.1}s`;
        
        observer.observe(el);
    });
    
    // Add hover effects to progress bars
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const progressBar = this.querySelector('.progress');
            if (progressBar) {
                progressBar.style.background = 'linear-gradient(135deg, #02010F  0%, #19a2baff 100%)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const progressBar = this.querySelector('.progress');
            if (progressBar) {
                progressBar.style.background = 'linear-gradient(135deg, #02010F 0%, #19a2baff 100%)';
            }
        });
    });
    
    // Add active states for navigation
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('.content-section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Add click animations to buttons and interactive elements
    const interactiveElements = document.querySelectorAll('.step-card, .skill-card, .tip-card, .tool-category');
    
    interactiveElements.forEach(element => {
        element.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Animate earnings table rows on scroll
    const tableRows = document.querySelectorAll('.earnings-table tbody tr');
    
    const tableObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.5 });
    
    tableRows.forEach(row => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-30px)';
        row.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        tableObserver.observe(row);
    });
    
    // Add typing effect to hero title (subtle)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transition = 'opacity 1s ease-out';
        }, 500);
    }
    
    // Add floating animation to stats
    const stats = document.querySelectorAll('.stat');
    stats.forEach((stat, index) => {
        stat.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
    });
    
    // Copy to clipboard functionality for code examples (if any)
    const codeBlocks = document.querySelectorAll('.proposal-template');
    codeBlocks.forEach(block => {
        block.addEventListener('click', function() {
            const text = this.textContent;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    // Show temporary feedback
                    const originalBg = this.style.background;
                    this.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
                    this.style.color = 'white';
                    
                    setTimeout(() => {
                        this.style.background = originalBg;
                        this.style.color = '';
                    }, 1000);
                });
            }
        });
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function updateScrollEffects() {
        // Add any scroll-based effects here
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
});

// Add floating animation keyframes via CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
        100% {
            transform: translateY(0px);
        }
    }
    
    .nav-menu a.active {
        opacity: 1;
        text-decoration: underline;
    }
    
    .skill-card:hover .progress {
        animation: pulse 1s ease-in-out;
    }
    
    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(102, 126, 234, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(102, 126, 234, 0);
        }
    }
`;

document.head.appendChild(style);