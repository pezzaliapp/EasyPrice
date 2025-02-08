# EasyPrice
Coltellino Svizzero del Venditore

EasyPrice è un'applicazione web che offre un calcolatore prezzi e un simulatore di noleggio. L'app consente di:

- Calcolare il prezzo al netto dell'IVA, il compenso/provvigione, il costo del trasporto e dell'installazione, basandosi su prezzo lordo, sconto e margine.
- Simulare il canone di noleggio (con rata mensile, spese di contratto, costo giornaliero e costo orario) in base a un importo e alla durata (in mesi).
- Generare report PDF personalizzati tramite [jsPDF](https://github.com/parallax/jsPDF).
- Condividere i report via WhatsApp, con link che funzionano sia su dispositivi Android che su iOS.
- Essere installata come Progressive Web App (PWA) grazie al file `manifest.json` e al `service-worker.js`.

## Caratteristiche

- **Calcolo Prezzi:**  
  Calcola il Totale IVA esclusa, il compenso/provvigione, e i costi di trasporto e installazione, in base ai dati inseriti dall'utente.

- **Simulatore di Noleggio:**  
  Simula il canone di noleggio mostrando:
  - Rata mensile
  - Spese di contratto (calcolate in base all'importo)
  - Costo giornaliero e costo orario

- **Report PDF:**  
  Genera report PDF che includono le informazioni di prezzo e, opzionalmente, i dati della simulazione del noleggio.

- **Condivisione via WhatsApp:**  
  Permette di condividere un report sintetico o completo via WhatsApp. I link sono configurati per funzionare correttamente anche su dispositivi iOS.

- **Progressive Web App (PWA):**  
  L'app è configurata come PWA per essere installabile su dispositivi mobili. Sono inclusi un file `manifest.json` (che definisce il nome, le icone, il tema e il comportamento dell'app) e un `service-worker.js` per la gestione della cache e delle funzionalità offline.

## Installazione

Per eseguire l'applicazione in locale:

1. **Clona il repository:**

   ```bash
   git clone https://github.com/pezzaliapp/EasyPrice.git

	2.	Accedi alla cartella del progetto:

cd EasyPrice


	3.	Avvia un server locale:
Poiché l’app è una PWA, è necessario servirla tramite HTTPS o almeno da un server locale. Ad esempio, puoi usare http-server:

npm install -g http-server
http-server -c-1

Oppure, se usi Visual Studio Code, puoi utilizzare l’estensione “Live Server”.

Struttura del Progetto
	•	index.html:
La pagina principale dell’app, che include l’interfaccia utente, i tag per il manifest e per le icone (compresi i tag specifici per iOS).
	•	app.js:
Il file JavaScript che gestisce la logica di calcolo, la generazione dei report PDF e la condivisione via WhatsApp.
	•	style.css:
Il file CSS che definisce lo stile e la responsività dell’applicazione.
	•	manifest.json:
Il file manifest della PWA che definisce il nome, le icone, i colori e il comportamento dell’app.
	•	service-worker.js:
Il file per la gestione della cache e delle funzionalità offline della PWA.
	•	Icone:
Le icone easyprice-192.png e easyprice-512.png sono collocate nella root del progetto e sono referenziate sia nel manifest.json che in index.html.

Configurazione delle Icone e della PWA

Per supportare l’installazione su dispositivi mobili (in particolare su iOS), assicurati che:
	•	Il file manifest.json contenga i riferimenti corretti alle icone:

{
  "name": "EasyPrice",
  "short_name": "EasyPrice",
  "description": "Calcolatore Prezzi e Simulatore Noleggio",
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#f4f4f4",
  "theme_color": "#007bff",
  "icons": [
    {
      "src": "easyprice-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "easyprice-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}


	•	In index.html siano presenti i tag per iOS:

<link rel="apple-touch-icon" href="easyprice-192.png">
<link rel="apple-touch-icon" sizes="512x512" href="easyprice-512.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">


	•	Il sito venga servito tramite HTTPS o, in ambiente di sviluppo, tramite un server locale.

Test e Debug
	•	PWA:
Verifica che l’app possa essere installata come PWA e che l’icona venga visualizzata correttamente su dispositivi mobili (specialmente su iOS).
	•	Report PDF e WhatsApp:
Testa la generazione dei report PDF e la funzionalità di condivisione via WhatsApp, verificando che tutti i dati vengano visualizzati correttamente e che i link siano compatibili sia con dispositivi Android che iOS.

Contributi

Se desideri contribuire a questo progetto, sei invitato a:
	•	Inviare pull request
	•	Segnalare problemi o suggerimenti tramite la sezione Issues di GitHub

Licenza

Inserisci qui la licenza (ad esempio, MIT) se il progetto è open source.

Questo progetto è stato realizzato per semplificare il calcolo dei prezzi e la simulazione di noleggio, offrendo un’interfaccia moderna, responsive e compatibile con diverse piattaforme.
