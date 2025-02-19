import React, { useState } from "react";
import { UserOutlined, TeamOutlined, TrophyOutlined } from "@ant-design/icons";
import { Layout, Menu, Typography } from "antd";
import AddAthleteToCompetition from "../../components/AddAthleteToCompetition/AddAthleteToCompetition";
import Title from "antd/es/typography/Title";
import CreateAthlete from "../../components/CreateAthlete/CreateAthlete";
import CreateClub from "../../components/CreateClub/CreateClub";
import CompetitionForm from "../../components/CompForm/CompForm";
import { useAppSelector } from "../../hooks/useAppSelector";
import { ICompetition } from "../../models/ICompetition/ICompetition";
import {
  createCompetition,
  fetchCompetitions,
} from "../../store/reducers/competitions/competitionSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const { Header, Content, Sider } = Layout;

const Admin: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<React.ReactNode>(
    <Title>Select menu action</Title>
  );

  const dispatch = useAppDispatch();
  const { competitions } = useAppSelector((state) => state.competitionSlice);

  const addNewCompetition = async (competition: ICompetition) => {
    try {
      await dispatch(createCompetition({ competition }));
      await dispatch(fetchCompetitions());
    } catch (error) {
      console.error("Failed to add competition", error);
    }
  };

  const menuItems = [
    {
      key: "addAthleteToCompetition",
      icon: <UserOutlined />,
      label: "Add athlete to competition",
      component: <AddAthleteToCompetition />,
    },
    {
      key: "createAthlete",
      icon: <TeamOutlined />,
      label: "Create Athlete",
      component: <CreateAthlete />,
    },
    {
      key: "createClub",
      icon: <TrophyOutlined />,
      label: "Create club",
      component: <CreateClub />,
    },
    {
      key: "createCompetition",
      icon: <TrophyOutlined />,
      label: "Create competition",
      component: (
        <CompetitionForm
          competitions={competitions}
          submit={addNewCompetition}
        />
      ),
    },
  ];

  const handleMenuClick = (key: string) => {
    const item = menuItems.find((item) => item.key === key);
    if (item) {
      setSelectedComponent(item.component);
    }
  };

  return (
    <Layout>
      <Sider width={300} breakpoint="lg" collapsedWidth="0" collapsible>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => handleMenuClick(key)}
          items={menuItems.map(({ key, icon, label }) => ({
            key,
            icon,
            label,
          }))}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 24,
            background: "#f0f2f5",
            borderBottom: "1px solid #ddd",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          <Title>Admin Panel</Title>
        </Header>
        <Content
          style={{
            padding: 24,
            minHeight: "calc(100vh - 64px)",
            background: "#fff",
          }}
        >
          {selectedComponent}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
