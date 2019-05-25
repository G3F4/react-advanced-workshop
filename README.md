# warsawjs-workshop-32-book-it
Workshop repo for purpose of WarsawJS workshop#32

## Etap 0 - Przygotownie

* sklonuj repozytorium
* zmień branch na `etap-0`
* zainstaluj zależności
* odpal aplikację

## Etap 1 - Reconciliation

[Czym jest rekosillllcoooś tam?](https://reactjs.org/docs/reconciliation.html)

* wydzielenie komponentów
  * struktura folderów komponentów
    * wspólne komponenty
    * layout
    * widoki/stany
    * uwaga: nazwy komponentów warto nazywać biznesowo a nie technicznie
  * wydzielenie nagłówka aplikacji jako części `layout`
  * wydzielenie listy oraz szczegółów do osobnych komponentów (widoki/stany)
    * uwaga: funckje przekazywane jako propsy warto nazwać z prefixem `on`, np: `onSearch`
    * uwaga: pobieranie danych przenieść na poziom tych komponentów
      * przykład komponentu `App` po przeniesieniu listy i szczegółów
      ```javascript
      <div className="App">
        <Header />
        {detailsId ? (
          <AccommodationDetails
            detailsId={detailsId}
            onBackToList={this.handleBackToList}
          />
        ) : (
          <AccommodationList
            onDetails={this.handleDetails}
          />
        )}
      </div>
      ```
  * wydzielenie powtarzalnych części JSX do reużywalnych komponentów
    * uwaga: podobnie wyglądające części apkikacji to np: cena, rating czy przycisk udostępniania
* dodatkowo: otypowanie propsów przy wykorzystaniu `prop-types`
  * [README](https://www.npmjs.com/package/prop-types)
* dodatkowo: wykorzystanie dynamicznego wybierania typu do powiązania enumów do komponentów (np. rodzaj `facility` na odpowiednią ikonę)
  * [docs](https://reactjs.org/docs/jsx-in-depth.html#choosing-the-type-at-runtime)


## Etap 2 - Hooks

* wydzielenie logiki pobierania szczegółów do osobnego komponentu funkcyjnego
* użycie `useReducer` jako zamiennik `Redux`
  * [docs](https://reactjs.org/docs/hooks-reference.html#usereducer)
  * do hooka `useReducer` przekazać: reducer oraz stan inicjalny
  * hook zwraca tablicę z 2 elementami, pierwszy to stan reducera `state` a drugi to funkcja do wykonywania akcji `dispatch`
  * implementacja reducera do pobierania szczegółów
    * reducer to funkcja, która jako argumenty dostaje stan i akcje
      * przykład stanu reducera
        ```javascript
        {
          data: null,
          fetching: true,
          errors: null,
        }
        ```
      * przykład wykonania akcji:
        ```javascript
        dispatch({ type: 'DETAILS_FETCH_SUCCESS', payload: data });
        ```
    * potrzebne są 3 akcje: rozpoczęcia pobierania, sukcesu oraz błędu
      * DETAILS_FETCH_REQUEST
      * DETAILS_FETCH_SUCCESS
      * DETAILS_FETCH_FAILURE
* użycie `useEffect` jako alternatywa cyklu komponentu klasowego
  * hook przyjmuje 2 argumenty: efekt - funkcja, która wykona się za każdym razem gdy zmienią się zależności, które są drugim argumentem w postaci tablicy. Jeśli jakikolwiek z elementów tablicy zależności się zmieni, wtedy efekt wykona się ponownie.
    * uwaga: funkcja efektu nie może być funkcją asynchroniczną
  * w scope efektu implementujemy asynchroniczną funkcję pobierającą dane
  * a następnie wywołujemy ją
  * jako zależność efektu przekazujemy identyfikator szczegółów do pobrania


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
