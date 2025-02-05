import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const fetchCompetitionScores = async (competitionId: number) => {
  const response = await fetch(
    `${API_URL}/competitions/${competitionId}/scores`
  );
  const scores = await response.json();
  return { competitionId, scores };
};

export const saveCompetitionScore = async (
  competitionId: number,
  athleteId: number,
  scoreKey: string,
  scoreValue: string
) => {
  return await axios.post(`${API_URL}/competitions/scores`, {
    competition_id: competitionId,
    athlete_id: athleteId,
    score_key: scoreKey,
    score_value: scoreValue,
  });
};
