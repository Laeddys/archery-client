import React, { FC, useEffect, useState } from "react";
import {
  Input,
  Button,
  Select,
  Layout,
  DatePicker,
  Form,
  Spin,
  Card,
} from "antd";
import moment from "moment";
import { IAthlete } from "../../models/IAthlete/IAthlete";
import { IClub } from "../../models/Club/IClub";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  createAthlete,
  fetchAthletes,
} from "../../store/reducers/athletes/athleteSlice";
import { fetchClubs } from "../../store/reducers/clubs/clubSlice";
import { rules } from "../../utils/rules";
import Title from "antd/es/typography/Title";

const { Option } = Select;
const { Content } = Layout;

const CreateAthlete: FC = () => {
  const [athleteData, setAthleteData] = useState<IAthlete>({
    id: 0,
    name: "",
    date_of_birth: "",
    gender: "",
    club_id: 0,
    "class/subclass": "",
    role: "",
    ranking: 0,
    club: {} as IClub,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { clubs } = useAppSelector((state) => state.clubSlice);
  const { athletes, error, isLoading } = useAppSelector(
    (state) => state.athleteSlice
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!athletes.length) {
      dispatch(fetchAthletes());
    }
  }, [dispatch, athletes]);

  useEffect(() => {
    if (!clubs.length) dispatch(fetchClubs());
  }, [dispatch, clubs.length]);

  const handleClubChange = (value: string | number) => {
    setAthleteData({
      ...athleteData,
      club_id: typeof value === "string" ? parseInt(value, 10) : value,
    });
  };

  const handleCreateAthlete = async () => {
    try {
      setErrorMessage(null);
      await dispatch(createAthlete(athleteData));
      await dispatch(fetchAthletes());
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to create athlete.");
    }
  };

  return (
    <Card>
      <Content>
        <Title>Create athlete</Title>
        <Spin spinning={isLoading}>
          <Form layout="vertical" onFinish={handleCreateAthlete}>
            <div>
              <Form.Item label="Name" name="name" rules={[rules.required()]}>
                <Input
                  type="text"
                  placeholder="Name"
                  value={athleteData.name}
                  onChange={(e) =>
                    setAthleteData({
                      ...athleteData,
                      name: e.target.value
                        .split(" ")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                        )
                        .join(" "),
                    })
                  }
                />
              </Form.Item>

              <Form.Item
                rules={[rules.required()]}
                label="Date of Birth:"
                name="date_of_birth"
              >
                <DatePicker
                  placeholder="Date of Birth"
                  style={{ width: "100%" }}
                  value={
                    athleteData.date_of_birth
                      ? moment(athleteData.date_of_birth)
                      : null
                  }
                  onChange={(date, dateString) =>
                    setAthleteData({
                      ...athleteData,
                      date_of_birth: dateString,
                    })
                  }
                />
              </Form.Item>

              <Form.Item
                label="Gender:"
                name="gender"
                rules={[rules.required()]}
              >
                <Select
                  placeholder="Select Gender"
                  value={athleteData.gender || ""}
                  style={{ width: "100%" }}
                  onChange={(value) =>
                    setAthleteData({ ...athleteData, gender: value })
                  }
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Club:" name="club" rules={[rules.required()]}>
                <Select
                  placeholder="Select Club"
                  value={athleteData.club_id || ""}
                  style={{ width: "100%" }}
                  onChange={handleClubChange}
                >
                  {clubs.map((club) => (
                    <Option key={club.id} value={club.id}>
                      {club.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Class/Subclass:"
                name="class/subclass"
                rules={[rules.required()]}
              >
                <Input
                  type="text"
                  placeholder="Subclass"
                  value={athleteData["class/subclass"]}
                  onChange={(e) =>
                    setAthleteData({
                      ...athleteData,
                      "class/subclass": e.target.value,
                    })
                  }
                />
              </Form.Item>

              <Form.Item label="Role:" name="role" rules={[rules.required()]}>
                <Select
                  mode="multiple"
                  placeholder="Select Role"
                  value={athleteData.role ? athleteData.role.split("/") : []}
                  style={{ width: "100%" }}
                  onChange={(values) =>
                    setAthleteData({
                      ...athleteData,
                      role: values.join("/"),
                    })
                  }
                >
                  <Option value="Athlete">Athlete</Option>
                  <Option value="Coach">Coach</Option>
                  <Option value="Judge">Judge</Option>
                </Select>
              </Form.Item>

              {errorMessage && (
                <div style={{ color: "red", marginBottom: "10px" }}>
                  {errorMessage}
                </div>
              )}

              <Button type="primary" htmlType="submit" loading={isLoading}>
                Create Athlete
              </Button>
            </div>
          </Form>
        </Spin>
      </Content>
    </Card>
  );
};

export default CreateAthlete;
