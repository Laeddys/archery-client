import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import React, { FC, useState } from "react";
import { rules } from "../../utils/rules";
import { Dayjs } from "dayjs";
import { ICompetition } from "../../models/ICompetition/ICompetition";
import { formatDate } from "../../utils/formatDate";
import { useAppSelector } from "../../hooks/useAppSelector";
import styles from "./CompForm.module.css";

interface CompetitionFormProps {
  competitions: ICompetition[];
  submit: (competition: ICompetition) => void;
}

const CompetitionForm: FC<CompetitionFormProps> = (props) => {
  const { isLoading } = useAppSelector((state) => state.competitionSlice);
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
    props.submit({ ...competition });
  };

  return (
    <div className={styles.formContainer}>
      <Form layout="vertical" onFinish={submitForm} className={styles.form}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Competition Name"
              name="name"
              rules={[rules.required()]}
            >
              <Input
                placeholder="Enter competition name"
                onChange={(event) =>
                  setCompetition({ ...competition, name: event.target.value })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Date Start"
              name="dateStart"
              rules={[rules.required()]}
            >
              <DatePicker
                onChange={selectDateStart}
                className={styles.datePicker}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Date End"
              name="dateEnd"
              rules={[rules.required()]}
            >
              <DatePicker
                onChange={selectDateEnd}
                className={styles.datePicker}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Format" name="format" rules={[rules.required()]}>
              <Input
                placeholder="Enter format"
                onChange={(event) =>
                  setCompetition({ ...competition, format: event.target.value })
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Address"
              name="address"
              rules={[rules.required()]}
            >
              <Input
                placeholder="Enter address"
                onChange={(event) =>
                  setCompetition({
                    ...competition,
                    address: event.target.value,
                  })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Organizer"
              name="organizer"
              rules={[rules.required()]}
            >
              <Input
                placeholder="Enter organizer"
                onChange={(event) =>
                  setCompetition({
                    ...competition,
                    organizer: event.target.value,
                  })
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Info" name="info" rules={[rules.required()]}>
          <Input.TextArea
            rows={4}
            placeholder="Enter additional information"
            onChange={(event) =>
              setCompetition({ ...competition, info: event.target.value })
            }
          />
        </Form.Item>
        <Row justify="center">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className={styles.submitButton}
            >
              Add Competition
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};

export default CompetitionForm;
