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

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 16px rgba(0, 0, 0, 0.08)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.92)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.tech-card, .app-item, .stat-item, .team-member'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Stats counter animation
const animateStats = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = stat.textContent.replace(/[^\d]/g, '');
        const isPercentage = stat.textContent.includes('%');
        const hasMultiplier = stat.textContent.includes('x');
        const hasPlus = stat.textContent.includes('+');
        
        let current = 0;
        const targetNum = parseInt(target);
        const increment = targetNum / 100;
        
        const updateCounter = () => {
            if (current < targetNum) {
                current += increment;
                let displayValue = Math.ceil(current);
                
                if (isPercentage) {
                    stat.textContent = displayValue + '%';
                } else if (hasMultiplier) {
                    stat.textContent = displayValue + 'x';
                } else if (hasPlus) {
                    stat.textContent = displayValue + '+';
                } else {
                    stat.textContent = displayValue;
                }
                
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = stat.getAttribute('data-original') || stat.textContent;
            }
        };
        
        stat.setAttribute('data-original', stat.textContent);
        updateCounter();
    });
};

// Trigger stats animation when section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Progress bar animation
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', () => {
    const applicationsSection = document.querySelector('.applications');
    if (applicationsSection) {
        progressObserver.observe(applicationsSection);
    }
});

// Form handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#ff6b35';
                    input.setAttribute('aria-invalid', 'true');
                    isValid = false;
                } else {
                    input.style.borderColor = 'rgba(0, 78, 122, 0.2)';
                    input.removeAttribute('aria-invalid');
                }
            });
            
            if (isValid) {
                // Show success message
                const button = this.querySelector('.btn-primary');
                const originalText = button.textContent;
                button.textContent = 'Message Sent!';
                button.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
                
                const statusRegion = document.getElementById('form-status');
                if (statusRegion) {
                    statusRegion.textContent = 'Your message has been sent successfully.';
                }

                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
                    this.reset();
                }, 3000);
            } else {
                const statusRegion = document.getElementById('form-status');
                if (statusRegion) {
                    statusRegion.textContent = 'Please complete the required fields highlighted.';
                }
            }
        });
    }
});

// Enhanced quantum particle animation with mouse interaction
document.addEventListener('DOMContentLoaded', () => {
    const quantumAnimation = document.querySelector('.quantum-animation');
    if (quantumAnimation) {
        let mouseX = 0;
        let mouseY = 0;
        let isMouseInside = false;
        
        quantumAnimation.addEventListener('mouseenter', () => {
            isMouseInside = true;
        });
        
        quantumAnimation.addEventListener('mouseleave', () => {
            isMouseInside = false;
        });
        
        quantumAnimation.addEventListener('mousemove', (e) => {
            const rect = quantumAnimation.getBoundingClientRect();
            mouseX = e.clientX - rect.left - rect.width / 2;
            mouseY = e.clientY - rect.top - rect.height / 2;
        });
        
        // Add interactive effect to particles
        const particles = quantumAnimation.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            particle.addEventListener('mouseenter', () => {
                particle.style.transform += ' scale(1.5)';
                particle.style.boxShadow = '0 0 20px rgba(0, 78, 122, 0.8)';
            });
            
            particle.addEventListener('mouseleave', () => {
                particle.style.transform = particle.style.transform.replace(' scale(1.5)', '');
                particle.style.boxShadow = 'none';
            });
        });
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Mobile menu toggle (for future mobile navigation)
document.addEventListener('DOMContentLoaded', () => {
    // Add mobile menu functionality when needed
    const createMobileMenu = () => {
        const navbar = document.querySelector('.navbar .container');
        const navMenu = document.querySelector('.nav-menu');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: var(--light-text);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 5px;
        `;
        
        // Add mobile styles
        const mobileStyles = document.createElement('style');
        mobileStyles.textContent = `
            @media (max-width: 768px) {
                .mobile-menu-btn {
                    display: block !important;
                }
                .nav-menu {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: var(--darker-bg);
                    border-top: 1px solid rgba(0, 0, 0, 0.06);
                    padding: 20px;
                }
                .nav-menu.active {
                    display: block;
                }
                .nav-menu ul {
                    flex-direction: column;
                    gap: 15px;
                }
            }
        `;
        
        document.head.appendChild(mobileStyles);
        navbar.appendChild(mobileMenuBtn);
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    };
    
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add focus styles for accessibility
const accessibilityStyles = document.createElement('style');
accessibilityStyles.textContent = `
    .keyboard-nav *:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
`;
document.head.appendChild(accessibilityStyles);