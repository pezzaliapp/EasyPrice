# EasyPrice
Coltellino Svizzero del Venditore
# EasyPrice - PWA per Calcolo Prezzi e Simulazione Noleggio

EasyPrice è una Progressive Web App (PWA) progettata per calcolare il prezzo netto di un prodotto applicando sconti e margini, e per simulare il canone di noleggio in base alla durata selezionata.

## 💻 Tecnologie Utilizzate
- **HTML5** - Struttura della PWA
- **CSS3** - Stile responsive e dark mode
- **JavaScript (JS)** - Logica di calcolo
- **JSON** - Configurazione del manifest PWA
- **Service Worker** - Supporto offline

## 🔧 Funzionalità
### 📈 Calcolo Prezzi
- Inserimento **Prezzo Lordo**, **Sconto %**, **Margine MC %**, **Costi di Trasporto** e **Installazione**.
- **Calcolo Prezzo Netto**: 
  ```math
  Prezzo Netto = Prezzo Lordo - (Prezzo Lordo * Sconto %)

	•	Calcolo Prezzo con Margine:

Prezzo con Margine = Prezzo Netto / (1 - Margine % / 100)


	•	Totale IVA esclusa = Prezzo con Margine + Trasporto + Installazione
	•	Maggiorazione rispetto al netto = ((Totale - Prezzo Netto) / Prezzo Netto) * 100

⭐ Simulatore Canone di Noleggio
	•	Inserisci l’Importo e seleziona la Durata tra 12, 18, 24, 36, 48, 60 mesi.
	•	Calcolo automatico della Rata Mensile usando coefficienti predefiniti.
	•	Spese di Contratto calcolate in base all’importo.
	•	Costo Giornaliero e Orario calcolato dividendo la rata mensile rispettivamente per 22 giorni lavorativi e 8 ore/giorno.

🎨 Modalità Scura
	•	Attivabile con il pulsante 🌙 Modalità Scura.
	•	Lo stato della modalità viene memorizzato nel localStorage.

🌍 Installazione come App
	•	Grazie al Manifest JSON, la PWA può essere installata su smartphone e PC.
	•	Service Worker abilitato per supporto offline.

🔧 Installazione e Uso

1️⃣ Clona il repository

git clone https://github.com/tuo-utente/easyprice.git
cd easyprice

2️⃣ Avvia un server locale (opzionale per test)

npx http-server .

3️⃣ Apri nel browser
	•	Apri index.html in un browser compatibile con PWA (Chrome, Edge, Firefox, Safari).
	•	Per installare la PWA, seleziona “Aggiungi alla schermata Home”.

✨ Contribuisci

Se vuoi migliorare questa PWA, apri una pull request o segnala un problema nella sezione Issues.

🎉 Licenza

Questo progetto è distribuito sotto licenza MIT.

Ora puoi copiare e incollare direttamente il file `README.md` nel tuo repository su GitHub! 🚀
