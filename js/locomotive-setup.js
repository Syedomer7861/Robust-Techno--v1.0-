document.addEventListener('DOMContentLoaded', function() {
    // Initialize Locomotive Scroll
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        multiplier: 1,
        lerp: 0.05,
        getDirection: true,
        reloadOnContextChange: true,
        touchMultiplier: 2,
        smoothMobile: false
    });

    // Each time Locomotive Scroll updates, tell ScrollTrigger to update too
    locoScroll.on("scroll", ScrollTrigger.update);

    // Tell ScrollTrigger to use these proxy methods for the "[data-scroll-container]" element
    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
    });

    // Each time the window updates, refresh ScrollTrigger and Locomotive Scroll
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // After everything is set up, refresh ScrollTrigger
    ScrollTrigger.refresh();
    
    // Force update on page load
    setTimeout(() => {
        locoScroll.update();
    }, 200);
    
    // Make the scroll object globally accessible
    window.locoScroll = locoScroll;
});



