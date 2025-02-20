import React, { useEffect, useState } from "react";
import { Card, Select, Button, InputNumber, Table, Spin } from "antd";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  fetchPlayoff,
  updateBracket,
} from "../../store/reducers/playoff/playoffSlice";
import axios from "axios";

const Playoff: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const brackets = useAppSelector((state) => state.playoffSlice.brackets);
  const loading = useAppSelector(
    (state) => state.playoffSlice.isLoadingPlayoff
  );
  const athletes = useAppSelector(
    (state) => state.competitionSlice.athletes[Number(id)] ?? []
  );
  const isAdmin = useAppSelector((state) => state.authSlice.isAdmin);

  const [selectedClass, setSelectedClass] = useState<string>("");
  const [playoffSize, setPlayoffSize] = useState<number | null>(null);
  const [bracket, setBracket] = useState<
    { 1: string | null; 2: string | null }[][]
  >([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchPlayoff(id));
    }
  }, [id, dispatch]);

  const uniqueClasses = Array.from(
    new Set(athletes.map((athlete) => athlete["class/subclass"]))
  );

  useEffect(() => {
    if (uniqueClasses.length > 0 && !selectedClass) {
      setSelectedClass(uniqueClasses[0]);
    }
  }, [uniqueClasses]);

  useEffect(() => {
    if (selectedClass) {
      setBracket(brackets[selectedClass] || []);
    }
  }, [selectedClass, brackets]);

  const filteredAthletes = selectedClass
    ? athletes.filter((athlete) => athlete["class/subclass"] === selectedClass)
    : [];

  const roundNames = [
    "1/16 Final",
    "1/8 Final",
    "1/4 Final",
    "1/2 Final",
    "Final",
    "3rd Place",
  ];

  const generateBracket = () => {
    if (!playoffSize || filteredAthletes.length < playoffSize) return;

    let rounds = [];
    let matchCount = playoffSize / 2;

    let initialRound = Array.from({ length: matchCount }, () => ({
      1: null,
      2: null,
    }));
    rounds.push(initialRound);

    while (matchCount > 1) {
      matchCount = Math.floor(matchCount / 2);
      let nextRound = Array.from({ length: matchCount }, () => ({
        1: null,
        2: null,
      }));
      rounds.push(nextRound);
    }

    if (playoffSize > 2) {
      rounds.push([{ 1: null, 2: null }]);
    }

    setBracket(rounds);
  };

  const handleSave = async () => {
    if (!id || !selectedClass || bracket.length === 0) {
      console.error("Error: No class selected or bracket is empty");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/playoff/${id}`, {
        competition_id: id,
        class: selectedClass,
        bracket: JSON.stringify(bracket),
      });
      console.log("Bracket saved successfully!");
    } catch (error) {
      console.error("Error saving bracket:", error);
    }
  };

  return (
    <Card title="Playoff Bracket">
      <Select
        placeholder="Select Class"
        value={selectedClass || undefined}
        onChange={setSelectedClass}
        style={{ width: 200, marginBottom: 16 }}
      >
        {uniqueClasses.length > 0 ? (
          uniqueClasses.map((cls) => (
            <Select.Option key={cls} value={cls}>
              {cls}
            </Select.Option>
          ))
        ) : (
          <Select.Option value="" disabled>
            No Classes Available
          </Select.Option>
        )}
      </Select>

      {isAdmin && (
        <>
          <InputNumber
            placeholder="Playoff Size"
            min={2}
            max={filteredAthletes.length}
            onChange={setPlayoffSize}
            style={{ marginLeft: 16 }}
          />
          <Button
            type="primary"
            onClick={generateBracket}
            style={{ marginLeft: 16 }}
          >
            Generate
          </Button>
          <Button
            type="default"
            onClick={handleSave}
            style={{ marginLeft: 16 }}
          >
            Save
          </Button>
        </>
      )}

      {loading ? (
        <Spin style={{ marginTop: 16 }} />
      ) : (
        <div style={{ marginTop: 16 }}>
          {Array.isArray(bracket) && bracket.length > 0 ? (
            bracket.map((round, index) => (
              <Card
                key={index}
                title={roundNames[roundNames.length - bracket.length + index]}
                style={{ marginBottom: 16 }}
              >
                <Table
                  dataSource={round.map((match, matchIndex) => ({
                    key: matchIndex,
                    ...match,
                  }))}
                  columns={[
                    {
                      title: "Match",
                      dataIndex: "key",
                      key: "key",
                      render: (text) => `Match ${text + 1}`,
                    },
                    {
                      title: "Athlete 1",
                      dataIndex: "1",
                      key: "1",
                      render: (_, record, matchIndex) =>
                        isAdmin ? (
                          <Select
                            placeholder="Select"
                            style={{ width: 150 }}
                            value={record["1"]}
                            onChange={(value) => {
                              const updatedBracket = bracket.map(
                                (round, rIndex) =>
                                  rIndex === index
                                    ? round.map((match, mIndex) =>
                                        mIndex === matchIndex
                                          ? { ...match, 1: value }
                                          : match
                                      )
                                    : round
                              );
                              setBracket([...updatedBracket]);
                              dispatch(
                                updateBracket({
                                  class: selectedClass,
                                  bracket: updatedBracket,
                                })
                              );
                            }}
                          >
                            {filteredAthletes.map((a) => (
                              <Select.Option key={a.id} value={a.name}>
                                {a.name}
                              </Select.Option>
                            ))}
                          </Select>
                        ) : (
                          <strong>{record["1"] ?? "TBD"}</strong>
                        ),
                    },
                    {
                      title: "Result",
                      dataIndex: "key",
                      key: "key",

                      render: (text) => `Match ${text + 1}`,
                    },
                    {
                      title: "Athlete 2",
                      dataIndex: "2",
                      key: "2",
                      render: (_, record, matchIndex) =>
                        isAdmin ? (
                          <Select
                            placeholder="Select"
                            style={{ width: 150 }}
                            value={record["2"]}
                            onChange={(value) => {
                              const updatedBracket = bracket.map(
                                (round, rIndex) =>
                                  rIndex === index
                                    ? round.map((match, mIndex) =>
                                        mIndex === matchIndex
                                          ? { ...match, 2: value }
                                          : match
                                      )
                                    : round
                              );
                              setBracket([...updatedBracket]);
                              dispatch(
                                updateBracket({
                                  class: selectedClass,
                                  bracket: updatedBracket,
                                })
                              );
                            }}
                          >
                            {filteredAthletes.map((a) => (
                              <Select.Option key={a.id} value={a.name}>
                                {a.name}
                              </Select.Option>
                            ))}
                          </Select>
                        ) : (
                          <strong>{record["2"] ?? "TBD"}</strong>
                        ),
                    },
                  ]}
                  pagination={false}
                />
              </Card>
            ))
          ) : (
            <p>To be decided</p>
          )}
        </div>
      )}
    </Card>
  );
};

export default Playoff;
