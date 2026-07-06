INSTALLAZIOEN REACT typescript

yarn create react-app NOME_APP --template typescript

entra nella cartella
ls
cd

yarn add --dev eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-react eslint-plugin-jest prettier globals @eslint/js @eslint/compat eslint-plugin-react typescript-eslint eslint-config-react-app

yarn init @eslint/config@latest
(continau con invio)

quando manca eslint.config.mjs crealo allo stesso livello del package.json

import js from "@eslint/js";
import globals from "globals";
import parser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import jestPlugin from "eslint-plugin-jest";

export default [
js.configs.recommended,
eslintConfigPrettier,
jestPlugin.configs["flat/recommended"],
{
files: ["src/**/*.{ts,tsx,cts,mts}"],
languageOptions: {
ecmaVersion: "latest",
sourceType: "module",
globals: {
...globals.browser,
process: "readable",
},
parser: parser,
parserOptions: {
ecmaFeatures: {
jsx: true,
},
},
},
plugins: {
["prettier"]: prettierPlugin,
["@typescript-eslint"]: tseslint.plugin,
["react"]: reactPlugin,
["jest"]: jestPlugin,
},
rules: {
quotes: 2,
"no-unused-vars": "off",
"@typescript-eslint/no-unused-vars": ["error"],
"no-shadow": "off",
"no-console": "error",
"react/no-unescaped-entities": "off",
"@typescript-eslint/no-explicit-any": "error",
"@typescript-eslint/explicit-module-boundary-types": "off",
...jestPlugin.configs["flat/recommended"].rules,
"jest/prefer-expect-assertions": "off",
"prettier/prettier": [
"error",
{
endOfLine: "auto",
},
],
},
settings: {
react: {
version: "detect",
},
},
},
];

yarn add react-router-dom

