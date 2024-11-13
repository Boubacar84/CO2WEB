// Facteur d'émission moyen en kg CO2 par km
const FACTEUR_EMISSION = 0.12;

function calculerEmissionHebdomadaire(event) {
    // Empêche le comportement par défaut du bouton (soumission de formulaire)
    event.preventDefault();

    // Récupère les valeurs saisies par l'utilisateur
    const distanceParJour = document.getElementById("distanceParJour").value;
    const joursParSemaine = document.getElementById("joursParSemaine").value;

    // Vérifie que les valeurs sont valides
    if (distanceParJour > 0 && joursParSemaine > 0 && joursParSemaine <= 7) {
        // Calcule l'émission de CO2 hebdomadaire
        const emissionHebdomadaire = distanceParJour * joursParSemaine * FACTEUR_EMISSION;

        // Affiche le résultat
        document.getElementById("resultat").textContent =
            `Pour une distance quotidienne de ${distanceParJour} km sur ${joursParSemaine} jour(s) travaillés, l'émission hebdomadaire de CO2 est de ${emissionHebdomadaire.toFixed(2)} kg.`;
    } else {
        // Message d'erreur si l'entrée est invalide
        document.getElementById("resultat").textContent = "Veuillez entrer des valeurs valides pour la distance et le nombre de jours.";
    }
}
