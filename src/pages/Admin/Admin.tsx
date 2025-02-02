import React, { FC, useEffect, useState } from "react";
import {
  Input,
  Button,
  Select,
  Modal,
  Layout,
  Menu,
  DatePicker,
  Form,
  Spin,
  message,
} from "antd";
import moment from "moment";
import classes from "./Admin.module.css";
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
import AddAthleteToCompetition from "../../components/AddAthleteToCompetition/AddAthleteToCompetition";

const { Option } = Select;
const { Sider, Content } = Layout;

const UserManagement: FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeOption, setActiveOption] = useState<string | null>(null);
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
  const [selectedAthleteId, setSelectedAthleteId] = useState<number | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { clubs } = useAppSelector((state) => state.clubSlice);
  const { athletes, error, isLoading } = useAppSelector(
    (state) => state.athleteSlice
  );
  const { competitions } = useAppSelector((state) => state.competitionSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!athletes.length) {
      dispatch(fetchAthletes());
    }
  }, [dispatch, athletes]);

  useEffect(() => {
    if (!clubs.length) dispatch(fetchClubs());
  }, [dispatch, clubs.length]);

  const handleAthleteSelect = (athleteId: number) => {
    setSelectedAthleteId(athleteId);
  };

  const handleClubChange = (value: string | number) => {
    setAthleteData({
      ...athleteData,
      club_id: typeof value === "string" ? parseInt(value, 10) : value,
    });
  };

  // const handleAddToCompetition = async () => {
  //   if (selectedAthleteId) {
  //     await dispatch(addToCompetition({ athleteId: selectedAthleteId, competitionId }));
  //     alert("Athlete successfully added to the competition!");
  //   } else {
  //     alert("Please select an athlete!");
  //   }
  // };

  const handleCreateAthlete = async () => {
    try {
      setErrorMessage(null);
      await dispatch(createAthlete(athleteData));
      setModalVisible(false);
      await dispatch(fetchAthletes());
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to create athlete.");
    }
  };

  const menuItems = [
    { key: "createAthlete", label: "Create Athlete" },
    { key: "addAthleteToCompetition", label: "Add Athlete to Competition" },
  ];

  const handleMenuClick = (key: string) => {
    setActiveOption(key);
    setModalVisible(true);
  };

  return (
    <Layout className={classes.layout}>
      <Sider
        className={classes.sider}
        style={{ backgroundColor: "#001529", color: "#fff" }}
        collapsed={false}
      >
        <Menu
          mode="inline"
          theme="dark"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            backgroundColor: "#001529",
            marginTop: "10px",
          }}
          onClick={({ key }) => handleMenuClick(key)}
        >
          {menuItems.map((item) => (
            <Menu.Item
              key={item.key}
              style={{ backgroundColor: "#001529", color: "#fff" }}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      <Layout style={{ marginLeft: 200 }}>
        <Content className={classes.content}>
          <Spin spinning={isLoading}>
            <Modal
              title={
                activeOption === "banUser"
                  ? "Ban User"
                  : activeOption === "assignRole"
                  ? "Assign Role"
                  : activeOption === "createAthlete"
                  ? "Create Athlete"
                  : activeOption === "addAthleteToCompetition"
                  ? "Add to Competition"
                  : ""
              }
              open={modalVisible}
              onCancel={() => setModalVisible(false)}
              footer={null}
            >
              {activeOption === "createAthlete" && (
                <Form layout="vertical" onFinish={handleCreateAthlete}>
                  <div className={classes.section}>
                    <Form.Item
                      label="Name"
                      name="name"
                      rules={[rules.required()]}
                    >
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

                    <Form.Item
                      label="Club:"
                      name="club"
                      rules={[rules.required()]}
                    >
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

                    <Form.Item
                      label="Role:"
                      name="role"
                      rules={[rules.required()]}
                    >
                      <Select
                        mode="multiple"
                        placeholder="Select Role"
                        value={
                          athleteData.role ? athleteData.role.split("/") : []
                        }
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

                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={isLoading}
                    >
                      Create Athlete
                    </Button>
                  </div>
                </Form>
              )}

              {activeOption === "addAthleteToCompetition" && (
                <AddAthleteToCompetition setModalVisible={setModalVisible} />
              )}
            </Modal>
          </Spin>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserManagement;
