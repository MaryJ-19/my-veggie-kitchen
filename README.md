# My Veggie Kitchen

My Veggie Kitchen è una web app realizzata in React per cercare e scoprire ricette vegetariane tramite l'API di Spoonacular. L'applicazione permette all'utente di cercare ricette in modo semplice, visualizzare una preview con titolo e immagine e aprire una pagina dedicata con dettagli completi della ricetta.

## Funzionalità principali

- Barra di ricerca per ricette vegetariane
- Visualizzazione dei risultati con titolo e copertina
- Navigazione tra la home e la pagina dettaglio della ricetta
- Dettaglio completo con:
  - immagine
  - descrizione
  - ingredienti
  - istruzioni
- UI semplice, moderna e responsive
- Struttura dell'app organizzata in componenti, pagine, API client e context

## Stack tecnologico

- React 18
- Vite
- JavaScript
- Bootstrap + React Bootstrap
- React Router DOM
- Axios
- Context API
- Sass

## Requisiti

- Node.js 18+
- npm
- Una chiave API gratuita da Spoonacular

## Installazione

1. Clona il repository:

```bash
git clone https://github.com/mari/my-veggie-kitchen.git
cd my-veggie-kitchen
```

2. Installa le dipendenze:

```bash
npm install
```

3. Crea un file `.env` nella root del progetto e inserisci la tua chiave API Spoonacular:

```bash
VITE_SPOONACULAR_API_KEY=la_tua_chiave_api
```

Puoi anche usare il file `.env.example` come riferimento:

```bash
cp .env.example .env
```

4. Avvia l'applicazione in modalità sviluppo:

```bash
npm run dev
```

5. Apri l'app nel browser all'indirizzo mostrato da Vite (di solito `http://localhost:5173`).

## Struttura del progetto

```text
my-veggie-kitchen/
├── src/
│   ├── api/
│   │   └── spoonacular.js
│   ├── components/
│   │   ├── banner.jsx
│   │   ├── CategoryCarousel.jsx
│   │   ├── navbar.jsx
│   │   └── RecipeCard.jsx
│   ├── context/
│   │   └── RecipeContext.jsx
│   ├── pages/
│   │   ├── RecipeDetail.jsx
│   │   └── Recipes.jsx
│   ├── styles/
│   │   ├── main.scss
│   │   └── variables.scss
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── public/
```

## API e configurazione

L'app usa Spoonacular per cercare ricette vegetariane con i parametri richiesti dall'API. La chiamata è gestita in `src/api/spoonacular.js`.

Importante:
- la chiave API viene letta da `import.meta.env.VITE_SPOONACULAR_API_KEY`
- in produzione è consigliabile non esporre la chiave nel frontend, ma usare un backend/proxy per custodirla in modo sicuro

## Script disponibili

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Note sul progetto

Questo progetto è una base funzionale per un sito dedicato alle ricette vegetariane. Attualmente include:

- ricerca delle ricette
- pagina di dettaglio
- routing
- gestione dello stato con Context API
- risposta UI con Bootstrap

È un buon punto di partenza da cui è possibile espandere il progetto aggiungendo filtri, preferiti, ricette salvate o un backend dedicato.

## Licenza

Questo progetto è stato creato a scopo didattico e di pratica personale.
