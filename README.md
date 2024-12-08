# Vue Movie App

En filmapplikation byggd med Vue 3, TypeScript och Tailwind CSS som använder TMDB API för att visa och hantera filmer.

## Teoretiska resonemang

Applikationen är byggd enligt moderna Vue 3-principer med fokus på återanvändbara komponenter och effektiv state management. Composition API används genomgående för bättre TypeScript-integration och mer modulär kodstruktur. Applikationen följer en komponentbaserad arkitektur där varje komponent har ett specifikt ansvarsområde, vilket förbättrar underhållbarheten och testbarheten.

## Hur applikationen fungerar

Applikationen är en Single Page Application (SPA) som interagerar med TMDB's API för att hämta och visa filmdata. När användaren öppnar appen laddas en lista med trendande filmer. Användaren kan:

1. Söka efter filmer via sökfältet i navigeringen
2. Filtrera filmer efter olika kategorier
3. Klicka på en film för att se detaljerad information i en modal
4. Spara filmer som favoriter (sparas i localStorage)
5. Se sina sparade favoriter på en separat sida

Data flödar genom applikationen enligt följande:
1. API-anrop görs för att hämta filmdata
2. Data lagras temporärt i komponenternas state
3. Komponenter renderas baserat på denna data
4. Användarinteraktioner triggar nya API-anrop eller uppdateringar av state

## AI-utveckling

Under utvecklingen av applikationen har AI använts på följande sätt:

1. **Kodgenerering och problemlösning**
   - ChatGPT användes för att generera grundläggande komponentstrukturer
   - AI hjälpte till med TypeScript-typningar och interface-definitioner
   - Problemlösning kring API-integration och felhantering

2. **Optimering och refaktorering**
   - AI assisterade med att identifiera och förbättra prestandaflaskhalsar
   - Hjälp med att refaktorera kod för bättre läsbarhet och underhållbarhet

3. **Styling och UX**
   - Förslag på Tailwind CSS-klasser för responsiv design
   - Rekommendationer för användarupplevelse och tillgänglighet

## Funktionalitet

### Huvudfunktioner
- Visa trendande filmer
- Sök efter specifika filmer
- Filtrera filmer efter kategorier (Top Rated, Upcoming, Popular)
- Spara favoritfilmer lokalt
- Detaljerad filmvisning i modal

### Komponenter

#### Movies.vue
- Huvudkomponent som hanterar filmvisning
- Hämtar filmdata från TMDB API
- Hanterar sökningar och kategorifiltrering
- Visar laddningsindikator under API-anrop

#### MovieCard.vue
- Visar individuella filmkort med poster och grundläggande information
- Hanterar favorit-funktionalitet
- Visar hover-effekt med mer information

#### MovieModal.vue
- Visar detaljerad information om en vald film
- Inkluderar poster, beskrivning, betyg och releasedata
- Kan stängas via kryss-ikon eller klick utanför modalen

#### Navbar.vue
- Navigeringsmeny med sökfunktion
- Kategorival (Top Rated, Upcoming, Popular)
- Länk till favoritsida

#### Favorites.vue
- Visar sparade favoritfilmer
- Hämtar data från localStorage
- Använder samma MovieCard-komponent som huvudvyn

## Teknisk Stack
- Vue 3 med Composition API
- TypeScript för typsäkerhet
- Tailwind CSS för styling
- Axios för API-anrop
- Vue Router för navigation
- TMDB API för filmdata

## Datahantering
- Film-data hämtas från TMDB API
- Favoriter sparas i localStorage
- Sökningar och kategorifilter uppdaterar vyn dynamiskt
