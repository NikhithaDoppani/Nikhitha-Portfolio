// Enhanced JavaScript for GitHub Pages Blog
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeTableOfContents();
    initializeBackToTop();
    initializeMethodTabs();
    initializeCopyCode();
    initializeInteractiveElements();
    initializeProgressBar();
    initializeSmootScrolling();
});

// Navigation functionality
function initializeNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.querySelector('.navbar');
    
    // Mobile menu toggle
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            // Add mobile menu implementation if needed
        });
    }
    
    // Navbar scroll effect
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'white';
            navbar.style.backdropFilter = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Table of Contents functionality
function initializeTableOfContents() {
    const toc = document.getElementById('tableOfContents');
    const sections = document.querySelectorAll('.content-section');
    const tocLinks = document.querySelectorAll('.toc a');
    
    if (!toc || !sections.length) return;
    
    // Highlight active section in TOC
    const observerOptions = {
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                tocLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Hide TOC on smaller screens
    function toggleTOC() {
        if (window.innerWidth <= 1024) {
            toc.style.display = 'none';
        } else {
            toc.style.display = 'block';
        }
    }
    
    window.addEventListener('resize', toggleTOC);
    toggleTOC(); // Initial check
}

// Back to top button
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Method tabs functionality
function initializeMethodTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetMethod = button.textContent.toLowerCase().includes('manual') ? 'manual' : 'git';
            showMethod(targetMethod);
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

// Show specific method (called by HTML)
function showMethod(method) {
    const manualMethod = document.getElementById('manual-method');
    const gitMethod = document.getElementById('git-method');
    
    if (method === 'manual') {
        manualMethod.classList.add('active');
        gitMethod.classList.remove('active');
    } else {
        gitMethod.classList.add('active');
        manualMethod.classList.remove('active');
    }
}

// Copy code functionality
function initializeCopyCode() {
    // The copyCode function is called directly from HTML buttons
}

function copyCode(button) {
    const codeBlock = button.closest('.code-block');
    const code = codeBlock.querySelector('pre code');
    
    if (!code) return;
    
    const text = code.textContent;
    
    // Use the Clipboard API
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showCopyFeedback(button, 'Copied!');
        }).catch(() => {
            fallbackCopyText(text, button);
        });
    } else {
        fallbackCopyText(text, button);
    }
}

function fallbackCopyText(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyFeedback(button, 'Copied!');
    } catch (err) {
        showCopyFeedback(button, 'Failed to copy');
    }
    
    document.body.removeChild(textArea);
}

function showCopyFeedback(button, message) {
    const originalText = button.textContent;
    button.textContent = message;
    button.style.background = '#22c55e';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 2000);
}

// Interactive elements
function initializeInteractiveElements() {
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.step, .error-card, .use-case-card');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(element);
    });
    
    // Interactive checklist
    const checklistItems = document.querySelectorAll('.checklist-item');
    checklistItems.forEach(item => {
        item.addEventListener('click', () => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;
            
            if (checkbox.checked) {
                item.style.background = '#f0fdf4';
                item.style.borderLeft = '4px solid #22c55e';
            } else {
                item.style.background = '';
                item.style.borderLeft = '';
            }
        });
    });
}

// Reading progress bar
function initializeProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2563eb, #10b981);
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const trackLength = documentHeight - windowHeight;
        const pctScrolled = Math.floor((scrollTop / trackLength) * 100);
        
        progressBar.style.width = `${Math.min(100, Math.max(0, pctScrolled))}%`;
    });
}

// Smooth scrolling for anchor links
function initializeSmootScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Press 'T' to toggle table of contents
    if (e.key === 't' || e.key === 'T') {
        const toc = document.getElementById('tableOfContents');
        if (toc && window.innerWidth > 1024) {
            toc.style.display = toc.style.display === 'none' ? 'block' : 'none';
        }
    }
    
    // Press 'Escape' to scroll to top
    if (e.key === 'Escape') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// Performance optimization: Lazy load images if any
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Error handling for missing elements
function handleMissingElements() {
    const criticalElements = ['#tableOfContents', '#backToTop'];
    
    criticalElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`Critical element missing: ${selector}`);
        }
    });
}

// Initialize error handling
handleMissingElements();

// Export functions for global access
window.showMethod = showMethod;
window.copyCode = copyCode;