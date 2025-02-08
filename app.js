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

    document.getElementById('prezzoNetto').textContent = formatNumber(prezzoNetto) + " €";
    document.getElementById('totaleIva').textContent = formatNumber(totale) + " €";
    document.getElementById('maggiorazione').textContent = formatNumber(maggiorazione) + " %";

    // Salva il valore per il noleggio
    localStorage.setItem("ultimoImporto", totale);
});

function calcolaNoleggio() {
    let importoInput = document.getElementById("importo").value;

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
    let speseContratto = (importo < 5001) ? 75 : (importo < 10001) ? 100 : (importo < 25001) ? 150 : (importo < 50001) ? 225 : 300;

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

function generaPDF(includeNoleggio) {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text("EasyPrice - Report", 20, 20);
    
    doc.setFontSize(12);
    doc.text("Prezzo Netto: " + document.getElementById('prezzoNetto').textContent, 20, 40);
    doc.text("Totale IVA esclusa: " + document.getElementById('totaleIva').textContent, 20, 50);
    doc.text("Maggiorazione rispetto al netto: " + document.getElementById('maggiorazione').textContent, 20, 60);

    if (includeNoleggio) {
        doc.text("Rata Mensile: " + document.getElementById('rataMensile').textContent, 20, 80);
        doc.text("Spese di Contratto: " + document.getElementById('speseContratto').textContent, 20, 90);
        doc.text("Costo Giornaliero: " + document.getElementById('costoGiornaliero').textContent, 20, 100);
        doc.text("Costo Orario: " + document.getElementById('costoOrario').textContent, 20, 110);
    }

    doc.save("EasyPrice_Report.pdf");
}

function inviaWhatsApp() {
    let message = `EasyPrice - Report
    Prezzo Netto: ${document.getElementById('prezzoNetto').textContent}
    Totale IVA esclusa: ${document.getElementById('totaleIva').textContent}
    Maggiorazione rispetto al netto: ${document.getElementById('maggiorazione').textContent}`;

    if (document.getElementById('rataMensile')) {
        message += `
        Rata Mensile: ${document.getElementById('rataMensile').textContent}
        Spese di Contratto: ${document.getElementById('speseContratto').textContent}
        Costo Giornaliero: ${document.getElementById('costoGiornaliero').textContent}
        Costo Orario: ${document.getElementById('costoOrario').textContent}`;
    }

    let url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}

// Funzioni di formattazione
function parseEuropeanFloat(value) {
    if (!value) return 0;
    value = value.replace(/€/g, '').replace(/\s/g, '').replace(/\./g, '').replace(',', '.');
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
}

function formatNumber(value) {
    return value.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
