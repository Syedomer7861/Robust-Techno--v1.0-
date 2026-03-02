// Initialize Splitting.js for text animations
Splitting();

// Initialize Locomotive Scroll with advanced options
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    multiplier: 1,
    lerp: 0.03, // Smoother scrolling
    getDirection: true, // Enable direction detection
    getSpeed: true, // Enable speed detection
    smartphone: {
        smooth: true,
        multiplier: 1,
        lerp: 0.03
    },
    tablet: {
        smooth: true,
        multiplier: 1,
        lerp: 0.03
    }
});

// Update scroll position for ScrollTrigger
scroll.on('scroll', ScrollTrigger.update);

// ScrollTrigger and Locomotive Scroll integration
ScrollTrigger.scrollerProxy('[data-scroll-container]', {
    scrollTop(value) {
        return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    pinType: document.querySelector('[data-scroll-container]').style.transform ? 'transform' : 'fixed'
});

// Update Locomotive Scroll after ScrollTrigger refresh
ScrollTrigger.addEventListener('refresh', () => scroll.update());

// Refresh ScrollTrigger after setup
ScrollTrigger.refresh();

// Cursor implementation moved to cursor.js

// Header scroll effect with GSAP
scroll.on('scroll', (instance) => {
    const header = document.querySelector('header');
    const scrollY = instance.scroll.y;
    
    if (scrollY > 50) {
        gsap.to(header, {
            padding: '15px 10%',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 5px 20px rgba(0, 0, 0, 0.05)',
            duration: 0.3,
            ease: 'power2.out'
        });
    } else {
        gsap.to(header, {
            padding: '30px 10%',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            duration: 0.3,
            ease: 'power2.out'
        });
    }
});

// Enhanced mobile menu toggle with animations
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav ul');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        if (!nav.classList.contains('active')) {
            // Open menu
            nav.classList.add('active');
            menuToggle.classList.add('active');
            
            // Animate menu items
            gsap.fromTo('nav ul li', {
                opacity: 0,
                y: 20
            }, {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.4,
                ease: 'power2.out'
            });
        } else {
            // Close menu
            gsap.to('nav ul li', {
                opacity: 0,
                y: 20,
                stagger: 0.05,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    nav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        }
    });
}

// Update current time with animation
function updateLocalTime() {
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timezone = now.toString().match(/GMT([+-]\d{4})/)[1];
        const newTime = `${hours}:${minutes} GMT (${timezone})`;
        
        if (timeElement.textContent !== newTime) {
            gsap.to(timeElement, {
                opacity: 0,
                y: -10,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    timeElement.textContent = newTime;
                    gsap.to(timeElement, {
                        opacity: 1,
                        y: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        }
    }
}

updateLocalTime();
setInterval(updateLocalTime, 60000); // Update every minute

// Enhanced text reveal animations for headings with staggered effects
document.querySelectorAll('[data-splitting]').forEach(element => {
    // Create a more advanced ScrollTrigger
    ScrollTrigger.create({
        trigger: element,
        start: 'top 90%',
        onEnter: () => {
            element.classList.add('in-view');
            
            // Add extra animation for headings
            if (element.tagName === 'H1' || element.tagName === 'H2') {
                gsap.fromTo(element.querySelectorAll('.char'), 
                    {
                        opacity: 0,
                        y: 100,
                        rotateX: -90
                    },
                    {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        stagger: 0.03,
                        duration: 0.8,
                        ease: "back.out(1.7)"
                    }
                );
            }
        },
        once: false // Allow animation to replay when scrolling back into view
    });
});

// Add parallax effect to images
document.querySelectorAll('.about-hero-image, .card, .work-image').forEach(image => {
    ScrollTrigger.create({
        trigger: image,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
            const progress = self.progress;
            gsap.to(image, {
                y: progress * 50,
                scale: 1 + (progress * 0.05),
                duration: 0.5,
                ease: "none"
            });
        }
    });
});

// Credits panel toggle with GSAP animations
const creditsToggle = document.getElementById('credits-toggle');
const creditsPanel = document.querySelector('.credits-panel');
const creditsClose = document.querySelector('.credits-close');

if (creditsToggle && creditsPanel && creditsClose) {
    creditsToggle.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Show panel with animation
        gsap.to(creditsPanel, {
            opacity: 1,
            visibility: 'visible',
            duration: 0.5,
            ease: 'power2.out'
        });
        
        // Animate content sections
        gsap.fromTo('.credits-section', {
            y: 30,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.5,
            delay: 0.2,
            ease: 'power2.out'
        });
        
        // Initialize Splitting for text animation
        Splitting({ target: '.credits-section h3', by: 'chars' });
    });
    
    creditsClose.addEventListener('click', () => {
        // Hide panel with animation
        gsap.to(creditsPanel, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                gsap.set(creditsPanel, { visibility: 'hidden' });
            }
        });
    });
}

