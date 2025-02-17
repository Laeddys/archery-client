import React, { FC, useEffect, useState } from "react";
import { Form, Select, Button, Spin, Alert, notification, Card } from "antd";
import { fetchAthletes } from "../../store/reducers/athletes/athleteSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  addAthleteToCompetition,
  fetchCompetitions,
} from "../../store/reducers/competitions/competitionSlice";
import { rules } from "../../utils/rules";
import { convertDateToWords } from "../../utils/convertDateToWords";
import Title from "antd/es/typography/Title";

const { Option } = Select;

const AddAthleteToCompetition: FC = () => {
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
        ).unwrap();

        notification.success({
          message: "Success!",
          description: "Athlete added to a competition successfully!.",
          placement: "topRight",
        });

        form.resetFields();
        setSelectedAthleteId(null);
        setSelectedCompetitionId(0);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      {error && (
        <Alert
          style={{ marginBottom: "10px" }}
          message={error}
          type="error"
          showIcon
        />
      )}
      <Card>
        <Title>Add Athlete to a competition</Title>
        <Form onFinish={handleSubmit} form={form} layout="vertical">
          <Form.Item
            label="Select athlete:"
            name="select athlete"
            rules={[rules.required("Select athlete!")]}
          >
            {isLoading ? (
              <Spin size="small" />
            ) : (
              <Select
                placeholder="Select athlete"
                style={{ width: "100%" }}
                onChange={handleAthleteSelect}
                value={selectedAthleteId ?? undefined}
              >
                {athletes.map((athlete) => (
                  <Option key={athlete.id} value={athlete.id}>
                    {athlete.name}{" "}
                    <small>
                      <strong>{athlete.club?.name || "No clubs"}</strong>
                    </small>
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item
            label="Select competition:"
            name="select competition"
            rules={[rules.required("Select competition!")]}
          >
            {isLoading ? (
              <Spin size="small" />
            ) : (
              <Select
                size="large"
                placeholder="Select competition"
                style={{ width: "100%" }}
                onChange={handleCompetitionSelect}
                value={selectedCompetitionId || undefined}
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
              Add athlete
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default AddAthleteToCompetition;
