// Contact Form Modal Implementation
document.addEventListener('DOMContentLoaded', () => {
    const discussProjectBtn = document.getElementById('discuss-project');
    const contactFormModal = document.querySelector('.contact-form-modal');
    const modalClose = document.querySelector('.contact-form-modal .modal-close');
    const nextStepBtn = document.querySelector('.contact-form-modal .next-step');
    const progressFill = document.querySelector('.contact-form-modal .progress-fill');
    const progressText = document.querySelector('.contact-form-modal .progress-text');
    
    if (!discussProjectBtn || !contactFormModal) return;
    
    // Show modal when discuss project button is clicked
    discussProjectBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
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
        
        // Initialize Splitting for text animation
        if (typeof Splitting !== 'undefined') {
            Splitting({ target: '.form-step h3', by: 'chars' });
        }
    });
    
    // Close modal when close button is clicked
    if (modalClose) {
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
    }
    
    // Handle form steps
    if (nextStepBtn && progressFill && progressText) {
        let currentStep = 1;
        const totalSteps = 8;
        
        nextStepBtn.addEventListener('click', () => {
            if (currentStep < totalSteps) {
                currentStep++;
                
                // Update progress
                progressFill.style.width = `${(currentStep / totalSteps) * 100}%`;
                progressText.textContent = `${currentStep} / ${totalSteps}`;
                
                // For demo purposes, just update the progress without showing new steps
                // In a real implementation, you would show the next form step here
            }
        });
    }
});