// Contact form modal
document.addEventListener('DOMContentLoaded', () => {
    const discussProjectBtn = document.getElementById('discuss-project');
    const contactFormModal = document.querySelector('.contact-form-modal');
    const modalClose = document.querySelector('.modal-close');
    const nextStepBtns = document.querySelectorAll('.next-step');
    const formSteps = document.querySelectorAll('.form-step');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    if (discussProjectBtn && contactFormModal && modalClose) {
        // Initialize Splitting for text animation in modal
        Splitting({ target: '.form-step h3', by: 'chars' });
        
        discussProjectBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Discuss project button clicked');
            
            // Show modal with animation
            gsap.to(contactFormModal, {
                opacity: 1,
                visibility: 'visible',
                duration: 0.5,
                ease: 'power2.out'
            });
            
            // Animate content
            gsap.fromTo('.form-step.active', {
                y: 30,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                delay: 0.2,
                ease: 'power2.out'
            });
        });
        
        modalClose.addEventListener('click', () => {
            // Hide modal with animation
            gsap.to(contactFormModal, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    gsap.set(contactFormModal, { visibility: 'hidden' });
                }
            });
        });
        
        // Handle form steps
        if (nextStepBtns.length > 0 && formSteps.length > 0) {
            let currentStep = 1;
            const totalSteps = 8;
            
            nextStepBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    if (currentStep < totalSteps) {
                        currentStep++;
                        
                        // Update progress
                        if (progressFill && progressText) {
                            progressFill.style.width = `${(currentStep / totalSteps) * 100}%`;
                            progressText.textContent = `${currentStep} / ${totalSteps}`;
                        }
                        
                        // Hide current step
                        document.querySelector(`.form-step[data-step="${currentStep - 1}"]`).classList.remove('active');
                        
                        // Show next step
                        const nextStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);
                        if (nextStep) {
                            nextStep.classList.add('active');
                            
                            // Animate new step
                            gsap.fromTo(nextStep, {
                                y: 30,
                                opacity: 0
                            }, {
                                y: 0,
                                opacity: 1,
                                duration: 0.5,
                                ease: 'power2.out'
                            });
                        }
                    }
                });
            });
        }
    }
});

// Contact form modal with enhanced animations
const discussProject = document.getElementById('discuss-project');
const contactFormModal = document.querySelector('.contact-form-modal');
const modalClose = document.querySelector('.modal-close');
const closeModal = document.querySelector('.close-modal');
const skipButton = document.querySelector('.skip-button');

