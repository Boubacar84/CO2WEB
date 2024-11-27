document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".cards-instructions"); // Conteneur des cartes
    const cards = document.querySelectorAll(".card"); // Toutes les cartes
    const prevButton = document.querySelector(".carousel-control.prev");
    const nextButton = document.querySelector(".carousel-control.next");

    const cardWidth = 360; // Largeur fixe pour mobile
    const offsetFix = 180; // Décalage pour centrer la carte
    let currentIndex = 0; // Index initial

    // Ajouter un clone explicite de la première carte à la fin
    const firstClone = cards[0].cloneNode(true);
    firstClone.classList.add("clone");
    track.appendChild(firstClone);

    // Total des cartes (sans ajouter 1 pour éviter une slide en trop)
    const totalCards = cards.length;

    // Fonction pour mettre à jour la position du slider
    const updateCarousel = () => {
        const offset = currentIndex * -cardWidth + offsetFix;
        track.style.transform = `translateX(${offset}px)`;
        track.style.transition = "transform 0.5s ease-in-out";
    };

    // Passer à la carte suivante
    const showNextCard = () => {
        currentIndex++;
        if (currentIndex === totalCards) {
            // Si on atteint le clone (dernière slide)
            track.style.transition = "none"; // Désactiver temporairement la transition
            currentIndex = 0; // Revenir à la première carte réelle
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
        if (currentIndex <= 0) {
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
