import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchCompetitionScores = async (competitionId: number) => {
  const response = await fetch(
    `${API_URL}/competitions/${competitionId}/scores`
  );
  const scores = await response.json();
  return { competitionId, scores };
};

export const saveCompetitionScores = async (
  scores: {
    competitionId: number;
    athleteId: number;
    scoreKey: string;
    scoreValue: string;
  }[]
) => {
  const formattedScores = scores.map(
    ({ competitionId, athleteId, scoreKey, scoreValue }) => ({
      competition_id: competitionId,
      athlete_id: athleteId,
      score_key: scoreKey,
      score_value: scoreValue,
    })
  );

  console.log(formattedScores);
  return await axios.post(`${API_URL}/competitions/scores`, {
    scores: formattedScores,
  });
};

export const fetchScoreKeys = async (competitionId: number) => {
  const response = await axios.get(
    `${API_URL}/competitions/${competitionId}/score-keys`
  );
  return response.data;
};

export const saveScoreKey = async (competitionId: number, scoreKey: string) => {
  const response = await axios.post(`${API_URL}/competitions/score-keys`, {
    competition_id: competitionId,
    score_key: scoreKey,
  });

  return response.data;
};

export const deleteScoreKey = async (id: number) => {
  await axios.delete(`${API_URL}/competitions/score-keys/${id}`);
};
