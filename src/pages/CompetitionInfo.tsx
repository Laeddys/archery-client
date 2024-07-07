import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { Button, Layout } from "antd";
import { RouteNames } from "../router/routes";
import { fetchCompetitionById } from "../store/reducers/competitions/competitionSlice";
import { convertDateToWords } from "../utils/convertDateToWords";

const CompetitionInfo: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const competition = useAppSelector((state) =>
    state.competitionSlice.competitions.find((p) => p.id === Number(id))
  );
  const { isAdmin } = useAppSelector((state) => state.authSlice);
  const navigate = useNavigate();

  useEffect(() => {
    if (!competition) {
      dispatch(fetchCompetitionById(Number(id)));
    }
  }, [id, dispatch, competition]);

  //   const handleDeletePost = async () => {
  //     if (post) {
  //       await dispatch(deletePost(post.id));
  //     }
  //   };

  if (!competition) {
    return (
      <>
        <h1>Competition is not found...</h1>
        <Button type="text" onClick={() => navigate(RouteNames.MAIN)}>
          Return to Main page
        </Button>
      </>
    );
  }

  const backButtonStyle = {
    marginBottom: "24px",
    textAlign: "left",
  };

  // Создать css module

  const contentStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "24px",
    backgroundColor: "#f0f2f5",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  };

  const headingStyle = {
    fontSize: "24px",
    marginBottom: "12px",
  };

  const labelStyle = {
    fontWeight: "bold",
    marginRight: "8px",
  };

  return (
    <Layout style={{ padding: "24px", backgroundColor: "#f0f2f5" }}>
      <div style={{ marginBottom: "24px", textAlign: "left" }}>
        <Button
          type="dashed"
          onClick={() => {
            navigate(RouteNames.COMPETITIONS);
          }}
        >
          Back to Calendar
        </Button>
      </div>
      <div style={contentStyle}>
        <h1 style={headingStyle}>{competition?.name}</h1>
        <p>
          <span style={labelStyle}>Address:</span> {competition.address}
        </p>
        <p>
          <span style={labelStyle}>Date: </span>
          {`${convertDateToWords(competition.dateStart)} - ${convertDateToWords(
            competition.dateEnd
          )}`}
        </p>
        <p>
          <span style={labelStyle}>Format:</span> {competition.format}
        </p>
        <p>
          <span style={labelStyle}>Organizer:</span> {competition.organizer}
        </p>
        <p>
          <span style={labelStyle}>Info about competition:</span>{" "}
          {competition.info}
        </p>
      </div>
    </Layout>
  );
};

export default CompetitionInfo;
