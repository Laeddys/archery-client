import React, { FC, useEffect } from "react";
import { Layout, Typography, Button, Card, Row, Col, Spin, List } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchCompetitions } from "../../store/reducers/competitions/competitionSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { RouteNames } from "../../router/routes";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const WelcomePage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { competitions, isLoading } = useAppSelector(
    (state) => state.competitionSlice
  );

  useEffect(() => {
    if (competitions.length === 0) {
      dispatch(fetchCompetitions());
    }
  }, [competitions.length, dispatch]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#001529", padding: "0 20px" }}>
        <div
          style={{
            color: "white",
            fontSize: "24px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          #FREE SPACE FOR COMMERCIALS
        </div>
      </Header>

      <Content style={{ padding: "50px" }}>
        <Row justify="center" align="middle" style={{ textAlign: "center" }}>
          <Col span={24}>
            <Title level={1} style={{ color: "#001529" }}>
              Welcome to Archery!
            </Title>
            <Text style={{ fontSize: "18px", color: "#555" }}>
              Join us and improve your archery skills. Whether you’re a beginner
              or a pro, we have something for everyone.
            </Text>
            <div style={{ marginTop: "20px" }}>
              <Button
                type="primary"
                size="large"
                icon={<ArrowRightOutlined />}
                onClick={() => navigate(RouteNames.ABOUT)}
              >
                Learn More
              </Button>
            </div>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: "50px" }} justify="center">
          <Col span={8}>
            <Card title="Training Programs" bordered={false}>
              <Text>Explore our beginner and advanced training programs.</Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Equipment" bordered={false}>
              <Text>Get the best archery gear for your needs.</Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Events" bordered={false}>
              <Text></Text>
              {isLoading ? (
                <div style={{ marginTop: "20px" }}>
                  <Spin size="small" />
                  <Text style={{ marginLeft: "10px" }}>
                    Loading competitions...
                  </Text>
                </div>
              ) : competitions.length > 0 ? (
                <List
                  style={{ marginTop: "20px" }}
                  size="small"
                  dataSource={competitions}
                  renderItem={(competition) => (
                    <List.Item>
                      <Text>{competition.name}</Text>
                    </List.Item>
                  )}
                />
              ) : (
                <Text style={{ marginTop: "20px", display: "block" }}>
                  No upcoming events.
                </Text>
              )}
            </Card>
          </Col>
        </Row>
      </Content>

      <Footer
        style={{ textAlign: "center", background: "#001529", color: "white" }}
      >
        Archery Club ©2024
      </Footer>
    </Layout>
  );
};

export default WelcomePage;
