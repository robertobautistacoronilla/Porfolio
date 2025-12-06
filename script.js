// script.js

// ==============================
// FILTROS SENCILLOS DEL PORTFOLIO
// ==============================
document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const categories = document.querySelectorAll(".portfolio-category");

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const filterValue = btn.getAttribute("data-filter");

            // Actualiza botón activo
            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            // Muestra/oculta categorías según el filtro
            categories.forEach((category) => {
                const categoryType = category.getAttribute("data-category");

                if (filterValue === "todos" || filterValue === categoryType) {
                    category.removeAttribute("data-hidden");
                } else {
                    category.setAttribute("data-hidden", "true");
                }
            });
        });
    });

    // ==============================
    // AÑO ACTUAL EN EL FOOTER
    // ==============================
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ==============================
    // COMPORTAMIENTO DEL FORMULARIO
    // (solo demostrativo, sin backend)
    // ==============================
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            // Validación básica con las constraints HTML5
            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            alert("Este formulario es un ejemplo. Configura un backend o un servicio de correo para enviar los mensajes.");
        });
    }
});
