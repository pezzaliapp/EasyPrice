document.getElementById('calcola').addEventListener('click', function() {
    let prezzoLordo = parseFloat(document.getElementById('prezzoLordo').value) || 0;
    let sconto = parseFloat(document.getElementById('sconto').value) || 0;
    let margine = parseFloat(document.getElementById('margine').value) || 0;
    let trasporto = parseFloat(document.getElementById('trasporto').value) || 0;
    let installazione = parseFloat(document.getElementById('installazione').value) || 0;

    let prezzoNetto = prezzoLordo - (prezzoLordo * (sconto / 100));
    let margineMC = prezzoNetto * (margine / 100);
    let totale = prezzoNetto + margineMC + trasporto + installazione;
    let maggiorazione = ((totale - prezzoNetto) / prezzoNetto) * 100;

    document.getElementById('prezzoNetto').textContent = prezzoNetto.toFixed(2);
    document.getElementById('totaleIva').textContent = totale.toFixed(2);
    document.getElementById('maggiorazione').textContent = maggiorazione.toFixed(2);
});
