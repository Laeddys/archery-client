import React, { useEffect } from "react";
import { Card, Divider, List, Button, Spin, Alert } from "antd";
import { useAppSelector } from "../../hooks/useAppSelector";
import { convertDateToWords } from "../../utils/convertDateToWords";
import { ICompetition } from "../../models/ICompetition/ICompetition";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchCompetitions } from "../../store/reducers/competitions/competitionSlice";
import dayjs from "dayjs";
import "./CompetitionList.css";

const CompetitionList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, isLoading, competitions } = useAppSelector(
    (state) => state.competitionSlice
  );

  useEffect(() => {
    if (competitions.length === 0) {
      dispatch(fetchCompetitions());
    }
  }, [dispatch, competitions.length]);

  const handleNavigate = (id: number) => {
    navigate(`/compInfo/${id}`);
  };

  if (isLoading) {
    return (
      <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
    );
  }

  const sortedCompetitions = [...competitions].sort(
    (a, b) => new Date(b.dateStart).getTime() - new Date(a.dateStart).getTime()
  );

  const competitionsByMonth = sortedCompetitions.reduce<
    Record<string, ICompetition[]>
  >((acc, competition) => {
    const month = dayjs(competition.dateStart).format("MMMM YYYY");
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(competition);
    return acc;
  }, {});

  if (isLoading) {
    return <Spin size="default"> </Spin>;
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        style={{ margin: "20px auto" }}
      />
    );
  }

  return (
    <>
      <Title style={{ textAlign: "center" }}>Competitions</Title>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {Object.entries(competitionsByMonth).map(([month, comps]) => (
          <div key={month} style={{ width: "100%", maxWidth: "900px" }}>
            <Title level={3} style={{ margin: "20px 0", textAlign: "left" }}>
              {month}
            </Title>
            <List
              grid={{ gutter: 16, xxl: 1 }}
              dataSource={comps}
              renderItem={(competition) => (
                <List.Item
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Card
                    title={`${competition.name} | ${convertDateToWords(
                      competition.dateStart
                    )} - ${convertDateToWords(competition.dateEnd)}`}
                    style={{
                      width: "100%",
                      maxWidth: "800px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <img
                        src={
                          competition.photo
                            ? `http://127.0.0.1:8000/storage/${competition.photo}`
                            : "https://www.w3schools.com/images/w3schools_green.jpg"
                        }
                        alt="Competition"
                        style={{
                          width: "200px",
                          height: "200px",
                          objectFit: "scale-down",
                          borderRadius: "8px",
                          flexShrink: 0,
                          marginBottom: "16px",
                        }}
                      />
                      <Divider type="vertical" plain />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "flex-start",
                          marginLeft: "16px",
                          flex: 1,
                        }}
                      >
                        <h3>Location: {competition.address}</h3>
                        <h3>Format: {competition.format}</h3>
                        <h3>Organizer: {competition.organizer}</h3>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          type="primary"
                          style={{ marginBottom: "8px" }}
                          onClick={() => handleNavigate(competition.id)}
                        >
                          Competition
                        </Button>
                        <Button type="default">Registration</Button>
                      </div>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default CompetitionList;
