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

    updateElementText('prezzoNetto', formatNumber(prezzoNetto) + " €");
    updateElementText('totaleIva', formatNumber(totale) + " €");
    updateElementText('maggiorazione', formatNumber(maggiorazione) + " %");

    localStorage.setItem("ultimoImporto", totale);
}

function calcolaNoleggio() {
    let importo = getImporto();

    if (importo === 0 || isNaN(importo)) {
        alert("Per favore, inserisci un importo valido.");
        return;
    }

    const durata = parseInt(document.getElementById("durata").value);
    const speseContratto = calculateContractFees(importo);
    const coefficiente = getCoefficient(importo, durata);

    if (!coefficiente) {
        alert("Importo non valido per la simulazione di noleggio.");
        return;
    }

    const rataMensile = importo * coefficiente;
    const costoGiornaliero = rataMensile / 22;
    const costoOrario = costoGiornaliero / 8;

    updateElementText("rataMensile", formatNumber(rataMensile) + " €");
    updateElementText("speseContratto", formatNumber(speseContratto) + " €");
    updateElementText("costoGiornaliero", formatNumber(costoGiornaliero) + " €");
    updateElementText("costoOrario", formatNumber(costoOrario) + " €");
}

function getImporto() {
    const importoInput = document.getElementById("importo").value.trim();
    return importoInput ? parseEuropeanFloat(importoInput) : parseEuropeanFloat(localStorage.getItem("ultimoImporto") || "0");
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
    50000: { 12: 0.082867, 18: 0.059354, 24: 0.046290, 36: 0.032658, 48: 0.025479, 60: 0.021219 },
    100000: { 12: 0.082867, 18: 0.059354, 24: 0.046290, 36: 0.032658, 48: 0.025479, 60: 0.021219 }
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
    addTextToPDF(doc, "Prezzo Netto: ", document.getElementById('prezzoNetto').textContent, 20, 40);
    addTextToPDF(doc, "Totale IVA esclusa: ", document.getElementById('totaleIva').textContent, 20, 50);
    addTextToPDF(doc, "Maggiorazione rispetto al netto: ", document.getElementById('maggiorazione').textContent, 20, 60);

    if (includeNoleggio) {
        addTextToPDF(doc, "🟢 Simulazione Noleggio", "", 20, 75);
        addTextToPDF(doc, "Importo Inserito: ", document.getElementById('importo').value || "Non specificato", 20, 85);
        addTextToPDF(doc, "Rata Mensile: ", document.getElementById('rataMensile').textContent, 20, 95);
        addTextToPDF(doc, "Spese di Contratto: ", document.getElementById('speseContratto').textContent, 20, 105);
        addTextToPDF(doc, "Costo Giornaliero: ", document.getElementById('costoGiornaliero').textContent, 20, 115);
        addTextToPDF(doc, "Costo Orario: ", document.getElementById('costoOrario').textContent, 20, 125);
    }

    doc.save("EasyPrice_Report.pdf");
}

function inviaWhatsApp() {
    let message = `📌 EasyPrice - Simulazione Noleggio
Rata Mensile: ${cleanText(document.getElementById('rataMensile').textContent)}
Spese di Contratto: ${cleanText(document.getElementById('speseContratto').textContent)}
Costo Giornaliero: ${cleanText(document.getElementById('costoGiornaliero').textContent)}
Costo Orario: ${cleanText(document.getElementById('costoOrario').textContent)}`;

    let url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}
