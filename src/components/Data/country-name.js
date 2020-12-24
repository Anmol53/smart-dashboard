const countries = [
  {
    name: "Argentina",
    flag: "https://restcountries.eu/data/arg.svg",
    alpha2Code: "ar",
  },
  {
    name: "Australia",
    flag: "https://restcountries.eu/data/aus.svg",
    alpha2Code: "au",
  },
  {
    name: "Austria",
    flag: "https://restcountries.eu/data/aut.svg",
    alpha2Code: "at",
  },
  {
    name: "Belgium",
    flag: "https://restcountries.eu/data/bel.svg",
    alpha2Code: "be",
  },
  {
    name: "Brazil",
    flag: "https://restcountries.eu/data/bra.svg",
    alpha2Code: "br",
  },
  {
    name: "Bulgaria",
    flag: "https://restcountries.eu/data/bgr.svg",
    alpha2Code: "bg",
  },
  {
    name: "Canada",
    flag: "https://restcountries.eu/data/can.svg",
    alpha2Code: "ca",
  },
  {
    name: "China",
    flag: "https://restcountries.eu/data/chn.svg",
    alpha2Code: "cn",
  },
  {
    name: "Colombia",
    flag: "https://restcountries.eu/data/col.svg",
    alpha2Code: "co",
  },
  {
    name: "Cuba",
    flag: "https://restcountries.eu/data/cub.svg",
    alpha2Code: "cu",
  },
  {
    name: "Czech Republic",
    flag: "https://restcountries.eu/data/cze.svg",
    alpha2Code: "cz",
  },
  {
    name: "Egypt",
    flag: "https://restcountries.eu/data/egy.svg",
    alpha2Code: "eg",
  },
  {
    name: "France",
    flag: "https://restcountries.eu/data/fra.svg",
    alpha2Code: "fr",
  },
  {
    name: "Germany",
    flag: "https://restcountries.eu/data/deu.svg",
    alpha2Code: "de",
  },
  {
    name: "Greece",
    flag: "https://restcountries.eu/data/grc.svg",
    alpha2Code: "gr",
  },
  {
    name: "Hong Kong",
    flag: "https://restcountries.eu/data/hkg.svg",
    alpha2Code: "hk",
  },
  {
    name: "Hungary",
    flag: "https://restcountries.eu/data/hun.svg",
    alpha2Code: "hu",
  },
  {
    name: "India",
    flag: "https://restcountries.eu/data/ind.svg",
    alpha2Code: "in",
  },
  {
    name: "Indonesia",
    flag: "https://restcountries.eu/data/idn.svg",
    alpha2Code: "id",
  },
  {
    name: "Ireland",
    flag: "https://restcountries.eu/data/irl.svg",
    alpha2Code: "ie",
  },
  {
    name: "Israel",
    flag: "https://restcountries.eu/data/isr.svg",
    alpha2Code: "il",
  },
  {
    name: "Italy",
    flag: "https://restcountries.eu/data/ita.svg",
    alpha2Code: "it",
  },
  {
    name: "Japan",
    flag: "https://restcountries.eu/data/jpn.svg",
    alpha2Code: "jp",
  },
  {
    name: "Latvia",
    flag: "https://restcountries.eu/data/lva.svg",
    alpha2Code: "lv",
  },
  {
    name: "Lithuania",
    flag: "https://restcountries.eu/data/ltu.svg",
    alpha2Code: "lt",
  },
  {
    name: "Malaysia",
    flag: "https://restcountries.eu/data/mys.svg",
    alpha2Code: "my",
  },
  {
    name: "Mexico",
    flag: "https://restcountries.eu/data/mex.svg",
    alpha2Code: "mx",
  },
  {
    name: "Morocco",
    flag: "https://restcountries.eu/data/mar.svg",
    alpha2Code: "ma",
  },
  {
    name: "Netherlands",
    flag: "https://restcountries.eu/data/nld.svg",
    alpha2Code: "nl",
  },
  {
    name: "New Zealand",
    flag: "https://restcountries.eu/data/nzl.svg",
    alpha2Code: "nz",
  },
  {
    name: "Nigeria",
    flag: "https://restcountries.eu/data/nga.svg",
    alpha2Code: "ng",
  },
  {
    name: "Norway",
    flag: "https://restcountries.eu/data/nor.svg",
    alpha2Code: "no",
  },
  {
    name: "Philippines",
    flag: "https://restcountries.eu/data/phl.svg",
    alpha2Code: "ph",
  },
  {
    name: "Poland",
    flag: "https://restcountries.eu/data/pol.svg",
    alpha2Code: "pl",
  },
  {
    name: "Portugal",
    flag: "https://restcountries.eu/data/prt.svg",
    alpha2Code: "pt",
  },
  {
    name: "Romania",
    flag: "https://restcountries.eu/data/rou.svg",
    alpha2Code: "ro",
  },
  {
    name: "Russian Federation",
    flag: "https://restcountries.eu/data/rus.svg",
    alpha2Code: "ru",
  },
  {
    name: "Saudi Arabia",
    flag: "https://restcountries.eu/data/sau.svg",
    alpha2Code: "sa",
  },
  {
    name: "Serbia",
    flag: "https://restcountries.eu/data/srb.svg",
    alpha2Code: "rs",
  },
  {
    name: "Singapore",
    flag: "https://restcountries.eu/data/sgp.svg",
    alpha2Code: "sg",
  },
  {
    name: "Slovakia",
    flag: "https://restcountries.eu/data/svk.svg",
    alpha2Code: "sk",
  },
  {
    name: "Slovenia",
    flag: "https://restcountries.eu/data/svn.svg",
    alpha2Code: "si",
  },
  {
    name: "South Africa",
    flag: "https://restcountries.eu/data/zaf.svg",
    alpha2Code: "za",
  },
  {
    name: "Korea (Republic of)",
    flag: "https://restcountries.eu/data/kor.svg",
    alpha2Code: "kr",
  },
  {
    name: "Sweden",
    flag: "https://restcountries.eu/data/swe.svg",
    alpha2Code: "se",
  },
  {
    name: "Switzerland",
    flag: "https://restcountries.eu/data/che.svg",
    alpha2Code: "ch",
  },
  {
    name: "Taiwan",
    flag: "https://restcountries.eu/data/twn.svg",
    alpha2Code: "tw",
  },
  {
    name: "Thailand",
    flag: "https://restcountries.eu/data/tha.svg",
    alpha2Code: "th",
  },
  {
    name: "Turkey",
    flag: "https://restcountries.eu/data/tur.svg",
    alpha2Code: "tr",
  },
  {
    name: "Ukraine",
    flag: "https://restcountries.eu/data/ukr.svg",
    alpha2Code: "ua",
  },
  {
    name: "United Arab Emirates",
    flag: "https://restcountries.eu/data/are.svg",
    alpha2Code: "ae",
  },
  {
    name: "United Kingdom of Great Britain and Northern Ireland",
    flag: "https://restcountries.eu/data/gbr.svg",
    alpha2Code: "gb",
  },
  {
    name: "United States of America",
    flag: "https://restcountries.eu/data/usa.svg",
    alpha2Code: "us",
  },
  {
    name: "Venezuela (Bolivarian Republic of)",
    flag: "https://restcountries.eu/data/ven.svg",
    alpha2Code: "ve",
  },
];
exports.countries = countries;
