// import React, { useState, useEffect } from "react";
// import { Button, Typography, Table, Input, Spin } from "antd";
// import { useParams } from "react-router-dom";
// import {
//   fetchCompetitionById,
//   getCompetitionAthletes,
// } from "../../store/reducers/competitions/competitionSlice";
// import { useAppDispatch } from "../../hooks/useAppDispatch";
// import { useAppSelector } from "../../hooks/useAppSelector";
// import {
//   loadCompetitionScores,
//   updateCompetitionScore,
// } from "../../store/reducers/competitionScore/competitionScoreSlice";
// import {
//   addScoreKey,
//   loadScoreKeys,
//   removeScoreKey,
// } from "../../store/reducers/competitionScoreKeys/competitionScoreKeysSlice";
// import type { ColumnsType } from "antd/es/table";
// import { IAthlete } from "../../models/IAthlete/IAthlete";

// const { Title, Text } = Typography;

// type Athlete = {
//   id: number;
//   name: string;
//   gender: string;
//   className: string;
// };

// type ScoreRecord = Record<number, Record<string, string>>;

// type Competition = {
//   id: number;
//   name: string;
//   address: string;
//   dateStart: string;
//   dateEnd: string;
//   organizer: string;
//   format: string;
// };

// const CompetitionInfo: React.FC = () => {
//   const [activeSection, setActiveSection] = useState("info");
//   const [localScores, setLocalScores] = useState<ScoreRecord>({});

//   const { id } = useParams<{ id: string }>();
//   const competitionId = Number(id);
//   const dispatch = useAppDispatch();

//   const competition: Competition | undefined = useAppSelector((state) =>
//     state.competitionSlice.competitions.find(
//       (comp: Competition) => comp.id === competitionId
//     )
//   );
//   const athletes: IAthlete[] = useAppSelector(
//     (state) => state.competitionSlice.athletes[competitionId] ?? []
//   );

//   const scoreKeys: string[] = useAppSelector(
//     (state) => state.competitionScoreKeysSlice.scoreKeys[competitionId] ?? []
//   );
//   const { isLoading } = useAppSelector((state) => state.competitionSlice);
//   const { isAdmin } = useAppSelector((state) => state.authSlice);
//   const { scores } = useAppSelector((state) => state.competitionScoreSlice);

//   useEffect(() => {
//     dispatch(fetchCompetitionById(competitionId));
//     dispatch(getCompetitionAthletes(competitionId));
//     dispatch(loadCompetitionScores(competitionId));
//     dispatch(loadScoreKeys(competitionId));
//   }, [dispatch, competitionId]);

//   const handleScoreChange = (
//     athleteId: number,
//     scoreKey: string,
//     value: string
//   ) => {
//     setLocalScores((prevScores) => ({
//       ...prevScores,
//       [athleteId]: { ...prevScores[athleteId], [scoreKey]: value },
//     }));
//   };

//   const handleSaveScore = async (athleteId: number, scoreKey: string) => {
//     const scoreValue = localScores[athleteId]?.[scoreKey];
//     if (scoreValue) {
//       await dispatch(
//         updateCompetitionScore({
//           competitionId,
//           athleteId,
//           scoreKey,
//           scoreValue,
//         })
//       );
//       setLocalScores((prev) => {
//         const updated = { ...prev };
//         delete updated[athleteId]?.[scoreKey];
//         return updated;
//       });
//     }
//   };

//   const handleAddScoreColumn = async () => {
//     const newScoreKey = `score-${scoreKeys.length + 1}`;
//     await dispatch(addScoreKey({ competitionId, scoreKey: newScoreKey }));
//     dispatch(loadScoreKeys(competitionId));
//   };

//   // const handleRemoveScoreColumn = async (scoreKey: string) => {
//   //   await dispatch(removeScoreKey({ competitionId, scoreKey }));
//   //   dispatch(loadScoreKeys(competitionId));
//   // };

//   const columns: ColumnsType<IAthlete> = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Class",
//       dataIndex: "className",
//       key: "className",
//     },
//     ...scoreKeys.map((scoreKey) => ({
//       title: `Score ${scoreKey.split("-")[1]}`,
//       dataIndex: scoreKey,
//       key: scoreKey,
//       render: (_: any, record: IAthlete) => {
//         const scoreValue =
//           localScores[record.id]?.[scoreKey] ??
//           scores[competitionId]?.[record.id]?.[scoreKey] ??
//           "";
//         return (
//           <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//             {isAdmin ? (
//               <Input
//                 value={scoreValue}
//                 onChange={(e) =>
//                   handleScoreChange(record.id, scoreKey, e.target.value)
//                 }
//               />
//             ) : (
//               <strong>{scoreValue}</strong>
//             )}
//             {isAdmin && (
//               <Button
//                 type="primary"
//                 disabled={!localScores[record.id]?.[scoreKey]}
//                 onClick={() => handleSaveScore(record.id, scoreKey)}
//               >
//                 💾
//               </Button>
//             )}
//           </div>
//         );
//       },
//     })),
//   ];

//   return (
//     <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
//       <Title level={2}>{competition?.name}</Title>
//       {isAdmin && (
//         <Button
//           type="primary"
//           onClick={handleAddScoreColumn}
//           style={{ marginBottom: 16 }}
//         >
//           Add Score Column
//         </Button>
//       )}
//       <Table dataSource={athletes} columns={columns} rowKey="id" />
//     </div>
//   );
// };

// export default CompetitionInfo;
import React from "react";

const CompInfoTest = () => {
  return <div>CompInfoTest</div>;
};

export default CompInfoTest;
