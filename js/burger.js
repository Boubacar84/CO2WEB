document.addEventListener("DOMContentLoaded", () => {
    const burgerToggle = document.querySelector(".burger-toggle");
    const burgerMenu = document.querySelector(".burger-menu");

    burgerToggle.addEventListener("click", () => {
        burgerToggle.classList.toggle("active");
        burgerMenu.classList.toggle("active");
    });

    // Optionnel : Fermer le menu si on clique à l'extérieur
    document.addEventListener("click", (event) => {
        if (
            !burgerMenu.contains(event.target) &&
            !burgerToggle.contains(event.target) &&
            burgerMenu.classList.contains("active")
        ) {
            burgerToggle.classList.remove("active");
            burgerMenu.classList.remove("active");
        }
    });
});
