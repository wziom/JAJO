# Generator plansz do gry platformowej
#### Spis treści
1. Wstęp
2. Cel projektu
3. Technologia
4. Projekt systemu
5. Dane wejściowe
6. Architektura
    1. GrammarEntity
    2. Grammar
    3. CodeBuilder
7. Sposób rozbudowy projektu
8. Propozycje rozbudowy projektu
9. Słowniczek


#### Wstęp
Niniejszy dokument zawiera opis, działanie i zasady użytkowania prostego programu interpretującego tekst napisany w języku polskim. Na podstawie słów, składających się na zdania zgodne ze zdefiniowaną gramatyką, program tworzy planszę do prostej gry platformowej opartej o silnik Clarity (opensource). Przy pomocy kilku zdań użytkownik może samodzielnie wygenerować prostą planszę, po której może skakać piłeczką.
#### Cel projektu
Celem projektu jest zrealizowanie aplikacji budującej dwuwymiarową planszę na podstawie tekstu napisanego w języku naturalnym. Dzięki temu użytkownik może tworzyć swoje wymarzone mapy bez konieczności znajomości języków programowania.
#### Technologia
Ze względu na łatwość użycia z silnikiem Clarity, szybkość działania poleceń po stronie użytkownika oraz możliwością używania na wielu platformach, zastosowano język JavaScript, przy wsparciu HTML, CSS, oraz bibliotek Bootstrap i JQuery.
#### Projekt systemu
##### Organizacja działania:
1. Zdania są wprowadzane do pola tekstowego.
2. Po wciśnięciu klawisza Enter, interpreter pobiera tekst.
3. Sprawdza zgodności z zaimplementowaną gramatyką.
3. W przypadku poprawnej walidacji:
    1. W oparciu o dane z interpretera, zostaje utworzona macierz planszy.
    2. Macierz zostaje przekazana do obiektu klasy Clarity, a gra przeładowana
4. W przypadku niepoprawnej walidacji:
    1. Użytkownik zostaje poinformowany o tym, że tekst został napisany niezgodnie z zasadami zaimplementowanej gramatyki. 
    2. Zostaje wyświetlony tekst wpisany przez użytkownika.
    3. Zostaje wyświetlony fragment tekstu, który spełnił zasady gramatyki.

#### Dane wejściowe
Daną wejściową jest tekst napisany w języku polskim, ze znakami diakrytycznymi. Znaki interpunkcyjne nie są wymagane. Ważne, by zacząć zdanie wielką literą. Zdanie musi być zgodne z regułami gramatyki nieregularnej, bezkontekstowej przedstawionymi w kodzie, w komentarzu, w pliku grammar.js:
``` G => S
 S => A
 S => ABC
 A => KMRC
 K => k
 K => kZ
 Z => z
 M => m
 R => NrN (???)
 N => n
 B => DE
 B => FG
 E => e
 D => d
 F => f
 G => G
 C => HI
 C => HIC
 C => HIJL
 C => HIJLC
 H => h
 I => i
 J => j
 L => l

 // gdzie…
 // A – Początek zdania
 // K - create
 // Z - conjunction
 // M - subject
 // R - size
 // N - size number
 // B - sentence follows
 // C - map description
 // H - element size
 // I - element type
 // J - element horizontal placement
 // L - element vertical placement
```
#### Architektura
System składa się z trzech klas, z których dwie służą do definiowania gramatyki i walidacji poprawności zdania, i jednej, która w oparciu o dane z dwóch poprzednich buduje macierz planszy.
##### GrammarEntity
Klasa GrammarEntity, odpowiada temu, co w regułach gramatyki reprezentuje symbol terminalny. Dodatkowo, każda Encja przetrzymuje informacje na temat relacji, jakie może mieć z innymi, sobie podobnymi obiektami. Umożliwiając wyszczególnienie kolejności i konieczności sprawdzania tychże. Co ważne, to w Encji odbywa się walidacja poprawności wprowadzonego tekstu. Tam jest metoda, która najpierw sprawdza, czy jeszcze niezwalidowany fragment tekstu zaczyna się od ciągu znaków bieżącej Encji. Jeśli tak, w następnym kroku wywołuje metody walidacyjne opcjonalnych Encji, które mają być sprawdzane przed Encjami głównymi. Później, kolejno sprawdza Encje główne, Encje główne unikalne, Encje opcjonalne, unikalne, sprawdzane po encjach głównych, oraz Encje opcjonalne sprawdzane po Encjach głównych.
<br /><br />Relacja pomiędzy dwiema encjami, poza obiektem Encji zawiera też znaczenie Encji, do której prowadzi. W wypadku udanej walidacji, znaczenie to, wraz ze zwalidowanym słowem, zostaje zapisane by później zostać użyte podczas budowania planszy.
##### Grammar
Klasa Grammar jest klasą definiującą gramatykę interpretera. To w niej tworzą Encje i to w niej definiują się relacji. Jest ona również inicjatorem walidacji Encji, które sąwalidowane w oparciu o relacje zdefiniowane właśnie w tej klasie.
##### CodeBuilder
Klasa CodeBuilder, a dokładniej rzecz ujmując, metoda getMapMatrix odpowiada za tworzenie macierzy planszy na podstawie danych powstałych podczas walidacji poprawności tekstu. To tutaj znajduje się logika, która sprawia, że wcześniej wpisane słowa „platforma”, „ściana”, „kładka”, oraz rozmiary planszy, zamieniają się w kreski i obszary na ekranie użytkownika.

#### Sposób rozbudowy projektu
System może być używany nie tylko do gier platformowych. To jak ma wyglądać końcowa plansza jest napisane w klasie CodeBuilder, która na dzień dzisiejszy zawiera tylko 250 linii. Zmiana kodu tej klasy na inny, na przykład tworzący macierz trójwymiarową, lub plik wsadowy do jakiegoś programu graficznego, powinna być dziecinnie prosta.
<br /><br />Rozszerzenie Encji o kolejne synonimy, lub dodatkowe słowa, wraz z delikatną refaktoryzacją kodu klasy CodeBuilder, umożliwią tworzenie nowych elementów planszy. Już nie tylko platform i ścian, ale i schodów, płapek itp.
#### Propozycje rozbudowy projektu
„Stwórz mi zamek pośród lasu na niewysokim wzgórzu. Obok zamku niechaj ciągną się stajnie, a pod zamkiem gęsty labirynt ciasnych tuneli.” - tak w przyszłości można by zastosować interpreter, którego wczesna wersja Alfa dostępna jest już dziś pod adresem https://wziom.github.io/JAiO/, a kod źródłowy tutaj: https://github.com/wziom/JAiO.
<br /><br />Silnik Clarity posiada zdefiniowane pola śmierci, których kontakt z piłeczką skutkuje przegraną. Można nauczyć interpreter lub CodeBuilder tworzenia takich i innych pól, jak na przykład pola wody, trampoliny, czy mety.
#### Słowniczek
- Encja:
Obiekt klasy GrammarEntity
- Encja główna:
Encja, której niepoprawna walidacja zwraca błąd niepoprawnej walidacji i informuje użytkownika, o niepoprawnej strukturze wprowadzonego tekstu.
- Encje unikalna:
Encje, spośród których tylko jedna może zostać zwalidowana poprawnie. Jeśli jedna z takich Encji zostanie zwalidowana, pozostałe nie zostaną nawet poddane próbie walidacji.
- Encje opcjonalne:
Encje, których niepoprawna walidacja nie ma wpływu na dalszy przebieg sprawdzania poprawności wpisanego tekstu.
