// Custom cursor implementation
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    // Add custom cursor style
    document.body.classList.add('custom-cursor');
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .custom-cursor {
                cursor: none !important;
            }
            
            .custom-cursor a, 
            .custom-cursor button, 
            .custom-cursor .menu-toggle, 
            .custom-cursor [data-cursor="hover"] {
                cursor: none !important;
            }
        </style>
    `);
    
    // Set initial position
    gsap.set(cursor, {xPercent: -50, yPercent: -50});
    gsap.set(cursorFollower, {xPercent: -50, yPercent: -50});
    
    // Update cursor position on mouse move
    window.addEventListener('mousemove', (e) => {
        // For immediate response, set cursor position directly
        gsap.to(cursor, {
            duration: 0.1,
            x: e.clientX,
            y: e.clientY
        });
        
        // Follower follows with delay
        gsap.to(cursorFollower, {
            duration: 0.5,
            x: e.clientX,
            y: e.clientY
        });
    });
    
    // Show cursor when mouse enters the window
    document.addEventListener('mouseenter', () => {
        gsap.to(cursor, {opacity: 1, duration: 0.3});
        gsap.to(cursorFollower, {opacity: 0.6, duration: 0.3});
    });
    
    // Hide cursor when mouse leaves the window
    document.addEventListener('mouseleave', () => {
        gsap.to(cursor, {opacity: 0, duration: 0.3});
        gsap.to(cursorFollower, {opacity: 0, duration: 0.3});
    });;
});