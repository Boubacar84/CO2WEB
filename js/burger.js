document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");
    const content = document.querySelector(".content"); // Contenu principal

    menuToggle.addEventListener("click", () => {
        menu.classList.toggle("active");
        menuToggle.classList.toggle("active");
        content.classList.toggle("blurred"); // Ajout d’un flou au contenu
    });
});
