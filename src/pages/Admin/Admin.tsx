import React, { useState } from "react";
import { UserOutlined, TeamOutlined, TrophyOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import AddAthleteToCompetition from "../../components/AddAthleteToCompetition/AddAthleteToCompetition";
import Title from "antd/es/typography/Title";

const { Header, Content, Sider } = Layout;

const Admin: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<React.ReactNode>(
    <Title> Select menu action</Title>
  );

  const menuItems = [
    {
      key: "addAthleteToCompetition",
      icon: <UserOutlined />,
      label: "Add athlete to competition",
      component: <AddAthleteToCompetition />,
    },
    {
      key: "manageAthletes",
      icon: <TeamOutlined />,
      label: "Управление атлетами",
      component: <div>Тут будет управление атлетами</div>,
    },
    {
      key: "manageCompetitions",
      icon: <TrophyOutlined />,
      label: "Управление соревнованиями",
      component: <div>Тут будет управление соревнованиями</div>,
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
          }}
        >
          Admin Panel
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
