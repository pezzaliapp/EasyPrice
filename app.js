document.getElementById('calcola').addEventListener('click', function() {
    let prezzoLordo = parseFloat(document.getElementById('prezzoLordo').value) || 0;
    let sconto = parseFloat(document.getElementById('sconto').value) || 0;
    let margine = parseFloat(document.getElementById('margine').value) || 0;
    let trasporto = parseFloat(document.getElementById('trasporto').value) || 0;
    let installazione = parseFloat(document.getElementById('installazione').value) || 0;

    let prezzoNetto = prezzoLordo - (prezzoLordo * (sconto / 100));
    let prezzoConMargine = prezzoNetto / (1 - (margine / 100));  // Formula corretta
    let totale = prezzoConMargine + trasporto + installazione;
    let maggiorazione = ((totale - prezzoNetto) / prezzoNetto) * 100;

    document.getElementById('prezzoNetto').textContent = formatNumber(prezzoNetto) + " €";
    document.getElementById('totaleIva').textContent = formatNumber(totale) + " €";
    document.getElementById('maggiorazione').textContent = formatNumber(maggiorazione) + " %";

    // Salva il valore per il noleggio
    localStorage.setItem("ultimoImporto", totale);
});

function calcolaNoleggio() {
    let importoInput = document.getElementById("importo").value;
    
    // Recupera l'importo dal calcolo se il campo è vuoto
    if (!importoInput.trim()) {
        importoInput = localStorage.getItem("ultimoImporto") || "0";
    }

    let importo = parseEuropeanFloat(importoInput);

    if (importo === 0 || isNaN(importo)) {
        alert("Per favore, inserisci un importo valido.");
        return;
    }

    let durata = parseInt(document.getElementById("durata").value);
    let rataMensile = 0;
    let speseContratto = 0;

    // Calcolo Spese di Contratto
    if (importo < 5001) speseContratto = 75;
    else if (importo < 10001) speseContratto = 100;
    else if (importo < 25001) speseContratto = 150;
    else if (importo < 50001) speseContratto = 225;
    else speseContratto = 300;

    // Coefficienti di Noleggio in base all'importo e alla durata
    const coefficienti = {
        5000: { 12: 0.084167, 18: 0.060596, 24: 0.047514, 36: 0.033879, 48: 0.026723, 60: 0.022489 },
        15000: { 12: 0.083542, 18: 0.059999, 24: 0.046924, 36: 0.033290, 48: 0.026122, 60: 0.021874 },
        25000: { 12: 0.083386, 18: 0.059850, 24: 0.046777, 36: 0.033143, 48: 0.025973, 60: 0.021722 },
        50000: { 12: 0.082867, 18: 0.059354, 24: 0.046290, 36: 0.032658, 48: 0.025479, 60: 0.021219 },
        100000: { 12: 0.082867, 18: 0.059354, 24: 0.046290, 36: 0.032658, 48: 0.025479, 60: 0.021219 }
    };

    let selectedCoefficient = null;
    for (let maxImporto in coefficienti) {
        if (importo <= parseInt(maxImporto)) {
            selectedCoefficient = coefficienti[maxImporto][durata];
            break;
        }
    }

    if (!selectedCoefficient) {
        alert("Importo non valido per la simulazione di noleggio.");
        return;
    }

    rataMensile = importo * selectedCoefficient;

    let costoGiornaliero = rataMensile / 22;
    let costoOrario = costoGiornaliero / 8;

    document.getElementById("rataMensile").textContent = formatNumber(rataMensile) + " €";
    document.getElementById("speseContratto").textContent = formatNumber(speseContratto) + " €";
    document.getElementById("costoGiornaliero").textContent = formatNumber(costoGiornaliero) + " €";
    document.getElementById("costoOrario").textContent = formatNumber(costoOrario) + " €";
}

// Funzione per convertire un numero europeo in float
function parseEuropeanFloat(value) {
    if (!value) return 0;
    value = value.replace(/€/g, '').replace(/\s/g, '').replace(/\./g, '').replace(',', '.');
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
}

// Funzione per formattare un numero con due decimali
function formatNumber(value) {
    return value.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Modalità Scura
document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

document.addEventListener('DOMContentLoaded', () => {
    if (JSON.parse(localStorage.getItem('darkMode'))) {
        document.body.classList.add('dark-mode');
    }
});

// Registrazione del Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .then(() => console.log('Service Worker registrato con successo!'))
        .catch(err => console.error('Errore nella registrazione del Service Worker:', err));
}
