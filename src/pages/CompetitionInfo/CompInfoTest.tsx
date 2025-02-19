// import React, { FC, useEffect, useState } from "react";
// import { List, Button, Modal, Typography, Card } from "antd";
// import { ICompetition } from "../../models/ICompetition/ICompetition";
// import { useAppSelector } from "../../hooks/useAppSelector";
// import { useAppDispatch } from "../../hooks/useAppDispatch";
// import {
//   createCompetition,
//   fetchCompetitions,
// } from "../../store/reducers/competitions/competitionSlice";
// // import styles from "./CompetitionList.module.css";
// import CompForm from "../../components/CompForm/CompForm";
// import { useNavigate } from "react-router-dom";
// import { convertDateToWords } from "../../utils/convertDateToWords";

// const { Title } = Typography;

// const Competition: FC = () => {
//   const { error, isLoading, competitions } = useAppSelector(
//     (state) => state.competitionSlice
//   );
//   const { isAdmin } = useAppSelector((state) => state.authSlice);
//   const [modalOpen, setModalOpen] = useState(false);
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (competitions.length === 0) {
//       dispatch(fetchCompetitions());
//     }
//   }, [dispatch, competitions.length]);

//   if (isLoading) {
//     return <h1>Loading competitions...</h1>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className={styles.competitionListContainer}>
//       <Title className={styles.title}>Competitions</Title>
//       <List
//         className={styles.list}
//         bordered
//         dataSource={competitions}
//         renderItem={(competition) => (
//           <List.Item className={styles.listItem}>
//             <Card className={styles.competitionCard}>
//               <div className={styles.competitionContent}>
//                 <div className={styles.competitionImageWrapper}>
//                   {competition.photo ? (
//                     <img
//                       src={`http://127.0.0.1:8000/storage/${competition.photo}`}
//                       className={styles.competitionImage}
//                     />
//                   ) : (
//                     <img
//                       src="https://www.w3schools.com/images/w3schools_green.jpg"
//                       alt="Competition"
//                       className={styles.competitionImage}
//                     />
//                   )}
//                 </div>
//                 <div className={styles.competitionInfo}>
//                   <Title level={4}>{competition.name}</Title>
//                   <p>
//                     {convertDateToWords(competition.dateStart)} -{" "}
//                     {convertDateToWords(competition.dateEnd)}
//                   </p>
//                 </div>
//                 <div className={styles.competitionActions}>
//                   <Button
//                     type="primary"
//                     onClick={() => navigate(`/compInfo/${competition.id}`)}
//                   >
//                     View Competition
//                   </Button>
//                   <Button style={{ marginTop: 8 }} disabled>
//                     Register
//                   </Button>
//                 </div>
//               </div>
//             </Card>
//           </List.Item>
//         )}
//       />
//     </div>
//   );
// };

// export default Competition;
import React from "react";

const CompInfoTest = () => {
  return <div>CompInfoTest</div>;
};

export default CompInfoTest;
