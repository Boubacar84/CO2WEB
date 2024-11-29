document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".cards-instructions"); // Conteneur des cartes
    const cards = document.querySelectorAll(".card"); // Toutes les cartes
    const indicatorsContainer = document.querySelector(".carousel-indicators"); // Conteneur des indicateurs
    const indicators = indicatorsContainer.querySelectorAll(".indicator"); // Boutons indicateurs
    const prevButton = document.querySelector(".carousel-control.prev");
    const nextButton = document.querySelector(".carousel-control.next");

    const cardWidth = 360; // Largeur fixe pour mobile
    let currentIndex = 0; // Index initial
    let isMobileActive = false; // Flag pour savoir si le carousel est actif en mobile

    // Fonction pour mettre à jour la position du slider
    const updateCarousel = () => {
        const offset = (currentIndex - 1) * -cardWidth;
        track.style.transform = `translateX(${offset}px)`;
        track.style.transition = "transform 0.5s ease-in-out";

        // Mettre à jour les indicateurs
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle("active", index === currentIndex);
        });
    };

    // Passer à la carte suivante
    const showNextCard = () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    };

    // Passer à la carte précédente
    const showPrevCard = () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = cards.length - 1;
        }
        updateCarousel();
    };

    // Gestion des clics sur les indicateurs
    const activateIndicatorClicks = () => {
        indicators.forEach((indicator, index) => {
            indicator.addEventListener("click", () => {
                currentIndex = index;
                updateCarousel();
            });
        });
    };

    // Fonction pour activer le carousel en mobile
    const activateCarouselForMobile = () => {
        if (window.innerWidth <= 361 && !isMobileActive) {
            isMobileActive = true; // Active le flag
            updateCarousel(); // Initialisation pour mobile
            nextButton.addEventListener("click", showNextCard);
            prevButton.addEventListener("click", showPrevCard);
            activateIndicatorClicks();
        }
    };

    // Fonction pour réinitialiser le carousel en desktop
    const resetCarouselForDesktop = () => {
        if (window.innerWidth > 361 && isMobileActive) {
            isMobileActive = false; // Désactive le flag
            track.style.transform = "none"; // Réinitialise la transformation
            track.style.transition = "none"; // Désactive les transitions en desktop
            nextButton.removeEventListener("click", showNextCard);
            prevButton.removeEventListener("click", showPrevCard);

            // Réinitialisation des indicateurs
            indicators.forEach((indicator) => {
                indicator.classList.remove("active");
            });
        }
    };

    // Gestion de l'activation/désactivation selon la taille de l'écran
    const handleResize = () => {
        activateCarouselForMobile();
        resetCarouselForDesktop();
    };

    // Initialisation au chargement
    handleResize();

    // Ajout du listener pour le redimensionnement
    window.addEventListener("resize", handleResize);
});
