export type RouteCheckpoint = {
  id: string;
  name: string;
  distance: string;
  elevation?: string;
};

export type RoutePageData = {
  slug: string;
  title: string;
  parchmentUrl?: string;
  gpxUrl?: string;
  sourceUrl: string;
  checkpoints: RouteCheckpoint[];
  highlights: RouteHighlightKey[];
  sourceNotice?: string;
};

export type RouteHighlight = {
  title: string;
  text: string;
  imageUrl: string;
};

const startCsobanka: RouteCheckpoint = {
  id: "START",
  name: "Csobánka, Ötterem kávézó (rajt)",
  distance: "0 km",
  elevation: "0 m",
};

const finishCsobanka = (distance: string, elevation: string): RouteCheckpoint => ({
  id: "CÉL",
  name: "Csobánka, Ötterem kávézó (cél)",
  distance,
  elevation,
});

const source = (slug: string) => `https://pilistura.hu/utvonalak/${slug}`;
const gpx = (file: string) => `https://pilistura.hu/utvonalak/data/gpx/${encodeURIComponent(file)}`;
const parchment = (file: string) => `https://pilistura.hu/images/routes/${encodeURIComponent(file)}`;
const detailImage = (path: string) =>
  `https://pilistura.hu/templates/utvonalak/images/${path.split("/").map(encodeURIComponent).join("/")}`;

