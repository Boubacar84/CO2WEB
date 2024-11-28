document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".cards-instructions"); // Conteneur des cartes
    const cards = document.querySelectorAll(".card"); // Toutes les cartes
    const prevButton = document.querySelector(".carousel-control.prev");
    const nextButton = document.querySelector(".carousel-control.next");

    const cardWidth = 360; // Largeur fixe pour mobile
    let currentIndex = 0; // Index initial

    // Ajouter un clone explicite de la première carte à la fin
    const firstClone = cards[0].cloneNode(true);
    firstClone.classList.add("clone");
    track.appendChild(firstClone);

    // Total des cartes (sans ajouter 1 pour éviter une slide en trop)
    const totalCards = cards.length - 1;

    // Fonction pour mettre à jour la position du slider
    const updateCarousel = () => {
        const offset = currentIndex * -cardWidth; // Suppression du décalage
        track.style.transform = `translateX(${offset}px)`;
        track.style.transition = "transform 0.5s ease-in-out";
    };

    // Passer à la carte suivante
    const showNextCard = () => {
        currentIndex++;
        if (currentIndex === totalCards) {
            // Si on atteint le clone (dernière slide)
            track.style.transition = "none"; // Désactiver temporairement la transition
            currentIndex = -1; // Revenir à la première carte réelle
            updateCarousel();
            setTimeout(() => {
                track.style.transition = "transform 0.5s ease-in-out"; // Réactiver la transition
                updateCarousel();
            }, 50);
        } else {
            updateCarousel();
        }
    };

    // Passer à la carte précédente
    const showPrevCard = () => {
        if (currentIndex <= -1) {
            // Si on est sur la première carte, revenir à la dernière carte réelle
            currentIndex = totalCards - 1; // Aller à la dernière carte
            track.style.transition = "none";
            updateCarousel();
            setTimeout(() => {
                track.style.transition = "transform 0.5s ease-in-out";
                updateCarousel();
            }, 50);
        } else {
            currentIndex--;
            updateCarousel();
        }
    };

    // Gestionnaire d'événements pour les boutons
    nextButton.addEventListener("click", showNextCard);
    prevButton.addEventListener("click", showPrevCard);

    // Désactiver le carousel en desktop
    const applyCarousel = () => {
        if (window.innerWidth <= 360) {
            prevButton.style.display = "block";
            nextButton.style.display = "block";
            updateCarousel();
        } else {
            prevButton.style.display = "none";
            nextButton.style.display = "none";

            // Supprimer le clone si présent
            const clone = track.querySelector(".card.clone");
            if (clone) {
                clone.remove();
            }

            // Réinitialiser le conteneur
            track.style.transform = "none";
            track.style.transition = "none";
        }
    };

    // Appliquer le carousel au chargement et lors du redimensionnement
    applyCarousel();
    window.addEventListener("resize", applyCarousel);
});

// Ajoute les indicateurs en dessous du carousel


document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".cards-instructions");
    const indicatorsContainer = document.querySelector(".carousel-indicators");
    const indicators = document.querySelectorAll(".carousel-indicators .indicator");
    const middleCard = document.querySelector(".middle-card");
    const circles = document.querySelectorAll(
        ".circle-top-1, .circle-top-2, .circle-top-3, .circle-bot-1, .circle-bot-2, .circle-bot-3"
    );
    const cardWidth = 360;
    let currentIndex = 0;

    // Fonction pour mettre à jour la position des slides
    const updateCarousel = (index) => {
        track.style.transform = `translateX(${-index * cardWidth}px)`;
        track.style.transition = "transform 0.5s ease-in-out";
        currentIndex = index;

        // Met à jour les indicateurs actifs uniquement en mobile
        if (window.innerWidth <= 360) {
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle("active", i === index); // Active uniquement l'indicateur correspondant
            });
        }
    };


    // Ajoute les événements de clic sur les indicateurs
    indicators.forEach((indicator, i) => {
        indicator.addEventListener("click", () => {
            updateCarousel(i - 1); // Utilise directement l'index `i` sans ajustement
        });
    });

    // Applique les ajustements lors du redimensionnement
    window.addEventListener("resize", () => {
        toggleIndicators();
        manageCircleZIndex();
    });

    // Initialisation
    toggleIndicators();
    manageCircleZIndex();
    updateCarousel(0); // Positionner sur la première slide
});
