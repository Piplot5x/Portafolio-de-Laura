
fetch("../../components/header.html")
    .then(response => response.text())
    .then(data => {
        console.log(data);
        document.querySelector("#header").innerHTML = data;
    });

fetch("../../components/footer.html")
    .then(response => response.text())
    .then(data => {
        document.querySelector("#footer").innerHTML = data;
    });

/* IR ATRÁS */
const projectBack = document.getElementById("project-back");

if (projectBack) {
    projectBack.innerHTML = `
        <a href="#" class="project-back-button" aria-label="Volver">
            <svg viewBox="0 0 30 30" aria-hidden="true">
                <path class="back-arrow-main" d="M8,12.79C10.43,10.57,11.6,9.11,14,7.06c0,0,.61-.59.85-.6a1.27,1.27,0,0,1,1,.5c1.55,1.25,3.94,3.81,6.17,5.69"/>
                <path class="back-arrow-line" d="M14.9,10.93c0,2,.16,2.86.19,4.82,0,2.43,0,5.41,0,7.84"/>
            </svg>
        </a>
    `;

    const backButton = projectBack.querySelector(".project-back-button");

    backButton.addEventListener("click", (event) => {
        event.preventDefault();
        history.back();
    });
}

document.addEventListener("DOMContentLoaded", () => {

    document.addEventListener("click", (event) => {
        const link = event.target.closest("a");

        if (!link) return;

        const url = link.href;

        if (
            !url ||
            url.startsWith("#") ||
            link.target === "_blank" ||
            link.hasAttribute("download") ||
            url.startsWith("mailto:")
        ) {
            return;
        }

        event.preventDefault();

        const main = document.querySelector("main");
        main.classList.add("page-transition");

        setTimeout(() => {
            window.location.href = url;
        }, 100);
    });
});
window.addEventListener("pageshow", (event) => {
    const main = document.querySelector("main");

    if (main && event.persisted) {
        main.style.transition = "none";
        main.style.opacity = "0";

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                main.style.transition = "opacity 0.5s ease";
                main.style.opacity = "1";
            });
        });
    }
});

/* IR ARRIBA */
const backToTop = document.getElementById("back-to-top");

if (backToTop) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 250) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

 /* FILTROS */
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.textContent.trim();

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        // Todas desaparecen
        projectCards.forEach(card => {
            card.style.opacity = "0";
            card.style.pointerEvents = "none";
        });

        // Después de la transición, ocultamos las que no corresponden
        setTimeout(() => {
            projectCards.forEach(card => {
                const cardCategory = card.dataset.category;
                const shouldShow =
                    category === "Todos" || cardCategory.includes(category);

                if (shouldShow) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });

            // Mostramos las correspondientes
            requestAnimationFrame(() => {
                projectCards.forEach(card => {
                    if (card.style.display !== "none") {
                        card.style.opacity = "1";
                        card.style.pointerEvents = "auto";
                    }
                });
            });
        }, 500);
    });
});
/* LIGHBOX PARA IMG */
const images = document.querySelectorAll(".project-gallery-image, .avisa-anim-image");
const lightbox = document.getElementById("image-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const prevButton = document.getElementById("lightbox-prev");
const nextButton = document.getElementById("lightbox-next");
const closeButton = document.getElementById("lightbox-close");

let currentImage = 0;

function showImage(index) {
    lightboxImage.style.opacity = "0";

    setTimeout(() => {
        currentImage = index;
        lightboxImage.src = images[currentImage].src;
        lightboxImage.alt = images[currentImage].alt;
        lightboxImage.style.opacity = "1";
    }, 150);
}

images.forEach((image, index) => {
    image.addEventListener("click", () => {
        showImage(index);
        lightbox.classList.add("active");
    });
});

prevButton.addEventListener("click", (event) => {
    event.stopPropagation();

    currentImage--;

    if (currentImage < 0) {
        currentImage = images.length - 1;
    }

    showImage(currentImage);
});

nextButton.addEventListener("click", (event) => {
    event.stopPropagation();

    currentImage++;

    if (currentImage >= images.length) {
        currentImage = 0;
    }

    showImage(currentImage);
});

function closeLightbox() {
    lightbox.classList.remove("active");
}

closeButton.addEventListener("click", (event) => {
    event.stopPropagation();
    closeLightbox();
});

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("active")) return;

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowLeft") {
        currentImage--;

        if (currentImage < 0) {
            currentImage = images.length - 1;
        }

        showImage(currentImage);
    }

    if (event.key === "ArrowRight") {
        currentImage++;

        if (currentImage >= images.length) {
            currentImage = 0;
        }

        showImage(currentImage);
    }
});