export const ROUTE_HIGHLIGHTS = {
  "holdvilag-arok": {
    title: "Holdvilág-árok",
    text: "A Pilis egyik legvadregényesebb szurdoka sziklafalakkal, patakmederrel és régészeti emlékekkel. A völgy természetes kőfolyosója esős időben különösen látványos, ugyanakkor fokozott figyelmet kíván.",
    imageUrl: detailImage("holdvirag-arok/Holdvilág-árok 7.jpg"),
  },
  "oszoly-csucs": {
    title: "Oszoly-csúcs",
    text: "Csobánka fölött emelkedő, fehér sziklatornyairól ismert kilátóhely. A csúcsról széles panoráma nyílik a környező pilisi hegyekre és a településre.",
    imageUrl: detailImage("oszoly-csucs/Oszoly-csúcs 2.jpg"),
  },
  "hosszu-hegy": {
    title: "Hosszú-hegy",
    text: "A Pilis délkeleti vonulatának erdős gerince hosszú, nyugodt kapaszkodóval vezeti a túrázót a magasabb részek felé. Az ösvényt több ponton természetes kilátások és csendes pihenőhelyek tagolják.",
    imageUrl: detailImage("hosszu-hegy/Hosszú-hegy 1.jpg"),
  },
  lovaspiheno: {
    title: "Lovaspihenő",
    text: "A gerinc és a szurdok közötti szakasz praktikus pihenőpontja. Jó hely rövid megállásra, folyadékpótlásra és a következő ellenőrzőpont előtti rendeződésre.",
    imageUrl: detailImage("lovaspiheno/Lovaspihenő.jpg"),
  },
  "dera-szurdok": {
    title: "Dera-szurdok",
    text: "A Dera-patak által kialakított szurdok fahidakkal, sziklafalakkal és hűvös, árnyas erdei környezettel vár. Nedves időben a kövek és hidak csúszóssá válhatnak.",
    imageUrl: detailImage("dera-szurdok/Dera szurdok 1.jpg"),
  },
  "koves-berc": {
    title: "Köves-bérc",
    text: "Nyitottabb, köves gerincszakasz jellegzetes pilisi kőzetekkel és változatos erdőszegéllyel. A magasabb pontokról több irányban is feltárul a környék domborzata.",
    imageUrl: detailImage("koves-berc/köves bérc 1.jpg"),
  },
  "teve-szikla": {
    title: "Teve-szikla",
    text: "Pilisborosjenő ismert sziklaalakzata nevét jellegzetes, tevét idéző formájáról kapta. A kopár dolomitsziklák különleges kontrasztot alkotnak a környező erdőkkel.",
    imageUrl: detailImage("teve-szikla/teve szikla.jpg"),
  },
  "egri-var": {
    title: "Az Egri vár másolata",
    text: "A Pilisborosjenő melletti díszletvár az Egri csillagok film forgatására épült. A részben megmaradt falak ma szabadon látogatható, látványos kirándulóhelyet alkotnak.",
    imageUrl: detailImage("egri-var/Egri vár 1.jpg"),
  },
  "kevely-nyereg": {
    title: "Kevély-nyereg",
    text: "A Nagy-Kevély és a Kis-Kevély közötti fontos turistaút-csomópont fedett pihenővel. Több jelzett út találkozik itt, ezért az irányok ellenőrzésére is érdemes időt szánni.",
    imageUrl: detailImage("kevely-nyereg/Kevély nyereg 1.jpg"),
  },
  "csucs-hegy": {
    title: "Csúcs-hegy",
    text: "A felhagyott kőfejtő vöröses, vasas homokkőfalai a térség földtani múltját mutatják meg. A repedezett sziklafelszínek és ásványkitöltések különleges látványt adnak.",
    imageUrl: detailImage("csucs-hegy/csúcshegy kőfejtő.jpg"),
  },
  "delelo-domb": {
    title: "Delelő-domb",
    text: "Pomáz fölötti, lankásabb magaslat, amely átvezet az Oszoly környéki sziklás terep és az Ezüst-hegy erdős útjai között. Nyitottabb részein szép kilátás kíséri a haladást.",
    imageUrl: detailImage("delelo-domb/Delelő domb 1.jpg"),
  },
  "ezust-hegyi-kobanya": {
    title: "Ezüst-hegyi kőbánya",
    text: "Az egykori bányaudvar és a hozzá kapcsolódó üregek látványos ipartörténeti és földtani emlékek. A meredek falak közelében különösen fontos a kijelölt útvonal követése.",
    imageUrl: detailImage("ezust-hegy/Ezüst hegyi kőbánya 1.jpg"),
  },
  "macska-barlang": {
    title: "Macska-barlang",
    text: "A Ziribár-hegy délkeleti tövénél nyíló időszakosan aktív víznyelőbarlang. A bejárat környéke turistaútról megközelíthető, a barlang bejárása azonban engedélyhez és felszereléshez kötött.",
    imageUrl: detailImage("macska.jpg"),
  },
  "szent-kut-csobanka": {
    title: "Szent-kút, Csobánka",
    text: "A Mária-kútként is ismert forrás régi zarándokhely, amelyhez helyi gyógyító hagyományok kapcsolódnak. Az erdei pihenő a hosszabb útvonalak egyik csendes állomása.",
    imageUrl: detailImage("szent-kut-csobi/Szent-kút 1.JPG"),
  },
  "pilis-teto": {
    title: "Pilis-tető",
    text: "A Pilis 756 méteres teteje a hegység egyik legmagasabb pontja. A fennsík és a kilátópontok elérését hosszabb emelkedő előzi meg, amelyet tágas panoráma jutalmaz.",
    imageUrl: detailImage("pilis-teto/Pilistető 1.jpg"),
  },
  "maria-pad": {
    title: "Mária-pad",
    text: "Erdei pihenőhely a Pilis-tető környéki hosszabb szakaszon. Padjai és árnyas környezete miatt jó pont az energia- és folyadékpótlásra.",
    imageUrl: detailImage("maria-pad/Mária-pad 1.jpg"),
  },
  dobogoko: {
    title: "Dobogókő",
    text: "A Visegrádi-hegység egyik legismertebb kirándulóközpontja, az Eötvös Loránd menedékházzal és dunakanyari panorámával. A magaslat fontos csomópont a hosszabb pilisi útvonalakon.",
    imageUrl: detailImage("pilis-teto/Pilistető 3.jpg"),
  },
  "szent-kut-pilisszentkereszt": {
    title: "Szent-kút, Pilisszentkereszt",
    text: "Pilisszentkereszt erdei forrása és pihenőhelye a Dobogókőről levezető szakasz egyik nyugodt állomása. A környéket hűvös völgy és sűrű erdő övezi.",
    imageUrl: detailImage("szent-kut/Szent Kút 1.jpg"),
  },
  "lajos-forras": {
    title: "Lajos-forrás",
    text: "A Szentendre fölötti népszerű forrás és kirándulóhely több jelzett út találkozási pontja. A környező bükkösök és pihenők hosszabb túrák természetes megállójává teszik.",
    imageUrl: detailImage("lajosforras/Lajos forrás 1.jpg"),
  },
  "ko-hegyi-menedekhaz": {
    title: "Kő-hegyi menedékház",
    text: "A Kő-hegy fennsíkján álló turistaház klasszikus pilisi pihenőpont. A közelben található Petőfi-pihenő és a sziklaperem kilátása külön kitérőt is megér.",
    imageUrl: detailImage("ko-hegy/Kő hegyi menedékház 1.jpg"),
  },
  "nagy-csikovar": {
    title: "Nagy-Csikóvár",
    text: "Pomáz fölött emelkedő erdős hegy, amelynek gerince csendes, hosszabb kapaszkodóval kapcsolja össze a Lajos-forrás és a Holdvilág-árok térségét.",
    imageUrl: detailImage("holdvirag-arok/Holdvilág-árok 8.jpg"),
  },
  spartacus: {
    title: "Spartacus-ösvény",
    text: "A hegyoldalban keskenyen kanyargó ösvény a Visegrádi-hegység egyik legszebb panorámaútja. Egyes szakaszai kitettek, ezért biztos lépés és figyelmes haladás szükséges.",
    imageUrl: detailImage("spartacus/20260408_111227.jpg"),
  },
} satisfies Record<string, RouteHighlight>;

