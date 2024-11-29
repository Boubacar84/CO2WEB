const FACTEUR_EMISSION = 0.12;

function calculerEmissionHebdomadaire(event) {
    event.preventDefault();

    const distanceParJour = document.getElementById("distanceParJour").value;
    const joursParSemaine = document.getElementById("joursParSemaine").value;

    if (distanceParJour > 0 && joursParSemaine > 0 && joursParSemaine <= 7) {
        const emissionHebdomadaire = distanceParJour * joursParSemaine * FACTEUR_EMISSION;
        const emissionMensuelle = emissionHebdomadaire * 4;

        document.getElementById("resultat").innerHTML =
            `Les émissions de CO2 pour les trajets domicile / travail en voiture sont de <span class="highlight-green">${emissionMensuelle.toFixed(2)} kg</span> par mois.`;

        document.getElementById("resultat-container").style.display = "flex";
        document.getElementById("overlay").style.display = "block";
    } else {
        document.getElementById("resultat").textContent = "Veuillez entrer des valeurs valides pour la distance et le nombre de jours.";
        document.getElementById("resultat-container").style.display = "flex";
        document.getElementById("overlay").style.display = "block";
    }
}

// Ferme la pop-up et l'overlay en cliquant sur l'overlay
document.getElementById("overlay").onclick = function () {
    document.getElementById("resultat-container").style.display = "none";
    document.getElementById("overlay").style.display = "none";
};
