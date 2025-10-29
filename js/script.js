// nav bar trasparent effect on scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});
function toggleMenu() {
  const menu = document.getElementById("navMenu").querySelector("ul");
  menu.classList.toggle("show");
  zIndex = menu.classList.contains("show, nabMenu") ? 999 : 1;
  menu.style.zIndex = zIndex;
  menu.style.position = "fixed";
  menu.style.top = "0";
  menu.style.left = "0";
  menu.style.width = "100%";
  menu.style.height = "50%";
  menu.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  menu.style.padding = "20px";
}


// Look for .hamburger
var hamburger = document.querySelector(".hamburger");
if (hamburger) {
  // On click
  hamburger.addEventListener("click", function () {
    // Toggle class "is-active"
    hamburger.classList.toggle("is-active");
  });
}

// video icon hover effect
document.querySelectorAll(".box-inner, .last2nd .box").forEach((card) => {
  const video = card.querySelector(".hover-video");

  card.addEventListener("mouseenter", () => {
    video.play();
  });

  card.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0; // Reset video to the beginning
  });
});

// Custom cursor animation
const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

if (cursor && follower) {
  // Cursor follows instantly
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Center dot with -50% offset
    cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`; // 8px dot
  });

  // Follower follows smoothly
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    // Center follower with -50% offset
    follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`; // 40px follower
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover effects for interactive elements
  const hoverTargets = document.querySelectorAll("a, button");
  hoverTargets.forEach((target) => {
    target.addEventListener("mouseenter", () => {
      cursor.classList.add("hovered");
      follower.classList.add("hovered");
    });
    target.addEventListener("mouseleave", () => {
      cursor.classList.remove("hovered");
      follower.classList.remove("hovered");
    });
  });

  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
  });
}

// footer responsivness 

document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".footer-toggle");

  toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const content = toggle.nextElementSibling;
      content.classList.toggle("active");
      toggle.classList.toggle("open");
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  console.log("Modal JS loaded");
  // Service Modal Popup Logic
  const serviceDetails = {
    webdev: {
      title: 'Website Development',
      image: '/assets/what-we-do.jpg',
      icon: '/assets/icons/Web developer.mp4',
      desc: `<p>We build responsive, fast-loading, and visually stunning websites tailored to your business needs. Our team leverages the latest technologies and best practices to ensure your site is secure, scalable, and easy to manage. <br><br><b>What we offer:</b><ul><li>Custom website & web app development</li><li>Landing pages & e-commerce</li><li>Performance optimization</li><li>Maintenance & support</li></ul></p>`,
      btn: '/Contact-Us.html'
    },
    digitalmarketing: {
      title: 'Digital Marketing',
      image: '/assets/tech-media.jpg',
      icon: '/assets/icons/digital marking.mp4',
      desc: `<p>Boost your brand's online presence with targeted social media strategies, content marketing, and data-driven campaigns. <br><br><b>What we offer:</b><ul><li>Social media management</li><li>Content creation & strategy</li><li>PPC & email marketing</li><li>Analytics & reporting</li></ul></p>`,
      btn: '/Contact-Us.html'
    },
    graphicdesign: {
      title: 'Graphic Design',
      image: '/assets/about-us-hero-sec.jpg',
      icon: '/assets/icons/graphic designer icon01.mp4',
      desc: `<p>Our creative team crafts cohesive and memorable visuals for your brand. <br><br><b>What we offer:</b><ul><li>Logo & branding</li><li>Social media graphics</li><li>Ad creatives</li><li>Print & digital design</li></ul></p>`,
      btn: '/Contact-Us.html'
    },
    seo: {
      title: 'SEO Services',
      image: '/assets/partners_logo/aws_White.png',
      icon: '/assets/icons/SEO icon.mp4',
      desc: `<p>Enhance your online visibility, improve search rankings, and attract more customers with our tailored SEO services. <br><br><b>What we offer:</b><ul><li>On-page & off-page SEO</li><li>Keyword research</li><li>Technical SEO audits</li><li>Content optimization</li></ul></p>`,
      btn: '/Contact-Us.html'
    },
    uiux: {
      title: 'UI/UX Design',
      image: '/assets/who-we-are.jpg',
      icon: '/assets/icons/UI UX.mp4',
      desc: `<p>Create stunning, user-friendly interfaces that elevate your brand and deliver seamless experiences. <br><br><b>What we offer:</b><ul><li>Wireframing & prototyping</li><li>User research</li><li>UI kits & design systems</li><li>Usability testing</li></ul></p>`,
      btn: '/Contact-Us.html'
    },
    photography: {
      title: 'Photography',
      image: '/assets/portfolio/images/project1.png',
      icon: '/assets/icons/Photography.mp4',
      desc: `<p>Capture the essence of your brand with our professional photography services. <br><br><b>What we offer:</b><ul><li>Product photography</li><li>Corporate portraits</li><li>Event coverage</li><li>Brand storytelling</li></ul></p>`,
      btn: '/Contact-Us.html'
    }
  };

  document.querySelectorAll('.service-card .learn-more-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      console.log("Learn More clicked");
      e.preventDefault();
      const card = btn.closest('.service-card');
      const key = card.getAttribute('data-service');
      const modal = document.getElementById('service-modal');
      const body = document.getElementById('service-modal-body');
      if (serviceDetails[key]) {
        body.innerHTML = `
          <video src="${serviceDetails[key].icon}" autoplay loop muted playsinline style="width:54px;height:54px;border-radius:12px;margin-bottom:10px;"></video>
          <img src="${serviceDetails[key].image}" alt="${serviceDetails[key].title}" />
          <h2>${serviceDetails[key].title}</h2>
          ${serviceDetails[key].desc}
          <a href="${serviceDetails[key].btn}" class="learn-more-btn" style="margin-top:18px;">Contact Us</a>
        `;
        modal.classList.add('active');
        document.body.classList.add('modal-open');
      }
    });
  });

  function closeModal() {
    document.getElementById('service-modal').classList.remove('active');
    document.body.classList.remove('modal-open');
    document.documentElement.classList.remove('modal-open');
    // Remove all scroll lock styles
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.body.style.position = '';
    document.body.style.height = '';
    document.body.style.width = '';
    document.documentElement.style.position = '';
    document.documentElement.style.height = '';
    document.documentElement.style.width = '';
    // Also scroll to top of modal in case of next open
    document.getElementById('service-modal').scrollTop = 0;
  }

  document.getElementById('service-modal-close').onclick = closeModal;
  document.getElementById('service-modal').onclick = function(e) {
    if (e.target === this) closeModal();
  };
});




