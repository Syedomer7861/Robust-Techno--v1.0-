// Page Transition Implementation
document.addEventListener('DOMContentLoaded', () => {
    // Get all transition blocks
    const blocks = document.querySelectorAll('.block');
    
    // Initial page load animation
    function pageLoadAnimation() {
        gsap.to(blocks, {
            scaleY: 0,
            duration: 1,
            ease: "power2.inOut",
            stagger: {
                amount: 0.5,
                from: "random"
            }
        });
    }

    // Page exit animation
    function pageExitAnimation() {
        return gsap.to(blocks, {
            scaleY: 1,
            duration: 0.8,
            ease: "power2.inOut",
            stagger: {
                amount: 0.4,
                from: "random"
            }
        });
    }

    // Handle link clicks for page transitions
    document.querySelectorAll('a:not([target="_blank"])').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const href = link.href;

            // Play exit animation
            await pageExitAnimation();

            // Navigate to new page
            window.location.href = href;
        });
    });

    // Play load animation when page loads
    pageLoadAnimation();
});