if (discussProject && contactFormModal) {
    discussProject.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Show modal with animation
        gsap.to(contactFormModal, {
            opacity: 1,
            visibility: 'visible',
            duration: 0.5,
            ease: 'power2.out'
        });
        
        // Animate modal content
        gsap.fromTo('.modal-content', {
            y: 50,
            opacity: 0,
            scale: 0.95
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: 0.1,
            ease: 'back.out(1.7)'
        });
        
        // Initialize Splitting for text animation
        Splitting({ target: '.form-step h3', by: 'chars' });
    });
    
    const closeModalFunction = () => {
        // Hide modal with animation
        gsap.to('.modal-content', {
            y: 50,
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: 'power2.in'
        });
        
        gsap.to(contactFormModal, {
            opacity: 0,
            duration: 0.3,
            delay: 0.2,
            ease: 'power2.in',
            onComplete: () => {
                gsap.set(contactFormModal, { visibility: 'hidden' });
            }
        });
    };
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModalFunction);
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunction);
    }
    
    if (skipButton) {
        skipButton.addEventListener('click', () => {
            goToStep(8); // Go to last input step
        });
    }
}

// Form steps navigation with enhanced animations
const formSteps = document.querySelectorAll('.form-step');
const nextButtons = document.querySelectorAll('.next-step');
const prevButtons = document.querySelectorAll('.prev-step');
const sendMessage = document.querySelector('.send-message');
const progressFill = document.querySelector('.progress-fill');
const progressText = document.querySelector('.progress-text');
let currentStep = 1;

function goToStep(step) {
    const currentFormStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const nextFormStep = document.querySelector(`.form-step[data-step="${step}"]`);
    
    // Animate current step out
    gsap.to(currentFormStep, {
        opacity: 0,
        y: step > currentStep ? -30 : 30,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
            // Hide current step
            currentFormStep.classList.remove('active');
            
            // Show next step
            nextFormStep.classList.add('active');
            
            // Animate next step in
            gsap.fromTo(nextFormStep, {
                opacity: 0,
                y: step > currentStep ? 30 : -30
            }, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
            
            // Initialize Splitting for text animation
            if (nextFormStep.querySelector('[data-splitting]')) {
                Splitting({ target: nextFormStep.querySelector('[data-splitting]'), by: 'chars' });
            }
        }
    });
    
    // Update progress bar with animation
    if (step <= 8) {
        gsap.to(progressFill, {
            width: `${(step / 8) * 100}%`,
            duration: 0.5,
            ease: 'power2.inOut'
        });
        
        gsap.to(progressText, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                progressText.textContent = `${step} / 8`;
                gsap.to(progressText, {
                    opacity: 1,
                    duration: 0.2
                });
            }
        });
    }
    
    currentStep = step;
}

if (nextButtons.length > 0) {
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const step = parseInt(button.closest('.form-step').getAttribute('data-step'));
            goToStep(step + 1);
        });
    });
}

if (prevButtons.length > 0) {
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            const step = parseInt(button.closest('.form-step').getAttribute('data-step'));
            goToStep(step - 1);
        });
    });
}

if (sendMessage) {
    sendMessage.addEventListener('click', () => {
        // Here you would normally send the form data to a server
        // For demo purposes, just go to the thank you step
        goToStep(9);
    });
}

// Advanced GSAP animations integrated with Locomotive Scroll
gsap.registerPlugin(ScrollTrigger);

