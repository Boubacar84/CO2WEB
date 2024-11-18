document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.about__next, .about__back, .about__prev');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const currentPage = document.querySelector('.about__page.active');
            const targetPage = document.querySelector(button.dataset.target);

            if (currentPage) {
                currentPage.classList.remove('active');
                currentPage.classList.add('hidden');
                currentPage.setAttribute('aria-hidden', 'true');
            }

            if (targetPage) {
                targetPage.classList.remove('hidden');
                targetPage.classList.add('active');
                targetPage.setAttribute('aria-hidden', 'false');
            }
        });
    });

    // Initialisation : première page visible
    const firstPage = document.querySelector('.about__page');
    if (firstPage) {
        firstPage.classList.add('active');
        firstPage.setAttribute('aria-hidden', 'false');
    }
});