in index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
document.getElementById("root") as HTMLElement,
);
root.render(
<React.StrictMode>
<BrowserRouter>
<App />
</BrowserRouter>
</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

app.tsx
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";

export const App = () => {
return (
<>
{/_ <COMPONENTE_SEMPRE_VISIBILE /> _/}
<Routes>
<Route path="/" element={<div>landing</div>} />
<Route path="/home" element={<div>landing</div>} />
<Route path="/page/new" element={<div>landing</div>} />
</Routes>
</>
);
};

---

// .tsx se devo ritornare codice jsx
// .ts se NON devo ritornare codice jsx

// metti qui i tipi che usi per le chiamate backend (apiTypes)

// metti qui i tipi che usi in modo generico nell'applicazione(apPTypes)

-1Qualsisai dato utilizzo nell'appricazione con TS DEVE essere tipizzato
-evita errori, è una sicurezza addizionale

2-  
-QUESTI sono esempi di rari casi in cui posso non specificare il tipo. SOLO se sis tratta di: STRINGHE NUMERO O BOOLEANO-
const pippo = "sono una stringa";
const pluto = false;
const paperino = 1;

-in questo caso potrebbe essere necessario specificare il tipo
ERRORE:
const paperone = [
"sono una stringa 1",
"sono una stringa 2",
]
CORRETTO:
const paperone: string[] = [
"sono una stringa 1",
"sono una stringa 2",
]

-per specificare cosa contiene l'array, devo scrivere a sx il tipo contenuto
const paperone: string[] = [
"sono una stringa 1",
"sono una stringa 2",
]

3- FUNZIONI

quando ho una funzione che si aspetta parametri in entrata, devo specificare il tipo

const parametroProva = (parametro: string) => {
console.log(parametro);
};

se ci si apeettano più parametri, dopo il primo parametro metto la virgoal e specifico il secondo parametro

const parametroProva = (parametro: string, pippo: string, fico: string) => {
console.log(parametro, pippo, fico);
};

4- USESTATE

SE HO : STRINGHE NUMERO O BOOLEANO, posso non specificare il tipo.

const [anna, setAnno] = useState<QUI SI SPECIFICA IL TIPO>(null);

const [riccardo, setRiccardo] = useState("");

const [anna, setAnno] = useState<string | null>(null);

const [pierinio, setPierinio] = useState<string[]>([]);

5- COMPONENTI

ERRORE!!
export const Fico = ({pippo: string}) => {
return;
}

CORRETTO

(type è una keyword di typescript, vederemo più avanti)
type FicoProps = {
pippo: string;
pluto: number;
}

export const Fico = ({pippo, pluto}: FicoProps) => {
return;
}

6- FUNZIONE
type FicoProps = {
pippo: string;
pluto: number;

-void non ritorna del codice-
-Se ho dei parametri, DEVONO essere specificati-
funzioneProva: (x: string, y: string) => void;
}

export const Fico = ({pippo, pluto, funzioneProva}: FicoProps) => {
return;
}

7-
Costruzione tipi per volumi di dati grossi

si crea un tipo a parte con i dati dei componenti:

type OggettoRobeType = {
nome: string;
booleano: boolean;
numero: number;
}

ArrayOggettoType definisce 1 oggetto che è contentuo dentro ArrayOggetto

type ArrayOggettoType = {
frutto: string;
auto: string;
oggettoRobe: OggettoRobeType;
}

VEDI MOLTO BENE QUESTA COSA.
const arrayOggetto: ArrayOggettoType[] = [
{
frutto: "kiwi",
auto: "audi",
oggettoRobe: {
nome: "franco",
booleano: false,
numero: 1
}
}
]

-------------------- https://json-generator.com/ -----------------------------------

8-

Oltre al type ho altri 2 elmenti su cui andare a costruire:
interface -> Simile ad type
enum

//TIPO
type ArrayOggettoType = {
frutto: string;
auto: string;
oggettoRobe: OggettoRobeType;
}

//INTERFACE
Al momento solo differenza sintattica, cambia un uguale
nel concreto la differenza è che al type affido delle props, nella interface li utilizzo se voglio andare a combinare più interface insieme
e cioè: mettiamo di avere un json con 36 chiavi, se ho un'altra response con 1 chiave addizionale, posso usare un interface che copre le 35 chiavi, e una seconda interface che copre la chiave addizionale.

interface ArrayOggettoType {
frutto: string;
auto: string;
oggettoRobe: OggettoRobeType;
}

interface ArrayOggettoTypeTwo {
frutto: string;
auto: string;
nome: string;
oggettoRobe: OggettoRobeType;
}

ArrayOggettoTypeTwo estendendo ArrayOggettoType eredita tutte le chiavi e ci aggiunge la sua. FUNZIONA SOLO CON LE INTERFACE NON CON I TYPE

interface ArrayOggettoTypeTwo extends ArrayOggettoType {
nome: string;
}

Consiglio:
USA:
Api Type -> interface
type props e componenti -> type

ORA COME TOGLIAMO UN PARAMETRO?
--------dovrebbe funzioanare solo con i type, verifica-------
Omit<NOMETYPODIRIFERIMENTO, "QuiInserisciIlnomeDelParametroDaRimuovereTraVirgolette">
Omit<NOMETYPODIRIFERIMENTO, "QuiInserisciIlnomeDelParametroDaRimuovereTraVirgolette" | <- l'or permette di togliere più parametri "QuiInserisciIlnomeDelParametroDaRimuovereTraVirgolette">

type NomeDiEsempio = Omit<ArrayOggettoType, "frutto" | "auto">

possiamo combinare un aggiunta e una rimozione:

interface NomeDiEsempio2 extends Omit<ArrayOggettoType, "frutto"> {
nome: string;
}

9- enum

Sotto, un enum che contiene 2 valori, IT ed EN.
Gli enum li puoi utilizzare ogni qualvolta sai che in un punto dell'applicazione ti serviranno dei vaolri specifici he saranno solo quelli.
ES: se sai che l'applicazione è solo in italiano o inglese inserisci quelle lingue.

enum LanguageEnum {
IT = "it",
EN = "en",
}
lingua: string; -> qui mi aspeto come valore "it", "en","pt","jp"etcetc...
lingua: LanguageEnum; -> qui mi aspeto come valore SOLO "it" o "en"

type Response {
lingua: LanguageEnum;
frutto: string;
auto: string;
oggettoRobe: OggettoRobeType;
}

10-
per creare una app Multi pagina utilizzo react Router Dom ---------------(verifica)---------------
CAMBIA SPESSO COME FUNZIONA AD OGNI MAJOR release
senza router dom sarei obbligato ad avere una pagina singola
posso specificare path diersi per l'app ( come fosse unn sito web)
La diferenza app react-sito web sta nel: quando passi ad una ltro url sulla pagina web refreschi completamente l'app e tuttto ciò che comporta (chiamate api, link etc...
e hai cambiato url. ) Con react router dom stais olo aggiungendo parametri sull'url. Tiene monitorato l'url e in base alla route mostra un componetne invece di un altro.

