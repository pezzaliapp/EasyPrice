document.addEventListener("DOMContentLoaded", function() {
  assignEventListeners();
});

function assignEventListeners() {
  document.getElementById('calcola').addEventListener('click', calcolaPrezzo);
  document.getElementById('calcolaNoleggio').addEventListener('click', calcolaNoleggio);
  document.getElementById('generaPdfConNoleggio').addEventListener('click', () => generaPDF(true, false));
  document.getElementById('generaPdfSenzaNoleggio').addEventListener('click', () => generaPDF(false, false));
  document.getElementById('generaPdfConProvvigione').addEventListener('click', () => generaPDF(true, true));
  document.getElementById('inviaWhatsApp').addEventListener('click', inviaWhatsApp);
  document.getElementById('inviaWhatsAppCompleto').addEventListener('click', inviaWhatsAppCompleto);
}

// Funzioni di utilità per la conversione/formattazione dei numeri
function parseEuropeanFloat(value) {
  if (!value) return 0;
  // Rimuove simboli di euro, spazi e altri caratteri non numerici
  value = value.replace(/[€\s]/g, '');
  // Se contiene una virgola, la considera come separatore decimale:
  if (value.indexOf(',') !== -1) {
    // Rimuove eventuali punti usati come separatori delle migliaia
    value = value.replace(/\./g, '');
    // Sostituisce la virgola con il punto
    value = value.replace(',', '.');
  } else {
    // Se non ci sono virgole, rimuove eventuali punti usati come separatori delle migliaia
    value = value.replace(/\./g, '');
  }
  return parseFloat(value);
}

function formatNumber(value) {
  return parseFloat(value).toLocaleString('it-IT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// ** Calcola Prezzo e Provvigione **
function calcolaPrezzo() {
  const prezzoLordo = parseEuropeanFloat(document.getElementById('prezzoLordo').value);
  const sconto = parseEuropeanFloat(document.getElementById('sconto').value);
  const margine = parseEuropeanFloat(document.getElementById('margine').value);
  const trasporto = parseEuropeanFloat(document.getElementById('trasporto').value);
  const installazione = parseEuropeanFloat(document.getElementById('installazione').value);

  let totaleIvaEsclusa = parseEuropeanFloat(document.getElementById('totaleIvaManuale').value) ||
    (prezzoLordo - (prezzoLordo * (sconto / 100))) / (1 - (margine / 100));

  const provvigione = ((totaleIvaEsclusa - trasporto - installazione) * (margine / 100));

  // Aggiorna i risultati
  document.getElementById('totaleIva').textContent = formatNumber(totaleIvaEsclusa) + " €";
  document.getElementById('provvigione').textContent = formatNumber(provvigione) + " €";
  document.getElementById('costiTrasporto').textContent = formatNumber(trasporto) + " €";
  document.getElementById('costiInstallazione').textContent = formatNumber(installazione) + " €";

  localStorage.setItem("totaleIvaEsclusa", totaleIvaEsclusa);
}

// ** Calcola Noleggio **
function calcolaNoleggio() {
  let importo = parseEuropeanFloat(document.getElementById('importo').value) ||
    parseEuropeanFloat(localStorage.getItem("totaleIvaEsclusa")) || 0;
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

  // Aggiorna i risultati del noleggio
  document.getElementById("rataMensile").textContent = formatNumber(rataMensile) + " €";
  document.getElementById("speseContratto").textContent = formatNumber(speseContratto) + " €";
  document.getElementById("costoGiornaliero").textContent = formatNumber(costoGiornaliero) + " €";
  document.getElementById("costoOrario").textContent = formatNumber(costoOrario) + " €";
}

// ** Calcola le spese di contratto **
function calculateContractFees(importo) {
  if (importo < 5001) return 75;
  if (importo < 10001) return 100;
  if (importo < 25001) return 150;
  if (importo < 50001) return 225;
  return 300;
}

// ** Coefficienti di Noleggio **
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

// ** Generazione PDF **
function generaPDF(includeNoleggio, includeProvvigione) {
  const { jsPDF } = window.jspdf;
  let doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("EasyPrice - Report", 20, 20);

  doc.setFontSize(12);
  doc.text("Totale IVA esclusa: " + document.getElementById('totaleIva').textContent, 20, 40);
  doc.text("Costo Trasporto: " + document.getElementById('costiTrasporto').textContent, 20, 50);
  doc.text("Costo Installazione: " + document.getElementById('costiInstallazione').textContent, 20, 60);
  
  if (includeProvvigione) {
    doc.text("Compenso: " + document.getElementById('provvigione').textContent, 20, 70);
  }

  if (includeNoleggio) {
    let y = (includeProvvigione ? 80 : 70) + 10;
    const durataSelect = document.getElementById('durata');
    const durataText = durataSelect.options[durataSelect.selectedIndex].text;
    doc.text("Durata: " + durataText, 20, y);
    y += 10;
    doc.text("Rata Mensile: " + document.getElementById('rataMensile').textContent, 20, y);
    y += 10;
    doc.text("Spese di Contratto: " + document.getElementById('speseContratto').textContent, 20, y);
    y += 10;
    doc.text("Costo Giornaliero: " + document.getElementById('costoGiornaliero').textContent, 20, y);
    y += 10;
    doc.text("Costo Orario: " + document.getElementById('costoOrario').textContent, 20, y);
  }

  doc.save("EasyPrice_Report.pdf");
}

// ** Invia WhatsApp con report sintetico **
function inviaWhatsApp() {
  let message = `📌 EasyPrice - Report
Totale IVA esclusa: ${document.getElementById('totaleIva').textContent}
Costo Trasporto: ${document.getElementById('costiTrasporto').textContent}
Costo Installazione: ${document.getElementById('costiInstallazione').textContent}`;
  let url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// ** Invia WhatsApp con report completo, includendo i dati di prezzo e noleggio **
function inviaWhatsAppCompleto() {
  const durataSelect = document.getElementById('durata');
  const durataText = durataSelect.options[durataSelect.selectedIndex].text;
  
  let message = `📌 EasyPrice - Report Completo
Totale IVA esclusa: ${document.getElementById('totaleIva').textContent}
di cui Costo Trasporto: ${document.getElementById('costiTrasporto').textContent}
di cui Costo Installazione: ${document.getElementById('costiInstallazione').textContent}
Compenso: ${document.getElementById('provvigione').textContent}
-----------------------------------------
Durata: ${durataText}
Rata Mensile: ${document.getElementById('rataMensile').textContent}
Spese di Contratto: ${document.getElementById('speseContratto').textContent}
Costo Giornaliero: ${document.getElementById('costoGiornaliero').textContent}
Costo Orario: ${document.getElementById('costoOrario').textContent}`;
  
  let url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
