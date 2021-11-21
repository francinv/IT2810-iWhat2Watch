[[_TOC_]]

# Om prosjektet
iWhatTowatch  appversjonen av er en filmdatabase What2Watch(prosjekt 3). Brukeren har mulighet til å se en stor mengde med filmer, i tillegg favorisere dem. Brukeren har også mulighet til å se detaljert informasjon av ønsket film. Videre har brukeren både sorteringsmuligheter og filtreringsmuligheter. Dette vil drøftes og forklares ytterligere i [Innhold og funksjonalitet](#ihf).

![](https://i.imgur.com/Dc5bgYo.jpg)
## <a id="ihf"></a>Innhold og funksjonalitet

- **Presentasjon av filmer:** Filmene er det som har hovedfokus på siden. Basert på liste (hentet fra database) blir filmene vist i et
pent rutenett. Hvert element består av: bilde, tittel, utgivelsesdato, sjanger og favoritt-ikon(kun om bruker er innlogget).

- **Detaljer om film:** Brukeren har mulighet til å lese mer detaljert informasjon om hver film. Dette gjøres ved at brukeren trykker på ønsket film. Det vil da dukke opp en modal, som viser en beskrivelse om filmen. Hvis brukeren er innlogget vil personen kunne se antall personer som har favorisert filmen. 
- **Sortering:** Øverst i høyre hjørne er det en select. Her kan brukeren velge ønsket sorteringsmulighet. Brukeren kan velge mellom: 
    - Tittel (A-Å)
    - Tittel (Å-A)
    - Utgivelsesår (økende)
    - Utgivelsesår (synkende)
- **Filtering:** Brukeren har mulighet til å filtrere basert på utgivelsesår og sjanger. Basert på dette vil visningen av filmene oppdateres. 
- **Søking:** Brukeren har mulighet til å finne en film ved å søke på bestemt film.
- **Innlogging:** Brukeren har mulighet til å logge inn på sin bruker for å favorisere ønskede filmer. Favoriserte filmer vil vises med et hjerte om brukeren logger inn med samme brukernavn igjen. Ut fra favorisering vil dette også vises i detaljer om hver film.


## Prosjektstruktur

Nedenfor ligger mappestrukturen til frontend og backend. I frontend har vi lagt hver komponentgruppe i en egen mappe, samt den essensielle mainpagekomponenten som også henter state i en egen mappe under `src`. I backend har vi kun én mappe som inneholder mongoosemodell for datatypen Movie.

# Frontend

    src
    ├─────── components
    |        ├── favButton
    |        ├── moviedetail
    |        ├── moviesview
    |        ├── navbar
    |        ├── sidebar
    |        ├── sortdropdown
    |        └── userDisplay
    ├─────── graphql
    ├─────── pages
    ├─────── services
    └─────── util

# Backend

    src
    └─────── models

## Backend

Backenden består av en MongoDB-database og en kjørende server som hoster GraphQL-endpointet.

### Graphql

Graphql er brukt som spørrespråk. Sammen med mongoose og Apollo, kan man hente nøyaktig den dataen vi selv har definert. Dette gjøres gjennom schemas som vi selv har definert. Mongoose blir brukt som for å modellere og resolve data som sendes som queries til databasen. Vi bruker Apollo client og Apollo server for å kjøre GraphQL-serveren
og for å hente og sende spørringer til GraphQL-serveren
### Database

Vi har hentet data fra datasett tilgjengelig på [kaggle](https://kaggle.com/datasets/) og tilpasset dataen til vår database. Deretter lastet vi dem opp i en database som ligger på IDI sin VM.

## Frontend
iWhatToWatch bruker React-Native for frontend.
### State management

Vi har valgt å bruke redux toolkit for global state management. Vi har valgt å lagre en stor mengde informasjon i store, slik at komponentene til enhver tid kan være oppdatert på data som er lastet inn. Dette gjør vi også slik at komponentene rendres på riktige tidspunkt med oppdaterte data. Vi bruker selectors for å hente data, og dispatch for å sette data i store. Vi har også brukt lokal react-state der dette er gunstig, når det ikke er behov for andre komponenter å ha tilgang til denne staten. Dette passer bra for en lavskala applikasjon. Redux toolkit har alt redux tilbyr. Redux toolkit er enklere, blant annet fordi man kan definere slicer som fungerer som både reducer og action i ett. Vi har to slices, en som håndterer filmer og filtrering, og en som håndterer brukerdata.

### Komponentvalg
Vi har hovedsaklig brukt komponenter fra React-Native-Papter. Grunnen til at vi valgte dette er fordi den er basert på material design, som er noe vi har i vår opprinnelige nettside(prosjekt 3).


## Dokumentasjon og utvikling
Gjennom prosjektet har gruppen valgt å bruke GitLab flittig. Det har vært fokus på parprogrammering underveis i utviklingen for å forsikre god kodekvalitet til enhver tid. Vi har også hatt fokus på å utvikle komponenter og skrive lesbar kode. Dette har vi også sikret ved å bruke code-review jevnt gjennom utviklingsprosessen. 

Gruppens prosess:
1. Medlem oppretter issue i GitLab: Hver gang man skal starte med en arbeidsoppgave blir det laget en oppgave(issue) som beskriver hva man skal gjøre. Vi har brukt IssueBoard med egne lister slik at resten av teamet har kontroll på hvordan oppgaven ligger an. 
2. Oppretter en branch fra nevnt issue: Hvert medlem lager en ny branch basert på master. Underveis passer medlemmet på at det alltid er oppdatert versjon. Teamet har til enhver tid jobbet i seperate branches. 
3. Commite endringer og referer til issue: For at et annet medlem skal kunne forstå hva det respektive medlemmet har gjort, har det vært høyt fokus på at commit-meldinger skal være beskrivende og referere til riktig issue. 
4. Når oppgaven/issue er fullført: Når oppgavene er løst opprettes en merge request. Når dette er gjort vil de andre gruppemedlemmene se over koden og se at alt fungerer. Om det blir godkjent, blir det merget til master branchen. 
## Kjøre applikasjonen
Under finner du instrukser for hvordan du kjører appen om du ønsker å kjøre denne lokalt på din egen PC.

### Frontend
Gjennom utvikling har vi brukt appen Expo Go(iOS: https://apps.apple.com/us/app/expo-go/id982107779 eller Android: https://play.google.com/store/apps/details?id=host.exp.exponent&hl=no&gl=US). Dette gjør det enklet å kjøre appen på egen telefon. Dersom man ønsker å bruke denne måten, kreves det at man er logget inn på NTNU-vpn med telefonen(https://innsida.ntnu.no/wiki/-/wiki/Norsk/Installere+VPN)
For å kjøre frontend må man:
1. `cd frontend/`
2. `yarn install`
3. `yarn start`
4. Følg instruks i terminalen og velg ønsket måte å kjøre appen på.

**Vi opplever i blant problemer med scrolling på Android. Dette problemet er derimot ikke på iOS. Med Android har vi kun hatt mulighet til å kjøre med en emulator, og ikke gjennom Expo Go ettersom vi ikke har tilgang på en Android telefon. (https://piazza.com/class/ksk8rtnewz56sh?cid=257) **

### Backend
Trenger ikke å starte backend lokalt. Backenden ligger på NTNU server, og dermed holder det å være logget inn på NTNU-vpn.

#### iOS:
![](https://i.imgur.com/aGTuU0r.jpg)


### Android:
![](https://i.imgur.com/GkquT5Y.jpg)





