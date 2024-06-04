import { Button, DatePicker, Form, Input, Row, Select } from "antd";
import React, { FC, useState } from "react";
import { rules } from "../utils/rules";

import { Dayjs } from "dayjs";

import { ICompetition } from "../models/ICompetition/ICompetition";
import { formatDate } from "../utils/formatDate";
import { useAppSelector } from "../hooks/useAppSelector";

interface CompetitionFormProps {
  competitions: ICompetition[];
  submit: (competition: ICompetition) => void;
}

const CompetitionForm: FC<CompetitionFormProps> = (props) => {
  const { user } = useAppSelector((state) => state.authSlice);
  const { isLoading, error, competitions } = useAppSelector(
    (state) => state.competitionSlice
  );
  const [competition, setCompetition] = useState<ICompetition>({
    author: "",
    name: "",
    dateStart: "",
    dateEnd: "",
    format: "",
    address: "",
    organizer: "",
    info: "",
    status: 23,
  } as ICompetition);

  const selectDateStart = (date: Dayjs | null) => {
    if (date) {
      setCompetition({ ...competition, dateStart: formatDate(date.toDate()) });
    }
  };

  const selectDateEnd = (date: Dayjs | null) => {
    if (date) {
      setCompetition({ ...competition, dateEnd: formatDate(date.toDate()) });
    }
  };

  const submitForm = () => {
    props.submit({ ...competition, author: user.email });
  };

  return (
    <Form onFinish={submitForm}>
      <Form.Item
        label="Competition name"
        name="name"
        rules={[rules.required()]}
      >
        <Input
          onChange={(event) =>
            setCompetition({ ...competition, name: event.target.value })
          }
        />
      </Form.Item>

      <Form.Item
        label="Date start"
        name="date start"
        rules={[rules.required()]}
      >
        <DatePicker onChange={(date) => selectDateStart(date)} />
      </Form.Item>

      <Form.Item label="Date end" name="date end" rules={[rules.required()]}>
        <DatePicker onChange={(date) => selectDateEnd(date)} />
      </Form.Item>

      <Form.Item label="Format" name="format" rules={[rules.required()]}>
        <Input
          onChange={(event) =>
            setCompetition({ ...competition, format: event.target.value })
          }
        />
      </Form.Item>

      <Form.Item label="Address" name="adress" rules={[rules.required()]}>
        <Input
          onChange={(event) =>
            setCompetition({ ...competition, address: event.target.value })
          }
        />
      </Form.Item>

      <Form.Item label="Organizer" name="organizer" rules={[rules.required()]}>
        <Input
          onChange={(event) =>
            setCompetition({ ...competition, organizer: event.target.value })
          }
        />
      </Form.Item>

      <Form.Item label="Info" name="info" rules={[rules.required()]}>
        <Input
          onChange={(event) =>
            setCompetition({ ...competition, info: event.target.value })
          }
        />
      </Form.Item>

      <Row justify="center">
        <Form.Item>
          <Button type="default" htmlType="submit" loading={isLoading}>
            Add Competition
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default CompetitionForm;
