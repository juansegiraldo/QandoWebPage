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

// Quantum Wave Animation with Canvas - Rydberg Style
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('waveCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    let width, height, centerY;
    let time = 0;
    let animationId;

    // Your color palette
    const colorPalette = ['#345e77', '#004e7a', '#9bc3c2'];

    class QuantumWave {
        constructor(index, totalWaves) {
            // Create waves with properties matching the Rydberg pattern
            const n = index + 5; // n from 5 to 14
            
            // Peak amplitude at x=0, decreasing with index
            this.amplitude = 120 / Math.sqrt(index + 1);
            
            // Frequency increases with index (more oscillations)
            this.frequency = 0.8 + index * 0.4;
            
            // Damping factor - how quickly it decays
            this.damping = 0.008 + index * 0.002;
            
            // No phase shift - all start at peak
            this.phase = 0;
            
            // Color assignment
            const t = index / totalWaves;
            const r = Math.floor(52 + t * 40);
            const g = Math.floor(94 + t * 100);
            const b = Math.floor(119 + t * 75);
            
            this.color = {
                main: `rgba(${r}, ${g}, ${b}, ${0.6 - t * 0.3})`,
                particle: `rgb(${r}, ${g}, ${b})`,
                glow: `rgba(${r}, ${g}, ${b}, 0.3)`
            };
            
            // Particle properties
            this.particleX = 0;
            this.particleY = 0;
            this.particlePhase = 0;
            this.particleSpeed = 0.01; // Slowed down by 33%
            this.particleSize = 5 - index * 0.3;
        }

        calculateY(x, t) {
            // Damped sine wave: A * exp(-αx) * sin(ωx + φ)
            // All waves start from x=0 with cos (peak at origin)
            const xNorm = x / 50; // Scale factor for x
            const dampingFactor = Math.exp(-this.damping * xNorm);
            const oscillation = Math.cos(this.frequency * xNorm); // cos for peak at x=0
            
            // Add subtle time animation
            const timeModulation = 1 + 0.05 * Math.sin(t * 2 / (this.frequency + 1));
            
            return this.amplitude * dampingFactor * oscillation * timeModulation;
        }

        draw(ctx, width, centerY, t) {
            ctx.strokeStyle = this.color.main;
            ctx.lineWidth = 2;
            ctx.globalAlpha = 0.8;
            
            ctx.beginPath();
            
            // Draw wave from left edge to right edge
            for (let x = 0; x <= width; x += 1) {
                const y = this.calculateY(x, t) + centerY;
                
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            
            ctx.stroke();
            
            // Update and draw particle
            this.updateParticle(width, centerY, t);
            this.drawParticle(ctx);
        }

        updateParticle(width, centerY, t) {
            // Particle moves along the wave
            this.particlePhase += this.particleSpeed;
            
            // Move from left to right, then reset
            this.particleX = (this.particlePhase * 100) % (width + 100);
            
            // Calculate Y position on the wave
            this.particleY = this.calculateY(this.particleX, t) + centerY;
            
            // Reset when particle goes off screen
            if (this.particleX > width) {
                this.particlePhase = 0;
            }
        }

        drawParticle(ctx) {
            // Only draw if particle is visible
            if (this.particleX > width) return;
            
            // Draw glowing particle
            ctx.globalAlpha = 1;
            
            // Outer glow
            const gradient = ctx.createRadialGradient(
                this.particleX, this.particleY, 0,
                this.particleX, this.particleY, this.particleSize * 2.5
            );
            gradient.addColorStop(0, this.color.particle);
            gradient.addColorStop(0.4, this.color.glow);
            gradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.particleX, this.particleY, this.particleSize * 2.5, 0, Math.PI * 2);
            ctx.fill();
            
            // Core particle
            ctx.fillStyle = this.color.particle;
            ctx.beginPath();
            ctx.arc(this.particleX, this.particleY, this.particleSize * 0.6, 0, Math.PI * 2);
            ctx.fill();
            
            // Inner highlight
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = 0.7;
            ctx.beginPath();
            ctx.arc(this.particleX - this.particleSize * 0.1, 
                   this.particleY - this.particleSize * 0.1, 
                   this.particleSize * 0.2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize waves (10 waves like in the image)
    const waves = [];
    const numWaves = 10;
    
    for (let i = 0; i < numWaves; i++) {
        waves.push(new QuantumWave(i, numWaves));
    }

    function resize() {
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
        canvas.width = width;
        canvas.height = height;
        centerY = height / 2;
    }

    function animate() {
        // Clear canvas with transparent background
        ctx.clearRect(0, 0, width, height);
        
        // Draw center line
        ctx.strokeStyle = 'rgba(52, 94, 119, 0.05)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.stroke();
        
        // Draw all waves
        waves.forEach(wave => {
            wave.draw(ctx, width, centerY, time);
        });
        
        time += 0.015;
        animationId = requestAnimationFrame(animate);
    }

    function init() {
        resize();
        animate();
    }

    // Event listeners
    window.addEventListener('resize', resize);
    
    // Start animation
    init();

    // Cleanup function
    function cleanup() {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', resize);
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