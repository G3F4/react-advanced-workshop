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

[Rozwiązanie etapu](https://github.com/G3F4/warsawjs-workshop-32-book-it/compare/etap-0...etap-1?expand=1)

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

[Rozwiązanie etapu](https://github.com/G3F4/warsawjs-workshop-32-book-it/compare/etap-1...etap-2?expand=1)

## Etap 3 - Routing, Code Splitting and lazy loading
[docs](https://reactjs.org/docs/code-splitting.html)

* `react-router-dom` do obsługi routingu aplikacji
  * `Route` widoku listy
  * `Route` widoku szczegółów
  * wykorzystanie `withRouter` do dodania do komponentu propsa `history`,
    * przykład:
      * `export default withRouter(AccommodationList);`
    * props umożliwia zmianę routingu poprzez wywołanie metody push
      * przykład:
        * `this.props.history.push('/');`
* routing na widok szczegółów ustawia parametr `id` w adresie, który zostanie wykorzystany do pobrania danych zamiast przekazywania identyfikator przez propsy
  * do odczytania wartości parametrów w adresie wykorzystamy `tiny-params`
    * [docs](https://www.npmjs.com/package/tiny-params)
    * przykład: 
      * `const { id } = tinyParams(window.location.href);`
* pozbycie się wszystkich powiązań widoków aplikacji do komponentu `App`, nie powinien zawierać stanu ani metod
* zamiana na komponent funkcyjny klasy `App`
* wydzielenie nowych `chunk`ów w routerze przy wykorzystaniu dynamicznych importów oraz `React.lazy`
  * przykład:
    * `const AccommodationList = lazy(() => import('./components/views/accommodation-list/AccommodationList'));`
* obsługa ładowania komponentu przy wykorzystaniu `React.Suspense`
  * przykład:
    ```javascript
    <Suspense fallback={<div>Loading...</div>}>
      ...
    </Suspense>
    ```
[Rozwiązanie etapu](https://github.com/G3F4/warsawjs-workshop-32-book-it/compare/etap-2...etap-3?expand=1)

## Etap 4 - Optymalizacja

* wykorzystanie komponentu `React.PureComponent` do optymalizacji nadmiarowej ilości przerenderowań komponentów klasowych
  * [docs](https://reactjs.org/docs/react-api.html#reactpurecomponent)
* wykorzystanie utila `React.memo` do stworzenia zmemoizowanych komponentów funkcyjnych
  * [docs](https://reactjs.org/docs/react-api.html#reactmemo)
* obsługa błędów przy wykorzystaniu `componentDidCatch`
  * [docs](https://reactjs.org/docs/react-component.html#componentdidcatch)
  * dodanie nowego komponentu wrappującego, który w przypadku przechwycenia błędu ustawia swój stan na błędny i zamiast wyświetlać `children`, wyświetla komunikat błędu
* memoizacja pracochłonnych obliczeń z wykorzystaniem `useMemo`

[Rozwiązanie etapu](https://github.com/G3F4/warsawjs-workshop-32-book-it/compare/etap-3...etap-4?expand=1)
