document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".cards-instructions"); // Conteneur des cartes
    const cards = document.querySelectorAll(".card"); // Toutes les cartes
    const prevButton = document.querySelector(".carousel-control.prev");
    const nextButton = document.querySelector(".carousel-control.next");

    const totalCards = cards.length;
    const cardWidth = 360; // Largeur fixe pour mobile
    let currentIndex = 0; // Index initial

    // Ajouter un clone explicite de la première carte à la fin
    const firstClone = cards[0].cloneNode(true);
    track.appendChild(firstClone);

    // Fonction pour mettre à jour la position du slider
    const updateCarousel = () => {
        const offset = currentIndex * -cardWidth + 180; // Translation ajustée avec un décalage à gauche
        track.style.transform = `translateX(${offset}px)`;
    };

    // Passer à la carte suivante
    const showNextCard = () => {
        if (currentIndex >= totalCards) {
            // Si on dépasse la dernière carte, revenir à la première carte sans transition
            currentIndex = 0;
            track.style.transition = "none"; // Désactiver temporairement la transition
            updateCarousel();
            setTimeout(() => {
                track.style.transition = "transform 0.5s ease-in-out"; // Réactiver la transition
                currentIndex++;
                updateCarousel();
            }, 50);
        } else {
            currentIndex++;
            updateCarousel();
        }
    };

    // Passer à la carte précédente
    const showPrevCard = () => {
        if (currentIndex <= 0) {
            // Si on dépasse la première carte, revenir à la dernière carte sans transition
            currentIndex = totalCards;
            track.style.transition = "none"; // Désactiver temporairement la transition
            updateCarousel();
            setTimeout(() => {
                track.style.transition = "transform 0.5s ease-in-out"; // Réactiver la transition
                currentIndex--;
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

    // Positionnement initial avec un léger décalage à gauche
    updateCarousel();
});
