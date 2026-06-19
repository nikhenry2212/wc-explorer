// Os 48 classificados para a Copa do Mundo 2026 (EUA, México, Canadá).
// Rankings FIFA aproximados (atualização pré-torneio jun/2026).
export const TEAMS = [
    // ===== CONCACAF (anfitriãs + classificados) =====
    { id: 'usa', name: 'Estados Unidos', flag: '🇺🇸', confederation: 'CONCACAF', fifaRank: 16, appearances: 12, titles: 0, bestResult: '3º (1930)', coach: 'Mauricio Pochettino', lat: 39.8, lon: -98.6, host: true },
    { id: 'mex', name: 'México', flag: '🇲🇽', confederation: 'CONCACAF', fifaRank: 14, appearances: 18, titles: 0, bestResult: 'Quartas (1970, 1986)', coach: 'Javier Aguirre', lat: 23.6, lon: -102.5, host: true },
    { id: 'can', name: 'Canadá', flag: '🇨🇦', confederation: 'CONCACAF', fifaRank: 30, appearances: 3, titles: 0, bestResult: 'Fase de grupos', coach: 'Jesse Marsch', lat: 56.1, lon: -106.3, host: true },
    { id: 'cri', name: 'Costa Rica', flag: '🇨🇷', confederation: 'CONCACAF', fifaRank: 54, appearances: 7, titles: 0, bestResult: 'Quartas (2014)', coach: 'Miguel Herrera', lat: 9.7, lon: -83.7 },
    { id: 'pan', name: 'Panamá', flag: '🇵🇦', confederation: 'CONCACAF', fifaRank: 40, appearances: 2, titles: 0, bestResult: 'Fase de grupos', coach: 'Thomas Christiansen', lat: 8.5, lon: -80.8 },
    { id: 'cuw', name: 'Curaçao', flag: '🇨🇼', confederation: 'CONCACAF', fifaRank: 82, appearances: 1, titles: 0, bestResult: 'Estreante', coach: 'Dick Advocaat', lat: 12.2, lon: -69.0, debut: true },
    // ===== CONMEBOL =====
    { id: 'arg', name: 'Argentina', flag: '🇦🇷', confederation: 'CONMEBOL', fifaRank: 1, appearances: 19, titles: 3, bestResult: 'Campeã (1978, 1986, 2022)', coach: 'Lionel Scaloni', lat: -38.4, lon: -63.6 },
    { id: 'bra', name: 'Brasil', flag: '🇧🇷', confederation: 'CONMEBOL', fifaRank: 5, appearances: 23, titles: 5, bestResult: 'Campeã (5x)', coach: 'Carlo Ancelotti', lat: -14.2, lon: -51.9 },
    { id: 'uru', name: 'Uruguai', flag: '🇺🇾', confederation: 'CONMEBOL', fifaRank: 11, appearances: 15, titles: 2, bestResult: 'Campeã (1930, 1950)', coach: 'Marcelo Bielsa', lat: -32.5, lon: -55.8 },
    { id: 'col', name: 'Colômbia', flag: '🇨🇴', confederation: 'CONMEBOL', fifaRank: 13, appearances: 7, titles: 0, bestResult: 'Quartas (2014)', coach: 'Néstor Lorenzo', lat: 4.6, lon: -74.3 },
    { id: 'ecu', name: 'Equador', flag: '🇪🇨', confederation: 'CONMEBOL', fifaRank: 23, appearances: 5, titles: 0, bestResult: 'Oitavas (2006)', coach: 'Sebastián Beccacece', lat: -1.8, lon: -78.2 },
    { id: 'par', name: 'Paraguai', flag: '🇵🇾', confederation: 'CONMEBOL', fifaRank: 38, appearances: 9, titles: 0, bestResult: 'Quartas (2010)', coach: 'Gustavo Alfaro', lat: -23.4, lon: -58.4 },
    // ===== UEFA (16) =====
    { id: 'fra', name: 'França', flag: '🇫🇷', confederation: 'UEFA', fifaRank: 2, appearances: 17, titles: 2, bestResult: 'Campeã (1998, 2018)', coach: 'Didier Deschamps', lat: 46.2, lon: 2.2 },
    { id: 'esp', name: 'Espanha', flag: '🇪🇸', confederation: 'UEFA', fifaRank: 3, appearances: 17, titles: 1, bestResult: 'Campeã (2010)', coach: 'Luis de la Fuente', lat: 40.4, lon: -3.7 },
    { id: 'eng', name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', confederation: 'UEFA', fifaRank: 4, appearances: 17, titles: 1, bestResult: 'Campeã (1966)', coach: 'Thomas Tuchel', lat: 52.3, lon: -1.2 },
    { id: 'por', name: 'Portugal', flag: '🇵🇹', confederation: 'UEFA', fifaRank: 6, appearances: 9, titles: 0, bestResult: '3º (1966)', coach: 'Roberto Martínez', lat: 39.4, lon: -8.2 },
    { id: 'ned', name: 'Holanda', flag: '🇳🇱', confederation: 'UEFA', fifaRank: 7, appearances: 12, titles: 0, bestResult: 'Vice (1974, 1978, 2010)', coach: 'Ronald Koeman', lat: 52.1, lon: 5.3 },
    { id: 'bel', name: 'Bélgica', flag: '🇧🇪', confederation: 'UEFA', fifaRank: 8, appearances: 14, titles: 0, bestResult: '3º (2018)', coach: 'Rudi Garcia', lat: 50.5, lon: 4.5 },
    { id: 'ger', name: 'Alemanha', flag: '🇩🇪', confederation: 'UEFA', fifaRank: 10, appearances: 20, titles: 4, bestResult: 'Campeã (4x)', coach: 'Julian Nagelsmann', lat: 51.2, lon: 10.5 },
    { id: 'cro', name: 'Croácia', flag: '🇭🇷', confederation: 'UEFA', fifaRank: 9, appearances: 7, titles: 0, bestResult: 'Vice (2018)', coach: 'Zlatko Dalić', lat: 45.1, lon: 15.2 },
    { id: 'ita', name: 'Suíça', flag: '🇨🇭', confederation: 'UEFA', fifaRank: 19, appearances: 12, titles: 0, bestResult: 'Quartas (1934,1938,1954)', coach: 'Murat Yakin', lat: 46.8, lon: 8.2 },
    { id: 'aut', name: 'Áustria', flag: '🇦🇹', confederation: 'UEFA', fifaRank: 22, appearances: 8, titles: 0, bestResult: '3º (1954)', coach: 'Ralf Rangnick', lat: 47.5, lon: 14.5 },
    { id: 'nor', name: 'Noruega', flag: '🇳🇴', confederation: 'UEFA', fifaRank: 25, appearances: 4, titles: 0, bestResult: 'Oitavas (1998)', coach: 'Ståle Solbakken', lat: 60.5, lon: 8.5 },
    { id: 'sco', name: 'Escócia', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', confederation: 'UEFA', fifaRank: 35, appearances: 9, titles: 0, bestResult: 'Fase de grupos', coach: 'Steve Clarke', lat: 56.5, lon: -4.2 },
    { id: 'swe', name: 'Suécia', flag: '🇸🇪', confederation: 'UEFA', fifaRank: 28, appearances: 12, titles: 0, bestResult: 'Vice (1958)', coach: 'Jon Dahl Tomasson', lat: 60.1, lon: 18.6 },
    { id: 'tur', name: 'Turquia', flag: '🇹🇷', confederation: 'UEFA', fifaRank: 27, appearances: 3, titles: 0, bestResult: '3º (2002)', coach: 'Vincenzo Montella', lat: 38.9, lon: 35.2 },
    { id: 'bih', name: 'Bósnia e Herzegovina', flag: '🇧🇦', confederation: 'UEFA', fifaRank: 44, appearances: 2, titles: 0, bestResult: 'Fase de grupos', coach: 'Sergej Barbarez', lat: 43.9, lon: 17.7 },
    { id: 'cze', name: 'República Tcheca', flag: '🇨🇿', confederation: 'UEFA', fifaRank: 41, appearances: 7, titles: 0, bestResult: 'Vice (1934,1962 como TCH)', coach: 'Ivan Hašek', lat: 49.8, lon: 15.5 },
    // ===== CAF (9) =====
    { id: 'mar', name: 'Marrocos', flag: '🇲🇦', confederation: 'CAF', fifaRank: 12, appearances: 7, titles: 0, bestResult: '4º (2022)', coach: 'Walid Regragui', lat: 31.8, lon: -7.1 },
    { id: 'sen', name: 'Senegal', flag: '🇸🇳', confederation: 'CAF', fifaRank: 18, appearances: 4, titles: 0, bestResult: 'Quartas (2002)', coach: 'Pape Thiaw', lat: 14.5, lon: -14.5 },
    { id: 'egy', name: 'Egito', flag: '🇪🇬', confederation: 'CAF', fifaRank: 33, appearances: 4, titles: 0, bestResult: 'Fase de grupos', coach: 'Hossam Hassan', lat: 26.8, lon: 30.8 },
    { id: 'alg', name: 'Argélia', flag: '🇩🇿', confederation: 'CAF', fifaRank: 37, appearances: 5, titles: 0, bestResult: 'Oitavas (2014)', coach: 'Vladimir Petković', lat: 28.0, lon: 1.7 },
    { id: 'civ', name: 'Costa do Marfim', flag: '🇨🇮', confederation: 'CAF', fifaRank: 39, appearances: 4, titles: 0, bestResult: 'Fase de grupos', coach: 'Emerse Faé', lat: 7.5, lon: -5.5 },
    { id: 'tun', name: 'Tunísia', flag: '🇹🇳', confederation: 'CAF', fifaRank: 49, appearances: 7, titles: 0, bestResult: 'Fase de grupos', coach: 'Sami Trabelsi', lat: 33.9, lon: 9.5 },
    { id: 'cpv', name: 'Cabo Verde', flag: '🇨🇻', confederation: 'CAF', fifaRank: 70, appearances: 1, titles: 0, bestResult: 'Estreante', coach: 'Bubista', lat: 16.0, lon: -24.0, debut: true },
    { id: 'rsa', name: 'África do Sul', flag: '🇿🇦', confederation: 'CAF', fifaRank: 60, appearances: 4, titles: 0, bestResult: 'Fase de grupos', coach: 'Hugo Broos', lat: -30.6, lon: 22.9 },
    { id: 'cod', name: 'RD Congo', flag: '🇨🇩', confederation: 'CAF', fifaRank: 56, appearances: 2, titles: 0, bestResult: 'Quartas (1974 Zaire)', coach: 'Sébastien Desabre', lat: -4.0, lon: 21.8 },
    // ===== AFC (8) =====
    { id: 'jpn', name: 'Japão', flag: '🇯🇵', confederation: 'AFC', fifaRank: 15, appearances: 8, titles: 0, bestResult: 'Oitavas (4x)', coach: 'Hajime Moriyasu', lat: 36.2, lon: 138.3 },
    { id: 'irn', name: 'Irã', flag: '🇮🇷', confederation: 'AFC', fifaRank: 20, appearances: 7, titles: 0, bestResult: 'Fase de grupos', coach: 'Amir Ghalenoei', lat: 32.4, lon: 53.7 },
    { id: 'kor', name: 'Coreia do Sul', flag: '🇰🇷', confederation: 'AFC', fifaRank: 24, appearances: 12, titles: 0, bestResult: '4º (2002)', coach: 'Hong Myung-bo', lat: 35.9, lon: 127.8 },
    { id: 'aus', name: 'Austrália', flag: '🇦🇺', confederation: 'AFC', fifaRank: 26, appearances: 7, titles: 0, bestResult: 'Oitavas (2006,2022)', coach: 'Tony Popovic', lat: -25.3, lon: 133.8 },
    { id: 'ksa', name: 'Arábia Saudita', flag: '🇸🇦', confederation: 'AFC', fifaRank: 58, appearances: 7, titles: 0, bestResult: 'Oitavas (1994)', coach: 'Hervé Renard', lat: 23.9, lon: 45.1 },
    { id: 'qat', name: 'Catar', flag: '🇶🇦', confederation: 'AFC', fifaRank: 52, appearances: 2, titles: 0, bestResult: 'Fase de grupos', coach: 'Julen Lopetegui', lat: 25.4, lon: 51.2 },
    { id: 'jor', name: 'Jordânia', flag: '🇯🇴', confederation: 'AFC', fifaRank: 64, appearances: 1, titles: 0, bestResult: 'Estreante', coach: 'Jamal Sellami', lat: 30.6, lon: 36.2, debut: true },
    { id: 'uzb', name: 'Uzbequistão', flag: '🇺🇿', confederation: 'AFC', fifaRank: 57, appearances: 1, titles: 0, bestResult: 'Estreante', coach: 'Timur Kapadze', lat: 41.4, lon: 64.6, debut: true },
    { id: 'irq', name: 'Iraque', flag: '🇮🇶', confederation: 'AFC', fifaRank: 58, appearances: 2, titles: 0, bestResult: 'Fase de grupos', coach: 'Graham Arnold', lat: 33.2, lon: 43.7 },
    // ===== OFC (1) =====
    { id: 'nzl', name: 'Nova Zelândia', flag: '🇳🇿', confederation: 'OFC', fifaRank: 89, appearances: 3, titles: 0, bestResult: 'Fase de grupos', coach: 'Darren Bazeley', lat: -40.9, lon: 174.9 },
];
export const teamsByConfederation = (id) => TEAMS.filter((t) => t.confederation === id).sort((a, b) => a.fifaRank - b.fifaRank);