-----(RICORDA DI VEDERE COME USARE DUE TiPI DIVERSI PER LE RESPONSE)----------------

index.tsx

1 import React from "react";
//Questo dovrà essere messo nella mia applicazione. Usando il browser router farò un innesto di componenti per usare reactrouterdom nella mia applicazione
2 import ReactDOM from "react-dom/client";
3 import { BrowserRouter } from "react-router-dom";
4 import { App } from "./App";
5
6 const root = ReactDOM.createRoot(
7 document.getElementById("root") as HTMLElement
8 );
9 root.render(

----------------------BrowserRouter è IMPORTANTE che avvolga App dentro index.tsx--------------

10 <BrowserRouter>
11 <App />
12 </BrowserRouter>
13 );

Di browser router esistono 3 tipi:
1-Gestione normale URl
2-hash router, cambia solo
3-

le routes hanno come padre di tutto Browserrouter. dentro al browser touter routes, e li dentro le route
Importa OUTLET da react routre dom e li metti il contenuto.
Verifica il defoult delle route, come utilizzarlo

???Inserire un componente prima delle <route></route>???? DA VEDERE ANCORA
Puoi utilizzareil sistema dell'<Outlet></Outlet>, macrocontenitore che ha un contenuto in comune con la pagina e vadoa cambiare solo la posizione in cui vado a prendere l'app come se fosse il children

ES:

<Routes>
        <Route path="*" element={<Navigate to="/ciccio" replace />} />
        <Route path={AppPaths.LOGIN} element={<Login />}>
          <Route index element={<LoginForm />} />
          <Route path={AppPaths.REGISTER} element={<RegisterForm />} />
          <Route path={AppPaths.FORGOT} element={<ForgotPassword />} />
        </Route>
        <Route element={<PageFormatter />}>
          <Route path={AppPaths.HOME} element={<Home />} />
        </Route>
      </Routes>

      <div className={styles.login}>
      <CardComponent variant="big" customClass={styles.CardDimensions}>
        <div className={styles.loginContainer}>
          <div className={styles.logo}>
            <img src={Logo} alt="Logo" />
          </div>
          <LoginFormContext.Provider
            value={{ onFormStateChange: handleFormStateChange }}
          >
            <Outlet />
          </LoginFormContext.Provider>
        </div>
        <button className={buttonClass} onClick={onSubmit}>
          {label}
        </button>
        <div className={styles.footerLink}>
          {footerText} <span onClick={footerLink}>{footerTextLink}</span>
        </div>
      </CardComponent>
    </div>

LOGIN: "/login" as const,
REGISTER: "/login/register" as const,
FORGOT: "/login/forgot-password" as const,

vedi come fare le route singole. vedi come navighi, metti un bottone che ti manda su una route diversa, vedi come funzionano i path.

Route è un modulo che è un ascotlatore delle url del browser.
1- il tipo più comune è il Browserrouter, usa Api history e mantiene l'interfaccia sincroinzzta con le url
2- hash router

react touter fa parte di react router dom

        <BrowserRouter>
        <Routes>
          <Route path="/contatti" element={<h1>SEZIONE CONTATTI</h1>}></Route>
        </Routes>
        </BrowserRouter>






        <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to="/">HOME</Link>
              </li>

              <li>
                <Link to="/contatti">CONTATTI</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contatti" element={<ContactSection />} />
          </Routes>
        </BrowserRouter>

Cos'è redux: Redux è un database esterno all'applicazione (staccato dall'applicazione)
Questo consetne a redux di gaurdare l'app in qualsiasi punto. all'interno dell'app puoi vedere solo dove sei tu. può leggere i dati in qualsiasi punto
Es:: passare una prop da un padre a un figlio 10 figli sotto.
storandolo in redux posso importare il valore all'ultimo figlio direttamnete, saltanod il passaggio padre figlio, figlio, figlio, figlio... edc
POSSO RICHIAMRE IL DATO IN QUASLASI PARTE DELL'APPLICAZIONE

pensa alle actions un po' come uno useState. Lo state è la mia variabile e la action è la funzione che consete di scrivere questo valore

import { addCity } from "./actions";
import { useAppDispatch } from "./hook/Store";
const dispatch = useAppDispatch();
onClick={() => dispatch(addCity(citySelected))}

pagina login con applicazione, rcupero pagina, login, stora pagina in redux, vedi se sei lgogato oppoure no





non avevo segnato come creare la cartella store e i suoi componenti, quindi ho usato il tutorial su udemy