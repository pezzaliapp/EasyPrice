# EasyPrice
Coltellino Svizzero del Venditore
Ecco il file README.md formattato correttamente per GitHub, con intestazioni, codice e dettagli chiari per l’uso della PWA EasyPrice. 🚀

# EasyPrice - PWA per Calcolo Prezzi e Simulazione Noleggio

**EasyPrice** è una Progressive Web App (**PWA**) progettata per calcolare il prezzo netto di un prodotto applicando sconti e margini, e per simulare il canone di noleggio in base alla durata selezionata.

---

## 📌 Tecnologie Utilizzate
- **HTML5** - Struttura della PWA
- **CSS3** - Stile responsive e dark mode
- **JavaScript (JS)** - Logica di calcolo
- **JSON** - Configurazione del manifest PWA
- **Service Worker** - Supporto offline
- **jsPDF** - Generazione di PDF per la stampa e la condivisione

---

## ⚙️ Funzionalità

### 📈 Calcolo Prezzi
✔️ Inserimento di:
   - **Prezzo Lordo (€)**
   - **Sconto (%)**
   - **Margine MC (%)**
   - **Costi di Trasporto (€)**
   - **Costi di Installazione (€)**

✔️ **Calcoli automatici**:
   - **Prezzo Netto**:  
     ```math
     Prezzo Netto = Prezzo Lordo - (Prezzo Lordo * Sconto % / 100)
     ```
   - **Prezzo con Margine**:  
     ```math
     Prezzo con Margine = Prezzo Netto / (1 - Margine % / 100)
     ```
   - **Totale IVA esclusa**:  
     ```
     Totale = Prezzo con Margine + Trasporto + Installazione
     ```
   - **Maggiorazione rispetto al netto**:  
     ```
     Maggiorazione (%) = ((Totale - Prezzo Netto) / Prezzo Netto) * 100
     ```

---

### ⭐ Simulatore Canone di Noleggio
✔️ **Inserimento manuale o importazione automatica** dell'importo dal calcolo precedente  
✔️ **Formati supportati**:  
   - **3.000€**, **3000€**, **3.000,66€**, **3000,66€**  
✔️ **Durate selezionabili**:  
   - **12, 18, 24, 36, 48, 60 mesi**  
✔️ **Calcoli automatici**:
   - **Rata Mensile** (usando coefficienti predefiniti)
   - **Spese di Contratto** (calcolate in base all'importo)
   - **Costo Giornaliero** (rata mensile / 22 giorni)
   - **Costo Orario** (costo giornaliero / 8 ore)
✔️ **Parsing avanzato degli importi** per interpretare correttamente numeri con **punti** e **virgole**  
✔️ **Backup automatico dei dati** per evitare la perdita delle informazioni  

---

### 📝 Generazione PDF e Invio WhatsApp
✔️ **Genera PDF** con e senza la simulazione di noleggio  
✔️ **Formato professionale del PDF** per stampa o condivisione  
✔️ **Invia il PDF direttamente su WhatsApp** con un solo click  

---

### 🎨 Modalità Scura
✔️ Attivabile con il pulsante **🌙 Modalità Scura**  
✔️ Memorizzata automaticamente con **localStorage**  

---

### 🌍 Installazione come App
✔️ **Manifest JSON** permette di installare la PWA su **Android e PC**  
✔️ **Service Worker** garantisce il **funzionamento offline**  

---

## 🛠️ Installazione e Uso

### 🔹 1️⃣ Clona il repository
```bash
git clone https://github.com/tuo-utente/easyprice.git
cd easyprice

🔹 2️⃣ Avvia un server locale (opzionale per test)

npx http-server .

🔹 3️⃣ Apri nel browser
	•	Apri index.html in un browser compatibile con PWA (Chrome, Edge, Firefox, Safari).
	•	Per installare la PWA, seleziona “Aggiungi alla schermata Home”.

🤝 Contribuisci

Se vuoi migliorare questa PWA:
	1.	Apri una pull request con la tua modifica
	2.	Segnala un problema nella sezione Issues

📜 Licenza

Questo progetto è distribuito sotto licenza MIT.

🎯 EasyPrice: Calcoli rapidi, precisi e ovunque tu sia! 🚀

---

### ✅ **Modifiche e miglioramenti rispetto alla versione precedente**:
- **Formattazione migliorata** per una leggibilità ottimale su **GitHub**.
- **Aggiunti emoji e icone** per una visualizzazione più chiara.
- **Sezioni separate e dettagliate** per ogni funzione della PWA.
- **Esempi di calcolo formattati in blocchi di codice**.
- **Link per clonare e avviare il progetto**, pronto per chi vuole testarlo o modificarlo.

---

🔹 **Ora puoi copiare e incollare direttamente questo `README.md` nel tuo repository su GitHub!** 🚀
