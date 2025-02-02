import React, { FC, useEffect, useState } from "react";
import { Form, Select, Button, Spin, Alert, Modal } from "antd";
import { fetchAthletes } from "../../store/reducers/athletes/athleteSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  addAthleteToCompetition,
  fetchCompetitions,
  clearError,
} from "../../store/reducers/competitions/competitionSlice";
import { rules } from "../../utils/rules";
import { convertDateToWords } from "../../utils/convertDateToWords";

const { Option } = Select;

interface AddAthleteToCompetitionProps {
  setModalVisible: (visible: boolean) => void;
}

const AddAthleteToCompetition: FC<AddAthleteToCompetitionProps> = ({
  setModalVisible,
}) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { athletes, isLoading } = useAppSelector((state) => state.athleteSlice);
  const { competitions, error } = useAppSelector(
    (state) => state.competitionSlice
  );
  const [selectedAthleteId, setSelectedAthleteId] = useState<number | null>(
    null
  );
  const [selectedCompetitionId, setSelectedCompetitionId] = useState<number>(0);

  useEffect(() => {
    if (!athletes.length) {
      dispatch(fetchAthletes());
    }
  }, [dispatch, athletes]);

  useEffect(() => {
    if (!competitions.length) {
      dispatch(fetchCompetitions());
    }
  }, [dispatch, competitions]);

  const handleAthleteSelect = (athleteId: number) => {
    setSelectedAthleteId(athleteId);
  };

  const handleCompetitionSelect = (competitionId: number) => {
    setSelectedCompetitionId(competitionId);
  };

  const handleSubmit = async () => {
    try {
      if (selectedAthleteId) {
        await dispatch(
          addAthleteToCompetition({
            athleteId: selectedAthleteId,
            competitionId: selectedCompetitionId,
          })
        );
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    dispatch(clearError());
  };

  return (
    <>
      <Form onFinish={handleSubmit} form={form} layout="vertical">
        {error && (
          <Alert
            style={{ marginBottom: "10px" }}
            message={error}
            type="error"
            showIcon
          />
        )}
        <Form.Item
          label="Select Athlete:"
          name="select athlete"
          rules={[{ required: true, message: "Please select an athlete!" }]}
        >
          {isLoading ? (
            <Spin size="small" />
          ) : (
            <Select
              placeholder="Select Athlete"
              style={{ width: "100%" }}
              onChange={handleAthleteSelect}
            >
              {athletes.map((athlete) => (
                <Option key={athlete.id} value={athlete.id}>
                  {athlete.name}{" "}
                  <small>
                    <strong>{athlete.club?.name || "No Club"}</strong>
                  </small>
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item
          label="Select Event:"
          name="select competition"
          rules={[rules.required("Please select competition!")]}
        >
          {isLoading ? (
            <Spin size="small" />
          ) : (
            <Select
              size="large"
              placeholder="Select Competition"
              style={{ width: "100%" }}
              onChange={handleCompetitionSelect}
            >
              {competitions.map((comp) => (
                <Option key={comp.id} value={comp.id}>
                  {comp.name}{" "}
                  <strong>
                    <small>
                      {convertDateToWords(comp.dateStart)} -{" "}
                      {convertDateToWords(comp.dateEnd)}
                    </small>
                  </strong>
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" loading={isLoading} htmlType="submit">
            Add Athlete
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Add Athlete"
        open={!!error}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Close
          </Button>,
        ]}
      >
        <p>{error}</p>
      </Modal>
    </>
  );
};

export default AddAthleteToCompetition;
