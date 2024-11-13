const FACTEUR_EMISSION = 0.12;

function calculerEmissionHebdomadaire(event) {
    event.preventDefault();

    const distanceParJour = document.getElementById("distanceParJour").value;
    const joursParSemaine = document.getElementById("joursParSemaine").value;

    if (distanceParJour > 0 && joursParSemaine > 0 && joursParSemaine <= 7) {
        // Calcule l'émission de CO2 par semaine et par mois (en supposant 4 semaines par mois)
        const emissionHebdomadaire = distanceParJour * joursParSemaine * FACTEUR_EMISSION;
        const emissionMensuelle = emissionHebdomadaire * 4;

        // Affiche le résultat dans l'élément "resultat"
        document.getElementById("resultat").textContent =
            `Les émissions de CO2 pour les trajets domicile / travail en voiture sont de ${emissionMensuelle.toFixed(2)} kg par mois.`;

        // Affiche le conteneur de résultat
        document.getElementById("resultat-container").style.display = "flex";
    } else {
        document.getElementById("resultat").textContent = "Veuillez entrer des valeurs valides pour la distance et le nombre de jours.";
        document.getElementById("resultat-container").style.display = "flex";
    }
}
