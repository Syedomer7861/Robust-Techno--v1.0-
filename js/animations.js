document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Splitting
    Splitting();

    // Animate heading characters
    document.querySelectorAll('[data-splitting]').forEach(element => {
        ScrollTrigger.create({
            trigger: element,
            scroller: '[data-scroll-container]',
            start: 'top 80%',
            onEnter: () => {
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
            },
            once: false
        });
    });

    // Animate article cards
    gsap.from('.article-card', {
        scrollTrigger: {
            trigger: '.articles-grid',
            scroller: '[data-scroll-container]',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Parallax effect for images
    document.querySelectorAll('.article-image').forEach(image => {
        gsap.to(image, {
            scrollTrigger: {
                trigger: image,
                scroller: '[data-scroll-container]',
                scrub: true,
                start: 'top bottom',
                end: 'bottom top'
            },
            y: '20%',
            ease: 'none'
        });
    });
});

// Testimonial Carousel Auto-Scroll
window.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('testimonial-carousel');
    if (!carousel) return;

    // Duplicate testimonials for seamless loop
    const cards = Array.from(carousel.children);
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        carousel.appendChild(clone);
    });

    let isPaused = false;
    let scrollAmount = 0;
    const speed = 0.7; // px per frame

    function autoScroll() {
        if (!isPaused) {
            scrollAmount += speed;
            carousel.style.transform = `translateX(-${scrollAmount}px)`;
            // Reset for infinite loop
            if (scrollAmount >= carousel.scrollWidth / 2) {
                scrollAmount = 0;
                carousel.style.transform = 'translateX(0)';
            }
        }
        requestAnimationFrame(autoScroll);
    }

    carousel.addEventListener('mouseenter', () => { isPaused = true; });
    carousel.addEventListener('mouseleave', () => { isPaused = false; });

    autoScroll();
});

