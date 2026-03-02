// Page Transition Implementation
document.addEventListener('DOMContentLoaded', () => {
    // Create page transition element if it doesn't exist
    let pageTransition = document.querySelector('.page-transition');
    
    if (!pageTransition) {
        pageTransition = document.createElement('div');
        pageTransition.className = 'page-transition';
        document.body.appendChild(pageTransition);
    }
    
    // Add CSS if needed
    if (!document.querySelector('#page-transition-styles')) {
        const style = document.createElement('style');
        style.id = 'page-transition-styles';
        style.textContent = `
            .page-transition {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: var(--accent-color);
                z-index: 9999;
                transform: scaleY(0);
                transform-origin: top;
                pointer-events: none;
            }
            
            .page-transition.enter {
                transform: scaleY(1);
                transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
            }
            
            .page-transition.leave {
                transform: scaleY(0);
                transform-origin: bottom;
                transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Handle page transitions
    const anchors = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"]):not([href^="javascript:"])');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', e => {
            if (anchor.href && anchor.href.indexOf(window.location.origin) >= 0) {
                e.preventDefault();
                
                // Start page transition animation
                pageTransition.classList.add('enter');
                
                // Navigate to the new page after animation completes
                setTimeout(() => {
                    window.location.href = anchor.href;
                }, 500); // Match this with the CSS transition duration
            }
        });
    });
    
    // Check if this is a page load and play exit animation
    if (performance.navigation.type !== 1) { // Not a page refresh
        pageTransition.classList.add('leave');
    }
});