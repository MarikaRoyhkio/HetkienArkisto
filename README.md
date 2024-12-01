# Ohjelmistokehityksen teknologioita - Seminaarityö

Marika Röyhkiö

Hetkien arkisto – päiväkirjaohjelma TypeScriptillä

TypeScript, ES6, JavaScript, node (+MongoDB)


## Sisällysluettelo

- 1 Tiivistelmä
- 2 Johdanto
- 3 Käytetyt tekniikat
   - 3.1 Tekninen toteutus
      - 3.1.1 Frontend-teknologiat:
      - 3.1.2 Graafit ja datan visualisointi:
      - 3.1.3 Data ja tiedon pysyvyys:
   - 3.2 Miksi nämä teknologiat?
- 4 Loppupohdinta
- Lähteet
- Liitteet


## 1 Tiivistelmä

Tämän seminaarityön tarkoituksena oli rakentaa ohjelma ja sen käyttöliittymä päiväkirjasovelluk-
selle. Ohjelman tarkoituksena on, että käyttäjä voi tehdä merkintöjä ohjelmaan, ja sen kautta tar-
kastella kuukausittain tekemisiensä teemoja ja fiiliksiä. Tehty ohjelmointityö kattoi merkintöjen tal-
lentamisen ja visualisoinnin; ohjelman käyttöliittymä on kalenterimallinen, johon käyttäjä voi tehdä
merkintöjä kuten mihin tahansa kalenteriohjelmaan. Tämä ohjelma vain kerää eri tietoja kuin taval-
linen kalenteri, jonka tarkoituksena on vain muistuttaa käyttäjää tapahtumista.

Kehitykseen käytettiin TypeScriptiä, React-kirjastoa sekä Chart.js-kirjastoa.

Ohjelma laskee jakauman eri teemoille, kuten opiskelulle, työnteolle, vapaa-ajalle ja harrastuksille.
Käyttäjä voi tarpeidensa mukaan lisätä ohjelmaan teemoja, jotka sopivat juuri hänen elämäänsä.
Teemojen lisäksi ohjelma laskee jakauman fiiliksille, joita käyttäjä voi merkintöihinsä lisätä. Näin
käyttäjä pystyy myös jälkikäteen seuraamaan omia fiiliksiään ja elämän sujumista ja mahdollisesti
tarkastelemaan, mikäli omissa tekemisissä olisi jotain, jonka kautta omaa oloa voisi parantaa.

Työn tärkeimpiä tuloksia ovat toimiva käyttöliittymä ja sen visuaaliset komponentit, jotka tukevat
tarkoituksenmukaisesti käyttäjän itseanalyysiä. Näihin sisältyvät erityisesti piirakkakaaviot, jotka
visuaalisesti havainnollistavat käyttäjän merkintöjen kehitystä.


## 2 Johdanto

Tunteiden ja teemojen analysointi voi auttaa käyttäjää ymmärtämään omia käyttäytymismallejaan
ja mahdollistaa niiden muuttamisen, mikäli niistä havainnoi jotain, jonka kokee itselle haitalliseksi.
Itse aktiivisena päiväkirjan kirjoittajana halusin kehittää ohjelman, jonka avulla voin seurailla omia
fiiliksiäni pidemmilläkin aikaväleillä ja saada reaaliaikaista infoa siitä, miten elämä on sujunut. Jos-
kus, etenkin mielenterveyden haasteiden kanssa eläessä, unohtaa helposti ne paremmat hetket.
Halusin, että ohjelma visualisoi fiilikset, joita kuukauden aikana on käyty läpi, ja laittaa perspektii-
viin sen ettei elämä kuitenkaan kokoajan ole ankeaa, vaikka se siltä tuntuu.

Keskeisiä työvaiheita olivat:
− Sovelluksen arkkitehtuurin suunnittelu ja komponenttien määrittely.
− React-pohjaisen käyttöliittymän toteutus ja kaavioiden integrointi Chart.js-kirjastolla.
− Mielenkiintoisen ja helposti silmäiltäväksi suunnitellun tyylin toteuttaminen


## 3 Käytetyt tekniikat

Ohjelma koostuu useista komponenteista , jotka muodostavat interaktiivisen sovelluksen.

### 3.1 Tekninen toteutus

- Kalenterinäkymä (CalendarView): Näyttää päivät ruudukossa ja mahdollistaa merkintöjen
    lisäämisen jokaiselle päivälle. Merkintöihin voi liittää fiiliksiä, teemoja ja kuvia.
- Merkintälomake (AddEntryForm): Lomake, jolla käyttäjä voi lisätä uusia merkintöjä valitulle
    päivälle. Lomake käyttää tilanhallintaa (Reactin useState) syötteiden hallintaan.
- Statistiikka (MoodThemeGraph): Kaaviot (Chart.js-kirjastolla) näyttävät, miten teemoja ja
    fiiliksiä on käytetty.
- Pysyvä datanhallinta: Merkinnät ja teemat tallennetaan selaimen localStorage-tilaan, mikä
    takaa datan säilyvyyden istuntojen välillä.

#### 3.1.1 Frontend-teknologiat:

- React.js: Pääkehys, jolla käyttöliittymä on rakennettu. React tarjoaa tilanhallinnan (useS-
    tate ja useEffect) ja komponenttijärjestelmän.
