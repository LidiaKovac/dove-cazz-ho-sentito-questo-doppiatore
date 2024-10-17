# DOVE C\*ZZO HO SENTITO QUESTO DOPPIATORE? 🎙️🤔

## 🚧 Status del Progetto:
Il progetto è ancora in fase di sviluppo, ma puoi già provarlo qui: [🔗 Prova la Web App](https://dovehosentitoquestodoppiatore.netlify.app).

[🫧 UPDATE 17/10] Al momento il background worker e' spento, per cui i dati sono obsoleti di qualche settimana. L'app rimane comunque funzionante in quanto l' API e il worker sono due servizi separati.
### 🫧 Struttura: 

Il progetto si sviluppa in tre parti principali: 

- **Background worker:** applicazione NodeJS che effettua lo scraping dei dati. Repo privata, ma video esplicativo disponibile [qui](https://youtube.com/playlist?list=PL8sPO0ZGGI9Ktw0Yn_YM6Dg8rPFNcPxZa&si=HxTdQojqYwJIimxV). 
  - [x]  Scraping da Wikipedia
  - [ ]  Refactor per utilizzare l'API di Wikipedia, come consigliato da Wikipedia stessa
  - [ ] Scraping da [antoniogenna.net](https://www.antoniogenna.net/doppiaggio/) per informazioni aggiuntive.

- **L'API:** applicazione Spring Web che gestisce il database MongoDB e lo rende disponibile al frontend. La parte relativa alle aggregazione e' spiegata (senza entrare troppo nel dettaglio e nei tecnicismi) [qui](https://youtube.com/playlist?list=PL8sPO0ZGGI9Ktw0Yn_YM6Dg8rPFNcPxZa&si=HxTdQojqYwJIimxV). 
  - [ ] Gestione della cache 
  - [ ] Ottimizzazione delle response e delle query

- **Il servizio per l'import Trakt:** servizio NodeJS che gestisce l'import da Trakt tramite lo scraping della pagina profilo.

- **Il frontend:** scritto in Angular, utilizza SASS e Typescript (We 💖 Typescript Here). 
Comunica solo con l'API principale, che gestisce la comunicazione con gli altri servizi.
  Il progetto non e' in alcun modo completo ma e' disponibile a [questo link](https://dovehosentitoquestodoppiatore.netlify.app) per il testing. 
  Per la parte di design ho utilizzato Figma e ho chiesto un feedback alla community Web Design di Reddit, ricevendo consigli utili che hanno poi portato al design attuale. 
  In trasparenza i vecchi design e la versione senza colori.
![](https://i.imgur.com/BtGmDpL.png)
![](https://i.imgur.com/XewbTR6.png)

## 🔍 Scopri Dove Hai Sentito un Doppiatore:
Hai mai guardato un film o una serie e ti sei chiesto: "Ma dove ho già sentito questa voce?!" 😵 Questa Web App ti aiuta a risolvere il mistero! Puoi cercare i lavori in comune tra due doppiatori e, se ti registri, scoprirai se i doppiatori di quello che stai guardando hanno lavorato anche in altre opere della tua watchlist.

## 📥 Importa la Tua Watchlist:
Hai una lista infinita di film e serie da Letterboxd o Trakt? Nessun problema! Puoi importarla direttamente e vedere se ci sono doppiatori in comune tra ciò che hai già visto e altre opere. Tutti i dati sui doppiatori sono raccolti tramite scraping giornaliero da Wikipedia (mentre i personaggi e i lavori vengono aggiornati settimanalmente).

## 💻 Segui lo Sviluppo:
Sto creando una serie di video non tecnici dove racconto l'avventura dietro lo sviluppo di quest'app. Dai un'occhiata alla playlist su YouTube qui: 

[🎥 Playlist YouTube](https://youtube.com/playlist?list=PL8sPO0ZGGI9Ktw0Yn_YM6Dg8rPFNcPxZa&si=HxTdQojqYwJIimxV)

Divertiti a scoprire il mondo del doppiaggio e a risolvere tutti i tuoi "Dove ho già sentito questa voce?!"! 😎
