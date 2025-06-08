// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });

    // Initialize current time display
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Initialize Typed.js for hero section
    initTypewriter();

    // Initialize all event listeners
    initEventListeners();

    // Initialize skill bars animation
    initSkillBars();

    // Initialize project cards
    initProjectCards();
});

// Function to update date and time
function updateDateTime() {
    const now = new Date();
    const formatted = now.getUTCFullYear() + '-' + 
                     String(now.getUTCMonth() + 1).padStart(2, '0') + '-' +
                     String(now.getUTCDate()).padStart(2, '0') + ' ' +
                     String(now.getUTCHours()).padStart(2, '0') + ':' +
                     String(now.getUTCMinutes()).padStart(2, '0') + ':' +
                     String(now.getUTCSeconds()).padStart(2, '0');
    
    // Update if there's a time display element
    const timeDisplay = document.getElementById('current-time');
    if (timeDisplay) {
        timeDisplay.textContent = formatted;
    }
}

// Initialize Typed.js
function initTypewriter() {
    const typed = new Typed('.typed-text', {
        strings: [
            'Full Stack Developer',
            'UI/UX Designer',
            'Software Engineer',
            'Web Developer'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        cursorChar: '|',
        smartBackspace: true
    });
}

// Initialize all event listeners
function initEventListeners() {
    // Navbar scroll effect
    window.addEventListener('scroll', handleScroll);

    // Smooth scrolling for navigation links
    initSmoothScroll();

    // Contact form submission
    initContactForm();

    // Project card hover effects
    initProjectHoverEffects();
}

// Handle scroll events
function handleScroll() {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.scrollY;

    // Add/remove scrolled class for navbar
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Animate skill bars when in viewport
    animateSkillBarsOnScroll();
}

// Initialize smooth scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize contact form
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', handleContactFormSubmit);
    }
}

// Handle contact form submission
async function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        // Show loading state
        const submitButton = e.target.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        showNotification('Thank you for your message! I will get back to you soon.', 'success');
        e.target.reset();

    } catch (error) {
        // Show error message
        showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        
    } finally {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize skill bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBar(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    skillBars.forEach(bar => observer.observe(bar));
}

// Animate individual skill bar
function animateSkillBar(bar) {
    const value = bar.getAttribute('aria-valuenow');
    bar.style.width = '0%';
    
    setTimeout(() => {
        bar.style.width = value + '%';
    }, 100);
}

// Initialize project cards
function initProjectCards() {
    const projects = [
        {
            title: 'AI Chatbot',
            description: 'An AI-powered chatbot using NLP for intelligent conversations.',
            date: 'Mar 2025 - Apr 2025',
            technologies: ['Python', 'NLP', 'Machine Learning']
        },
        {
            title: 'Snake Game',
            description: 'Classic arcade game with modern features and responsive controls.',
            date: 'Apr 2025',
            technologies: ['JavaScript', 'HTML5 Canvas', 'CSS3']
        },
        {
            title: 'Calculator Application',
            description: 'Scientific calculator with advanced mathematical operations.',
            date: 'Apr 2025 - May 2025',
            technologies: ['JavaScript', 'HTML', 'CSS']
        }
    ];

    const projectSection = document.querySelector('#projects .row');
    if (projectSection) {
        projects.forEach(project => {
            const projectElement = createProjectCard(project);
            projectSection.appendChild(projectElement);
        });
    }
}

// Create project card element
function createProjectCard(project) {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    col.setAttribute('data-aos', 'fade-up');

    col.innerHTML = `
        <div class="card project-card">
            <div class="card-body">
                <h4>${project.title}</h4>
                <p>${project.description}</p>
                <p><small>${project.date}</small></p>
                <div class="tech-stack">
                    ${project.technologies.map(tech => 
                        `<span class="badge bg-primary">${tech}</span>`
                    ).join(' ')}
                </div>
            </div>
        </div>
    `;

    return col;
}

// Initialize project hover effects
function initProjectHoverEffects() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Update copyright year
document.querySelector('footer p').innerHTML = 
    `&copy; ${new Date().getFullYear()} Ajay Kumar. All rights reserved.`;

// Loading animation
window.addEventListener('load', function() {
    const loader = document.querySelector('.loading');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// Debounce function for performance optimization
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

// Handle window resize events
window.addEventListener('resize', debounce(() => {
    // Re-initialize any responsive elements if needed
    AOS.refresh();
}, 250));

// Export functions for testing if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateDateTime,
        initTypewriter,
        handleContactFormSubmit,
        showNotification,
        createProjectCard
    };
}