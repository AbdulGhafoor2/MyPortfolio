// script.js — place in same folder as index.html & style.css
document.addEventListener("DOMContentLoaded", () => {
    // ===== Mobile Menu =====
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            // update aria-expanded for accessibility
            const expanded = hamburger.getAttribute("aria-expanded") === "true" || false;
            hamburger.setAttribute("aria-expanded", !expanded);
        });
    }
    // ===== Smooth Scroll =====
    document.querySelectorAll("a[href^='#']").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
            // close menu on mobile
            navLinks.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
        });
    });
    // ===== Back to Top Button =====
    const topBtn = document.getElementById("topBtn");
    window.addEventListener("scroll", () => {
        if (document.documentElement.scrollTop > 300) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    // 4) Lightbox for project images (any images inside .projects .card)
    const projectImages = document.querySelectorAll(".projects .card img");
    if (lightbox && lightboxImg && closeBtn && projectImages.length) {
        projectImages.forEach(img => {
            img.addEventListener("click", () => {
                lightbox.style.display = "flex";
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt || "Project image";
                lightbox.setAttribute("aria-hidden", "false");
            });
        });
        // close handlers
        closeBtn.addEventListener("click", () => {
            lightbox.style.display = "none";
            lightbox.setAttribute("aria-hidden", "true");
            lightboxImg.src = "";
        });
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = "none";
                lightbox.setAttribute("aria-hidden", "true");
                lightboxImg.src = "";
            }
        });
        // close with ESC
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && lightbox.style.display === "flex") {
                lightbox.style.display = "none";
                lightbox.setAttribute("aria-hidden", "true");
                lightboxImg.src = "";
            }
        });
    }
});
