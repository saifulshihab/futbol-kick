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
    id: "usa",
    name: "United States",
    shortName: "USA",
    code: "USA",
    flag: "us",
    group: "A",
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
    id: "poland",
    name: "Poland",
    shortName: "Poland",
    code: "POL",
    flag: "pl",
    group: "A",
    coach: "Michał Probierz",
    fifaRank: 27,
    formation: "4-3-3",
    tactics: "Physical, direct play channelling through their world-class striker.",
    players: [
      { name: "Wojciech Szczęsny", position: "GK", club: "FC Barcelona", number: 1 },
      { name: "Matty Cash", position: "DEF", club: "Aston Villa", number: 2 },
      { name: "Piotr Zieliński", position: "MID", club: "Internazionale", number: 10 },
      { name: "Robert Lewandowski", position: "FWD", club: "FC Barcelona", number: 9, isCaptain: true },
      { name: "Arkadiusz Milik", position: "FWD", club: "Juventus", number: 7 },
    ],
    wcHistory: [
      "9 World Cup appearances",
      "Best result: Third place (1974, 1982)",
      "Reached Round of 16 in 2022",
    ],
  },
  {
    id: "saudi",
    name: "Saudi Arabia",
    shortName: "Saudi Arabia",
    code: "KSA",
    flag: "sa",
    group: "A",
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
  // Group B
  {
    id: "brazil",
    name: "Brazil",
    shortName: "Brazil",
    code: "BRA",
    flag: "br",
    group: "B",
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
    id: "serbia",
    name: "Serbia",
    shortName: "Serbia",
    code: "SRB",
    flag: "rs",
    group: "B",
    coach: "Dragan Stojković",
    fifaRank: 33,
    formation: "3-4-3",
    tactics: "High defensive line, physical play, threats from set pieces and wide areas.",
    players: [
      { name: "Vanja Milinković-Savić", position: "GK", club: "Torino", number: 12 },
      { name: "Nikola Milenković", position: "DEF", club: "Nottingham Forest", number: 5 },
      { name: "Sergej Milinković-Savić", position: "MID", club: "Al-Hilal", number: 8, isCaptain: true },
      { name: "Dušan Tadić", position: "MID", club: "Fenerbahçe", number: 10 },
      { name: "Dušan Vlahović", position: "FWD", club: "Juventus", number: 9 },
      { name: "Filip Kostić", position: "FWD", club: "Juventus", number: 11 },
    ],
    wcHistory: [
      "2 World Cup appearances as Serbia (2018, 2022)",
      "Previously competed as Yugoslavia — runners-up in 1930",
      "Group stage exit in 2022",
    ],
  },
  {
    id: "morocco",
    name: "Morocco",
    shortName: "Morocco",
    code: "MAR",
    flag: "ma",
    group: "B",
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
    id: "senegal",
    name: "Senegal",
    shortName: "Senegal",
    code: "SEN",
    flag: "sn",
    group: "B",
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
  // Group C
  {
    id: "argentina",
    name: "Argentina",
    shortName: "Argentina",
    code: "ARG",
    flag: "ar",
    group: "C",
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
    id: "australia",
    name: "Australia",
    shortName: "Australia",
    code: "AUS",
    flag: "au",
    group: "C",
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
    id: "ecuador",
    name: "Ecuador",
    shortName: "Ecuador",
    code: "ECU",
    flag: "ec",
    group: "C",
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
  {
    id: "colombia",
    name: "Colombia",
    shortName: "Colombia",
    code: "COL",
    flag: "co",
    group: "C",
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
  // Group D
  {
    id: "france",
    name: "France",
    shortName: "France",
    code: "FRA",
    flag: "fr",
    group: "D",
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
    id: "netherlands",
    name: "Netherlands",
    shortName: "Netherlands",
    code: "NED",
    flag: "nl",
    group: "D",
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
    group: "D",
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
    id: "croatia",
    name: "Croatia",
    shortName: "Croatia",
    code: "CRO",
    flag: "hr",
    group: "D",
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
  // Group E
  {
    id: "england",
    name: "England",
    shortName: "England",
    code: "ENG",
    flag: "gb-eng",
    group: "E",
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
    id: "belgium",
    name: "Belgium",
    shortName: "Belgium",
    code: "BEL",
    flag: "be",
    group: "E",
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
    id: "iran",
    name: "Iran",
    shortName: "Iran",
    code: "IRN",
    flag: "ir",
    group: "E",
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
    id: "ghana",
    name: "Ghana",
    shortName: "Ghana",
    code: "GHA",
    flag: "gh",
    group: "E",
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
  // Group F
  {
    id: "germany",
    name: "Germany",
    shortName: "Germany",
    code: "GER",
    flag: "de",
    group: "F",
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
    id: "spain",
    name: "Spain",
    shortName: "Spain",
    code: "ESP",
    flag: "es",
    group: "F",
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
    id: "canada",
    name: "Canada",
    shortName: "Canada",
    code: "CAN",
    flag: "ca",
    group: "F",
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
    id: "portugal",
    name: "Portugal",
    shortName: "Portugal",
    code: "POR",
    flag: "pt",
    group: "F",
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
];

// ─── Groups ───────────────────────────────────────────────────────────────────

export const groups: Group[] = [
  {
    id: "A",
    label: "Group A",
    teamIds: ["usa", "mexico", "poland", "saudi"],
    standings: [
      { teamId: "usa",    played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 3, goalsAgainst: 1, points: 4 },
      { teamId: "mexico", played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 2, goalsAgainst: 2, points: 3 },
      { teamId: "poland", played: 2, won: 0, drawn: 2, lost: 0, goalsFor: 2, goalsAgainst: 2, points: 2 },
      { teamId: "saudi",  played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 1, goalsAgainst: 3, points: 1 },
    ],
  },
  {
    id: "B",
    label: "Group B",
    teamIds: ["brazil", "serbia", "morocco", "senegal"],
    standings: [
      { teamId: "brazil",  played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 5, goalsAgainst: 1, points: 6 },
      { teamId: "morocco", played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 2, goalsAgainst: 2, points: 3 },
      { teamId: "serbia",  played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 1, goalsAgainst: 3, points: 1 },
      { teamId: "senegal", played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 1, goalsAgainst: 3, points: 1 },
    ],
  },
  {
    id: "C",
    label: "Group C",
    teamIds: ["argentina", "australia", "ecuador", "colombia"],
    standings: [
      { teamId: "argentina", played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 6, goalsAgainst: 1, points: 6 },
      { teamId: "colombia",  played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 3, goalsAgainst: 2, points: 3 },
      { teamId: "ecuador",   played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 1, goalsAgainst: 3, points: 1 },
      { teamId: "australia", played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 1, goalsAgainst: 5, points: 1 },
    ],
  },
  {
    id: "D",
    label: "Group D",
    teamIds: ["france", "netherlands", "japan", "croatia"],
    standings: [
      { teamId: "france",      played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 2, goalsAgainst: 0, points: 3 },
      { teamId: "netherlands", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 1, goalsAgainst: 0, points: 3 },
      { teamId: "japan",       played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 0, goalsAgainst: 1, points: 0 },
      { teamId: "croatia",     played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 0, goalsAgainst: 2, points: 0 },
    ],
  },
  {
    id: "E",
    label: "Group E",
    teamIds: ["england", "belgium", "iran", "ghana"],
    standings: [
      { teamId: "england", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 3, goalsAgainst: 0, points: 3 },
      { teamId: "belgium", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 1, goalsAgainst: 0, points: 3 },
      { teamId: "iran",    played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 0, goalsAgainst: 1, points: 0 },
      { teamId: "ghana",   played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 0, goalsAgainst: 3, points: 0 },
    ],
  },
  {
    id: "F",
    label: "Group F",
    teamIds: ["germany", "spain", "canada", "portugal"],
    standings: [
      { teamId: "portugal", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "germany",  played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "spain",    played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { teamId: "canada",   played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
    ],
  },
];

// ─── Fixtures ─────────────────────────────────────────────────────────────────

export const fixtures: Fixture[] = [
  // Group A – completed
  { id: "m01", homeTeamId: "usa",    awayTeamId: "poland",  date: "2026-06-11", time: "16:00", venue: "SoFi Stadium",            city: "Los Angeles",  country: "USA",    group: "A", matchday: 1, stage: "group", status: "completed", homeScore: 1, awayScore: 1 },
  { id: "m02", homeTeamId: "mexico", awayTeamId: "saudi",   date: "2026-06-11", time: "19:00", venue: "Estadio Azteca",           city: "Mexico City",  country: "Mexico", group: "A", matchday: 1, stage: "group", status: "completed", homeScore: 2, awayScore: 0 },
  { id: "m03", homeTeamId: "usa",    awayTeamId: "mexico",  date: "2026-06-15", time: "21:00", venue: "MetLife Stadium",          city: "New York",     country: "USA",    group: "A", matchday: 2, stage: "group", status: "completed", homeScore: 2, awayScore: 0 },
  { id: "m04", homeTeamId: "poland", awayTeamId: "saudi",   date: "2026-06-15", time: "18:00", venue: "Rose Bowl",                city: "Pasadena",     country: "USA",    group: "A", matchday: 2, stage: "group", status: "completed", homeScore: 1, awayScore: 1 },
  { id: "m05", homeTeamId: "usa",    awayTeamId: "saudi",   date: "2026-06-19", time: "21:00", venue: "Levi's Stadium",           city: "Santa Clara",  country: "USA",    group: "A", matchday: 3, stage: "group", status: "upcoming" },
  { id: "m06", homeTeamId: "poland", awayTeamId: "mexico",  date: "2026-06-19", time: "21:00", venue: "AT&T Stadium",             city: "Dallas",       country: "USA",    group: "A", matchday: 3, stage: "group", status: "upcoming" },
  // Group B – completed
  { id: "m07", homeTeamId: "brazil",  awayTeamId: "serbia",  date: "2026-06-12", time: "16:00", venue: "Estadio Universitario",   city: "Monterrey",    country: "Mexico", group: "B", matchday: 1, stage: "group", status: "completed", homeScore: 3, awayScore: 1 },
  { id: "m08", homeTeamId: "morocco", awayTeamId: "senegal", date: "2026-06-12", time: "19:00", venue: "Hard Rock Stadium",        city: "Miami",        country: "USA",    group: "B", matchday: 1, stage: "group", status: "completed", homeScore: 1, awayScore: 0 },
  { id: "m09", homeTeamId: "brazil",  awayTeamId: "morocco", date: "2026-06-16", time: "21:00", venue: "Arrowhead Stadium",        city: "Kansas City",  country: "USA",    group: "B", matchday: 2, stage: "group", status: "completed", homeScore: 2, awayScore: 1 },
  { id: "m10", homeTeamId: "serbia",  awayTeamId: "senegal", date: "2026-06-16", time: "18:00", venue: "Gillette Stadium",         city: "Boston",       country: "USA",    group: "B", matchday: 2, stage: "group", status: "completed", homeScore: 0, awayScore: 1 },
  { id: "m11", homeTeamId: "brazil",  awayTeamId: "senegal", date: "2026-06-20", time: "21:00", venue: "Estadio BBVA",             city: "Guadalajara",  country: "Mexico", group: "B", matchday: 3, stage: "group", status: "upcoming" },
  { id: "m12", homeTeamId: "morocco", awayTeamId: "serbia",  date: "2026-06-20", time: "21:00", venue: "Lincoln Financial Field",  city: "Philadelphia", country: "USA",    group: "B", matchday: 3, stage: "group", status: "upcoming" },
  // Group C
  { id: "m13", homeTeamId: "argentina", awayTeamId: "australia", date: "2026-06-13", time: "16:00", venue: "BC Place",                city: "Vancouver",   country: "Canada", group: "C", matchday: 1, stage: "group", status: "completed", homeScore: 3, awayScore: 0 },
  { id: "m14", homeTeamId: "colombia",  awayTeamId: "ecuador",   date: "2026-06-13", time: "19:00", venue: "BMO Field",               city: "Toronto",     country: "Canada", group: "C", matchday: 1, stage: "group", status: "completed", homeScore: 2, awayScore: 0 },
  { id: "m15", homeTeamId: "argentina", awayTeamId: "colombia",  date: "2026-06-17", time: "21:00", venue: "NRG Stadium",             city: "Houston",     country: "USA",    group: "C", matchday: 2, stage: "group", status: "completed", homeScore: 3, awayScore: 1 },
  { id: "m16", homeTeamId: "ecuador",   awayTeamId: "australia", date: "2026-06-17", time: "18:00", venue: "Estadio Akron",           city: "Guadalajara", country: "Mexico", group: "C", matchday: 2, stage: "group", status: "completed", homeScore: 1, awayScore: 1 },
  { id: "m17", homeTeamId: "argentina", awayTeamId: "ecuador",   date: "2026-06-21", time: "21:00", venue: "MetLife Stadium",         city: "New York",    country: "USA",    group: "C", matchday: 3, stage: "group", status: "upcoming" },
  { id: "m18", homeTeamId: "colombia",  awayTeamId: "australia", date: "2026-06-21", time: "21:00", venue: "SoFi Stadium",            city: "Los Angeles", country: "USA",    group: "C", matchday: 3, stage: "group", status: "upcoming" },
  // Group D – live & upcoming
  { id: "m19", homeTeamId: "france",      awayTeamId: "croatia",     date: "2026-06-14", time: "16:00", venue: "Estadio Azteca",     city: "Mexico City",  country: "Mexico", group: "D", matchday: 1, stage: "group", status: "completed", homeScore: 2, awayScore: 0 },
  { id: "m20", homeTeamId: "netherlands", awayTeamId: "japan",       date: "2026-06-14", time: "19:00", venue: "Allegiant Stadium",  city: "Las Vegas",    country: "USA",    group: "D", matchday: 1, stage: "group", status: "completed", homeScore: 1, awayScore: 0 },
  { id: "m21", homeTeamId: "france",      awayTeamId: "japan",       date: "2026-06-18", time: "21:00", venue: "Rose Bowl",          city: "Pasadena",     country: "USA",    group: "D", matchday: 2, stage: "group", status: "live", liveMinute: 67 },
  { id: "m22", homeTeamId: "netherlands", awayTeamId: "croatia",     date: "2026-06-18", time: "21:00", venue: "Lumen Field",        city: "Seattle",      country: "USA",    group: "D", matchday: 2, stage: "group", status: "upcoming" },
  // Group E – upcoming
  { id: "m23", homeTeamId: "england", awayTeamId: "iran",    date: "2026-06-14", time: "13:00", venue: "Estadio Akron",         city: "Guadalajara", country: "Mexico", group: "E", matchday: 1, stage: "group", status: "completed", homeScore: 3, awayScore: 0 },
  { id: "m24", homeTeamId: "belgium", awayTeamId: "ghana",   date: "2026-06-14", time: "16:00", venue: "AT&T Stadium",          city: "Dallas",      country: "USA",    group: "E", matchday: 1, stage: "group", status: "completed", homeScore: 1, awayScore: 0 },
  { id: "m25", homeTeamId: "england", awayTeamId: "belgium", date: "2026-06-19", time: "18:00", venue: "MetLife Stadium",       city: "New York",    country: "USA",    group: "E", matchday: 2, stage: "group", status: "upcoming" },
  { id: "m26", homeTeamId: "iran",    awayTeamId: "ghana",   date: "2026-06-19", time: "15:00", venue: "Estadio Universitario", city: "Monterrey",   country: "Mexico", group: "E", matchday: 2, stage: "group", status: "upcoming" },
  // Group F – all upcoming
  { id: "m27", homeTeamId: "portugal", awayTeamId: "canada",  date: "2026-06-15", time: "21:00", venue: "Estadio BBVA",   city: "Guadalajara", country: "Mexico", group: "F", matchday: 1, stage: "group", status: "upcoming" },
  { id: "m28", homeTeamId: "germany",  awayTeamId: "spain",   date: "2026-06-15", time: "18:00", venue: "SoFi Stadium",   city: "Los Angeles", country: "USA",    group: "F", matchday: 1, stage: "group", status: "upcoming" },
  { id: "m29", homeTeamId: "portugal", awayTeamId: "germany", date: "2026-06-19", time: "21:00", venue: "MetLife Stadium", city: "New York",   country: "USA",    group: "F", matchday: 2, stage: "group", status: "upcoming" },
  { id: "m30", homeTeamId: "spain",    awayTeamId: "canada",  date: "2026-06-19", time: "18:00", venue: "Levi's Stadium", city: "Santa Clara", country: "USA",    group: "F", matchday: 2, stage: "group", status: "upcoming" },
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

Drawn in Group C alongside Colombia, Ecuador and Australia, Argentina face a tough but manageable path to the knockout rounds. Their toughest test will likely come against Colombia — a side that reached the Copa América final in 2024 and have quality throughout.

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

The USA, under Mauricio Pochettino, have built a talented young squad around Christian Pulisic, Gio Reyna and Weston McKennie. Playing in front of home fans at stadiums like MetLife and SoFi could be a decisive factor. Qualifying from Group A alongside Mexico, Poland and Saudi Arabia is achievable.

Canada have their most exciting generation of players in history. Alphonso Davies, Jonathan David and Stephen Eustáquio give them genuine quality. After a disappointing 2022 showing, Jesse Marsch's side will be hungry to make amends.

Mexico's perennial challenge is the cursed "fifth game" — knocked out in the Round of 16 seven consecutive times. Playing at the Estadio Azteca in front of their passionate fans, El Tri will believe this is finally their time.`,
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

In Group B alongside Brazil, Serbia and Senegal, Morocco face a real test in the group stage. But if they can navigate it, their tournament experience and belief could carry them very far indeed.`,
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

**Match Times in BST:** Most USA-based matches kick off at 10:00 PM ET / 02:00 AM BST, 1:00 AM ET / 11:00 AM BST, or 4:00 PM ET / 02:00 AM BST. Mexican matches tend to kick off slightly earlier.

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
    title: "Group D: Is This the Group of Death in 2026?",
    category: "Analysis",
    date: "2026-04-30",
    excerpt:
      "France, Netherlands, Japan and Croatia — four of the world's best teams in one group. Someone brilliant is going home early.",
    content: `Every World Cup has a "group of death" — a section so stacked that major tournament contenders are eliminated before the knockout rounds even begin. In 2026, Group D is the standout candidate.

France, the two-time champions and runners-up in 2022. Netherlands, semi-finalists just four years ago with a squad built for the future. Croatia, bronze medalists in 2022 with one of the finest midfields in world football led by Luka Modrić. Japan, the giant-killers who knocked out Germany and Spain in the last group stage.

Three of these four teams have a genuine case for reaching the final. Only two will make it to the Round of 32.

The tactical battle will be fascinating. Didier Deschamps will set France up solidly, trusting Mbappé to provide the moments of brilliance. Ronald Koeman's Netherlands will look to control possession and tempo. Dalić's Croatia, with an ageing but brilliant midfield, will need to manage their energy carefully across three group games.

Our prediction: France and Netherlands advance, with Croatia and Japan both left to rue missed opportunities.`,
    image: "/images/group-d.jpg",
    readTime: 5,
    tags: ["France", "Netherlands", "Japan", "Croatia", "Group D", "Analysis"],
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
