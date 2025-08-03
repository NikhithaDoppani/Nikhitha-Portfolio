// Smooth scrolling for navigation links
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

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(139, 92, 246, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// Reading progress bar
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.animationDelay = '0s';
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('.main-content section').forEach((section, index) => {
    section.style.animationDelay = `${index * 0.1}s`;
    observer.observe(section);
});

// Statistics counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const text = stat.textContent;
        const isPercentage = text.includes('%');
        const isMultiplier = text.includes('x');
        
        let target;
        if (isPercentage) {
            target = parseInt(text);
        } else if (isMultiplier) {
            target = parseFloat(text);
        } else {
            target = parseInt(text);
        }
        
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (isPercentage) {
                stat.textContent = Math.floor(current) + '%';
            } else if (isMultiplier) {
                stat.textContent = current.toFixed(1) + 'x';
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 50);
    });
}

// Trigger stats animation when visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
});

const statsSection = document.querySelector('.diversity-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// CTA Button interactions with ripple effect
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.height, rect.width);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(139, 92, 246, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Button action simulation
        if (this.textContent.includes('Community')) {
            showNotification('Welcome to our empowering community! 💜', 'success');
        } else if (this.textContent.includes('Story')) {
            showNotification('We\'d love to hear your inspiring journey! ✨', 'info');
        }
    });
});

// Enhanced notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    
    const colors = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        info: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1.2rem 1.8rem;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(139, 92, 246, 0.2);
        z-index: 1002;
        transform: translateX(400px);
        transition: transform 0.4s ease;
        max-width: 350px;
        font-weight: 500;
        font-size: 0.95rem;
        line-height: 1.4;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 4000);
}

// Social link interactions
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const platform = this.textContent;
        showNotification(`Connecting you to ${platform}... Let's build together! 🚀`, 'info');
    });
});

// Enhanced hover effects for cards
document.querySelectorAll('.experience-card, .inspiration-card, .takeaway-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = this.classList.contains('takeaway-card') ? 'translateX(8px)' : 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) translateX(0)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .visible {
        animation: fadeInUp 0.8s ease forwards !important;
    }
    
    .experience-card:nth-child(1) { animation-delay: 0.1s; }
    .experience-card:nth-child(2) { animation-delay: 0.2s; }
    .experience-card:nth-child(3) { animation-delay: 0.3s; }
    
    .inspiration-card:nth-child(1) { animation-delay: 0.1s; }
    .inspiration-card:nth-child(2) { animation-delay: 0.2s; }
    .inspiration-card:nth-child(3) { animation-delay: 0.3s; }
    
    .takeaway-card:nth-child(1) { animation-delay: 0.1s; }
    .takeaway-card:nth-child(2) { animation-delay: 0.2s; }
    .takeaway-card:nth-child(3) { animation-delay: 0.3s; }
    .takeaway-card:nth-child(4) { animation-delay: 0.4s; }
    .takeaway-card:nth-child(5) { animation-delay: 0.5s; }
`;
document.head.appendChild(style);

// Console message for fellow developers
console.log(`
    💜 Hey there, fellow coder! 
    
    Thanks for checking out the code behind this empowering blog.
    This site was built with:
    
    ✨ Vanilla JavaScript for smooth interactions
    🎨 CSS Grid & Flexbox for responsive layouts
    📱 Mobile-first design principles
    🌈 Custom CSS properties for consistent theming
    🎯 Intersection Observer API for scroll animations
    💫 CSS gradients and transitions for visual appeal
    
    Keep coding, keep inspiring, and remember:
    You belong in tech! 👩‍💻
    
    - Built with 💜 for women in tech
`);

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Stagger initial animations
    document.querySelectorAll('.experience-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    document.querySelectorAll('.inspiration-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });
    
    document.querySelectorAll('.takeaway-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Welcome message
    setTimeout(() => {
        showNotification('Welcome to my journey! Thanks for reading 💜', 'info');
    }, 2000);
    
    console.log('💜 Women in Tech blog initialized successfully!');
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for keyboard navigation
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-lavender);
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusStyle);