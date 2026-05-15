// ─── Types ────────────────────────────────────────────────────────────────────

export type Position = "GK" | "DEF" | "MID" | "FWD";

export interface Player {
  name: string;
  position: Position;
  club: string;
  number: number;
  isCaptain?: boolean;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  code: string;
  flag: string;
  group: string;
  coach: string;
  fifaRank: number;
  formation: string;
  tactics: string;
  players: Player[];
  wcHistory: string[];
}

export interface Standing {
  teamId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export interface Group {
  id: string;
  label: string;
  teamIds: string[];
  standings: Standing[];
}

export type MatchStage =
  | "group"
  | "round-of-32"
  | "round-of-16"
  | "quarter-final"
  | "semi-final"
  | "third-place"
  | "final";

export type MatchStatus = "upcoming" | "live" | "completed";

export interface Fixture {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  country: string;
  group?: string;
  matchday?: number;
  stage: MatchStage;
  status: MatchStatus;
  homeScore?: number;
  awayScore?: number;
  liveMinute?: number;
}

export interface NewsPost {
  id: string;
  slug: string;
  title: string;
  category: "News" | "Analysis" | "Player" | "Tactics" | "Fan";
  date: string;
  excerpt: string;
  content: string;
  image: string;
  readTime: number;
  tags: string[];
  featured?: boolean;
}

// ─── Teams ────────────────────────────────────────────────────────────────────

export const teams: Team[] = [
  // Group A
  {
    id: "mexico",
    name: "Mexico",
    shortName: "Mexico",
    code: "MEX",
    flag: "mx",
    group: "A",
    coach: "Javier Aguirre",
    fifaRank: 15,
    formation: "4-2-3-1",
    tactics:
      "Disciplined defensive block with technical midfield play and explosive counter-attacking.",
    players: [
      { name: "Guillermo Ochoa", position: "GK", club: "América", number: 13, isCaptain: true },
      { name: "Jorge Sánchez", position: "DEF", club: "Ajax", number: 2 },
      { name: "Edson Álvarez", position: "MID", club: "West Ham", number: 4 },
      { name: "Hirving Lozano", position: "FWD", club: "PSV Eindhoven", number: 22 },
      { name: "Raúl Jiménez", position: "FWD", club: "Fulham", number: 9 },
      { name: "Henry Martín", position: "FWD", club: "América", number: 7 },
    ],
    wcHistory: [
      "17 World Cup appearances",
      "Knocked out in Round of 16 seven consecutive times",
      "Co-hosting 2026 edition",
      "Best result: Quarter-finals (1970, 1986)",
    ],
  },
  {
    id: "southafrica",
    name: "South Africa",
    shortName: "South Africa",
    code: "RSA",
    flag: "za",
    group: "A",
    coach: "Hugo Broos",
    fifaRank: 67,
    formation: "4-3-3",
    tactics: "Physical and energetic with a strong team spirit, effective on the counter-attack.",
    players: [
      { name: "Ronwen Williams", position: "GK", club: "SuperSport United", number: 1, isCaptain: true },
      { name: "Siyanda Xulu", position: "DEF", club: "PAOK", number: 5 },
      { name: "Percy Tau", position: "FWD", club: "Al Ahly", number: 10 },
      { name: "Evidence Makgopa", position: "FWD", club: "Orlando Pirates", number: 9 },
    ],
    wcHistory: [
      "Hosted the 2010 World Cup",
      "Only African host nation — reached Round of 16 in 2010",
      "3 World Cup appearances (1998, 2002, 2010)",
    ],
  },
  {
    id: "southkorea",
    name: "South Korea",
    shortName: "South Korea",
    code: "KOR",
    flag: "kr",
    group: "A",
    coach: "Hong Myung-bo",
    fifaRank: 22,
    formation: "4-2-3-1",
    tactics: "High-intensity pressing with fast transitions and technically gifted players.",
    players: [
      { name: "Kim Seung-gyu", position: "GK", club: "Vissel Kobe", number: 1 },
      { name: "Kim Min-jae", position: "DEF", club: "Bayern Munich", number: 3 },
      { name: "Lee Kang-in", position: "MID", club: "PSG", number: 10 },
      { name: "Son Heung-min", position: "FWD", club: "Tottenham Hotspur", number: 7, isCaptain: true },
      { name: "Hwang Hee-chan", position: "FWD", club: "Wolverhampton", number: 11 },
    ],
    wcHistory: [
      "11 World Cup appearances",
      "Best result: Fourth place (2002, co-hosted with Japan)",
      "Round of 16 in 2022",
    ],
  },
  {
    id: "uefaplayoffd",
    name: "Czechia",
    shortName: "Czechia",
    code: "CZE",
    flag: "cz",
    group: "A",
    coach: "Ivan Hašek",
    fifaRank: 37,
    formation: "4-2-3-1",
    tactics: "Organised and technically sound, with creative midfield play and strong defensive shape.",
    players: [
      { name: "Jindřich Staněk", position: "GK", club: "Slavia Prague", number: 1 },
      { name: "Vladimír Coufal", position: "DEF", club: "West Ham", number: 2 },
      { name: "Tomáš Souček", position: "MID", club: "West Ham", number: 6, isCaptain: true },
      { name: "Lukáš Provod", position: "MID", club: "Slavia Prague", number: 10 },
      { name: "Patrik Schick", position: "FWD", club: "Bayer Leverkusen", number: 9 },
    ],
    wcHistory: [
      "First World Cup appearance as Czechia",
      "Previously competed as Czechoslovakia — runners-up in 1934 and 1962",
      "Euro 2024 quarter-finalists",
    ],
  },
  // Group B
  {
    id: "canada",
    name: "Canada",
    shortName: "Canada",
    code: "CAN",
    flag: "ca",
    group: "B",
    coach: "Jesse Marsch",
    fifaRank: 40,
    formation: "4-3-3",
    tactics: "High-energy pressing with direct, vertical football and wing dominance.",
    players: [
      { name: "Maxime Crépeau", position: "GK", club: "LA Galaxy", number: 16 },
      { name: "Alistair Johnston", position: "DEF", club: "Celtic", number: 2 },
      { name: "Alphonso Davies", position: "DEF", club: "Bayern Munich", number: 3 },
      { name: "Stephen Eustáquio", position: "MID", club: "FC Porto", number: 7 },
      { name: "Jonathan David", position: "FWD", club: "LOSC Lille", number: 9, isCaptain: true },
      { name: "Cyle Larin", position: "FWD", club: "Club Brugge", number: 17 },
    ],
    wcHistory: [
      "2 World Cup appearances (1986, 2022)",
      "Co-hosting 2026 edition",
      "Winless at 2022 World Cup",
    ],
  },
  {
    id: "uefaplayoffa",
    name: "Bosnia and Herzegovina",
    shortName: "Bosnia & Herz.",
    code: "BIH",
    flag: "ba",
    group: "B",
    coach: "Sergej Barbarez",
    fifaRank: 63,
    formation: "4-3-3",
    tactics: "Attack-minded with creative flair, physical midfield and dangerous set pieces.",
    players: [
      { name: "Kenan Pirić", position: "GK", club: "Watford", number: 1 },
      { name: "Sead Kolašinac", position: "DEF", club: "Marseille", number: 5, isCaptain: true },
      { name: "Miralem Pjanić", position: "MID", club: "Sharjah FC", number: 8 },
      { name: "Edin Džeko", position: "FWD", club: "Fenerbahçe", number: 9 },
    ],
    wcHistory: [
      "1 World Cup appearance (2014)",
      "Group stage exit in 2014",
      "Second World Cup qualification",
    ],
  },
  {
    id: "qatar",
    name: "Qatar",
    shortName: "Qatar",
    code: "QAT",
    flag: "qa",
    group: "B",
    coach: "Marquez Lopez",
    fifaRank: 58,
    formation: "4-3-3",
    tactics: "Technical and possession-based, looking to improve on their 2022 host performance.",
    players: [
      { name: "Meshaal Barsham", position: "GK", club: "Al-Sadd", number: 1 },
      { name: "Pedro Miguel", position: "DEF", club: "Al-Sadd", number: 2, isCaptain: true },
      { name: "Akram Afif", position: "FWD", club: "Al-Sadd", number: 11 },
      { name: "Almoez Ali", position: "FWD", club: "Al-Duhail", number: 19 },
    ],
    wcHistory: [
      "Hosted the 2022 World Cup",
      "First host nation eliminated in group stage (2022)",
      "2 World Cup appearances",
    ],
  },
  {
    id: "switzerland",
    name: "Switzerland",
    shortName: "Switzerland",
    code: "SUI",
    flag: "ch",
    group: "B",
    coach: "Murat Yakin",
    fifaRank: 18,
    formation: "3-4-2-1",
    tactics: "Compact, well-organised defence with technical quality and dangerous set pieces.",
    players: [
      { name: "Yann Sommer", position: "GK", club: "Internazionale", number: 1 },
      { name: "Manuel Akanji", position: "DEF", club: "Manchester City", number: 5 },
      { name: "Granit Xhaka", position: "MID", club: "Bayer Leverkusen", number: 10, isCaptain: true },
      { name: "Remo Freuler", position: "MID", club: "Nottingham Forest", number: 8 },
      { name: "Breel Embolo", position: "FWD", club: "AS Monaco", number: 7 },
      { name: "Xherdan Shaqiri", position: "FWD", club: "Chicago Fire", number: 23 },
    ],
    wcHistory: [
      "12 World Cup appearances",
      "Round of 16 in 2022 (defeated Serbia, lost to Portugal)",
      "Best result: Quarter-finals (1934, 1938, 1954)",
    ],
  },
  // Group C
  {
    id: "brazil",
    name: "Brazil",
    shortName: "Brazil",
    code: "BRA",
    flag: "br",
    group: "C",
    coach: "Dorival Júnior",
    fifaRank: 5,
    formation: "4-2-3-1",
    tactics:
      "Attack-minded with flair and creativity. Quick, technical midfield combined with devastating forwards.",
    players: [
      { name: "Alisson Becker", position: "GK", club: "Liverpool", number: 1 },
      { name: "Danilo", position: "DEF", club: "Juventus", number: 2, isCaptain: true },
      { name: "Marquinhos", position: "DEF", club: "PSG", number: 4 },
      { name: "Casemiro", position: "MID", club: "Manchester United", number: 5 },
      { name: "Bruno Guimarães", position: "MID", club: "Newcastle United", number: 8 },
      { name: "Vinícius Júnior", position: "FWD", club: "Real Madrid", number: 7 },
      { name: "Rodrygo", position: "FWD", club: "Real Madrid", number: 11 },
      { name: "Endrick", position: "FWD", club: "Real Madrid", number: 9 },
    ],
    wcHistory: [
      "Record 5 World Cup titles (1958, 1962, 1970, 1994, 2002)",
      "Only nation to qualify for every World Cup",
      "Eliminated in Quarter-finals in 2022",
    ],
  },
  {
    id: "morocco",
    name: "Morocco",
    shortName: "Morocco",
    code: "MAR",
    flag: "ma",
    group: "C",
    coach: "Walid Regragui",
    fifaRank: 14,
    formation: "4-1-4-1",
    tactics: "Disciplined defensive block, organised pressing, lethal on set pieces and transitions.",
    players: [
      { name: "Yassine Bounou", position: "GK", club: "Al-Hilal", number: 1 },
      { name: "Achraf Hakimi", position: "DEF", club: "PSG", number: 2, isCaptain: true },
      { name: "Nayef Aguerd", position: "DEF", club: "West Ham", number: 5 },
      { name: "Sofyan Amrabat", position: "MID", club: "Fenerbahçe", number: 4 },
      { name: "Hakim Ziyech", position: "MID", club: "Galatasaray", number: 7 },
      { name: "Youssef En-Nesyri", position: "FWD", club: "Fenerbahçe", number: 9 },
    ],
    wcHistory: [
      "Historic semi-final run in 2022",
      "First African/Arab team to reach a World Cup semi-final",
      "6 World Cup appearances",
    ],
  },
  {
    id: "haiti",
    name: "Haiti",
    shortName: "Haiti",
    code: "HAI",
    flag: "ht",
    group: "C",
    coach: "Marc Collat",
    fifaRank: 83,
    formation: "4-4-2",
    tactics: "Hard-working, defensive organisation with pace on the break.",
    players: [
      { name: "Josué Duverger", position: "GK", club: "Violette", number: 1, isCaptain: true },
      { name: "Steeven Saba", position: "FWD", club: "Caen", number: 9 },
    ],
    wcHistory: [
      "1 World Cup appearance (1974)",
      "First Caribbean nation to qualify for 2026",
    ],
  },
  {
    id: "scotland",
    name: "Scotland",
    shortName: "Scotland",
    code: "SCO",
    flag: "gb-sct",
    group: "C",
    coach: "Steve Clarke",
    fifaRank: 39,
    formation: "3-4-2-1",
    tactics: "Compact and aggressive pressing, strong in set pieces and physical duels.",
    players: [
      { name: "Angus Gunn", position: "GK", club: "Norwich City", number: 1 },
      { name: "Andy Robertson", position: "DEF", club: "Liverpool", number: 3, isCaptain: true },
      { name: "Kieran Tierney", position: "DEF", club: "Real Sociedad", number: 5 },
      { name: "Scott McTominay", position: "MID", club: "Napoli", number: 8 },
      { name: "Billy Gilmour", position: "MID", club: "Brighton", number: 6 },
      { name: "Che Adams", position: "FWD", club: "Southampton", number: 9 },
    ],
    wcHistory: [
      "8 World Cup appearances (last in 1998)",
      "First qualification since 1998",
      "Never progressed beyond the group stage",
    ],
  },
  // Group D
  {
    id: "usa",
    name: "United States",
    shortName: "USA",
    code: "USA",
    flag: "us",
    group: "D",
    coach: "Mauricio Pochettino",
    fifaRank: 13,
    formation: "4-3-3",
    tactics:
      "High-energy pressing with quick transitions. Relies on pace in wide areas and set-piece delivery.",
    players: [
      { name: "Matt Turner", position: "GK", club: "Crystal Palace", number: 1 },
      { name: "Sergino Dest", position: "DEF", club: "PSV Eindhoven", number: 2 },
      { name: "Chris Richards", position: "DEF", club: "Crystal Palace", number: 5 },
      { name: "Tyler Adams", position: "MID", club: "Bournemouth", number: 4, isCaptain: true },
      { name: "Weston McKennie", position: "MID", club: "Juventus", number: 8 },
      { name: "Christian Pulisic", position: "FWD", club: "AC Milan", number: 10 },
      { name: "Gio Reyna", position: "FWD", club: "Borussia Dortmund", number: 7 },
      { name: "Ricardo Pepi", position: "FWD", club: "PSV Eindhoven", number: 9 },
    ],
    wcHistory: [
      "11 World Cup appearances",
      "Best result: Semi-finals (1930)",
      "Co-hosting the 2026 edition",
      "Reached Round of 16 in 2022",
    ],
  },
  {
    id: "paraguay",
    name: "Paraguay",
    shortName: "Paraguay",
    code: "PAR",
    flag: "py",
    group: "D",
    coach: "Gustavo Alfaro",
    fifaRank: 62,
    formation: "4-4-2",
    tactics: "Compact and disciplined, hard to break down with dangerous set pieces.",
    players: [
      { name: "Antony Silva", position: "GK", club: "Olimpia", number: 1 },
      { name: "Gustavo Gómez", position: "DEF", club: "Palmeiras", number: 3, isCaptain: true },
      { name: "Miguel Almirón", position: "MID", club: "Newcastle United", number: 10 },
      { name: "Ángel Romero", position: "FWD", club: "Club Nacional", number: 9 },
      { name: "Julio Enciso", position: "FWD", club: "Brighton", number: 11 },
    ],
    wcHistory: [
      "8 World Cup appearances",
      "Best result: Quarter-finals (1962)",
      "Round of 16 in 2010",
    ],
  },
  {
    id: "australia",
    name: "Australia",
    shortName: "Australia",
    code: "AUS",
    flag: "au",
    group: "D",
    coach: "Tony Popovic",
    fifaRank: 24,
    formation: "4-4-2",
    tactics: "Hard-working, high-pressing style with direct play and strong team spirit.",
    players: [
      { name: "Mat Ryan", position: "GK", club: "Real Sociedad", number: 1, isCaptain: true },
      { name: "Miloš Degenek", position: "DEF", club: "Columbus Crew", number: 6 },
      { name: "Ajdin Hrustic", position: "MID", club: "Hellas Verona", number: 8 },
      { name: "Martin Boyle", position: "FWD", club: "Al-Faisaly", number: 11 },
      { name: "Mitchell Duke", position: "FWD", club: "Fagiano Okayama", number: 20 },
    ],
    wcHistory: [
      "5 World Cup appearances",
      "Best result: Round of 16 (2006, 2022)",
      "Quarter-finalists in Women's World Cup 2023",
    ],
  },
  {
    id: "uefaplayoffc",
    name: "Türkiye",
    shortName: "Türkiye",
    code: "TUR",
    flag: "tr",
    group: "D",
    coach: "Vincenzo Montella",
    fifaRank: 29,
    formation: "4-3-3",
    tactics: "Energetic and technically gifted, with dangerous attacking play and strong team spirit.",
    players: [
      { name: "Mert Günok", position: "GK", club: "Beşiktaş", number: 1 },
      { name: "Samet Akaydın", position: "DEF", club: "Fenerbahçe", number: 5 },
      { name: "Hakan Çalhanoğlu", position: "MID", club: "Internazionale", number: 10, isCaptain: true },
      { name: "Arda Güler", position: "MID", club: "Real Madrid", number: 8 },
      { name: "Cenk Tosun", position: "FWD", club: "Beşiktaş", number: 9 },
    ],
    wcHistory: [
      "2 World Cup appearances (1954, 2002)",
      "Third place in 2002",
      "Euro 2024 quarter-finalists",
    ],
  },
  // Group E
  {
    id: "germany",
    name: "Germany",
    shortName: "Germany",
    code: "GER",
    flag: "de",
    group: "E",
    coach: "Julian Nagelsmann",
    fifaRank: 12,
    formation: "4-2-3-1",
    tactics: "Structured possession play with vertical passing and high press. Clinical finishing.",
    players: [
      { name: "Manuel Neuer", position: "GK", club: "Bayern Munich", number: 1, isCaptain: true },
      { name: "Joshua Kimmich", position: "DEF", club: "Bayern Munich", number: 6 },
      { name: "Antonio Rüdiger", position: "DEF", club: "Real Madrid", number: 16 },
      { name: "Florian Wirtz", position: "MID", club: "Bayer Leverkusen", number: 10 },
      { name: "Jamal Musiala", position: "MID", club: "Bayern Munich", number: 14 },
      { name: "Kai Havertz", position: "FWD", club: "Arsenal", number: 7 },
      { name: "Niclas Füllkrug", position: "FWD", club: "West Ham", number: 9 },
    ],
    wcHistory: [
      "4 World Cup titles (1954, 1974, 1990, 2014)",
      "Record 8× finalists",
      "Disastrous group stage exits in 2018 and 2022",
      "19 World Cup appearances",
    ],
  },
  {
    id: "curacao",
    name: "Curaçao",
    shortName: "Curaçao",
    code: "CUW",
    flag: "cw",
    group: "E",
    coach: "Remko Bicentini",
    fifaRank: 78,
    formation: "4-3-3",
    tactics: "Dynamic Caribbean football with creative flair and attacking intent.",
    players: [
      { name: "Eloy Room", position: "GK", club: "FC Cincinnati", number: 1, isCaptain: true },
      { name: "Leandro Bacuna", position: "MID", club: "Cardiff City", number: 10 },
      { name: "Jurickson Profar", position: "FWD", club: "San Diego Padres", number: 9 },
    ],
    wcHistory: [
      "First-ever World Cup appearance",
      "Breakthrough qualification via CONCACAF",
    ],
  },
  {
    id: "ivorycoast",
    name: "Ivory Coast",
    shortName: "Ivory Coast",
    code: "CIV",
    flag: "ci",
    group: "E",
    coach: "Emerse Faé",
    fifaRank: 45,
    formation: "4-3-3",
    tactics: "Physical and athletic with technical quality in attack. AFCON champions 2024.",
    players: [
      { name: "Yahia Fofana", position: "GK", club: "AS Monaco", number: 1 },
      { name: "Serge Aurier", position: "DEF", club: "Nottingham Forest", number: 2 },
      { name: "Franck Kessié", position: "MID", club: "Al-Ahli", number: 8 },
      { name: "Sébastien Haller", position: "FWD", club: "Borussia Dortmund", number: 9, isCaptain: true },
      { name: "Nicolas Pépé", position: "FWD", club: "Trabzonspor", number: 11 },
    ],
    wcHistory: [
      "3 World Cup appearances (2006, 2010, 2014)",
      "AFCON Champions 2024",
      "Part of the famous Didier Drogba golden generation",
    ],
  },
  {
    id: "ecuador",
    name: "Ecuador",
    shortName: "Ecuador",
    code: "ECU",
    flag: "ec",
    group: "E",
    coach: "Sebastián Beccacece",
    fifaRank: 44,
    formation: "4-3-3",
    tactics: "Energetic pressing with physical midfield and pacey forwards.",
    players: [
      { name: "Hernán Galíndez", position: "GK", club: "Aucas", number: 1 },
      { name: "Byron Castillo", position: "DEF", club: "Al-Qadsiah", number: 16 },
      { name: "Moisés Caicedo", position: "MID", club: "Chelsea", number: 8, isCaptain: true },
      { name: "Pervis Estupiñán", position: "DEF", club: "Brighton", number: 3 },
      { name: "Enner Valencia", position: "FWD", club: "Internazionale", number: 13 },
    ],
    wcHistory: [
      "4 World Cup appearances",
      "Best result: Round of 16 (2006)",
      "Opened 2022 tournament with win over hosts Qatar",
    ],
  },
  // Group F
  {
    id: "netherlands",
    name: "Netherlands",
    shortName: "Netherlands",
    code: "NED",
    flag: "nl",
    group: "F",
    coach: "Ronald Koeman",
    fifaRank: 7,
    formation: "4-3-3",
    tactics: "Classic Dutch total football approach, fluid positional play and technical precision.",
    players: [
      { name: "Bart Verbruggen", position: "GK", club: "Brighton", number: 1 },
      { name: "Denzel Dumfries", position: "DEF", club: "Internazionale", number: 22 },
      { name: "Virgil van Dijk", position: "DEF", club: "Liverpool", number: 4, isCaptain: true },
      { name: "Frenkie de Jong", position: "MID", club: "FC Barcelona", number: 21 },
      { name: "Tijjani Reijnders", position: "MID", club: "AC Milan", number: 14 },
      { name: "Cody Gakpo", position: "FWD", club: "Liverpool", number: 11 },
      { name: "Memphis Depay", position: "FWD", club: "Atlético Madrid", number: 10 },
    ],
    wcHistory: [
      "3× runners-up (1974, 1978, 2010)",
      "Third place in 2014",
      "Semi-finalists in 2022",
      "10 World Cup appearances",
    ],
  },
  {
    id: "japan",
    name: "Japan",
    shortName: "Japan",
    code: "JPN",
    flag: "jp",
    group: "F",
    coach: "Hajime Moriyasu",
    fifaRank: 17,
    formation: "4-2-3-1",
    tactics: "Compact pressing, fast transitions, technically gifted. Known for giant-killing performances.",
    players: [
      { name: "Shuichi Gonda", position: "GK", club: "Shimizu S-Pulse", number: 12 },
      { name: "Hiroki Sakai", position: "DEF", club: "Urawa Red Diamonds", number: 5 },
      { name: "Wataru Endō", position: "MID", club: "Liverpool", number: 6, isCaptain: true },
      { name: "Takefusa Kubo", position: "MID", club: "Real Sociedad", number: 10 },
      { name: "Kaoru Mitoma", position: "FWD", club: "Brighton", number: 11 },
      { name: "Ayase Ueda", position: "FWD", club: "Feyenoord", number: 9 },
    ],
    wcHistory: [
      "7 World Cup appearances",
      "Best result: Round of 16 (2002, 2010, 2018, 2022)",
      "Knocked out Germany and Spain in 2022 group stage",
    ],
  },
  {
    id: "uefaplayoffb",
    name: "Sweden",
    shortName: "Sweden",
    code: "SWE",
    flag: "se",
    group: "F",
    coach: "Jon Dahl Tomasson",
    fifaRank: 23,
    formation: "4-4-2",
    tactics: "Organised and hard-working, strong defensively with clinical counter-attacking.",
    players: [
      { name: "Robin Olsen", position: "GK", club: "Aston Villa", number: 1 },
      { name: "Emil Krafth", position: "DEF", club: "Newcastle United", number: 2 },
      { name: "Viktor Claesson", position: "MID", club: "Feyenoord", number: 7 },
      { name: "Alexander Isak", position: "FWD", club: "Newcastle United", number: 9, isCaptain: true },
      { name: "Dejan Kulusevski", position: "FWD", club: "Tottenham Hotspur", number: 11 },
    ],
    wcHistory: [
      "12 World Cup appearances",
      "Third place in 1994 and 1950",
      "Quarter-finalists in 2018",
    ],
  },
  {
    id: "tunisia",
    name: "Tunisia",
    shortName: "Tunisia",
    code: "TUN",
    flag: "tn",
    group: "F",
    coach: "Faouzi Benzarti",
    fifaRank: 28,
    formation: "4-3-3",
    tactics: "Organised and disciplined, relying on tactical structure and collective work rate.",
    players: [
      { name: "Aymen Dahmen", position: "GK", club: "Stade de Reims", number: 1 },
      { name: "Yassine Meriah", position: "DEF", club: "Club Africain", number: 5 },
      { name: "Aïssa Laïdouni", position: "MID", club: "Mainz", number: 8 },
      { name: "Wahbi Khazri", position: "MID", club: "Saint-Étienne", number: 10, isCaptain: true },
      { name: "Seifeddine Jaziri", position: "FWD", club: "Zamalek", number: 9 },
    ],
    wcHistory: [
      "6 World Cup appearances",
      "Best result: Group stage exits",
      "Reached 2022 World Cup group stage",
    ],
  },
  // Group G
  {
    id: "belgium",
    name: "Belgium",
    shortName: "Belgium",
    code: "BEL",
    flag: "be",
    group: "G",
    coach: "Domenico Tedesco",
    fifaRank: 3,
    formation: "3-4-3",
    tactics: "High talent density. Relies on creative freedom and individual quality across the pitch.",
    players: [
      { name: "Thibaut Courtois", position: "GK", club: "Real Madrid", number: 1 },
      { name: "Toby Alderweireld", position: "DEF", club: "Royal Antwerp", number: 4 },
      { name: "Kevin De Bruyne", position: "MID", club: "Manchester City", number: 7, isCaptain: true },
      { name: "Youri Tielemans", position: "MID", club: "Aston Villa", number: 8 },
      { name: "Romelu Lukaku", position: "FWD", club: "Napoli", number: 9 },
      { name: "Leandro Trossard", position: "FWD", club: "Arsenal", number: 11 },
    ],
    wcHistory: [
      "Third place in 2018 (peak of the Golden Generation)",
      "Quarter-finalists in 2022",
      "14 World Cup appearances",
    ],
  },
  {
    id: "egypt",
    name: "Egypt",
    shortName: "Egypt",
    code: "EGY",
    flag: "eg",
    group: "G",
    coach: "Ihab Galal",
    fifaRank: 36,
    formation: "4-2-3-1",
    tactics: "Defensive solidity with Mohamed Salah's creativity and pace as the main attacking threat.",
    players: [
      { name: "Mohamed El-Shennawy", position: "GK", club: "Al-Ahly", number: 1 },
      { name: "Ahmed Hegazi", position: "DEF", club: "Al-Ittihad", number: 5, isCaptain: true },
      { name: "Tarek Hamed", position: "MID", club: "Zamalek", number: 6 },
      { name: "Mohamed Salah", position: "FWD", club: "Liverpool", number: 10 },
      { name: "Omar Marmoush", position: "FWD", club: "Manchester City", number: 9 },
    ],
    wcHistory: [
      "3 World Cup appearances (1934, 1990, 2018)",
      "Group stage exit in 2018",
      "Powered by Mohamed Salah",
    ],
  },
  {
    id: "iran",
    name: "Iran",
    shortName: "Iran",
    code: "IRN",
    flag: "ir",
    group: "G",
    coach: "Amir Ghalenoei",
    fifaRank: 21,
    formation: "4-1-4-1",
    tactics: "Disciplined, low-block defence with fast counter-attacks and set-piece threats.",
    players: [
      { name: "Alireza Beiranvand", position: "GK", club: "Persepolis", number: 1 },
      { name: "Sadegh Moharrami", position: "DEF", club: "Dinamo Zagreb", number: 2 },
      { name: "Alireza Jahanbakhsh", position: "MID", club: "Feyenoord", number: 11 },
      { name: "Mehdi Taremi", position: "FWD", club: "Internazionale", number: 9, isCaptain: true },
      { name: "Sardar Azmoun", position: "FWD", club: "Bayer Leverkusen", number: 17 },
    ],
    wcHistory: [
      "6 World Cup appearances",
      "First win at World Cup against USA in 1998",
      "Group stage exits in 2018 and 2022",
    ],
  },
  {
    id: "newzealand",
    name: "New Zealand",
    shortName: "New Zealand",
    code: "NZL",
    flag: "nz",
    group: "G",
    coach: "Darren Bazeley",
    fifaRank: 95,
    formation: "4-4-2",
    tactics: "Hard-working and physical, looking to upset bigger nations.",
    players: [
      { name: "Oliver Sail", position: "GK", club: "Kingstonian", number: 1 },
      { name: "Winston Reid", position: "DEF", club: "Retired", number: 5, isCaptain: true },
      { name: "Chris Wood", position: "FWD", club: "Nottingham Forest", number: 9 },
    ],
    wcHistory: [
      "2 World Cup appearances (1982, 2010)",
      "Unbeaten in 2010 group stage (drew all 3 games)",
    ],
  },
  // Group H
  {
    id: "spain",
    name: "Spain",
    shortName: "Spain",
    code: "ESP",
    flag: "es",
    group: "H",
    coach: "Luis de la Fuente",
    fifaRank: 8,
    formation: "4-3-3",
    tactics: "Possession-based tiki-taka with fluid pressing and technical excellence throughout.",
    players: [
      { name: "Unai Simón", position: "GK", club: "Athletic Bilbao", number: 23 },
      { name: "Dani Carvajal", position: "DEF", club: "Real Madrid", number: 2, isCaptain: true },
      { name: "Robin Le Normand", position: "DEF", club: "Atlético Madrid", number: 4 },
      { name: "Rodri", position: "MID", club: "Manchester City", number: 16 },
      { name: "Pedri", position: "MID", club: "FC Barcelona", number: 26 },
      { name: "Lamine Yamal", position: "FWD", club: "FC Barcelona", number: 19 },
      { name: "Nico Williams", position: "FWD", club: "Athletic Bilbao", number: 17 },
      { name: "Álvaro Morata", position: "FWD", club: "AC Milan", number: 7 },
    ],
    wcHistory: [
      "1 World Cup title (2010)",
      "Euro 2024 champions",
      "Eliminated in Round of 16 in 2022",
      "15 World Cup appearances",
    ],
  },
  {
    id: "capeverde",
    name: "Cape Verde",
    shortName: "Cape Verde",
    code: "CPV",
    flag: "cv",
    group: "H",
    coach: "Bubista",
    fifaRank: 72,
    formation: "4-3-3",
    tactics: "Energetic and compact, fast on transitions with technical Portuguese-influenced play.",
    players: [
      { name: "Vozinha", position: "GK", club: "Casa Pia", number: 1 },
      { name: "Roberto Lopes", position: "DEF", club: "Shamrock Rovers", number: 5, isCaptain: true },
      { name: "Jamiro Monteiro", position: "MID", club: "Getafe", number: 10 },
      { name: "Ryan Mendes", position: "FWD", club: "Al-Qadsiah", number: 11 },
    ],
    wcHistory: [
      "First-ever World Cup appearance",
      "Remarkable qualification journey",
    ],
  },
  {
    id: "saudi",
    name: "Saudi Arabia",
    shortName: "Saudi Arabia",
    code: "KSA",
    flag: "sa",
    group: "H",
    coach: "Roberto Mancini",
    fifaRank: 56,
    formation: "4-4-2",
    tactics: "Compact defensive shape, dangerous on the counter. Famous for upsetting Argentina in 2022.",
    players: [
      { name: "Mohammed Al-Owais", position: "GK", club: "Al-Hilal", number: 1, isCaptain: true },
      { name: "Saud Abdulhamid", position: "DEF", club: "Roma", number: 13 },
      { name: "Salem Al-Dawsari", position: "FWD", club: "Al-Hilal", number: 10 },
      { name: "Firas Al-Buraikan", position: "FWD", club: "Al-Fateh", number: 19 },
    ],
    wcHistory: [
      "6 World Cup appearances",
      "Famous 2-1 win vs Argentina in 2022",
      "Best result: Round of 16 (1994)",
    ],
  },
  {
    id: "uruguay",
    name: "Uruguay",
    shortName: "Uruguay",
    code: "URU",
    flag: "uy",
    group: "H",
    coach: "Marcelo Bielsa",
    fifaRank: 19,
    formation: "4-3-3",
    tactics: "Technically gifted and physically combative, with world-class attacking talent.",
    players: [
      { name: "Sergio Rochet", position: "GK", club: "Nacional", number: 1 },
      { name: "José María Giménez", position: "DEF", club: "Atlético Madrid", number: 2, isCaptain: true },
      { name: "Rodrigo Bentancur", position: "MID", club: "Tottenham Hotspur", number: 8 },
      { name: "Federico Valverde", position: "MID", club: "Real Madrid", number: 14 },
      { name: "Darwin Núñez", position: "FWD", club: "Liverpool", number: 11 },
    ],
    wcHistory: [
      "2 World Cup titles (1930, 1950)",
      "Semi-finalists in 2010",
      "15 World Cup appearances",
    ],
  },
  // Group I
  {
    id: "france",
    name: "France",
    shortName: "France",
    code: "FRA",
    flag: "fr",
    group: "I",
    coach: "Didier Deschamps",
    fifaRank: 2,
    formation: "4-3-3",
    tactics: "World-class individual talent across all positions. Physically dominant with deadly pace.",
    players: [
      { name: "Mike Maignan", position: "GK", club: "AC Milan", number: 16 },
      { name: "Jules Koundé", position: "DEF", club: "FC Barcelona", number: 5 },
      { name: "Dayot Upamecano", position: "DEF", club: "Bayern Munich", number: 4 },
      { name: "Aurélien Tchouaméni", position: "MID", club: "Real Madrid", number: 8 },
      { name: "Antoine Griezmann", position: "MID", club: "Atlético Madrid", number: 7, isCaptain: true },
      { name: "Kylian Mbappé", position: "FWD", club: "Real Madrid", number: 10 },
      { name: "Ousmane Dembélé", position: "FWD", club: "PSG", number: 11 },
      { name: "Marcus Thuram", position: "FWD", club: "Internazionale", number: 9 },
    ],
    wcHistory: [
      "2 World Cup titles (1998, 2018)",
      "Runners-up in 2006, 2022",
      "15 World Cup appearances",
    ],
  },
  {
    id: "senegal",
    name: "Senegal",
    shortName: "Senegal",
    code: "SEN",
    flag: "sn",
    group: "I",
    coach: "Aliou Cissé",
    fifaRank: 20,
    formation: "4-3-3",
    tactics: "Physical and athletic with dynamic wing play and strong midfield pressing.",
    players: [
      { name: "Édouard Mendy", position: "GK", club: "Al-Ahli", number: 1 },
      { name: "Kalidou Koulibaly", position: "DEF", club: "Al-Hilal", number: 3, isCaptain: true },
      { name: "Idrissa Gueye", position: "MID", club: "Éverton", number: 6 },
      { name: "Sadio Mané", position: "FWD", club: "Al-Nassr", number: 10 },
      { name: "Ismaïla Sarr", position: "FWD", club: "Crystal Palace", number: 23 },
    ],
    wcHistory: [
      "3 World Cup appearances",
      "Quarter-finalists in 2002",
      "Reached Round of 16 in 2022",
      "AFCON champions 2022",
    ],
  },
  {
    id: "fifaplayoff2",
    name: "Iraq",
    shortName: "Iraq",
    code: "IRQ",
    flag: "iq",
    group: "I",
    coach: "Jesús Casas",
    fifaRank: 57,
    formation: "4-3-3",
    tactics: "Disciplined and organised, with pace on the counter and strong collective spirit.",
    players: [
      { name: "Jalal Hassan", position: "GK", club: "Al-Zawraa", number: 1 },
      { name: "Ali Adnan", position: "DEF", club: "Al-Quwa Al-Jawiya", number: 3, isCaptain: true },
      { name: "Amjed Attwan", position: "MID", club: "Al-Zawraa", number: 8 },
      { name: "Aymen Hussein", position: "FWD", club: "Al-Zawraa", number: 9 },
    ],
    wcHistory: [
      "1 World Cup appearance (1986)",
      "Group stage exit in 1986",
      "Second World Cup qualification",
    ],
  },
  {
    id: "norway",
    name: "Norway",
    shortName: "Norway",
    code: "NOR",
    flag: "no",
    group: "I",
    coach: "Ståle Solbakken",
    fifaRank: 25,
    formation: "4-3-3",
    tactics: "Direct and physical with Haaland as the focal point, strong from set pieces.",
    players: [
      { name: "Ørjan Nyland", position: "GK", club: "Ipswich Town", number: 1 },
      { name: "Kristoffer Ajer", position: "DEF", club: "Brentford", number: 5 },
      { name: "Martin Ødegaard", position: "MID", club: "Arsenal", number: 8, isCaptain: true },
      { name: "Sander Berge", position: "MID", club: "Burnley", number: 6 },
      { name: "Erling Haaland", position: "FWD", club: "Manchester City", number: 9 },
    ],
    wcHistory: [
      "3 World Cup appearances (last in 1998)",
      "First qualification since 1998",
    ],
  },
  // Group J
  {
    id: "argentina",
    name: "Argentina",
    shortName: "Argentina",
    code: "ARG",
    flag: "ar",
    group: "J",
    coach: "Lionel Scaloni",
    fifaRank: 1,
    formation: "4-3-3",
    tactics:
      "Organised possession football with devastating individual brilliance. Defensively resolute.",
    players: [
      { name: "Emiliano Martínez", position: "GK", club: "Aston Villa", number: 23 },
      { name: "Nahuel Molina", position: "DEF", club: "Atlético Madrid", number: 26 },
      { name: "Cristian Romero", position: "DEF", club: "Tottenham Hotspur", number: 13 },
      { name: "Rodrigo De Paul", position: "MID", club: "Atlético Madrid", number: 7 },
      { name: "Enzo Fernández", position: "MID", club: "Chelsea", number: 24 },
      { name: "Lionel Messi", position: "FWD", club: "Inter Miami", number: 10, isCaptain: true },
      { name: "Julián Álvarez", position: "FWD", club: "Atlético Madrid", number: 9 },
      { name: "Lautaro Martínez", position: "FWD", club: "Internazionale", number: 22 },
    ],
    wcHistory: [
      "3 World Cup titles (1978, 1986, 2022)",
      "Runners-up in 2014",
      "Current world champions",
      "18 World Cup appearances",
    ],
  },
  {
    id: "algeria",
    name: "Algeria",
    shortName: "Algeria",
    code: "ALG",
    flag: "dz",
    group: "J",
    coach: "Djamel Belmadi",
    fifaRank: 35,
    formation: "4-3-3",
    tactics: "Technical and tactically disciplined, with creativity in attacking areas.",
    players: [
      { name: "Raïs M'Bolhi", position: "GK", club: "ES Sétif", number: 1 },
      { name: "Aïssa Mandi", position: "DEF", club: "Villarreal", number: 2, isCaptain: true },
      { name: "Ismaël Bennacer", position: "MID", club: "AC Milan", number: 8 },
      { name: "Riyad Mahrez", position: "FWD", club: "Al-Ahli", number: 7 },
      { name: "Islam Slimani", position: "FWD", club: "Brest", number: 9 },
    ],
    wcHistory: [
      "4 World Cup appearances",
      "Round of 16 in 2014 (defeated South Korea, lost to Germany)",
      "AFCON Champions 2019",
    ],
  },
  {
    id: "austria",
    name: "Austria",
    shortName: "Austria",
    code: "AUT",
    flag: "at",
    group: "J",
    coach: "Ralf Rangnick",
    fifaRank: 26,
    formation: "4-2-3-1",
    tactics: "High pressing, intense gegenpressing style under Rangnick. Strong collective organisation.",
    players: [
      { name: "Patrick Pentz", position: "GK", club: "Bayer Leverkusen", number: 1 },
      { name: "David Alaba", position: "DEF", club: "Real Madrid", number: 8, isCaptain: true },
      { name: "Stefan Posch", position: "DEF", club: "Bologna", number: 5 },
      { name: "Marcel Sabitzer", position: "MID", club: "Borussia Dortmund", number: 7 },
      { name: "Konrad Laimer", position: "MID", club: "Bayern Munich", number: 10 },
      { name: "Marko Arnautović", position: "FWD", club: "Internazionale", number: 9 },
    ],
    wcHistory: [
      "7 World Cup appearances (last in 1998)",
      "First qualification since 1998",
      "Euro 2024 quarter-finalists",
    ],
  },
  {
    id: "jordan",
    name: "Jordan",
    shortName: "Jordan",
    code: "JOR",
    flag: "jo",
    group: "J",
    coach: "Husam Abu Ali",
    fifaRank: 68,
    formation: "4-4-2",
    tactics: "Defensive and organised, relying on discipline and set-piece threats.",
    players: [
      { name: "Yazeed Abulaila", position: "GK", club: "Al-Wehdah", number: 1 },
      { name: "Ahmad Hasan", position: "DEF", club: "Al-Wahdat", number: 5, isCaptain: true },
      { name: "Musa Al-Tamari", position: "FWD", club: "Montpellier", number: 11 },
    ],
    wcHistory: [
      "First-ever World Cup appearance",
      "Reached the Asian Cup final in 2023",
    ],
  },
  // Group K
  {
    id: "portugal",
    name: "Portugal",
    shortName: "Portugal",
    code: "POR",
    flag: "pt",
    group: "K",
    coach: "Roberto Martínez",
    fifaRank: 6,
    formation: "4-2-3-1",
    tactics: "Offensive-minded with high-quality attacking talent and strong midfield base.",
    players: [
      { name: "Diogo Costa", position: "GK", club: "FC Porto", number: 1 },
      { name: "Rúben Dias", position: "DEF", club: "Manchester City", number: 4, isCaptain: true },
      { name: "Nuno Mendes", position: "DEF", club: "PSG", number: 19 },
      { name: "Vitinha", position: "MID", club: "PSG", number: 16 },
      { name: "Bruno Fernandes", position: "MID", club: "Manchester United", number: 8 },
      { name: "Cristiano Ronaldo", position: "FWD", club: "Al-Nassr", number: 7 },
      { name: "Rafael Leão", position: "FWD", club: "AC Milan", number: 11 },
      { name: "Pedro Neto", position: "FWD", club: "Chelsea", number: 17 },
    ],
    wcHistory: [
      "Third place in 1966",
      "Semi-finalists in 2006 and 2022",
      "8 World Cup appearances",
    ],
  },
  {
    id: "fifaplayoff1",
    name: "DR Congo",
    shortName: "DR Congo",
    code: "COD",
    flag: "cd",
    group: "K",
    coach: "Sébastien Desabre",
    fifaRank: 53,
    formation: "4-3-3",
    tactics: "Athletic and direct, with explosive pace and raw attacking talent.",
    players: [
      { name: "Joël Kiassumbua", position: "GK", club: "Charleroi", number: 1 },
      { name: "Chancel Mbemba", position: "DEF", club: "Marseille", number: 5, isCaptain: true },
      { name: "Théo Bongonda", position: "MID", club: "Galatasaray", number: 10 },
      { name: "Cédric Bakambu", position: "FWD", club: "Marseille", number: 9 },
    ],
    wcHistory: [
      "1 World Cup appearance as Zaire (1974)",
      "First qualification since 1974",
      "Rich footballing tradition in Central Africa",
    ],
  },
  {
    id: "uzbekistan",
    name: "Uzbekistan",
    shortName: "Uzbekistan",
    code: "UZB",
    flag: "uz",
    group: "K",
    coach: "Srecko Katanec",
    fifaRank: 74,
    formation: "4-3-3",
    tactics: "Technical and ambitious, representing the growth of Central Asian football.",
    players: [
      { name: "Eldorbek Sobirov", position: "GK", club: "Pakhtakor", number: 1 },
      { name: "Jaloliddin Masharipov", position: "MID", club: "Lokomotiv Tashkent", number: 10, isCaptain: true },
      { name: "Eldor Shomurodov", position: "FWD", club: "AS Roma", number: 9 },
    ],
    wcHistory: [
      "First-ever World Cup appearance",
      "Historic qualification from AFC",
    ],
  },
  {
    id: "colombia",
    name: "Colombia",
    shortName: "Colombia",
    code: "COL",
    flag: "co",
    group: "K",
    coach: "Néstor Lorenzo",
    fifaRank: 9,
    formation: "4-2-3-1",
    tactics: "Creative and fluid attacking play with defensive solidity through disciplined midfield.",
    players: [
      { name: "David Ospina", position: "GK", club: "Al-Qadsiah", number: 1 },
      { name: "Dávinson Sánchez", position: "DEF", club: "Galatasaray", number: 2 },
      { name: "Wilmar Barrios", position: "MID", club: "Zenit", number: 5 },
      { name: "James Rodríguez", position: "MID", club: "Rayo Vallecano", number: 10, isCaptain: true },
      { name: "Luis Díaz", position: "FWD", club: "Liverpool", number: 7 },
      { name: "Jhon Durán", position: "FWD", club: "Aston Villa", number: 9 },
    ],
    wcHistory: [
      "6 World Cup appearances",
      "Best result: Quarter-finals (2014)",
      "Copa América runners-up 2024",
    ],
  },
  // Group L
  {
    id: "england",
    name: "England",
    shortName: "England",
    code: "ENG",
    flag: "gb-eng",
    group: "L",
    coach: "Gareth Southgate",
    fifaRank: 4,
    formation: "4-2-3-1",
    tactics: "Organised, shape-based football with quality in attacking positions and set pieces.",
    players: [
      { name: "Jordan Pickford", position: "GK", club: "Éverton", number: 1 },
      { name: "Trent Alexander-Arnold", position: "DEF", club: "Real Madrid", number: 12 },
      { name: "John Stones", position: "DEF", club: "Manchester City", number: 5 },
      { name: "Declan Rice", position: "MID", club: "Arsenal", number: 4 },
      { name: "Jude Bellingham", position: "MID", club: "Real Madrid", number: 10 },
      { name: "Harry Kane", position: "FWD", club: "Bayern Munich", number: 9, isCaptain: true },
      { name: "Bukayo Saka", position: "FWD", club: "Arsenal", number: 7 },
      { name: "Phil Foden", position: "FWD", club: "Manchester City", number: 11 },
    ],
    wcHistory: [
      "1966 World Cup champions (home soil)",
      "Semi-finalists in 2018",
      "Euro 2024 finalists",
      "16 World Cup appearances",
    ],
  },
  {
    id: "croatia",
    name: "Croatia",
    shortName: "Croatia",
    code: "CRO",
    flag: "hr",
    group: "L",
    coach: "Zlatko Dalić",
    fifaRank: 10,
    formation: "4-3-3",
    tactics: "Deep, organised defensive block with quality in midfield and ruthless on the break.",
    players: [
      { name: "Dominik Livaković", position: "GK", club: "Fenerbahçe", number: 1 },
      { name: "Josip Šutalo", position: "DEF", club: "Ajax", number: 6 },
      { name: "Luka Modrić", position: "MID", club: "Real Madrid", number: 10, isCaptain: true },
      { name: "Mateo Kovačić", position: "MID", club: "Manchester City", number: 8 },
      { name: "Marcelo Brozović", position: "MID", club: "Al-Nassr", number: 11 },
      { name: "Ivan Perišić", position: "FWD", club: "Hajduk Split", number: 4 },
      { name: "Andrej Kramarić", position: "FWD", club: "TSG Hoffenheim", number: 9 },
    ],
    wcHistory: [
      "Runners-up in 2018",
      "Third place in 2022",
      "Third place on debut in 1998",
      "7 World Cup appearances",
    ],
  },
  {
    id: "ghana",
    name: "Ghana",
    shortName: "Ghana",
    code: "GHA",
    flag: "gh",
    group: "L",
    coach: "Otto Addo",
    fifaRank: 60,
    formation: "4-2-3-1",
    tactics: "Athletic and direct, relies on physical midfield and speedy wingers.",
    players: [
      { name: "Lawrence Ati-Zigi", position: "GK", club: "St. Gallen", number: 1 },
      { name: "Daniel Amartey", position: "DEF", club: "Besiktas", number: 5, isCaptain: true },
      { name: "Thomas Partey", position: "MID", club: "Arsenal", number: 6 },
      { name: "Mohammed Kudus", position: "FWD", club: "West Ham", number: 10 },
      { name: "Jordan Ayew", position: "FWD", club: "Leicester City", number: 11 },
    ],
    wcHistory: [
      "3 World Cup appearances",
      "Quarter-finalists in 2010 (only penalty shoot-out away from semi-final)",
      "Memorable group stage in 2022",
    ],
  },
  {
    id: "panama",
    name: "Panama",
    shortName: "Panama",
    code: "PAN",
    flag: "pa",
    group: "L",
    coach: "Thomas Christiansen",
    fifaRank: 77,
    formation: "4-4-2",
    tactics: "Compact and organised, looking to make the most of set pieces.",
    players: [
      { name: "Luis Mejía", position: "GK", club: "Club Deportivo Árabe Unido", number: 1 },
      { name: "Anibal Godoy", position: "MID", club: "Nashville SC", number: 5, isCaptain: true },
      { name: "Cecilio Waterman", position: "FWD", club: "KV Kortrijk", number: 11 },
    ],
    wcHistory: [
      "2 World Cup appearances (2018, 2026)",
      "Group stage exit in 2018",
      "First CONCACAF nation to score at a World Cup in 2018",
    ],
  },
];

// ─── Groups ───────────────────────────────────────────────────────────────────

export const groups: Group[] = [
  {
    id: "A",
    label: "Group A",
    teamIds: ["mexico", "southafrica", "southkorea", "uefaplayoffd"],
    standings: [
      { teamId: "mexico",       played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "southafrica",  played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "southkorea",   played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "uefaplayoffd", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
    ],
  },
  {
    id: "B",
    label: "Group B",
    teamIds: ["canada", "uefaplayoffa", "qatar", "switzerland"],
    standings: [
      { teamId: "canada",       played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "uefaplayoffa", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "qatar",        played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "switzerland",  played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
    ],
  },
  {
    id: "C",
    label: "Group C",
    teamIds: ["brazil", "morocco", "haiti", "scotland"],
    standings: [
      { teamId: "brazil",   played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "morocco",  played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "haiti",    played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "scotland", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
    ],
  },
  {
    id: "D",
    label: "Group D",
    teamIds: ["usa", "paraguay", "australia", "uefaplayoffc"],
    standings: [
      { teamId: "usa",          played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "paraguay",     played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "australia",    played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "uefaplayoffc", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
    ],
  },
  {
    id: "E",
    label: "Group E",
    teamIds: ["germany", "curacao", "ivorycoast", "ecuador"],
    standings: [
      { teamId: "germany",    played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "curacao",    played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "ivorycoast", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "ecuador",    played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
    ],
  },
  {
    id: "F",
    label: "Group F",
    teamIds: ["netherlands", "japan", "uefaplayoffb", "tunisia"],
    standings: [
      { teamId: "netherlands",  played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "japan",        played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "uefaplayoffb", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "tunisia",      played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
    ],
  },
  {
    id: "G",
    label: "Group G",
    teamIds: ["belgium", "egypt", "iran", "newzealand"],
    standings: [
      { teamId: "belgium",    played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "egypt",      played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "iran",       played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "newzealand", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
    ],
  },
  {
    id: "H",
    label: "Group H",
    teamIds: ["spain", "capeverde", "saudi", "uruguay"],
    standings: [
      { teamId: "spain",     played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "capeverde", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "saudi",     played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "uruguay",   played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
    ],
  },
  {
    id: "I",
    label: "Group I",
    teamIds: ["france", "senegal", "fifaplayoff2", "norway"],
    standings: [
      { teamId: "france",       played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "senegal",      played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "fifaplayoff2", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "norway",       played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
    ],
  },
  {
    id: "J",
    label: "Group J",
    teamIds: ["argentina", "algeria", "austria", "jordan"],
    standings: [
      { teamId: "argentina", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "algeria",   played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "austria",   played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "jordan",    played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
    ],
  },
  {
    id: "K",
    label: "Group K",
    teamIds: ["portugal", "fifaplayoff1", "uzbekistan", "colombia"],
    standings: [
      { teamId: "portugal",     played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "fifaplayoff1", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "uzbekistan",   played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "colombia",     played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
    ],
  },
  {
    id: "L",
    label: "Group L",
    teamIds: ["england", "croatia", "ghana", "panama"],
    standings: [
      { teamId: "england", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "croatia", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "ghana",   played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "panama",  played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
    ],
  },
];

// ─── Fixtures ─────────────────────────────────────────────────────────────────

export const fixtures: Fixture[] = [
  // ── Group A ─────────────────────────────────────────────────────────────────
  { id: "m01", homeTeamId: "mexico",       awayTeamId: "southafrica",  date: "2026-06-11", time: "15:00", venue: "TBD", city: "TBD", country: "TBD", group: "A", matchday: 1, stage: "group", status: "upcoming" },
  { id: "m02", homeTeamId: "southkorea",   awayTeamId: "uefaplayoffd", date: "2026-06-12", time: "22:00", venue: "TBD", city: "TBD", country: "TBD", group: "A", matchday: 1, stage: "group", status: "upcoming" },
  { id: "m03", homeTeamId: "uefaplayoffd", awayTeamId: "southafrica",  date: "2026-06-25", time: "12:00", venue: "TBD", city: "TBD", country: "TBD", group: "A", matchday: 2, stage: "group", status: "upcoming" },
  { id: "m04", homeTeamId: "mexico",       awayTeamId: "southkorea",   date: "2026-06-19", time: "21:00", venue: "TBD", city: "TBD", country: "TBD", group: "A", matchday: 2, stage: "group", status: "upcoming" },
  { id: "m05", homeTeamId: "southafrica",  awayTeamId: "southkorea",   date: "2026-06-25", time: "21:00", venue: "TBD", city: "TBD", country: "TBD", group: "A", matchday: 3, stage: "group", status: "upcoming" },
  { id: "m06", homeTeamId: "uefaplayoffd", awayTeamId: "mexico",       date: "2026-06-25", time: "21:00", venue: "TBD", city: "TBD", country: "TBD", group: "A", matchday: 3, stage: "group", status: "upcoming" },
  // ── Group B ─────────────────────────────────────────────────────────────────
  { id: "m07", homeTeamId: "canada",       awayTeamId: "uefaplayoffa", date: "2026-06-12", time: "15:00", venue: "TBD", city: "TBD", country: "TBD", group: "B", matchday: 1, stage: "group", status: "upcoming" },
  { id: "m08", homeTeamId: "qatar",        awayTeamId: "switzerland",  date: "2026-06-14", time: "15:00", venue: "TBD", city: "TBD", country: "TBD", group: "B", matchday: 1, stage: "group", status: "upcoming" },
  { id: "m09", homeTeamId: "switzerland",  awayTeamId: "uefaplayoffa", date: "2026-06-19", time: "15:00", venue: "TBD", city: "TBD", country: "TBD", group: "B", matchday: 2, stage: "group", status: "upcoming" },
  { id: "m10", homeTeamId: "canada",       awayTeamId: "qatar",        date: "2026-06-19", time: "18:00", venue: "TBD", city: "TBD", country: "TBD", group: "B", matchday: 2, stage: "group", status: "upcoming" },
  { id: "m11", homeTeamId: "switzerland",  awayTeamId: "canada",       date: "2026-06-25", time: "15:00", venue: "TBD", city: "TBD", country: "TBD", group: "B", matchday: 3, stage: "group", status: "upcoming" },
  { id: "m12", homeTeamId: "uefaplayoffa", awayTeamId: "qatar",        date: "2026-06-25", time: "15:00", venue: "TBD", city: "TBD", country: "TBD", group: "B", matchday: 3, stage: "group", status: "upcoming" },
  // ── Group C ─────────────────────────────────────────────────────────────────
  { id: "m13", homeTeamId: "brazil",       awayTeamId: "morocco",      date: "2026-06-13", time: "18:00", venue: "TBD", city: "TBD", country: "TBD", group: "C", matchday: 1, stage: "group", status: "upcoming" },
  { id: "m14", homeTeamId: "haiti",        awayTeamId: "scotland",     date: "2026-06-13", time: "21:00", venue: "TBD", city: "TBD", country: "TBD", group: "C", matchday: 1, stage: "group", status: "upcoming" },
  { id: "m15", homeTeamId: "scotland",     awayTeamId: "morocco",      date: "2026-06-20", time: "18:00", venue: "TBD", city: "TBD", country: "TBD", group: "C", matchday: 2, stage: "group", status: "upcoming" },
  { id: "m16", homeTeamId: "brazil",       awayTeamId: "haiti",        date: "2026-06-20", time: "20:30", venue: "TBD", city: "TBD", country: "TBD", group: "C", matchday: 2, stage: "group", status: "upcoming" },
  { id: "m17", homeTeamId: "morocco",      awayTeamId: "haiti",        date: "2026-06-25", time: "18:00", venue: "TBD", city: "TBD", country: "TBD", group: "C", matchday: 3, stage: "group", status: "upcoming" },
  { id: "m18", homeTeamId: "scotland",     awayTeamId: "brazil",       date: "2026-06-25", time: "18:00", venue: "TBD", city: "TBD", country: "TBD", group: "C", matchday: 3, stage: "group", status: "upcoming" },
  // ── Group D ─────────────────────────────────────────────────────────────────
  { id: "m19", homeTeamId: "usa",          awayTeamId: "paraguay",     date: "2026-06-13", time: "21:00", venue: "TBD", city: "TBD", country: "TBD", group: "D", matchday: 1, stage: "group", status: "upcoming" },
  { id: "m20", homeTeamId: "australia",    awayTeamId: "uefaplayoffc", date: "2026-06-14", time: "00:00", venue: "TBD", city: "TBD", country: "TBD", group: "D", matchday: 1, stage: "group", status: "upcoming" },
  { id: "m21", homeTeamId: "usa",          awayTeamId: "australia",    date: "2026-06-20", time: "15:00", venue: "TBD", city: "TBD", country: "TBD", group: "D", matchday: 2, stage: "group", status: "upcoming" },
  { id: "m22", homeTeamId: "uefaplayoffc", awayTeamId: "paraguay",     date: "2026-06-20", time: "23:00", venue: "TBD", city: "TBD", country: "TBD", group: "D", matchday: 2, stage: "group", status: "upcoming" },
  { id: "m23", homeTeamId: "uefaplayoffc", awayTeamId: "usa",          date: "2026-06-25", time: "22:00", venue: "TBD", city: "TBD", country: "TBD", group: "D", matchday: 3, stage: "group", status: "upcoming" },
  { id: "m24", homeTeamId: "paraguay",     awayTeamId: "australia",    date: "2026-06-26", time: "22:00", venue: "TBD", city: "TBD", country: "TBD", group: "D", matchday: 3, stage: "group", status: "upcoming" },
  // ── Group E ─────────────────────────────────────────────────────────────────
  { id: "m25", homeTeamId: "germany",      awayTeamId: "curacao",      date: "2026-06-14", time: "13:00", venue: "TBD", city: "TBD", country: "TBD", group: "E", matchday: 1, stage: "group", status: "upcoming" },
  { id: "m26", homeTeamId: "ivorycoast",   awayTeamId: "ecuador",      date: "2026-06-14", time: "19:00", venue: "TBD", city: "TBD", country: "TBD", group: "E", matchday: 1, stage: "group", status: "upcoming" },
  { id: "m27", homeTeamId: "germany",      awayTeamId: "ivorycoast",   date: "2026-06-20", time: "16:00", venue: "TBD", city: "TBD", country: "TBD", group: "E", matchday: 2, stage: "group", status: "upcoming" },
  { id: "m28", homeTeamId: "ecuador",      awayTeamId: "curacao",      date: "2026-06-20", time: "20:00", venue: "TBD", city: "TBD", country: "TBD", group: "E", matchday: 2, stage: "group", status: "upcoming" },
  { id: "m29", homeTeamId: "curacao",      awayTeamId: "ivorycoast",   date: "2026-06-26", time: "16:00", venue: "TBD", city: "TBD", country: "TBD", group: "E", matchday: 3, stage: "group", status: "upcoming" },
  { id: "m30", homeTeamId: "ecuador",      awayTeamId: "germany",      date: "2026-06-26", time: "16:00", venue: "TBD", city: "TBD", country: "TBD", group: "E", matchday: 3, stage: "group", status: "upcoming" },
  // ── Group F ─────────────────────────────────────────────────────────────────
  { id: "m31", homeTeamId: "netherlands",  awayTeamId: "japan",        date: "2026-06-14", time: "16:00", venue: "TBD", city: "TBD", country: "TBD", group: "F", matchday: 1, stage: "group", status: "upcoming" },
  { id: "m32", homeTeamId: "uefaplayoffb", awayTeamId: "tunisia",      date: "2026-06-14", time: "22:00", venue: "TBD", city: "TBD", country: "TBD", group: "F", matchday: 1, stage: "group", status: "upcoming" },
  { id: "m33", homeTeamId: "netherlands",  awayTeamId: "uefaplayoffb", date: "2026-06-20", time: "00:00", venue: "TBD", city: "TBD", country: "TBD", group: "F", matchday: 2, stage: "group", status: "upcoming" },
  { id: "m34", homeTeamId: "tunisia",      awayTeamId: "japan",        date: "2026-06-21", time: "00:00", venue: "TBD", city: "TBD", country: "TBD", group: "F", matchday: 2, stage: "group", status: "upcoming" },
  { id: "m35", homeTeamId: "tunisia",      awayTeamId: "netherlands",  date: "2026-06-26", time: "19:00", venue: "TBD", city: "TBD", country: "TBD", group: "F", matchday: 3, stage: "group", status: "upcoming" },
  { id: "m36", homeTeamId: "japan",        awayTeamId: "uefaplayoffb", date: "2026-06-26", time: "19:00", venue: "TBD", city: "TBD", country: "TBD", group: "F", matchday: 3, stage: "group", status: "upcoming" },
  // ── Group G ─────────────────────────────────────────────────────────────────
  { id: "m37", homeTeamId: "belgium",      awayTeamId: "egypt",        date: "2026-06-16", time: "15:00", venue: "TBD", city: "TBD", country: "TBD", group: "G", matchday: 1, stage: "group", status: "upcoming" },
  { id: "m38", homeTeamId: "iran",         awayTeamId: "newzealand",   date: "2026-06-16", time: "21:00", venue: "TBD", city: "TBD", country: "TBD", group: "G", matchday: 1, stage: "group", status: "upcoming" },
  { id: "m39", homeTeamId: "belgium",      awayTeamId: "iran",         date: "2026-06-22", time: "15:00", venue: "TBD", city: "TBD", country: "TBD", group: "G", matchday: 2, stage: "group", status: "upcoming" },
  { id: "m40", homeTeamId: "newzealand",   awayTeamId: "egypt",        date: "2026-06-22", time: "21:00", venue: "TBD", city: "TBD", country: "TBD", group: "G", matchday: 2, stage: "group", status: "upcoming" },
  { id: "m41", homeTeamId: "newzealand",   awayTeamId: "belgium",      date: "2026-06-27", time: "23:00", venue: "TBD", city: "TBD", country: "TBD", group: "G", matchday: 3, stage: "group", status: "upcoming" },
  { id: "m42", homeTeamId: "egypt",        awayTeamId: "iran",         date: "2026-06-27", time: "23:00", venue: "TBD", city: "TBD", country: "TBD", group: "G", matchday: 3, stage: "group", status: "upcoming" },
  // ── Group H ─────────────────────────────────────────────────────────────────
  { id: "m43", homeTeamId: "spain",        awayTeamId: "capeverde",    date: "2026-06-15", time: "12:00", venue: "TBD", city: "TBD", country: "TBD", group: "H", matchday: 1, stage: "group", status: "upcoming" },
  { id: "m44", homeTeamId: "saudi",        awayTeamId: "uruguay",      date: "2026-06-15", time: "18:00", venue: "TBD", city: "TBD", country: "TBD", group: "H", matchday: 1, stage: "group", status: "upcoming" },
  { id: "m45", homeTeamId: "spain",        awayTeamId: "saudi",        date: "2026-06-21", time: "12:00", venue: "TBD", city: "TBD", country: "TBD", group: "H", matchday: 2, stage: "group", status: "upcoming" },
  { id: "m46", homeTeamId: "uruguay",      awayTeamId: "capeverde",    date: "2026-06-22", time: "18:00", venue: "TBD", city: "TBD", country: "TBD", group: "H", matchday: 2, stage: "group", status: "upcoming" },
  { id: "m47", homeTeamId: "capeverde",    awayTeamId: "saudi",        date: "2026-06-27", time: "20:00", venue: "TBD", city: "TBD", country: "TBD", group: "H", matchday: 3, stage: "group", status: "upcoming" },
  { id: "m48", homeTeamId: "uruguay",      awayTeamId: "spain",        date: "2026-06-27", time: "20:00", venue: "TBD", city: "TBD", country: "TBD", group: "H", matchday: 3, stage: "group", status: "upcoming" },
  // ── Group I ─────────────────────────────────────────────────────────────────
  { id: "m49", homeTeamId: "france",       awayTeamId: "senegal",      date: "2026-06-17", time: "15:00", venue: "TBD", city: "TBD", country: "TBD", group: "I", matchday: 1, stage: "group", status: "upcoming" },
  { id: "m50", homeTeamId: "fifaplayoff2", awayTeamId: "norway",       date: "2026-06-17", time: "18:00", venue: "TBD", city: "TBD", country: "TBD", group: "I", matchday: 1, stage: "group", status: "upcoming" },
  { id: "m51", homeTeamId: "france",       awayTeamId: "fifaplayoff2", date: "2026-06-23", time: "17:00", venue: "TBD", city: "TBD", country: "TBD", group: "I", matchday: 2, stage: "group", status: "upcoming" },
  { id: "m52", homeTeamId: "norway",       awayTeamId: "senegal",      date: "2026-06-22", time: "20:00", venue: "TBD", city: "TBD", country: "TBD", group: "I", matchday: 2, stage: "group", status: "upcoming" },
  { id: "m53", homeTeamId: "norway",       awayTeamId: "france",       date: "2026-06-27", time: "15:00", venue: "TBD", city: "TBD", country: "TBD", group: "I", matchday: 3, stage: "group", status: "upcoming" },
  { id: "m54", homeTeamId: "senegal",      awayTeamId: "fifaplayoff2", date: "2026-06-27", time: "15:00", venue: "TBD", city: "TBD", country: "TBD", group: "I", matchday: 3, stage: "group", status: "upcoming" },
  // ── Group J ─────────────────────────────────────────────────────────────────
  { id: "m55", homeTeamId: "argentina",    awayTeamId: "algeria",      date: "2026-06-17", time: "21:00", venue: "TBD", city: "TBD", country: "TBD", group: "J", matchday: 1, stage: "group", status: "upcoming" },
  { id: "m56", homeTeamId: "austria",      awayTeamId: "jordan",       date: "2026-06-18", time: "00:00", venue: "TBD", city: "TBD", country: "TBD", group: "J", matchday: 1, stage: "group", status: "upcoming" },
  { id: "m57", homeTeamId: "argentina",    awayTeamId: "austria",      date: "2026-06-22", time: "13:00", venue: "TBD", city: "TBD", country: "TBD", group: "J", matchday: 2, stage: "group", status: "upcoming" },
  { id: "m58", homeTeamId: "jordan",       awayTeamId: "algeria",      date: "2026-06-22", time: "23:00", venue: "TBD", city: "TBD", country: "TBD", group: "J", matchday: 2, stage: "group", status: "upcoming" },
  { id: "m59", homeTeamId: "algeria",      awayTeamId: "austria",      date: "2026-06-27", time: "22:00", venue: "TBD", city: "TBD", country: "TBD", group: "J", matchday: 3, stage: "group", status: "upcoming" },
  { id: "m60", homeTeamId: "jordan",       awayTeamId: "argentina",    date: "2026-06-27", time: "22:00", venue: "TBD", city: "TBD", country: "TBD", group: "J", matchday: 3, stage: "group", status: "upcoming" },
  // ── Group K ─────────────────────────────────────────────────────────────────
  { id: "m61", homeTeamId: "portugal",     awayTeamId: "fifaplayoff1", date: "2026-06-17", time: "19:30", venue: "TBD", city: "TBD", country: "TBD", group: "K", matchday: 1, stage: "group", status: "upcoming" },
  { id: "m62", homeTeamId: "uzbekistan",   awayTeamId: "colombia",     date: "2026-06-17", time: "22:00", venue: "TBD", city: "TBD", country: "TBD", group: "K", matchday: 1, stage: "group", status: "upcoming" },
  { id: "m63", homeTeamId: "portugal",     awayTeamId: "uzbekistan",   date: "2026-06-23", time: "13:00", venue: "TBD", city: "TBD", country: "TBD", group: "K", matchday: 2, stage: "group", status: "upcoming" },
  { id: "m64", homeTeamId: "colombia",     awayTeamId: "fifaplayoff1", date: "2026-06-23", time: "22:00", venue: "TBD", city: "TBD", country: "TBD", group: "K", matchday: 2, stage: "group", status: "upcoming" },
  { id: "m65", homeTeamId: "colombia",     awayTeamId: "portugal",     date: "2026-06-28", time: "19:30", venue: "TBD", city: "TBD", country: "TBD", group: "K", matchday: 3, stage: "group", status: "upcoming" },
  { id: "m66", homeTeamId: "fifaplayoff1", awayTeamId: "uzbekistan",   date: "2026-06-28", time: "19:30", venue: "TBD", city: "TBD", country: "TBD", group: "K", matchday: 3, stage: "group", status: "upcoming" },
  // ── Group L ─────────────────────────────────────────────────────────────────
  { id: "m67", homeTeamId: "england",      awayTeamId: "croatia",      date: "2026-06-18", time: "16:00", venue: "TBD", city: "TBD", country: "TBD", group: "L", matchday: 1, stage: "group", status: "upcoming" },
  { id: "m68", homeTeamId: "ghana",        awayTeamId: "panama",       date: "2026-06-18", time: "19:00", venue: "TBD", city: "TBD", country: "TBD", group: "L", matchday: 1, stage: "group", status: "upcoming" },
  { id: "m69", homeTeamId: "england",      awayTeamId: "ghana",        date: "2026-06-24", time: "16:00", venue: "TBD", city: "TBD", country: "TBD", group: "L", matchday: 2, stage: "group", status: "upcoming" },
  { id: "m70", homeTeamId: "panama",       awayTeamId: "croatia",      date: "2026-06-24", time: "19:00", venue: "TBD", city: "TBD", country: "TBD", group: "L", matchday: 2, stage: "group", status: "upcoming" },
  { id: "m71", homeTeamId: "panama",       awayTeamId: "england",      date: "2026-06-28", time: "17:00", venue: "TBD", city: "TBD", country: "TBD", group: "L", matchday: 3, stage: "group", status: "upcoming" },
  { id: "m72", homeTeamId: "croatia",      awayTeamId: "ghana",        date: "2026-06-28", time: "17:00", venue: "TBD", city: "TBD", country: "TBD", group: "L", matchday: 3, stage: "group", status: "upcoming" },
  // ── Round of 32 ─────────────────────────────────────────────────────────────
  { id: "r01", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-06-29", time: "15:00", venue: "TBD", city: "TBD", country: "TBD", stage: "round-of-32", status: "upcoming" },
  { id: "r02", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-06-29", time: "16:30", venue: "TBD", city: "TBD", country: "TBD", stage: "round-of-32", status: "upcoming" },
  { id: "r03", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-06-30", time: "21:00", venue: "TBD", city: "TBD", country: "TBD", stage: "round-of-32", status: "upcoming" },
  { id: "r04", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-06-30", time: "13:00", venue: "TBD", city: "TBD", country: "TBD", stage: "round-of-32", status: "upcoming" },
  { id: "r05", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-06-30", time: "17:00", venue: "TBD", city: "TBD", country: "TBD", stage: "round-of-32", status: "upcoming" },
  { id: "r06", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-07-01", time: "13:00", venue: "TBD", city: "TBD", country: "TBD", stage: "round-of-32", status: "upcoming" },
  { id: "r07", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-07-01", time: "21:00", venue: "TBD", city: "TBD", country: "TBD", stage: "round-of-32", status: "upcoming" },
  { id: "r08", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-07-01", time: "12:00", venue: "TBD", city: "TBD", country: "TBD", stage: "round-of-32", status: "upcoming" },
  { id: "r09", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-07-02", time: "20:00", venue: "TBD", city: "TBD", country: "TBD", stage: "round-of-32", status: "upcoming" },
  { id: "r10", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-07-02", time: "16:00", venue: "TBD", city: "TBD", country: "TBD", stage: "round-of-32", status: "upcoming" },
  { id: "r11", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-07-03", time: "19:00", venue: "TBD", city: "TBD", country: "TBD", stage: "round-of-32", status: "upcoming" },
  { id: "r12", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-07-03", time: "15:00", venue: "TBD", city: "TBD", country: "TBD", stage: "round-of-32", status: "upcoming" },
  { id: "r13", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-07-03", time: "21:30", venue: "TBD", city: "TBD", country: "TBD", stage: "round-of-32", status: "upcoming" },
  { id: "r14", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-07-04", time: "18:00", venue: "TBD", city: "TBD", country: "TBD", stage: "round-of-32", status: "upcoming" },
  { id: "r15", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-07-04", time: "14:00", venue: "TBD", city: "TBD", country: "TBD", stage: "round-of-32", status: "upcoming" },
  { id: "r16", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-07-04", time: "15:00", venue: "TBD", city: "TBD", country: "TBD", stage: "round-of-32", status: "upcoming" },
  // ── Round of 16 ─────────────────────────────────────────────────────────────
  { id: "r17", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-07-04", time: "13:00", venue: "TBD", city: "TBD", country: "TBD", stage: "round-of-16", status: "upcoming" },
  { id: "r18", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-07-05", time: "16:00", venue: "TBD", city: "TBD", country: "TBD", stage: "round-of-16", status: "upcoming" },
  { id: "r19", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-07-06", time: "16:00", venue: "TBD", city: "TBD", country: "TBD", stage: "round-of-16", status: "upcoming" },
  { id: "r20", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-07-06", time: "20:00", venue: "TBD", city: "TBD", country: "TBD", stage: "round-of-16", status: "upcoming" },
  { id: "r21", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-07-07", time: "16:00", venue: "TBD", city: "TBD", country: "TBD", stage: "round-of-16", status: "upcoming" },
  { id: "r22", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-07-07", time: "17:00", venue: "TBD", city: "TBD", country: "TBD", stage: "round-of-16", status: "upcoming" },
  { id: "r23", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-07-07", time: "15:00", venue: "TBD", city: "TBD", country: "TBD", stage: "round-of-16", status: "upcoming" },
  { id: "r24", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-07-08", time: "15:00", venue: "TBD", city: "TBD", country: "TBD", stage: "round-of-16", status: "upcoming" },
  // ── Quarter-finals ──────────────────────────────────────────────────────────
  { id: "qf1", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-07-10", time: "17:00", venue: "TBD", city: "TBD", country: "TBD", stage: "quarter-final", status: "upcoming" },
  { id: "qf2", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-07-11", time: "15:00", venue: "TBD", city: "TBD", country: "TBD", stage: "quarter-final", status: "upcoming" },
  { id: "qf3", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-07-12", time: "12:00", venue: "TBD", city: "TBD", country: "TBD", stage: "quarter-final", status: "upcoming" },
  { id: "qf4", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-07-12", time: "15:00", venue: "TBD", city: "TBD", country: "TBD", stage: "quarter-final", status: "upcoming" },
  // ── Semi-finals ─────────────────────────────────────────────────────────────
  { id: "sf1", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-07-15", time: "16:00", venue: "TBD", city: "TBD", country: "TBD", stage: "semi-final", status: "upcoming" },
  { id: "sf2", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-07-16", time: "21:00", venue: "TBD", city: "TBD", country: "TBD", stage: "semi-final", status: "upcoming" },
  // ── Third-place play-off ────────────────────────────────────────────────────
  { id: "tp1", homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-07-19", time: "17:00", venue: "TBD", city: "TBD", country: "TBD", stage: "third-place", status: "upcoming" },
  // ── Final ───────────────────────────────────────────────────────────────────
  { id: "f1",  homeTeamId: "tbd", awayTeamId: "tbd", date: "2026-07-19", time: "15:00", venue: "MetLife Stadium", city: "New York", country: "USA", stage: "final", status: "upcoming" },
];

// ─── News Posts ───────────────────────────────────────────────────────────────

export const newsPosts: NewsPost[] = [
  {
    id: "1",
    slug: "argentina-look-to-defend-title",
    title: "Argentina Look to Defend Their World Cup Crown in 2026",
    category: "Analysis",
    date: "2026-05-10",
    excerpt:
      "Lionel Messi returns for a final World Cup campaign on home soil as Argentina aim to become back-to-back champions for the first time since 1958–1962.",
    content: `Argentina arrive at the 2026 FIFA World Cup as defending champions, carrying the weight of expectation and the joy of a nation still celebrating their 2022 triumph in Qatar. Lionel Messi, now 38, has confirmed this will be his last World Cup — and he intends to go out on the highest note possible.

Coach Lionel Scaloni has kept faith with the squad that lifted the trophy in Lusail, bolstering it with younger talent to complement the experienced core. Julián Álvarez and Lautaro Martínez form a devastating front pairing behind Messi, while Enzo Fernández has matured into one of the world's best midfielders.

Drawn in Group J alongside Algeria, Austria and Jordan, Argentina face a favourable but not trivial path to the knockout rounds. Their toughest test will likely come against Algeria — a side with world-class talent and real hunger.

The real question is whether Messi can maintain peak form across an entire tournament at this stage of his career. If he can, Argentina are favourites to become the first team since Brazil (1958, 1962) to win consecutive World Cups.`,
    image: "/images/argentina-wc.jpg",
    readTime: 4,
    tags: ["Argentina", "Messi", "World Cup 2026", "Analysis"],
    featured: true,
  },
  {
    id: "2",
    slug: "host-nations-usa-canada-mexico-preview",
    title: "The Three Hosts: Can USA, Canada or Mexico Surprise the World?",
    category: "Analysis",
    date: "2026-05-08",
    excerpt:
      "For the first time in history, three nations co-host the World Cup. We assess their chances of going deep in the tournament.",
    content: `The 2026 FIFA World Cup makes history as the first tournament co-hosted by three nations — the United States, Canada, and Mexico. Beyond logistical pride, all three will be desperate to make an impression on the pitch.

The USA, under Mauricio Pochettino, have built a talented young squad around Christian Pulisic, Gio Reyna and Weston McKennie. Playing in front of home fans at stadiums like MetLife and SoFi could be a decisive factor. Drawn in Group D alongside Paraguay, Australia and a UEFA playoff team.

Canada have their most exciting generation of players in history. Alphonso Davies, Jonathan David and Stephen Eustáquio give them genuine quality. After a disappointing 2022 showing, Jesse Marsch's side will be hungry to make amends in Group B.

Mexico's perennial challenge is the cursed "fifth game" — knocked out in the Round of 16 seven consecutive times. Playing at the Estadio Azteca in front of their passionate fans, El Tri will believe this is finally their time. They face South Africa, South Korea and a UEFA playoff side in Group A.`,
    image: "/images/hosts.jpg",
    readTime: 5,
    tags: ["USA", "Canada", "Mexico", "Host Nations"],
    featured: true,
  },
  {
    id: "3",
    slug: "kylian-mbappe-world-cup-2026-preview",
    title: "Player to Watch: Kylian Mbappé Chases the Ultimate Prize",
    category: "Player",
    date: "2026-05-06",
    excerpt:
      "Already a World Cup winner at 19, Mbappé now leads France as their undisputed talisman. Can he fire Les Bleus to a third world title?",
    content: `Kylian Mbappé was just 19 years old when he collected a World Cup winner's medal in Russia. Now 27 and established as the world's best player at Real Madrid, he returns to the tournament with one goal: lift the trophy again as his team's captain and leader.

France, despite not winning Euro 2024, arrive in North America as one of the clear favourites. The squad is packed with talent — Mike Maignan in goal, a midfield anchored by Aurélien Tchouaméni, and attacking options including Ousmane Dembélé and Marcus Thuram alongside Mbappé.

The pressure on Mbappé is enormous. His previous two World Cup exits — the devastating penalty shoot-out loss to Switzerland in 2021 and the heartbreaking final defeat to Argentina in 2022 — have shaped him. He is hungry, focused, and arguably at the peak of his powers.

For France to win the 2026 World Cup, Mbappé needs to stay fit and deliver in the biggest moments. If he does, Les Bleus will be very difficult to stop.`,
    image: "/images/mbappe.jpg",
    readTime: 4,
    tags: ["France", "Mbappé", "Player Profile", "World Cup 2026"],
  },
  {
    id: "4",
    slug: "morocco-dark-horse-2026",
    title: "Morocco: The Dark Horses Who Could Go All the Way",
    category: "Analysis",
    date: "2026-05-04",
    excerpt:
      "After their historic semi-final run in Qatar 2022, Morocco are no longer underdogs. They're genuine contenders.",
    content: `Four years ago, Morocco stunned the world. They defeated Belgium, Spain and Portugal on their way to the semi-finals — the first African or Arab nation to achieve that feat. In 2026, Walid Regragui's side arrive not as underdogs but as established contenders.

The spine of the 2022 squad remains: Achraf Hakimi at right-back, Sofyan Amrabat shielding the defence, and Youssef En-Nesyri leading the attack. They have added depth and experience, and crucially, the psychological barrier has been broken.

Their defensive record in 2022 was remarkable — only one goal conceded in five matches (an own goal against Canada). That organisation remains their greatest strength, with the ability to absorb pressure and hurt teams on the counter.

In Group C alongside Brazil, Haiti and Scotland, Morocco face a real test with the Seleção. But if they can navigate it, their tournament experience and belief could carry them very far indeed.`,
    image: "/images/morocco.jpg",
    readTime: 4,
    tags: ["Morocco", "Dark Horse", "Africa", "World Cup 2026"],
  },
  {
    id: "5",
    slug: "how-to-watch-world-cup-in-bangladesh",
    title: "How to Watch the FIFA World Cup 2026 in Bangladesh",
    category: "Fan",
    date: "2026-05-02",
    excerpt:
      "A complete guide for Bangladeshi fans — TV channels, streaming options, match times in BST, and the best places to watch.",
    content: `The FIFA World Cup 2026 kicks off on June 11 and Bangladesh Standard Time (BST, UTC+6) means matches will typically be at convenient times — evening games in North America fall in the early morning to daytime hours in Bangladesh.

**TV Channels:** T Sports and Gazi TV have historically broadcast World Cup matches. Check local listings as rights may be shared across multiple channels.

**Streaming:** Several OTT platforms including FanCode and local options may carry live streams. A VPN can help access international streams legally.

**Match Times in BST:** Most USA-based matches kick off at 10:00 PM ET / 08:00 AM BST next day, 1:00 AM ET / 11:00 AM BST, or 4:00 PM ET / 02:00 AM BST. Mexican matches tend to kick off slightly earlier.

**Watch Parties in Dhaka:** Areas like Dhanmondi, Gulshan and Banani traditionally host large outdoor screenings. Local clubs, restaurants and community spaces often set up big screens — check social media closer to the tournament.

The hotly anticipated Brazil vs Argentina potential clash, and any Messi final appearance, will undoubtedly draw massive crowds across the country.`,
    image: "/images/bangladesh-fans.jpg",
    readTime: 3,
    tags: ["Bangladesh", "How to Watch", "Fan Guide"],
    featured: true,
  },
  {
    id: "6",
    slug: "group-of-death-2026-analysis",
    title: "Group C: Is This the Group of Death in 2026?",
    category: "Analysis",
    date: "2026-04-30",
    excerpt:
      "Brazil, Morocco, Haiti and Scotland — the Atlas Lions face the five-time champions in what could be the standout group.",
    content: `Every World Cup has a "group of death" — a section so stacked that major tournament contenders are eliminated before the knockout rounds even begin. In 2026, Group C is the standout candidate.

Brazil, the five-time world champions desperate to end their long wait. Morocco, the 2022 semi-finalists and Africa's genuine standard-bearers. Scotland, making their first World Cup appearance since 1998 and hungry to prove themselves. And Haiti, the historic Caribbean qualifier looking to cause an upset.

The tactical battle between Brazil and Morocco will be fascinating. Dorival Júnior's Seleção with their expressive, attack-minded play versus Regragui's resolute defensive organisation.

Our prediction: Brazil and Morocco advance, with Scotland falling just short in what will be a memorable group stage.`,
    image: "/images/group-c.jpg",
    readTime: 5,
    tags: ["Brazil", "Morocco", "Scotland", "Haiti", "Group C", "Analysis"],
  },
  {
    id: "7",
    slug: "world-cup-stadiums-guide-2026",
    title: "The 16 Stadiums of the 2026 World Cup: A Complete Guide",
    category: "News",
    date: "2026-04-28",
    excerpt:
      "From the iconic Estadio Azteca to the futuristic MetLife Stadium, here's everything you need to know about the venues hosting the biggest show on earth.",
    content: `The 2026 FIFA World Cup will be held across 16 magnificent stadiums in the United States, Canada and Mexico. From iconic historic venues to state-of-the-art modern arenas, this edition will have it all.

**USA Venues (11):** MetLife Stadium (New York/New Jersey) — Final venue; SoFi Stadium (Los Angeles); Rose Bowl (Pasadena); AT&T Stadium (Dallas); NRG Stadium (Houston); Levi's Stadium (Santa Clara); Arrowhead Stadium (Kansas City); Allegiant Stadium (Las Vegas); Lumen Field (Seattle); Lincoln Financial Field (Philadelphia); Gillette Stadium (Boston).

**Mexico Venues (3):** Estadio Azteca (Mexico City) — the only ground to have hosted two World Cup finals (1970, 1986); Estadio BBVA (Guadalajara/Monterrey); Estadio Universitario (Monterrey).

**Canada Venues (2):** BC Place (Vancouver); BMO Field (Toronto).

The Final will be held at MetLife Stadium in East Rutherford, New Jersey — one of the largest stadiums in the NFL, with a capacity of 82,500 that will be expanded for the occasion.`,
    image: "/images/stadiums.jpg",
    readTime: 5,
    tags: ["Stadiums", "Venues", "World Cup 2026", "News"],
  },
];

// ─── Helper functions ─────────────────────────────────────────────────────────

export function getTeamById(id: string): Team | undefined {
  return teams.find((t) => t.id === id);
}

export function getGroupById(id: string): Group | undefined {
  return groups.find((g) => g.id === id.toUpperCase());
}

export function getFixtureById(id: string): Fixture | undefined {
  return fixtures.find((f) => f.id === id);
}

export function getPostBySlug(slug: string): NewsPost | undefined {
  return newsPosts.find((p) => p.slug === slug);
}

export function getFixturesByGroup(groupId: string): Fixture[] {
  return fixtures.filter((f) => f.group === groupId.toUpperCase());
}

export function getFixturesByTeam(teamId: string): Fixture[] {
  return fixtures.filter(
    (f) => f.homeTeamId === teamId || f.awayTeamId === teamId,
  );
}

export function getUpcomingFixtures(count?: number): Fixture[] {
  const upcoming = fixtures
    .filter((f) => f.status === "upcoming")
    .sort((a, b) => a.date.localeCompare(b.date));
  return count ? upcoming.slice(0, count) : upcoming;
}

export function getLiveFixtures(): Fixture[] {
  return fixtures.filter((f) => f.status === "live");
}

export function getCompletedFixtures(): Fixture[] {
  return fixtures
    .filter((f) => f.status === "completed")
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getStandingsSorted(group: Group): Standing[] {
  return [...group.standings].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const gdA = a.goalsFor - a.goalsAgainst;
    const gdB = b.goalsFor - b.goalsAgainst;
    if (gdB !== gdA) return gdB - gdA;
    return b.goalsFor - a.goalsFor;
  });
}

export function getFeaturedPosts(): NewsPost[] {
  return newsPosts.filter((p) => p.featured);
}

export function getPostsByCategory(category: NewsPost["category"]): NewsPost[] {
  return newsPosts.filter((p) => p.category === category);
}
