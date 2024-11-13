let bodyEl = document.getElementsByTagName("body")[0];
let titleEl = document.getElementById("title");
let minuteurEl = document.getElementById("minuteur");
let messageEl = document.getElementById("message");
let joursEl = document.getElementById("j");
let heuresEl = document.getElementById("h");
let minutesEl = document.getElementById("m");
let secondesEl = document.getElementById("s");

// get UTC offset once
let now = new Date();
const dateOffsetInMinutes = now.getTimezoneOffset();

const unJourEnMs = 1000 * 60 * 60 * 24;
const uneHeureEnMs = 1000 * 60 * 60;
const uneMinuteEnMs = 1000 * 60;

// const newYear = Date.now() - (dateOffsetInMinutes * uneMinuteEnMs) + 2000;
const newYear = new Date("2025");

const getCountdown = () => {

    let nowDate = Date.now();

    let tempsRestantEnMs = newYear - nowDate + (dateOffsetInMinutes * uneMinuteEnMs);

    console.log(tempsRestantEnMs);

    // jours
    let nbJours = Math.floor(tempsRestantEnMs / unJourEnMs);


    // heures
    let resteTempsSansJoursMs = tempsRestantEnMs - (nbJours * unJourEnMs);
    let nbHeures = Math.floor(resteTempsSansJoursMs / uneHeureEnMs);

    // minutes
    let resteTempsSansHeuresMs = resteTempsSansJoursMs - (nbHeures * uneHeureEnMs);
    let nbMinutes = Math.floor(resteTempsSansHeuresMs / uneMinuteEnMs);


    // secondes
    let resteTempsSansMinutesMs = resteTempsSansHeuresMs - (nbMinutes * uneMinuteEnMs);
    let nbSecondes = Math.floor(resteTempsSansMinutesMs / 1000);

    joursEl.textContent = nbJours;
    heuresEl.textContent = nbHeures;
    minutesEl.textContent = nbMinutes;
    secondesEl.textContent = nbSecondes;

    if (tempsRestantEnMs <= 0) {
        clearInterval(countDownInterval);
        joursEl.textContent = 0;
        heuresEl.textContent = 0;
        minutesEl.textContent = 0;
        secondesEl.textContent = 0;
    }
}

let countDownInterval = setInterval(getCountdown, 1000);

// init
getCountdown();