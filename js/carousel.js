document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.querySelector('.cards-instructions');
    const cards = Array.from(cardsContainer.children);

    // Ajout des boutons pour navigation
    const nextBtn = document.createElement('button');
    const prevBtn = document.createElement('button');

    nextBtn.textContent = '>';
    prevBtn.textContent = '<';
    nextBtn.classList.add('carousel-btn', 'next-btn');
    prevBtn.classList.add('carousel-btn', 'prev-btn');

    cardsContainer.appendChild(nextBtn);
    cardsContainer.appendChild(prevBtn);

    let currentIndex = 0;

    const updateCarousel = () => {
        cards.forEach((card, index) => {
            if (index === currentIndex) {
                card.style.transform = 'translateX(0)';
                card.style.opacity = '1';
            } else if (index < currentIndex) {
                card.style.transform = 'translateX(-100%)';
                card.style.opacity = '0';
            } else {
                card.style.transform = 'translateX(100%)';
                card.style.opacity = '0';
            }
        });
    };

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    });

    updateCarousel();
});

