import React, { FC, useEffect } from "react";
import { Layout, Typography, Button, Card, Row, Col, Spin, List } from "antd";
// import { ArrowRightOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchCompetitions } from "../../store/reducers/competitions/competitionSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { RouteNames } from "../../router/routes";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { convertDateToWords } from "../../utils/convertDateToWords";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const WelcomePage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { competitions, isLoading } = useAppSelector(
    (state) => state.competitionSlice
  );

  useEffect(() => {
    if (!competitions.length) {
      dispatch(fetchCompetitions());
    }
  }, [competitions.length, dispatch]);

  const filteredCompetitions = competitions.filter((competition) => {
    const dateStart = moment(competition.dateStart);
    const currentDate = moment();

    const isWithinNext10Days = dateStart.isBetween(
      currentDate,
      currentDate.clone().add(10, "days"),
      null,
      "[]"
    );

    return isWithinNext10Days;
  });
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
                // icon={<ArrowRightOutlined />}
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
            <Card title="Upcoming Events" bordered={false}>
              <Text></Text>
              {isLoading ? (
                <div style={{ marginTop: "20px" }}>
                  <Spin size="small" />
                  <Text style={{ marginLeft: "10px" }}>
                    Loading competitions...
                  </Text>
                </div>
              ) : filteredCompetitions.length > 0 ? (
                <List
                  style={{ marginTop: "20px" }}
                  size="small"
                  dataSource={filteredCompetitions}
                  renderItem={(competition) => (
                    <List.Item>
                      <Text>
                        {competition.name}{" "}
                        <strong>
                          {convertDateToWords(competition.dateStart)}
                        </strong>
                      </Text>
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
    </Layout>
  );
};

export default WelcomePage;
