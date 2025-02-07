import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

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

export const fetchScoreKeys = async (competitionId: number) => {
  const response = await axios.get(
    `${API_URL}/competitions/${competitionId}/score-keys`
  );
  console.log("Score KEYS:", response.data);
  return response.data;
};

export const saveScoreKey = async (competitionId: number, scoreKey: string) => {
  const response = await axios.post(`${API_URL}/competitions/score-keys`, {
    competition_id: competitionId,
    score_key: scoreKey,
  });
  console.log(scoreKey);
  console.log(response.data);

  return response.data;
};

export const deleteScoreKey = async (id: number) => {
  await axios.delete(`${API_URL}/competitions/score-keys/${id}`);
};
