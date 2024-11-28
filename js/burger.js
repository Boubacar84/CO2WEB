document.addEventListener("DOMContentLoaded", () => {
    const burgerToggle = document.querySelector(".burger-toggle");
    const burgerMenu = document.querySelector(".burger-menu");

    burgerToggle.addEventListener("click", () => {
        burgerMenu.classList.toggle("active");
        burgerToggle.classList.toggle("active");
    });

    // Optionnel : Fermer si on clique ailleurs
    document.addEventListener("click", (event) => {
        if (
            !burgerMenu.contains(event.target) &&
            !burgerToggle.contains(event.target) &&
            burgerMenu.classList.contains("active")
        ) {
            burgerMenu.classList.remove("active");
            burgerToggle.classList.remove("active");
        }
    });
});
