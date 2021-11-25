export default interface Player {
  id: string;
  firstName: string;
  lastName: string;
  position: number;
  ultraPosition: number;
  quotation: number;
  clubId: string;
  stats: {
    averageRating: number;
    totalGoals: number;
    totalMatches: number;
    totalStartedMatches: number;
    totalPlayedMatches: number;
    matches: Array<Match>;
  };
}

interface Match {
  playerClubId: string;
  matchId: string;
  gameWeekNumber: number;
  date: Date;
  home: {
    clubId: string;
    score: number;
  };
  away: {
    clubId: string;
    score: number;
  };
  playerPerformance: {
    status: number;
  };
}

export interface PlayerResponse {
  poolPlayers: Array<Player>;
}
