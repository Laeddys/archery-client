import React, { useState, useEffect } from "react";
import { Button, Card, Typography, Table, Input, Spin } from "antd";
import { useParams } from "react-router-dom";
import {
  fetchCompetitionById,
  getCompetitionAthletes,
} from "../../store/reducers/competitions/competitionSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  loadCompetitionScores,
  updateCompetitionScore,
} from "../../store/reducers/competitionScore/competitionScoreSlice";

const { Title, Text } = Typography;

const CompetitionInfo: React.FC = () => {
  const [activeSection, setActiveSection] = useState("info");
  const [playoffs, setPlayoffs] = useState([]);
  const [columnsSheet, setcolumnsSheet] = useState<string[]>(["score-1"]);
  const [scoreCounter, setScoreCounter] = useState(2);
  const [localScores, setLocalScores] = useState<
    Record<number, Record<string, string>>
  >({});

  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const competition = useAppSelector((state) =>
    state.competitionSlice.competitions.find((comp) => comp.id === Number(id))
  );
  const athletes = useAppSelector(
    (state) => state.competitionSlice.athletes[Number(id)] ?? []
  );
  const { isLoading } = useAppSelector((state) => state.competitionSlice);
  const { isAdmin } = useAppSelector((state) => state.authSlice);
  const { scores, isLoadingScores, error } = useAppSelector(
    (state) => state.competitionScoreSlice
  );

  useEffect(() => {
    if (!competition || !athletes.length) {
      dispatch(fetchCompetitionById(Number(id)));
      dispatch(getCompetitionAthletes(Number(id)));
    }
    dispatch(loadCompetitionScores(Number(id)));
  }, [dispatch, id, competition, athletes.length]);

  // const initialScores = useMemo(() => {
  //   return athletes.reduce((acc, athlete) => {
  //     acc[athlete.id] = { "score-1": "" };
  //     return acc;
  //   }, {} as Record<number, Record<string, string>>);
  // }, [athletes]);

  const handleScoreChange = (
    athleteId: number,
    scoreKey: string,
    value: string
  ) => {
    setLocalScores((prevScores) => ({
      ...prevScores,
      [athleteId]: { ...prevScores[athleteId], [scoreKey]: value },
    }));
  };

  const handleSaveScore = async (athleteId: number, scoreKey: string) => {
    const scoreValue = localScores[athleteId]?.[scoreKey];

    if (scoreValue !== undefined && scoreValue !== "") {
      await dispatch(
        updateCompetitionScore({
          competitionId: Number(id),
          athleteId,
          scoreKey,
          scoreValue,
        })
      );

      setLocalScores((prevScores) => {
        const updatedScores = { ...prevScores };

        if (updatedScores[athleteId]) {
          delete updatedScores[athleteId][scoreKey];

          if (Object.values(updatedScores[athleteId]).length === 0) {
            delete updatedScores[athleteId];
          }
        }

        return updatedScores;
      });
    }
  };
  const handleAddScoreColumn = () => {
    const newScoreKey = `score-${scoreCounter}`;
    setcolumnsSheet([...columnsSheet, newScoreKey]);
    setScoreCounter(scoreCounter + 1);
  };

  const columnsConfig = (competitionId: number) => [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => {
        if ("isHeader" in record && record.isHeader)
          return <strong>Class {record.className}</strong>;
        return text;
      },
    },
    {
      title: "Class/Subclass",
      dataIndex: "class/subclass",
      key: "class/subclass",
      render: (text: string, record: any) =>
        "isHeader" in record && record.isHeader ? null : text,
    },
    ...columnsSheet.map((scoreKey) => ({
      title: `Score ${scoreKey.split("-")[1]}`,
      dataIndex: scoreKey,
      key: scoreKey,
      render: (text: string, record: any) => {
        if ("isHeader" in record && record.isHeader) return null;

        const scoreValue =
          localScores[record.id]?.[scoreKey] ??
          scores[competitionId]?.[record.id]?.[scoreKey] ??
          "";

        return (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {isAdmin ? (
              <Input
                value={scoreValue}
                disabled={!isAdmin}
                onChange={(e) =>
                  isAdmin &&
                  handleScoreChange(record.id, scoreKey, e.target.value)
                }
              />
            ) : (
              <strong style={{ color: "red" }}>{scoreValue}</strong>
            )}

            {isAdmin && (
              <Button
                type="primary"
                disabled={!localScores[record.id]?.[scoreKey]}
                onClick={() => handleSaveScore(record.id, scoreKey)}
              >
                💾
              </Button>
            )}
          </div>
        );
      },
    })),
  ];

  if (isLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <Spin size="large" />
      </div>
    );
  }

  const sections = [
    { key: "info", label: "Info" },
    { key: "participants", label: "Participants" },
    { key: "qualification", label: "Qualification" },
    { key: "playoffs", label: "Playoffs" },
  ];

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
      <Title level={2}>{competition?.name}</Title>

      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {sections.map(({ key, label }) => (
          <Button
            key={key}
            type={activeSection === key ? "primary" : "default"}
            onClick={() => setActiveSection(key)}
          >
            {label}
          </Button>
        ))}
      </div>

      <Card>
        {activeSection === "info" && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "48px",
              textAlign: "left",
            }}
          >
            <img
              src="https://www.w3schools.com/images/w3schools_green.jpg"
              alt="Competition"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1 }}>
              <Text strong>Address:</Text> {competition?.address} <br />
              <Text strong>Date:</Text> {competition?.dateStart} -{" "}
              {competition?.dateEnd} <br />
              <Text strong>Organizer:</Text> {competition?.organizer} <br />
              <Text strong>Format:</Text> {competition?.format} <br />
            </div>
          </div>
        )}

        {activeSection === "participants" && (
          <Table
            dataSource={athletes}
            columns={[
              { title: "Name", dataIndex: "name", key: "name" },
              { title: "Gender", dataIndex: "gender", key: "gender" },
              {
                title: "Class",
                dataIndex: "class/subclass",
                key: "class/subclass",
              },
            ]}
            pagination={false}
          />
        )}

        {activeSection === "qualification" && (
          <div>
            {isAdmin && (
              <Button
                type="primary"
                onClick={handleAddScoreColumn}
                style={{ marginBottom: 16 }}
              >
                Add Score Column
              </Button>
            )}

            <Table
              dataSource={athletes}
              columns={columnsConfig(competition?.id ?? 0)}
              pagination={false}
              rowKey="id"
              bordered
              loading={isLoadingScores}
              rowClassName={(record) =>
                "isHeader" in record && record.isHeader ? "header-row" : ""
              }
            />
          </div>
        )}

        {activeSection === "playoffs" && (
          <Table
            dataSource={playoffs}
            columns={[
              { title: "Round", dataIndex: "round", key: "round" },
              { title: "Player 1", dataIndex: "player1", key: "player1" },
              { title: "Player 2", dataIndex: "player2", key: "player2" },
              { title: "Winner", dataIndex: "winner", key: "winner" },
            ]}
            pagination={false}
          />
        )}
      </Card>
    </div>
  );
};

export default CompetitionInfo;
