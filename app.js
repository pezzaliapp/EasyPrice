document.getElementById('calcola').addEventListener('click', function() {
    let prezzoLordo = parseFloat(document.getElementById('prezzoLordo').value) || 0;
    let sconto = parseFloat(document.getElementById('sconto').value) || 0;
    let margine = parseFloat(document.getElementById('margine').value) || 0;
    let trasporto = parseFloat(document.getElementById('trasporto').value) || 0;
    let installazione = parseFloat(document.getElementById('installazione').value) || 0;

    let prezzoNetto = prezzoLordo - (prezzoLordo * (sconto / 100));
    let prezzoConMargine = prezzoNetto / (1 - (margine / 100));
    let totale = prezzoConMargine + trasporto + installazione;
    let maggiorazione = ((totale - prezzoNetto) / prezzoNetto) * 100;

    document.getElementById('prezzoNetto').textContent = prezzoNetto.toFixed(2);
    document.getElementById('totaleIva').textContent = totale.toFixed(2);
    document.getElementById('maggiorazione').textContent = maggiorazione.toFixed(2);
});

function calcolaNoleggio() {
    let importo = parseEuropeanFloat(document.getElementById("importo").value);
    if (importo === 0 || isNaN(importo)) {
        alert("Per favore, inserisci un importo valido.");
        return;
    }

    let durata = parseInt(document.getElementById("durata").value);
    let rataMensile = 0;
    let speseContratto = (importo < 5001) ? 75 : (importo < 10001) ? 100 : (importo < 25001) ? 150 : (importo < 50001) ? 225 : 300;

    const coefficienti = {
        5000: { 12: 0.084167, 18: 0.060596, 24: 0.047514, 36: 0.033879, 48: 0.026723, 60: 0.022489 },
        15000: { 12: 0.083542, 18: 0.059999, 24: 0.046924, 36: 0.033290, 48: 0.026122, 60: 0.021874 },
        25000: { 12: 0.083386, 18: 0.059850, 24: 0.046777, 36: 0.033143, 48: 0.025973, 60: 0.021722 },
        50000: { 12: 0.082867, 18: 0.059354, 24: 0.046290, 36: 0.032658, 48: 0.025479, 60: 0.021219 },
        100000: { 12: 0.082867, 18: 0.059354, 24: 0.046290, 36: 0.032658, 48: 0.025479, 60: 0.021219 }
    };

    for (let maxImporto in coefficienti) {
        if (importo <= maxImporto) {
            rataMensile = importo * coefficienti[maxImporto][durata];
            break;
        }
    }

    let costoGiornaliero = rataMensile / 22;
    let costoOrario = costoGiornaliero / 8;

    document.getElementById("rataMensile").textContent = formatNumber(rataMensile) + " €";
    document.getElementById("speseContratto").textContent = formatNumber(speseContratto) + " €";
    document.getElementById("costoGiornaliero").textContent = formatNumber(costoGiornaliero) + " €";
    document.getElementById("costoOrario").textContent = formatNumber(costoOrario) + " €";
}

function parseEuropeanFloat(value) {
    return parseFloat(value.replace(/\./g, '').replace(',', '.')) || 0;
}

function formatNumber(value) {
    return value.toLocaleString("it-IT", { minimumFractionDigits: 2 });
}
