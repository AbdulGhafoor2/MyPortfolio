// script.js
document.addEventListener("DOMContentLoaded", () => {
    // ===== Mobile Menu =====
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            const expanded = hamburger.getAttribute("aria-expanded") === "true" || false;
            hamburger.setAttribute("aria-expanded", !expanded);
        });
    }

    // ===== Smooth Scroll =====
    document.querySelectorAll("a[href^='#']").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
            navLinks.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
        });
    });

    // ===== Back to Top Button =====
    const topBtn = document.getElementById("topBtn");
    window.addEventListener("scroll", () => {
        topBtn.style.display = document.documentElement.scrollTop > 300 ? "block" : "none";
    });
    topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    // ===== Lightbox =====
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.getElementById("close");

    // ===== Dynamic Project Data =====
    const projects = [
        {
            title: "Lock Opening And Closing Integration",
            description: "A web application built with ASP.NET Core, for Lock Opening And Closing.",
            image: "images/Dormakaba.jpeg",
            link: "https://github.com/AbdulGhafoor2/Cashtran",
            category: "websites"
        },
        {
            title: "Library Management System",
            description: "Library Management System using ASP.NET Core, SQL Database And MVC.",
            image: "images/LibraryManagmentSystem.jpeg",
            link: "https://github.com/AbdulGhafoor2/LibraryManagementSystem",
            category: "miniapps"
        }
    ];

    const projectList = document.getElementById("project-list");

    function renderProjects(filter = "all") {
        projectList.innerHTML = "";
        const filtered = filter === "all" ? projects : projects.filter(p => p.category === filter);

        filtered.forEach(proj => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <img src="${proj.image}" alt="${proj.title}">
                <div class="overlay">
                    <h3>${proj.title}</h3>
                    <p>${proj.description}</p>
                    <a href="${proj.link}" target="_blank">View Project</a>
                </div>
            `;
            projectList.appendChild(card);

            // Lightbox click
            const img = card.querySelector("img");
            img.addEventListener("click", () => {
                lightbox.style.display = "flex";
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.setAttribute("aria-hidden", "false");
            });
        });
    }

    // Initial render
    renderProjects();

    // Filter buttons
    const filterBtns = document.querySelectorAll(".filters button");
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderProjects(btn.getAttribute("data-filter"));
        });
    });

    // Lightbox close
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            lightbox.style.display = "none";
            lightbox.setAttribute("aria-hidden", "true");
            lightboxImg.src = "";
        });
    }
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
            lightbox.setAttribute("aria-hidden", "true");
            lightboxImg.src = "";
        }
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox.style.display === "flex") {
            lightbox.style.display = "none";
            lightbox.setAttribute("aria-hidden", "true");
            lightboxImg.src = "";
        }
    });
});
