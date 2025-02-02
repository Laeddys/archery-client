import Layout from "antd/es/layout/layout";
import React, { FC, useEffect, useState } from "react";
import CompCalendar from "../../components/CompCalendar/CompCalendar";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Button, Card, Modal, Row } from "antd";
import CompForm from "../../components/CompForm/CompForm";
import { ICompetition } from "../../models/ICompetition/ICompetition";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  createCompetition,
  fetchCompetitions,
} from "../../store/reducers/competitions/competitionSlice";
import styles from "./Competitions.module.css";
import { useNavigate } from "react-router-dom";

const Competition: FC = () => {
  const { error, isLoading, competitions } = useAppSelector(
    (state) => state.competitionSlice
  );
  const { isAdmin } = useAppSelector((state) => state.authSlice);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (competitions.length === 0) {
      dispatch(fetchCompetitions());
    }
  }, []);

  const addNewCompetition = async (competition: ICompetition) => {
    try {
      await dispatch(createCompetition(competition));
      await dispatch(fetchCompetitions());
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
    <Layout className={styles.layout}>
      <h1 className={styles.title}>Competitions</h1>
      <Card className={styles.calendarCard}>
        <CompCalendar competitionsData={{ data: competitions }} />
      </Card>

      {isAdmin && (
        <Row justify="center" className={styles.addButtonRow}>
          <Button type="primary" onClick={() => setModalOpen(true)}>
            Add Competition
          </Button>
        </Row>
      )}
      <Modal
        title="Add Competition"
        open={modalOpen}
        footer={null}
        onCancel={() => setModalOpen(false)}
        className={styles.modal}
      >
        <CompForm competitions={competitions} submit={addNewCompetition} />
      </Modal>
    </Layout>
  );
};

export default Competition;
