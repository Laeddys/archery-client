import Layout from "antd/es/layout/layout";
import React, { FC, useEffect, useState } from "react";
import CompCalendar from "../components/CompCalendar";
import { useAppSelector } from "../hooks/useAppSelector";
import { Button, Card, Modal, Row } from "antd";
import CompForm from "../components/CompForm";
import { ICompetition } from "../models/ICompetition/ICompetition";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { CompetitionActionCreators } from "../store/reducers/competitions/action-creators";

const Competition: FC = () => {
  const { error, isLoading, competitions } = useAppSelector(
    (state) => state.competitionSlice
  );
  const { isAdmin } = useAppSelector((state) => state.authSlice);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(CompetitionActionCreators.fetchCompetitions());
  }, []);

  const addNewCompetition = async (competition: ICompetition) => {
    try {
      await dispatch(CompetitionActionCreators.createCompetition(competition));
      await dispatch(CompetitionActionCreators.fetchCompetitions());
    } catch (error) {
      console.error("Failed to add competition", error);
    } finally {
      setModalOpen(false);
    }
  };

  if (isLoading) {
    return <h1>Loading competitions calendar...</h1>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Layout>
      <h1 className="title">Competitions</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
          width: "80em",
          border: "1px solid black",
        }}
      >
        <CompCalendar competitions={competitions} />
      </div>

      {isAdmin && (
        <Row justify="center" style={{ margin: "10px 10px" }}>
          <Button onClick={() => setModalOpen(true)}>Add competition</Button>
        </Row>
      )}
      <Modal
        title="Add competition"
        open={modalOpen}
        footer={null}
        onCancel={() => setModalOpen(false)}
      >
        <CompForm competitions={competitions} submit={addNewCompetition} />
      </Modal>
    </Layout>
  );
};

export default Competition;
