import React, { useState, useEffect, useRef } from "react";
import { Button, Card, Typography, Table, Input, Spin, Select } from "antd";
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
import {
  addScoreKey,
  loadScoreKeys,
  updateScoreLabel,
} from "../../store/reducers/competitionScoreKeys/competitionScoreKeysSlice";
import { convertDateToWords } from "../../utils/convertDateToWords";
import { IAthlete } from "../../models/IAthlete/IAthlete";
import Playoff from "../../components/PlayoffBracket/PlayoffBracket";

const { Title, Text } = Typography;
const { Option } = Select;

const CompetitionInfo: React.FC = () => {
  const [activeSection, setActiveSection] = useState("info");
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [localScores, setLocalScores] = useState<
    Record<number, Record<string, string>>
  >({});
  const [localLabels, setLocalLabels] = useState<Record<string, string>>({});
  const [isSavingLabels, setIsSavingLabels] = useState(false);
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const competitionId = Number(id);
  const competition = useAppSelector(
    (state) => state.competitionSlice.competitionDetails[competitionId]
  );
  const athletes = useAppSelector(
    (state) => state.competitionSlice.athletes[Number(id)] ?? []
  );
  const scoreKeys: string[] = useAppSelector(
    (state) => state.competitionScoreKeysSlice.scoreKeys[competitionId] ?? []
  );
  const { isLoading } = useAppSelector((state) => state.competitionSlice);
  const { isAdmin } = useAppSelector((state) => state.authSlice);
  const { scores, isLoadingScores, isLoadingScoreKeys } = useAppSelector(
    (state) => state.competitionScoreSlice
  );

  useEffect(() => {
    // Придумать что-нибудь лучше, Возможно разделить на несколько useEffect. Слишком много запросов.
    const timeout = setTimeout(() => {
      if (!competition) {
        dispatch(fetchCompetitionById(competitionId));
      }
      if (!athletes.length) {
        dispatch(getCompetitionAthletes(competitionId));
      }
      if (!scores[competitionId]) {
        dispatch(loadCompetitionScores(competitionId));
      }
      if (!scoreKeys.length) {
        dispatch(loadScoreKeys(competitionId));
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [
    dispatch,
    competitionId,
    competition,
    athletes.length,
    scoreKeys.length,
    scores,
  ]);

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

  const handleAddScoreColumn = async () => {
    const resultAction = await dispatch(addScoreKey({ competitionId }));

    if (addScoreKey.fulfilled.match(resultAction)) {
      await dispatch(loadScoreKeys(Number(id)));
    } else {
      console.error("Failed to add score key:", resultAction);
    }
  };

  const handleLabelChange = (scoreKey: string, value: string) => {
    setLocalLabels((prev) => ({ ...prev, [scoreKey]: value }));
  };

  const handleSaveLabels = async () => {
    setIsSavingLabels(true);
    try {
      await Promise.all(
        Object.entries(localLabels).map(async ([scoreKey, scoreLabel]) => {
          await dispatch(updateScoreLabel({ scoreKey, scoreLabel }));

          setLocalLabels((prevLabels) => ({
            ...prevLabels,
            [scoreKey]: scoreLabel,
          }));
        })
      );
    } catch (error) {
      console.error("Failed to save labels:", error);
    } finally {
      setIsSavingLabels(false);
    }
  };

  const columnsConfig = (competitionId: number) => {
    return [
      { title: "Name", dataIndex: "name", key: "name" },
      {
        title: "Class",
        dataIndex: "class/subclass",
        key: "class/subclass",
        sorter: (a: IAthlete, b: IAthlete) =>
          a["class/subclass"].localeCompare(b["class/subclass"]),
      },
      ...scoreKeys.map(({ score_key, score_label }: any) => {
        const labelValue = localLabels[score_key] ?? score_label;
        return {
          title: isAdmin ? (
            <Input
              value={labelValue}
              onChange={(e) => handleLabelChange(score_key, e.target.value)}
            />
          ) : (
            labelValue || `Score ${score_key.split("-")[2]}`
          ),
          dataIndex: score_key,
          key: score_key,
          render: (_: any, record: any) => {
            const scoreValue =
              localScores[record.id]?.[score_key] ??
              scores[competitionId]?.[record.id]?.[score_key] ??
              "";

            return (
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                {isAdmin ? (
                  <Input
                    size="small"
                    value={scoreValue}
                    onChange={(e) =>
                      handleScoreChange(record.id, score_key, e.target.value)
                    }
                  />
                ) : (
                  <strong>{scoreValue}</strong>
                )}
                {isAdmin && (
                  <Button
                    size="small"
                    type="primary"
                    disabled={!localScores[record.id]?.[score_key]}
                    onClick={() => handleSaveScore(record.id, score_key)}
                    loading={isLoadingScoreKeys}
                  >
                    💾
                  </Button>
                )}
              </div>
            );
          },
        };
      }),
    ];
  };

  const sections = [
    { key: "info", label: "Info" },
    { key: "participants", label: "Participants" },
    { key: "qualification", label: "Qualification" },
    { key: "playoffs", label: "Playoffs" },
  ];
  const handleClassChange = (value: string) => {
    setSelectedClass(value);
  };

  const filteredAthletes = selectedClass
    ? athletes.filter((athlete) => athlete["class/subclass"] === selectedClass)
    : athletes;

  const uniqueClasses = Array.from(
    new Set(athletes.map((athlete) => athlete["class/subclass"]))
  );

  if (isLoading || isLoadingScores) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!competition) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Text type="secondary">Competition not found</Text>
      </div>
    );
  }

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
            {competition.photo ? (
              <img
                src={`http://127.0.0.1:8000/storage/${competition.photo}`}
                loading="lazy"
                alt="Competition"
                style={{
                  width: "300px",
                  height: "250px",
                  objectFit: "scale-down",
                  borderRadius: "8px",
                  flexShrink: 0,
                }}
              />
            ) : (
              <img
                src="https://www.w3schools.com/images/w3schools_green.jpg"
                alt="Competition"
                style={{
                  width: "250px",
                  height: "250px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  flexShrink: 0,
                }}
              />
            )}
            <div style={{ flex: 1 }}>
              <Text strong>Address:</Text> {competition?.address} <br />
              <Text strong>Date:</Text>{" "}
              {convertDateToWords(competition?.dateStart as string)} -
              {convertDateToWords(competition?.dateEnd as string)} <br />
              <Text strong>Organizer:</Text> {competition?.organizer} <br />
              <Text strong>Format:</Text> {competition?.format} <br />
              <Text strong>Status:</Text> {competition?.status} <br />
            </div>
          </div>
        )}

        {activeSection === "participants" && (
          <Table
            dataSource={athletes.filter((a) => a?.id !== undefined)}
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
            rowKey={(record) => record.id}
          />
        )}

        {activeSection === "qualification" && (
          <>
            <div>
              {isAdmin && (
                <Button
                  type="primary"
                  onClick={handleAddScoreColumn}
                  style={{ marginBottom: 16, display: "flex" }}
                >
                  Add Score Column
                </Button>
              )}
              <Select
                placeholder="Select Class..."
                onChange={handleClassChange}
                style={{
                  width: "100%",
                  display: "flex",
                  marginBottom: "20px",
                }}
                allowClear
              >
                {uniqueClasses.map((cls) => (
                  <Option key={cls} value={cls}>
                    {cls}
                  </Option>
                ))}
              </Select>

              <Table
                dataSource={filteredAthletes}
                columns={columnsConfig(competition?.id ?? 0)}
                pagination={false}
                rowKey={(record) => record.id}
              />
              {isAdmin && (
                <Button
                  type="primary"
                  onClick={handleSaveLabels}
                  disabled={Object.keys(localLabels).length === 0}
                  loading={isSavingLabels}
                  style={{ marginTop: 16 }}
                >
                  Save Labels
                </Button>
              )}
            </div>
          </>
        )}

        {activeSection === "playoffs" && <Playoff />}
      </Card>
    </div>
  );
};

export default CompetitionInfo;
