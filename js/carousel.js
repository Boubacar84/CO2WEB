document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const cardsContainer = carousel.querySelector('.cards-instructions');
    const cards = Array.from(carousel.querySelectorAll('.card')); // Convertir les cartes en tableau
    const prevButton = carousel.querySelector('.carousel-control.prev');
    const nextButton = carousel.querySelector('.carousel-control.next');

    // Clonage des cartes pour une boucle infinie
    const firstClone = cards[0].cloneNode(true); // Clone de la première carte
    const lastClone = cards[cards.length - 1].cloneNode(true); // Clone de la dernière carte

    cardsContainer.appendChild(firstClone); // Ajouter la première carte clonée à la fin
    cardsContainer.insertBefore(lastClone, cards[0]); // Ajouter la dernière carte clonée au début

    // Mettre à jour les cartes avec les clones
    const updatedCards = Array.from(cardsContainer.querySelectorAll('.card'));
    const totalCards = updatedCards.length; // Inclut les clones
    const cardWidth = 360; // Largeur d'une carte fixe (adaptée à ta résolution)

    let currentIndex = 1; // Démarrer sur la vraie première carte (pas le clone)
    cardsContainer.style.transform = `translateX(-${currentIndex * cardWidth}px)`; // Position initiale

    // Ajouter les indicateurs dynamiquement
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.classList.add('carousel-indicators');
    carousel.appendChild(indicatorsContainer);

    cards.forEach((_, index) => {
        const indicator = document.createElement('button');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active'); // Activer le premier point
        indicator.dataset.index = index; // Associer un index pour chaque indicateur
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = indicatorsContainer.querySelectorAll('.indicator');

    // Mettre à jour la position du slider
    const updateCarouselPosition = () => {
        cardsContainer.style.transition = 'transform 0.5s ease-in-out';
        const offset = -currentIndex * cardWidth;
        cardsContainer.style.transform = `translateX(${offset}px)`;
        updateIndicators();
    };

    // Mettre à jour l'état actif des indicateurs
    const updateIndicators = () => {
        indicators.forEach((indicator, index) => {
            if (index === (currentIndex - 1) % cards.length) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    };

    // Passer à la carte suivante
    const nextSlide = () => {
        if (currentIndex >= totalCards - 1) {
            currentIndex = 1; // Retour au début (vraie première carte)
            cardsContainer.style.transition = 'none'; // Désactiver temporairement la transition
            cardsContainer.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            setTimeout(() => {
                cardsContainer.style.transition = 'transform 0.5s ease-in-out'; // Réactiver la transition
                currentIndex++;
                updateCarouselPosition();
            }, 50);
        } else {
            currentIndex++;
            updateCarouselPosition();
        }
    };

    // Passer à la carte précédente
    const prevSlide = () => {
        if (currentIndex <= 0) {
            currentIndex = totalCards - 2; // Retour à la fin (vraie dernière carte)
            cardsContainer.style.transition = 'none'; // Désactiver temporairement la transition
            cardsContainer.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            setTimeout(() => {
                cardsContainer.style.transition = 'transform 0.5s ease-in-out'; // Réactiver la transition
                currentIndex--;
                updateCarouselPosition();
            }, 50);
        } else {
            currentIndex--;
            updateCarouselPosition();
        }
    };

    // Aller directement à une carte spécifique via les indicateurs
    const goToCard = (index) => {
        currentIndex = index + 1; // Ajuster l'index pour les clones
        updateCarouselPosition();
    };

    // Ajouter les gestionnaires d'événements
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
    indicators.forEach(indicator => {
        indicator.addEventListener('click', (e) => {
            const targetIndex = parseInt(e.target.dataset.index, 10);
            goToCard(targetIndex);
        });
    });

    // Réajuster la largeur des cartes si la fenêtre change de taille
    window.addEventListener('resize', () => {
        cardsContainer.style.transition = 'none'; // Supprimer temporairement la transition
        const offset = -currentIndex * cardWidth;
        cardsContainer.style.transform = `translateX(${offset}px)`;
        setTimeout(() => {
            cardsContainer.style.transition = 'transform 0.5s ease-in-out'; // Réactiver la transition
        }, 50);
    });

    // Initialiser la position du slider à la première carte (index 0)
    setTimeout(() => {
        cardsContainer.style.transition = 'transform 0.5s ease-in-out';
        updateCarouselPosition();
    }, 50);
});
