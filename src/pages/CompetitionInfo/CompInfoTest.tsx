import { useState, useEffect, FC } from "react";
import { Button, Card, Table, Typography, Spin } from "antd";
import { useAppSelector } from "../../hooks/useAppSelector";

const { Title, Text } = Typography;

const CompetitionInfoTest: FC = () => {
  const [competition, setCompetition] = useState(null);
  const [athletes, setAthletes] = useState([]);
  const [qualificationResults, setQualificationResults] = useState([]);
  const [playoffs, setPlayoffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("info");

  const { competitions } = useAppSelector((state) => state.competitionSlice);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Запускаем все запросы параллельно
        const [competitionRes, athletesRes, qualificationRes, playoffsRes] =
          await Promise.all([
            fetch("/api/competition").then((res) => res.json()),
            fetch("/api/athletes").then((res) => res.json()),
            fetch("/api/qualification").then((res) => res.json()),
            fetch("/api/playoffs").then((res) => res.json()),
          ]);

        setCompetition(competitionRes);
        setAthletes(athletesRes);
        setQualificationResults(qualificationRes);
        setPlayoffs(playoffsRes);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
      <Title level={2}>competitions.name</Title>

      {/* Кнопки переключения секций */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Button onClick={() => setActiveSection("info")}>Info</Button>
        <Button onClick={() => setActiveSection("participants")}>
          Participants
        </Button>
        <Button onClick={() => setActiveSection("qualification")}>
          Qualification
        </Button>
        <Button onClick={() => setActiveSection("playoffs")}>Playoffs</Button>
      </div>

      {/* Контент в зависимости от выбранной секции */}
      <Card>
        {activeSection === "info" && (
          <div style={{ textAlign: "left" }}>
            <Text strong>Address:</Text> competition.address <br />
            <Text strong>Date:</Text> competition.dateStart -
            competition.dateEnd <br />
            <Text strong>Organizer:</Text> competition.organizer <br />
            <Text strong>Format:</Text> competition.format <br />
            <Text strong>Info:</Text> competition.info <br />
            <Text strong>Status:</Text>
          </div>
        )}

        {activeSection === "participants" && (
          <Table
            dataSource={athletes}
            columns={[
              { title: "Name", dataIndex: "name", key: "name" },
              { title: "Gender", dataIndex: "gender", key: "gender" },
            ]}
            pagination={false}
          />
        )}

        {activeSection === "qualification" && (
          <Table
            dataSource={qualificationResults}
            columns={[
              { title: "Name", dataIndex: "name", key: "name" },
              { title: "Score", dataIndex: "score", key: "score" },
            ]}
            pagination={false}
          />
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

export default CompetitionInfoTest;
