// import React from "react";
// import { Table } from "antd";

// interface Match {
//   key: string;
//   round: string;
//   team1: string;
//   score: string;
//   team2: string;
// }

// const columns = [
//   {
//     title: "Team 1",
//     dataIndex: "team1",
//     key: "team1",
//   },
//   {
//     title: "Score",
//     dataIndex: "score",
//     key: "score",
//   },
//   {
//     title: "Team 2",
//     dataIndex: "team2",
//     key: "team2",
//   },
// ];

// const data: Match[] = [
//   {
//     key: "1",
//     round: "Quarter-final",
//     team1: "Team A",
//     score: "2 - 1",
//     team2: "Team B",
//   },
//   {
//     key: "2",
//     round: "Quarter-final",
//     team1: "Team C",
//     score: "3 - 2",
//     team2: "Team D",
//   },
//   {
//     key: "3",
//     round: "Semi-final",
//     team1: "Team A",
//     score: "1 - 3",
//     team2: "Team C",
//   },
//   {
//     key: "4",
//     round: "Final",
//     team1: "Team C",
//     score: "-",
//     team2: "Winner of Match 3",
//   },
// ];

// const PlayoffTable: React.FC = () => {
//   const groupedData: Record<string, Match[]> = data.reduce((acc, match) => {
//     if (!acc[match.round]) {
//       acc[match.round] = [];
//     }
//     acc[match.round].push(match);
//     return acc;
//   }, {} as Record<string, Match[]>);

//   return (
//     <>
//       {Object.entries(groupedData).map(([round, matches]) => (
//         <div key={round}>
//           <h2>{round}</h2>
//           <Table
//             columns={columns}
//             dataSource={matches}
//             pagination={false}
//             rowKey="key"
//           />
//         </div>
//       ))}
//     </>
//   );
// };

// interface Match {
//   key: string;
//   round: string;
//   team1: string;
//   score: string;
//   team2: string;
// }

// const columns = [
//   {
//     title: "Team 1",
//     dataIndex: "team1",
//     key: "team1",
//   },
//   {
//     title: "Score",
//     dataIndex: "score",
//     key: "score",
//   },
//   {
//     title: "Team 2",
//     dataIndex: "team2",
//     key: "team2",
//   },
// ];

// const data: Match[] = [
//   {
//     key: "1",
//     round: "Quarter-final",
//     team1: "Team A",
//     score: "2 - 1",
//     team2: "Team B",
//   },
//   {
//     key: "2",
//     round: "Quarter-final",
//     team1: "Team C",
//     score: "3 - 2",
//     team2: "Team D",
//   },
//   {
//     key: "3",
//     round: "Semi-final",
//     team1: "Team A",
//     score: "1 - 3",
//     team2: "Team C",
//   },
//   {
//     key: "4",
//     round: "Final",
//     team1: "Team C",
//     score: "-",
//     team2: "Winner of Match 3",
//   },
// ];

// const groupedData: Record<string, Match[]> = data.reduce((acc, match) => {
//   if (!acc[match.round]) {
//     acc[match.round] = [];
//   }
//   acc[match.round].push(match);
//   return acc;
// }, {} as Record<string, Match[]>);

//  <>
//             {Object.entries(groupedData).map(([round, matches]) => (
//               <div key={round}>
//                 <h2>{round}</h2>
//                 <Table
//                   columns={columns}
//                   dataSource={matches}
//                   pagination={false}
//                   rowKey="key"
//                 />
//               </div>
//             ))}
//           </>

// export default PlayoffTable;
import React from "react";

const CompInfoTest = () => {
  return <div>CompInfoTest</div>;
};

export default CompInfoTest;
