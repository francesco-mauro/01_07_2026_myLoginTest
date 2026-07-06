# 📖 Documentazione Progetto: React TypeScript Auth Flow

Questo documento illustra l'architettura, le tecnologie e le logiche alla base dell'applicazione di autenticazione. È strutturato per fornire una panoramica chiara del funzionamento del codice e spiegare le scelte tecniche adottate.

---

## 1. Panoramica del Progetto

L'applicazione è una Single Page Application (SPA) dedicata alla gestione del flusso di accesso utente. Simula un ambiente di produzione reale con un'interfaccia reattiva e pulita. Si compone di tre schermate principali:
* **Login (`/login`):** Per l'accesso degli utenti esistenti.
* **Registrazione (`/register`):** Per la creazione di nuovi account con validazione della password.
* **Recupero Password (`/forgot-password`):** Per la richiesta di ripristino delle credenziali.

---

## 2. Stack Tecnologico: Scelte e Motivazioni

Di seguito le tecnologie utilizzate e il "perché" sono state preferite rispetto ad altre alternative:

* **React:** Libreria principale per la costruzione dell'interfaccia tramite componenti riutilizzabili.
* **TypeScript:** Aggiunge la tipizzazione statica a JavaScript. 
  * *Perché?* Permette di intercettare gli errori in fase di scrittura del codice (compile-time) anziché durante l'esecuzione (run-time), rendendo il codice più robusto, autodocumentato e facile da manutenere in team.
* **Vite:** Strumento di build e server di sviluppo.
  * *Perché?* A differenza del vecchio `Create React App` (basato su Webpack), Vite sfrutta i moduli ES nativi del browser. Risultato: avvio del server istantaneo e ricaricamento a caldo (HMR) fulmineo.
* **Redux Toolkit (RTK):** Gestione dello stato globale dell'applicazione.
  * *Perché?* Redux standard richiede molto codice ripetitivo (boilerplate). RTK semplifica la creazione dello store tramite gli "slice", raggruppando azioni e riduttori in un unico posto.
* **React Router DOM:** Gestione della navigazione.
  * *Perché?* Essendo una SPA, la pagina web non viene mai ricaricata dal server. React Router intercetta i cambi di URL e renderizza istantaneamente i componenti corretti, offrendo un'esperienza fluida.
* **CSS Modules:** Sistema per la stilizzazione.
  * *Perché?* Crea classi CSS univoche in fase di build (es. `Login_form__xyz`). Questo garantisce che lo stile di un componente non vada mai in conflitto con quello di un altro (niente "side-effects" nel CSS).

---

## 3. Architettura e Struttura delle Cartelle

Il progetto segue una separazione logica rigorosa all'interno della cartella `src`:

| Cartella / File | Scopo |
| :--- | :--- |
| `/components` | Contiene i componenti "Dumb" o "Presentational" (es. `AuthLayout.tsx`). Sono riutilizzabili e si occupano solo dell'aspetto visivo. |
| `/pages` | Contiene i componenti "Smart" (es. `Login.tsx`). Gestiscono lo stato locale, le chiamate a Redux e raggruppano i componenti visivi. |
| `/store` | Contiene la logica globale (`store.ts`) e i moduli di stato (`authSlice.ts`). |
| `App.tsx` | Il centro di smistamento: contiene le regole di routing per mappare gli URL alle rispettive pagine. |
| `main.tsx` | Il punto di ingresso: monta l'app sul DOM HTML e avvolge l'app nei `Provider` (per Redux e il Router). |

---

## 4. Gestione dello Stato (Redux)



Il cuore della gestione dati è in `src/store/authSlice.ts`.
Abbiamo definito un'interfaccia TypeScript per descrivere la "forma" dei nostri dati:

```typescript
interface AuthState {
  isAuthenticated: boolean;
  userEmail: string | null;
}