export type RouteHighlightKey = keyof typeof ROUTE_HIGHLIGHTS;

export const ROUTE_PAGES: Record<string, RoutePageData> = {
  "szent-laszlo-13": {
    slug: "szent-laszlo-13",
    title: "Szent László 13 KM",
    parchmentUrl: parchment("Szent László-13.png"),
    gpxUrl: gpx("Szent László 13.gpx"),
    sourceUrl: source("szent-laszlo-13"),
    checkpoints: [
      startCsobanka,
      { id: "1", name: "Elágazás balra (piros túraútvonal)", distance: "3,7 km" },
      { id: "2", name: "Holdvilág-árok eleje, elágazás és pihenő", distance: "5,5 km" },
      { id: "3", name: "Holdvilág-árok vége, információs tábla", distance: "6,1 km" },
      { id: "4", name: "Pihenő tűzrakóhellyel", distance: "8,1 km" },
      { id: "5", name: "Oszoly-csúcs", distance: "11,6 km" },
      finishCsobanka("12,8 km", "434 m"),
    ],
    highlights: ["holdvilag-arok", "oszoly-csucs"],
  },
  "hunyadi-matyas-16": {
    slug: "hunyadi-matyas-16",
    title: "Hunyadi Mátyás 16 KM",
    parchmentUrl: parchment("Hunyadi Mátyás-16.png"),
    gpxUrl: gpx("Hunyadi Mátyás 17.gpx"),
    sourceUrl: source("hunyadi-matyas-16"),
    checkpoints: [
      startCsobanka,
      { id: "1", name: "Hosszú-hegy", distance: "2,4 km" },
      { id: "2", name: "Lovaspihenő", distance: "8,9 km" },
      { id: "3", name: "Dera-szurdok pihenő", distance: "10,4 km" },
      finishCsobanka("16,7 km", "418 m"),
    ],
    highlights: ["hosszu-hegy", "lovaspiheno", "dera-szurdok"],
  },
  "hunyadi-matyas-22": {
    slug: "hunyadi-matyas-22",
    title: "Hunyadi Mátyás 22 KM",
    parchmentUrl: parchment("Hunyadi Mátyás-16.png"),
    gpxUrl: gpx("Hunyadi Mátyás 17.gpx"),
    sourceUrl: source("hunyadi-matyas-22"),
    checkpoints: [
      startCsobanka,
      { id: "1", name: "Hosszú-hegy", distance: "2,4 km" },
      { id: "2", name: "Lovaspihenő", distance: "8,9 km" },
      { id: "3", name: "Dera-szurdok pihenő", distance: "10,4 km" },
      finishCsobanka("16,7 km", "418 m"),
    ],
    highlights: ["hosszu-hegy", "lovaspiheno", "dera-szurdok"],
  },
  "hunyadi-matyas-23": {
    slug: "hunyadi-matyas-23",
    title: "Hunyadi Mátyás 23 KM",
    parchmentUrl: parchment("Hunyadi Mátyás-16.png"),
    gpxUrl: gpx("Hunyadi Mátyás 17.gpx"),
    sourceUrl: source("hunyadi-matyas-23"),
    checkpoints: [
      startCsobanka,
      { id: "1", name: "Hosszú-hegy", distance: "2,4 km" },
      { id: "2", name: "Lovaspihenő", distance: "8,9 km" },
      { id: "3", name: "Dera-szurdok pihenő", distance: "10,4 km" },
      finishCsobanka("16,7 km", "418 m"),
    ],
    highlights: ["hosszu-hegy", "lovaspiheno", "dera-szurdok"],
  },
  "rakoczi-ferenc-18": {
    slug: "rakoczi-ferenc-18",
    title: "II. Rákóczi Ferenc 18 KM",
    parchmentUrl: parchment("II.Rákóczi Ferenc-18.png"),
    gpxUrl: gpx("II. Rákóczy Ferenc 18.gpx"),
    sourceUrl: source("rakoczi-ferenc-18"),
    checkpoints: [
      startCsobanka,
      { id: "1", name: "A római út és Nemoratta sírköve", distance: "2,1 km" },
      { id: "2", name: "Magasles", distance: "5,6 km" },
      { id: "3", name: "Köves-bérc", distance: "9,6 km" },
      { id: "4", name: "Pilisborosjenő elágazás", distance: "11,7 km" },
      { id: "5", name: "Az Egri vár másolata", distance: "13,6 km" },
      { id: "6", name: "Kevély-nyereg", distance: "15 km" },
      { id: "7", name: "Oszoly-pihenő", distance: "17,4 km" },
      finishCsobanka("18 km", "605 m"),
    ],
    highlights: ["koves-berc", "egri-var", "kevely-nyereg"],
  },
  "hunyadi-janos-20": {
    slug: "hunyadi-janos-20",
    title: "Hunyadi János 20 KM",
    parchmentUrl: parchment("Hunyadi János-20.png"),
    gpxUrl: gpx("Hunyadi János 20.gpx"),
    sourceUrl: source("hunyadi-janos-20"),
    checkpoints: [
      startCsobanka,
      { id: "1", name: "Oszoly-csúcs", distance: "1,3 km" },
      { id: "2", name: "Delelő-domb", distance: "4,4 km" },
      { id: "3", name: "Fedett pihenő", distance: "8,8 km" },
      { id: "4", name: "Ezüst-hegyi kőbánya", distance: "11,1 km" },
      { id: "5", name: "Coop Pilis Csemege", distance: "12,7 km" },
      { id: "6", name: "Kevély-nyereg", distance: "15,8 km" },
      { id: "7", name: "A római út és Nemoratta sírköve", distance: "18,6 km" },
      finishCsobanka("20,8 km", "779 m"),
    ],
    highlights: ["oszoly-csucs", "delelo-domb", "ezust-hegyi-kobanya", "kevely-nyereg"],
  },
  "rakoczi-ferenc-26": {
    slug: "rakoczi-ferenc-26",
    title: "II. Rákóczi Ferenc 26 KM",
    parchmentUrl: parchment("II.Rákóczi Ferenc-26.png"),
    gpxUrl: gpx("II. Rákóczy Ferenc 26.gpx"),
    sourceUrl: source("rakoczi-ferenc-26"),
    checkpoints: [
      startCsobanka,
      { id: "1", name: "A római út és Nemoratta sírköve", distance: "2,1 km" },
      { id: "2", name: "Magasles", distance: "5,6 km" },
      { id: "3", name: "Köves-bérc", distance: "9,6 km" },
      { id: "4", name: "Pilisborosjenő elágazás", distance: "11,7 km" },
      { id: "5", name: "Az Egri vár másolata", distance: "13,6 km" },
      { id: "6", name: "Kevély-nyereg", distance: "15 km" },
      { id: "7", name: "Mackó-barlang", distance: "16,1 km" },
      { id: "8", name: "Oszoly-csúcs", distance: "18,7 km" },
      { id: "9", name: "Szent-kút", distance: "23,1 km" },
      { id: "10", name: "Csobánkai-nyereg", distance: "25,4 km" },
      finishCsobanka("26,5 km", "912 m"),
    ],
    highlights: ["koves-berc", "teve-szikla", "egri-var", "kevely-nyereg", "csucs-hegy", "oszoly-csucs", "macska-barlang", "szent-kut-csobanka"],
  },
  "hunyadi-matyas-28": {
    slug: "hunyadi-matyas-28",
    title: "Hunyadi Mátyás 28 KM",
    parchmentUrl: parchment("Hunyadi Mátyás-28.png"),
    gpxUrl: gpx("Hunyadi Mátyás 28.gpx"),
    sourceUrl: source("hunyadi-matyas-28"),
    checkpoints: [
      startCsobanka,
      { id: "1", name: "Macska-barlang", distance: "2 km" },
      { id: "2", name: "Hosszú-hegy", distance: "2,8 km" },
      { id: "3", name: "Szántói-nyereg", distance: "9 km" },
      { id: "4", name: "Emma vendéglő", distance: "11,2 km" },
      { id: "5", name: "Dobogókő, Eötvös Loránd menedékház", distance: "14,8 km" },
      { id: "6", name: "Szent-kút, Pilisszentkereszt", distance: "19,9 km" },
      { id: "7", name: "Dera-szurdok eleje, pihenő", distance: "21,5 km" },
      finishCsobanka("28 km", "863 m"),
    ],
    highlights: ["macska-barlang", "pilis-teto", "maria-pad", "dobogoko", "szent-kut-pilisszentkereszt", "dera-szurdok"],
  },
  "zrinyi-miklos-29": {
    slug: "zrinyi-miklos-29",
    title: "Zrínyi Miklós 29 KM",
    parchmentUrl: parchment("Zrínyi-29.png"),
    gpxUrl: gpx("Zrínyi Miklós 29.gpx"),
    sourceUrl: source("zrinyi-miklos-29"),
    checkpoints: [
      startCsobanka,
      { id: "1", name: "Macska-barlang", distance: "3,3 km" },
      { id: "2", name: "Pilisszántó információs tábla", distance: "8,7 km" },
      { id: "3", name: "Pilis-tető", distance: "12,2 km" },
      { id: "4", name: "Mária-pad, pihenőhely", distance: "16,8 km" },
      { id: "5", name: "Szent-kút", distance: "26,2 km" },
      finishCsobanka("28,52 km", "892 m"),
    ],
    highlights: ["macska-barlang", "pilis-teto", "maria-pad", "szent-kut-csobanka"],
  },
  "szent-laszlo-29": {
    slug: "szent-laszlo-29",
    title: "Szent László 29 KM",
    parchmentUrl: parchment("Szent László-29.png"),
    gpxUrl: gpx("Szent László 29.gpx"),
    sourceUrl: source("szent-laszlo-29"),
    checkpoints: [
      startCsobanka,
      { id: "1", name: "Elágazás balra (piros túraútvonal)", distance: "3,7 km" },
      { id: "2", name: "Holdvilág-árok eleje, pihenő", distance: "5,5 km" },
      { id: "3", name: "Holdvilág-árok vége, információs tábla", distance: "6,1 km" },
      { id: "4", name: "Tölgyikrek, Lom-hegyi-nyereg", distance: "9,9 km" },
      { id: "5", name: "Lajos-forrás", distance: "12,8 km" },
      { id: "6", name: "Kő-hegyi menedékház", distance: "16,2 km" },
      { id: "7", name: "Elágazás és sorompó", distance: "20,1 km" },
      { id: "8", name: "Nagy-Csikóvár", distance: "21,4 km" },
      { id: "9", name: "Oszoly-csúcs", distance: "27,3 km" },
      finishCsobanka("28 km", "863 m"),
    ],
    highlights: ["holdvilag-arok", "lajos-forras", "ko-hegyi-menedekhaz", "nagy-csikovar", "oszoly-csucs"],
  },
  spartacus: {
    slug: "spartacus",
    title: "Spartacus-ösvény 13 KM",
    parchmentUrl: parchment("Spartacus.png"),
    gpxUrl: gpx("Afternoon_hike_at_Spartacus_Osveny.gpx"),
    sourceUrl: source("spartacus"),
    checkpoints: [
      { id: "START", name: "Pilisszentlászló, Hunyadi Vándorfogadó", distance: "0 km", elevation: "0 m" },
      { id: "1", name: "Irányjelző tábla", distance: "1,3 km", elevation: "15 m" },
      { id: "2", name: "Irányjelző tábla", distance: "2,8 km", elevation: "15 m" },
      { id: "3", name: "Irányjelző tábla", distance: "5,3 km", elevation: "15 m" },
      { id: "4", name: "Irányjelző tábla", distance: "6,1 km", elevation: "19 m" },
      { id: "5", name: "Irányjelző tábla", distance: "6,9 km", elevation: "76 m" },
      { id: "6", name: "Irányjelző tábla", distance: "8,8 km", elevation: "130 m" },
      { id: "CÉL", name: "Pilisszentlászló, Hunyadi Vándorfogadó", distance: "13 km", elevation: "297 m" },
    ],
    highlights: ["spartacus"],
  },
  "kinizsi-pal-45": {
    slug: "kinizsi-pal-45",
    title: "Kinizsi Pál 45 KM",
    parchmentUrl: parchment("Kinizsi Pál-45.png"),
    gpxUrl: gpx("Kinizsi Pál 45.gpx"),
    sourceUrl: source("kinizsi-pal-45"),
    checkpoints: [
      startCsobanka,
      { id: "1", name: "Kishíd", distance: "0,9 km" },
      { id: "2", name: "Piros elágazás eleje", distance: "3,7 km" },
      { id: "3", name: "Holdvilág-árok eleje, pihenő", distance: "5,6 km" },
      { id: "4", name: "Tölgyikrek, Lom-hegyi-nyereg", distance: "9,8 km" },
      { id: "5", name: "Lajos-forrás", distance: "12,8 km" },
      { id: "6", name: "Nagy-Csikóvár", distance: "14,2 km" },
      { id: "7", name: "Stefano Pizzéria, Pomáz", distance: "20,7 km" },
      { id: "8", name: "Oszoly-csúcs", distance: "25,9 km" },
      { id: "9", name: "Ezüst-hegyi bánya", distance: "31,5 km" },
      { id: "10", name: "Coop Pilis Csemege", distance: "33,4 km" },
      { id: "11", name: "Az Egri vár másolata", distance: "35,8 km" },
      { id: "12", name: "Kevély-nyereg, fedett pihenő", distance: "37,3 km" },
      { id: "13", name: "Macska-barlang", distance: "41,4 km" },
      { id: "14", name: "Hosszú-hegy", distance: "42,2 km" },
      { id: "15", name: "Szent-kút", distance: "43,1 km" },
      finishCsobanka("45,52 km", "1589 m"),
    ],
    highlights: ["holdvilag-arok", "lajos-forras", "nagy-csikovar", "oszoly-csucs", "ezust-hegyi-kobanya", "egri-var", "macska-barlang", "szent-kut-csobanka"],
  },
  "hunyadi-janos-55": {
    slug: "hunyadi-janos-55",
    title: "Hunyadi János 55 KM",
    parchmentUrl: parchment("Hunyadi János-55.png"),
    gpxUrl: gpx("Hunyadi János 55.gpx"),
    sourceUrl: source("hunyadi-janos-55"),
    checkpoints: [
      startCsobanka,
      { id: "1", name: "Macska-barlang", distance: "3,3 km" },
      { id: "2", name: "Szántói-nyereg", distance: "8,7 km" },
      { id: "3", name: "Pilis-tető", distance: "12,4 km" },
      { id: "4", name: "Mária-pad, pihenőhely", distance: "17,9 km" },
      { id: "5", name: "Dobogókő, Eötvös Loránd menedékház", distance: "22,1 km" },
      { id: "6", name: "Hegyi Szent Bernát-emléktábla", distance: "25,4 km" },
      { id: "7", name: "Dömös", distance: "30 km" },
      { id: "8", name: "Árpádvár előtti elágazás", distance: "34,2 km" },
      { id: "9", name: "Dobogókő, Eötvös Loránd menedékház", distance: "37,6 km" },
      { id: "10", name: "Tölgyikrek, Lom-hegyi-nyereg", distance: "43,8 km" },
      { id: "11", name: "Lajos-forrás", distance: "46,8 km" },
      { id: "12", name: "Nagy-Csikóvár", distance: "48 km" },
      { id: "13", name: "Piros útvonal elágazása", distance: "51,3 km" },
      { id: "14", name: "Oszoly-csúcs", distance: "54 km" },
      finishCsobanka("55,5 km", "2213 m"),
    ],
    highlights: ["macska-barlang", "pilis-teto", "maria-pad", "dobogoko", "lajos-forras", "nagy-csikovar", "oszoly-csucs"],
  },
};

export const ROUTE_PAGE_SLUGS = Object.keys(ROUTE_PAGES);
