// ===============================
// PORTFOLIO SCRIPT
// Aditya Kumar Portfolio
// ===============================

// ===============================
// NAVBAR SHADOW ON SCROLL
// ===============================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.boxShadow =
            "0 8px 25px rgba(0,0,0,0.08)";

        navbar.style.background =
            "rgba(250,247,242,0.95)";

    } else {

        navbar.style.boxShadow = "none";

        navbar.style.background =
            "rgba(250,247,242,0.75)";
    }

});

// ===============================
// SCROLL REVEAL ANIMATION
// ===============================

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {
        threshold: 0.15,
    }

);

const hiddenElements = document.querySelectorAll(
    ".section, .project-card, .stat-card, .resume-card"
);

hiddenElements.forEach((el) => {

    el.classList.add("hidden");

    observer.observe(el);

});

// ===============================
// ACTIVE NAVIGATION LINK
// ===============================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active-link");

        if (
            link.getAttribute("href") === `#${current}`
        ) {

            link.classList.add("active-link");

        }

    });

});

// ===============================
// CURSOR GLOW EFFECT
// ===============================

const glow = document.createElement("div");

glow.classList.add("cursor-glow");

document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";

    glow.style.top = e.clientY + "px";

});

// ===============================
// SMOOTH BUTTON HOVER EFFECT
// ===============================

const buttons = document.querySelectorAll(
    ".btn, .project-buttons a, .resume-card a"
);

buttons.forEach((button) => {

    button.addEventListener("mouseenter", () => {

        button.style.transform =
            "translateY(-3px)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform =
            "translateY(0px)";

    });

});

// ===============================
// CONTACT FORM
// ===============================

// ===============================
// EMAILJS CONTACT FORM
// ===============================

emailjs.init("EB87ewaNLK0237-Wj");

const contactForm = document.getElementById("contact-form");
const status = document.getElementById("form-status");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        status.innerHTML = "Sending...";

        emailjs.sendForm(
            "service_luo7x5a",
            "template_pwdk7eu",
            this
        )

        .then(() => {

            status.innerHTML =
                "✅ Message sent successfully!";

            contactForm.reset();

        })

        .catch((error) => {

            status.innerHTML =
                "❌ Failed to send message.";

            console.error(error);

        });

    });

}

// ===============================
// TYPEWRITER EFFECT
// ===============================

const heroTitle = document.querySelector(".hero h1");

if (heroTitle) {

    const text = heroTitle.innerText;

    heroTitle.innerText = "";

    let index = 0;

    function typeWriter() {

        if (index < text.length) {

            heroTitle.innerHTML += text.charAt(index);

            index++;

            setTimeout(typeWriter, 35);

        }

    }

    setTimeout(typeWriter, 300);

}

// ===============================
// PARALLAX HERO IMAGE
// ===============================

const heroImage =
    document.querySelector(".hero-image img");

window.addEventListener("mousemove", (e) => {

    if (!heroImage) return;

    const x =
        (window.innerWidth / 2 - e.pageX) / 50;

    const y =
        (window.innerHeight / 2 - e.pageY) / 50;

    heroImage.style.transform =
        `translate(${x}px, ${y}px)`;

});

// ===============================
// SCROLL TO TOP BUTTON
// ===============================

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.classList.add("scroll-top-btn");

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topBtn.classList.add("show-top-btn");

    } else {

        topBtn.classList.remove("show-top-btn");

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });

});

// ===============================
// CURRENT YEAR AUTO UPDATE
// ===============================

const footerYear =
    document.querySelector(".footer-year");

if (footerYear) {

    footerYear.textContent =
        new Date().getFullYear();

}

// ===============================
// CONSOLE SIGNATURE
// ===============================

console.log(
`
=========================================
Portfolio Developed By Aditya Kumar
Full Stack Developer | AI Enthusiast
=========================================
`
);