document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('calcola').addEventListener('click', calcolaPrezzo);
    document.getElementById('calcolaNoleggio').addEventListener('click', calcolaNoleggio);
    document.getElementById('generaPdfConNoleggio').addEventListener('click', () => generaPDF(true));
    document.getElementById('generaPdfSenzaNoleggio').addEventListener('click', () => generaPDF(false));
    document.getElementById('inviaWhatsApp').addEventListener('click', inviaWhatsApp);
});

function calcolaPrezzo() {
    const prezzoLordo = parseEuropeanFloat(document.getElementById('prezzoLordo').value);
    const sconto = parseFloat(document.getElementById('sconto').value) || 0;
    const margine = parseFloat(document.getElementById('margine').value) || 0;
    const trasporto = parseEuropeanFloat(document.getElementById('trasporto').value);
    const installazione = parseEuropeanFloat(document.getElementById('installazione').value);

    const prezzoNetto = prezzoLordo - (prezzoLordo * (sconto / 100));
    const prezzoConMargine = prezzoNetto / (1 - (margine / 100));
    const totale = prezzoConMargine + trasporto + installazione;
    const maggiorazione = ((totale - prezzoNetto) / prezzoNetto) * 100;

    document.getElementById('prezzoNetto').textContent = formatNumber(prezzoNetto) + " €";
    document.getElementById('totaleIva').textContent = formatNumber(totale) + " €";
    document.getElementById('maggiorazione').textContent = formatNumber(maggiorazione) + " %";

    localStorage.setItem("ultimoImporto", totale);
}

function calcolaNoleggio() {
    let importo = parseEuropeanFloat(document.getElementById('importo').value) || parseEuropeanFloat(localStorage.getItem("ultimoImporto")) || 0;
    if (importo === 0 || isNaN(importo)) {
        alert("Per favore, inserisci un importo valido.");
        return;
    }

    let durata = parseInt(document.getElementById("durata").value);
    let speseContratto = calculateContractFees(importo);
    let coefficiente = getCoefficient(importo, durata);

    if (!coefficiente) {
        alert("Importo non valido per la simulazione di noleggio.");
        return;
    }

    let rataMensile = importo * coefficiente;
    let costoGiornaliero = rataMensile / 22;
    let costoOrario = costoGiornaliero / 8;

    document.getElementById("rataMensile").textContent = formatNumber(rataMensile) + " €";
    document.getElementById("speseContratto").textContent = formatNumber(speseContratto) + " €";
    document.getElementById("costoGiornaliero").textContent = formatNumber(costoGiornaliero) + " €";
    document.getElementById("costoOrario").textContent = formatNumber(costoOrario) + " €";
}

function calculateContractFees(importo) {
    if (importo < 5001) return 75;
    if (importo < 10001) return 100;
    if (importo < 25001) return 150;
    if (importo < 50001) return 225;
    return 300;
}

const coefficienti = {
    5000: { 12: 0.084167, 18: 0.060596, 24: 0.047514, 36: 0.033879, 48: 0.026723, 60: 0.022489 },
    15000: { 12: 0.083542, 18: 0.059999, 24: 0.046924, 36: 0.033290, 48: 0.026122, 60: 0.021874 },
    25000: { 12: 0.083386, 18: 0.059850, 24: 0.046777, 36: 0.033143, 48: 0.025973, 60: 0.021722 },
    50000: { 12: 0.082867, 18: 0.059354, 24: 0.046290, 36: 0.032658, 48: 0.025479, 60: 0.021219 }
};

function getCoefficient(importo, durata) {
    for (let maxImporto in coefficienti) {
        if (importo <= parseInt(maxImporto)) {
            return coefficienti[maxImporto][durata];
        }
    }
    return null;
}

function generaPDF(includeNoleggio) {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("EasyPrice - Report", 20, 20);
    doc.setFontSize(12);

    if (includeNoleggio) {
        doc.text("Importo Inserito: " + document.getElementById('importo').value + " €", 20, 40);
        doc.text("Rata Mensile: " + document.getElementById('rataMensile').textContent, 20, 50);
        doc.text("Spese di Contratto: " + document.getElementById('speseContratto').textContent, 20, 60);
        doc.text("Costo Giornaliero: " + document.getElementById('costoGiornaliero').textContent, 20, 70);
        doc.text("Costo Orario: " + document.getElementById('costoOrario').textContent, 20, 80);
    } else {
        doc.text("Totale IVA esclusa: " + document.getElementById('totaleIva').textContent, 20, 40);
    }

    doc.save("EasyPrice_Report.pdf");
}

function inviaWhatsApp() {
    let message = `📌 EasyPrice - Simulazione Noleggio
Rata Mensile: ${document.getElementById('rataMensile').textContent}
Spese di Contratto: ${document.getElementById('speseContratto').textContent}
Costo Giornaliero: ${document.getElementById('costoGiornaliero').textContent}
Costo Orario: ${document.getElementById('costoOrario').textContent}`;

    let url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}

function parseEuropeanFloat(value) {
    if (!value) return 0;
    value = value.replace(/€/g, '').replace(/\s/g, '').replace(/\./g, '').replace(',', '.');
    return parseFloat(value) || 0;
}

function formatNumber(value) {
    return value.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