- TypeScript: Käytetty tyyppien tarkastamiseen ja kehityksen turvallisuuden parantamiseen.
- CSS: Sovelluksen ulkoasun tyylittely. Global.css sisältää tyylit esimerkiksi kalenteriruudu-
    kolle ja lomakkeille.

#### 3.1.2 Graafit ja datan visualisointi:

- Chart.js (React Chart.js 2 -kääreellä): Käytetty piirakkakaavioiden luomiseen, jotka visuali-
    soivat teemojen ja fiilisten esiintymistä merkinnöissä.

#### 3.1.3 Data ja tiedon pysyvyys:

- LocalStorage: Käytetty annetun datan(merkinnät ja teemat) säilyttämiseen istuntojen välillä.
    Tallennus tapahtuu JSON-muodossa.


### 3.2 Miksi nämä teknologiat?

- React.js on moderni ja tehokas kirjasto käyttöliittymien rakentamiseen. Sen komponentti-
    keskeinen arkkitehtuuri mahdollistaa selkeän koodirakenteen ja uudelleenkäytettävät osat.
    React oli myös minulle kehittäjänä entuudestaan tuttu, ja sitä kautta helppo valinta
- TypeScript oli tehtävänannossa. Se oli kuitenkin seminaariaiheista helppo valinta, sillä siitä
    löytyy reilusti dokumentaatiota, ja se sopii hyvin yhteen aiemman osaamiseni kanssa. Ty-
    peScriptillä koodi on helposti luettavaa ja hallittavaa, vaikka kokonaisuus on laajempi.
- Chart.js tarjosi helppokäyttöisen tavan tehdä visuaalisia kaavioita, jotka parantavat käyttä-
    jäkokemusta.
- LocalStorage on kevyt ratkaisu datan säilyttämiseen ilman tarvetta backend-palvelimelle.
    Ohjelma tuntui riittävän laajalta ilman, että siihen olisi lisännyt erillistä tietokantaa


## 4 Loppupohdinta

Lopputulos on hyvin suunnitelmani mukainen ja toimiva. Sain kehitettyä ominaisuudet jotka suun-
nittelin, ja ohjelma toimii ongelmitta. Sain myös kehitettyä miellyttävän näköisen ja loogisen käyttö-
liittymän. Loppupeleissä epäselväksi jäi LocalStoragen toiminta ja se, onko se täysin tarkoituksen-
mukainen. Jatkokehityksenä ohjelman voisi suunnitella jonkinlaisen tietokannan ja kirjautumismah-
dollisuudet käyttäjälle. Ohjelmistoa voisi ajatella jonkinlaisena sosiaalisena mediana, ehkä omia
julkaisujaan voisi jakaa muille käyttäjille.

Projektia toteuttaessani tutustuin tarkemmin TypeScriptiin ja sen ominaisuuksiin. Koen olevani nyt
paljon paremmin perillä sen toiminnasta ja hyödyllisyydestä ohjelmistokehityksessä. Graafeja
suunnitellessani myös tutkin eri vaihtoehtoja niiden toteuttamiseen.

En ole missään vaiheessa opintojani ollut erityisen kiinnostunut frontend-kehityksestä, mutta tämän
tehtävän yhteydessä panostin siihen enemmän. Koen, että onnistuin kehittämään hyvän ja toimi-
van käyttöliittymän, joka sopii tyylillisesti sovelluksen ideaan. Erityisen tyytyväinen olen siihen,
miltä merkintöjen lisäyslomake näyttää(Kuva 2 ). Sekä siihen, että pienen kokeilun jälkeen sain päi-
väkirjamerkintöihin lisätyt kuvat toimimaan kalenteripäivien taustakuvina(Kuva 3 ). Myös graafit on-
nistuivat lopulta todella hyvin(Kuva 1).

Ohjelmiston ideointi lähti omasta harrastuneisuudestani. Ohjelmistprojekti 2 kurssini ei sujunut ai-
van kaikkien suunnitelmien mukaan, joten siellä kehitetty ohjelmisto ei ollut aivan sopiva tämän
kurssin seminaarityöksi. Tämän vuoksi lähdin kehittämään täysin erillistä aihetta. Aikaa tuli käytet-
tyä ehkä enemmän kuin kurssin suositus oli, mutta lopputulos on onnistunut ja tarkoituksenmukai-
nen, ja oppimisprosessi eteni hyvin koko toteutuksen ajan.

##### .


## Lähteet

React dokumentaatio: https://react.dev/learn

TypeScript dokumentaatio: https://www.typescriptlang.org/docs/handbook/typescript-from-
scratch.html

Chart.js (”pie”-graafi): https://www.chartjs.org/docs/latest/samples/other-charts/pie.html

CSS documentation: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps


## Liitteet

Kuva 1

<img title="Kuva 1" alt="Sovelluksen graafit" src="https://github.com/MarikaRoyhkio/HetkienArkisto/blob/main/HetkienArkisto_graafit.png">


Kuva 2

<img title="Kuva 2" alt="Sovelluksen lomake" src="https://github.com/MarikaRoyhkio/HetkienArkisto/blob/main/HetkienArkisto_lomake.png">

Kuva 3

<img title="Kuva 3" alt="Sovelluksen kalenterinäkymä" src="https://github.com/MarikaRoyhkio/HetkienArkisto/blob/main/HetkienArkisto_nakyma.png">