// Initial page load animations
window.addEventListener('DOMContentLoaded', () => {
    // Create a timeline for the intro animation
    const introTl = gsap.timeline();
    
    // Animate the page in
    introTl
        .set('.cursor, .cursor-follower', { opacity: 0 })
        .from('body', { opacity: 0, duration: 0.5 })
        .to('.cursor, .cursor-follower', { opacity: 1, duration: 0.5 }, '-=0.3')
        .call(() => {
            // Initialize Splitting for the hero heading
            Splitting({ target: '.hero h1', by: 'chars' });
        })
        .from('.char', { 
            opacity: 0,
            y: 100,
            rotateX: -90,
            stagger: 0.02,
            duration: 0.8,
            ease: 'back.out(1.7)'
        }, '-=0.2')
        .from('.profession-container', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4')
        .from('.availability', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.6')
        .from('.scroll-indicator', {
            y: -20,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4');
});

// Create a function to set up scroll-triggered animations
function setupScrollAnimations() {
    // About section animations
    ScrollTrigger.create({
        trigger: '.about',
        scroller: '[data-scroll-container]',
        start: 'top 80%',
        onEnter: () => {
            // Initialize Splitting for the about heading
            Splitting({ target: '.about h2', by: 'chars' });
            
            gsap.fromTo('.about-content p', {
                y: 50,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power2.out'
            });
            
            gsap.fromTo('.about-cards .card', {
                y: 100,
                opacity: 0,
                scale: 0.9
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.15,
                duration: 1,
                ease: 'back.out(1.7)'
            });
        }
    });
    
    // Works section animations
    ScrollTrigger.create({
        trigger: '.featured-works',
        scroller: '[data-scroll-container]',
        start: 'top 80%',
        onEnter: () => {
            // Initialize Splitting for the works heading
            Splitting({ target: '.featured-works h2', by: 'chars' });
            
            gsap.fromTo('.featured-works .count', {
                y: 30,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out'
            });
            
            gsap.fromTo('.work-item', {
                y: 100,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                stagger: 0.2,
                duration: 1,
                ease: 'power2.out'
            });
        }
    });
    
    // Archive section animations
    ScrollTrigger.create({
        trigger: '.archive',
        scroller: '[data-scroll-container]',
        start: 'top 80%',
        onEnter: () => {
            // Initialize Splitting for the archive heading
            Splitting({ target: '.archive h3', by: 'chars' });
            
            gsap.fromTo('.archive li', {
                y: 20,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                stagger: 0.05,
                duration: 0.5,
                ease: 'power2.out'
            });
            
            gsap.fromTo('.see-more', {
                y: 20,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                delay: 0.5,
                ease: 'power2.out'
            });
        }
    });
    
    // Honors section animations
    ScrollTrigger.create({
        trigger: '.honors',
        scroller: '[data-scroll-container]',
        start: 'top 80%',
        onEnter: () => {
            // Initialize Splitting for the honors heading
            Splitting({ target: '.honors h2', by: 'chars' });
            
            gsap.fromTo('.honors-subtitle', {
                y: 30,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out'
            });
            
            gsap.fromTo('.featured-interview', {
                y: 50,
                opacity: 0,
                scale: 0.95
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: 'power2.out'
            });
            
            // Initialize Splitting for the interview heading
            Splitting({ target: '.interview-link h3', by: 'chars' });
            
            gsap.fromTo('.award-item', {
                y: 30,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.6,
                delay: 0.3,
                ease: 'power2.out'
            });
        }
    });
    
    // Contact section animations
    ScrollTrigger.create({
        trigger: '.contact',
        scroller: '[data-scroll-container]',
        start: 'top 80%',
        onEnter: () => {
            // Initialize Splitting for the contact heading
            Splitting({ target: '.contact h2', by: 'chars' });
            
            gsap.fromTo('.contact-subtitle', {
                y: 30,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out'
            });
            
            gsap.fromTo('.contact-option', {
                y: 30,
                opacity: 0,
                scale: 0.9
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.2,
                duration: 0.8,
                delay: 0.2,
                ease: 'back.out(1.7)'
            });
            
            gsap.fromTo('.social-link', {
                y: 30,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.6,
                delay: 0.5,
                ease: 'power2.out'
            });
        }
    });
}

// Initialize scroll animations
setupScrollAnimations();

// Page transition animations with Barba.js
if (typeof barba !== 'undefined') {
    barba.init({
        transitions: [{
            name: 'opacity-transition',
            leave(data) {
                return gsap.to(data.current.container, {
                    opacity: 0,
                    duration: 0.5
                });
            },
            enter(data) {
                return gsap.from(data.next.container, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        // Reinitialize Locomotive Scroll
                        scroll.update();
                        
                        // Reinitialize Splitting.js
                        Splitting();
                        
                        // Reinitialize scroll animations
                        setupScrollAnimations();
                    }
                });
            }
        }]
    });
}