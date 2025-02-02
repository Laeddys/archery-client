import { Button, Layout, Card, Typography, Divider, Table, Spin } from "antd";
import { convertDateToWords } from "../../utils/convertDateToWords";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { FC, useEffect, useState } from "react";
import {
  fetchCompetitionById,
  getCompetitionAthletes,
} from "../../store/reducers/competitions/competitionSlice";
import { RouteNames } from "../../router/routes";

const { Title, Paragraph, Text } = Typography;

const CompetitionInfo: FC = () => {
  const [qualificationResults, setQualificationResults] = useState([]);
  const [playoffs, setPlayoffs] = useState([]);
  const [activeSection, setActiveSection] = useState("info");

  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, isLoading } = useAppSelector(
    (state) => state.competitionSlice
  );

  const competition = useAppSelector((state) =>
    state.competitionSlice.competitions.find((comp) => comp.id === Number(id))
  );
  const athletes = useAppSelector(
    (state) => state.competitionSlice.athletes[Number(id)]
  );

  useEffect(() => {
    if (!competition) {
      dispatch(fetchCompetitionById(Number(id)));
    }
    if (!athletes) {
      dispatch(getCompetitionAthletes(Number(id)));
    }
  }, [dispatch, id, competition, athletes]);

  if (!competition) {
    return (
      <Layout style={{ padding: "24px", backgroundColor: "#f0f2f5" }}>
        <Card style={{ textAlign: "center" }}>
          <Title level={2} type="danger">
            Competition not found
          </Title>
          <Button type="primary" onClick={() => navigate(RouteNames.MAIN)}>
            Back to Main
          </Button>
        </Card>
      </Layout>
    );
  }

  if (isLoading) {
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
      <Title level={2}>{competition.name}</Title>

      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Button
          type={activeSection === "info" ? "primary" : "default"}
          onClick={() => setActiveSection("info")}
        >
          Info
        </Button>
        <Button
          type={activeSection === "participants" ? "primary" : "default"}
          onClick={() => setActiveSection("participants")}
        >
          Participants
        </Button>
        <Button
          type={activeSection === "qualification" ? "primary" : "default"}
          onClick={() => setActiveSection("qualification")}
        >
          Qualification
        </Button>
        <Button
          type={activeSection === "playoffs" ? "primary" : "default"}
          onClick={() => setActiveSection("playoffs")}
        >
          Playoffs
        </Button>
      </div>

      <Card>
        {activeSection === "info" && (
          <div
            style={{
              display: "flex",
              alignItems: "start",
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
              }}
            />

            <Divider type="vertical" />

            <div>
              <Text strong>Address:</Text> {competition.address} <br />
              <Text strong>Date:</Text> {competition.dateStart} -{" "}
              {competition.dateEnd} <br />
              <Text strong>Organizer:</Text> {competition.organizer} <br />
              <Text strong>Format:</Text> {competition.format} <br />
              <Text strong>Info:</Text> {competition.info} <br />
              <Text strong>Status:</Text> {competition.status}
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

export default CompetitionInfo;
