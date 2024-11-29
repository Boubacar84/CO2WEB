document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.about__next, .about__back, .about__prev');

    // Ajouter des écouteurs d'événements aux boutons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const currentPage = document.querySelector('.about__page.active');
            const targetSelector = button.dataset.target;
            const targetPage = targetSelector ? document.querySelector(targetSelector) : null;

            if (currentPage) {
                currentPage.classList.remove('active');
                currentPage.classList.add('hidden');
                currentPage.setAttribute('aria-hidden', 'true');
            }

            if (targetPage) {
                targetPage.classList.remove('hidden');
                targetPage.classList.add('active');
                targetPage.setAttribute('aria-hidden', 'false');
            } else {
                console.warn(`Aucune page cible trouvée pour le sélecteur : ${targetSelector}`);
            }
        });
    });

    // Initialiser la première page comme visible
    const firstPage = document.querySelector('.about__page');
    if (firstPage) {
        firstPage.classList.add('active');
        firstPage.setAttribute('aria-hidden', 'false');
        // S'assurer que les autres pages sont bien masquées
        const otherPages = document.querySelectorAll('.about__page:not(:first-of-type)');
        otherPages.forEach(page => {
            page.classList.add('hidden');
            page.setAttribute('aria-hidden', 'true');
        });
    } else {
        console.error('Aucune page `.about__page` trouvée dans le DOM.');
    }
});