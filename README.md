# warsawjs-workshop-32-book-it
Workshop repo for purpose of WarsawJS workshop#32

## Etap 0 - Przygotownie

* sklonuj repozytorium
* zmień branch na `etap-0`
* zainstaluj zależności
* odpal aplikację

## Etap 1 - Reconciliation

[docs](https://reactjs.org/docs/reconciliation.html)

* wydzielenie komponentów
  * struktura folderów i podstawowy podział komponentów (wydzielenie widoków, modułów aplikacji)
  * wydzielenie powtarzalnych części JSX do reużywalnych komponentów
  * dodatkowo: otypowanie propsów przy wykorzystaniu `prop-types`
* wykorzystanie dynamicznego wybierania typu do powiązania enumów do komponentów (np. rodzaj `facility` na odpowiednią ikonę)
  * [docs](https://reactjs.org/docs/jsx-in-depth.html#choosing-the-type-at-runtime)


## Etap 2 - Hooks

* zamiana komponetów klasowych odpowiedzialnych za pobieranie danych do funkcji
* użycie `useState` jako zamiennik `state` klasy
* użycie `useEffect` jako alternatywa cyklu komponentu klasowego
* powiązanie stanów do odświeżania danych
* stworzenie customowego hooka do pobierania danych
* wykorzystanie `useReducer` jako alternatywa dla `Redux`


## Etap 3 - Routing, Code Splitting and lazy loading

* `react-router` do obsługi routingu aplikacji
  * routing widoku listy
  * routing widoku szczegółów
* wydzielenie nowych `chunk`ów w routerze przy wykorzystaniu dynamicznych importów(`await import()`)
* wykorzystanie utila `React.lazy` do stworzenia komponetów z lazy loading
* obsługa ładowania komponentu przy wykorzystaniu `React.Suspense`

## Etap 4 - Optymalizacja

* wykorzystanie komponentu `React.Pure` do optymalizacji nadmiarowej ilości przerenderowań
* wykorzystanie utila `React.memo` do stworzenia zmemoizowanych komponentów
* obsługa błędów komponentów przy wykorzystaniu `getDerivedStateFromError` oraz `componentDidCatch`
* memoizacja pracochłonnych obliczeń z wykorzystaniem `useMemo`
* odroczenie wykonania eventu w komponencie z sugestiami (`debaunce`)

## Etap 5 - Extra

* wykorzystanie dekoratorów do dodania stanu ładowaniu komponentów
* własny `HOC`?
* użycie `Context`?
* wykorzystanie `Portal`?
