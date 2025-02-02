import React from "react";
import { Layout, Card, Button, Typography, Space } from "antd";
import { Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const About: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header Section */}
      <Header style={{ backgroundColor: "#2c3e50", color: "white" }}>
        <Title level={2} style={{ color: "white", textAlign: "center" }}>
          Archery Sports: Everything You Need to Know
        </Title>
      </Header>

      <Content style={{ padding: "20px" }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          {/* Section 1 */}
          <Card
            title="Where and How to Do Arc Shooting?"
            style={{ marginBottom: "20px" }}
          >
            <Title level={4}>Arc Shooting Indoors</Title>
            <Paragraph>
              LLSF is a sports club association whose activities are related to
              arc shooting sports.
            </Paragraph>
            <Paragraph>
              The only sport represented by the Federation is arc shooting, but
              it has different types of arc and different disciplines. The arc
              shooter can choose whether to specialize in the arc shooting
              Olympic discipline, participating in the SUV, or practicing the
              historic side of the archery.
            </Paragraph>
          </Card>

          {/* Section 2 */}
          <Card title="How to Start Classes?" style={{ marginBottom: "20px" }}>
            <Paragraph>
              It is best to start archery under the guidance of a coach or
              instructor in one of the sports clubs. Clubs usually have access
              to a beginner's inventory, so you don't have to buy it and you can
              assess whether the sport is a good fit for you and if there is a
              desire to continue doing it. The club will have the opportunity to
              get acquainted with different circuits and shooting disciplines
              and decide which one to specialize in.
            </Paragraph>
            <Paragraph>
              The contacts of all clubs in the Latvian Archery Federation can be
              found here. The map, on the other hand, contains clubs by their
              location and also includes contact details of the non-federation
              group shooting enthusiasts.
            </Paragraph>
          </Card>

          {/* Section 3 */}
          <Card
            title="Can I Get to the Olympics with Arc Shooting?"
            style={{ marginBottom: "20px" }}
          >
            <Title level={4}>
              Jānis Bruzis participates in the European Games in Minsk 2019
            </Title>
            <Paragraph>
              Since archery is an Olympic sport, Latvia has a rim shooting
              selection that goes to the World and European Championships and
              Cups for Olympic and Paralympic Quotas.
            </Paragraph>
            <Paragraph>
              Latvian athletes also have opportunities to participate in
              European and World Championships and Cups in various disciplines
              (outdoors, premises, areas, skiing, or running) and European and
              world games.
            </Paragraph>
            <Paragraph>
              In order to qualify for the team and represent Latvia in
              international competitions, a member of the club must be in the
              Federation and show appropriate results, which are drafted by the
              Judicial Transmission Council (3D and SUVs are developed by the
              LLSF SUV Stock Working Group).
            </Paragraph>
            <Paragraph>
              Similarly, any member of the Federation has the opportunity to
              participate in amateur competitions ("Sports for All" or "People's
              Sports"), specially created for this purpose in competition
              organized by an international organization.
            </Paragraph>
          </Card>

          {/* Section 4 */}
          <Card
            title="Can Arc Shooting Be Involved in the Yard of Your Home?"
            style={{ marginBottom: "20px" }}
          >
            <Title level={4}>Training in the Yard</Title>
            <Paragraph>
              In accordance with the Weapons Chain Law, "Small Energy Pneumatic
              Weapons, as well as thrown cold weapons and bows that have no
              hunting nozzles, are allowed to be used in an enclosed place,
              subject to safety requirements to prevent damage to humans,
              animals, property, and the environment. It would not cause
              disruption of public order."
            </Paragraph>
            <Paragraph>
              So, if the courtyard with a bow is safe, the area is enclosed and
              it will not cause harm to accidentally fired arrow or arrow
              ricochet, then natural and legal persons have the right to create
              a shooting area in a real estate owned or held, without the need
              for municipal permission.
            </Paragraph>
          </Card>

          {/* Navigation or Actions */}
          <Space
            style={{ marginTop: "20px" }}
            direction="vertical"
            size="middle"
          >
            <Button type="primary">
              <Link to="/clubs">Find Archery Clubs</Link>
            </Button>
            <Button type="default">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </Space>
        </Space>
      </Content>

      {/* Footer Section */}
      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "#2c3e50",
          color: "white",
        }}
      >
        <p>&copy; 2024 Archery Federation | All Rights Reserved</p>
      </Footer>
    </Layout>
  );
};

export default About;
