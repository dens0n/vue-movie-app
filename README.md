# Vue Movie App

En filmapplikation byggd med Vue 3, TypeScript och Tailwind CSS som använder TMDB API för att visa och hantera filmer.

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
