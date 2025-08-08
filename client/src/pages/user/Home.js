import React from "react";
import {
  CarryOutOutlined,
  NotificationOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { Row, Col, Card, Typography, Layout, Button } from "antd";
import { useNavigate } from "react-router-dom";
import LittleCalendar from "./LittleCalendar";
import LittleAnnouncement from "./LittleAnnouncement";
import LittlePayment from "./LittlePayment";
import store from "../setup/store";
function Home() {
  const { Text } = Typography;
  const { Header } = Layout;
  const navigate = useNavigate();
  const handleCalendarmore = () => {
    navigate("/Calendar");
  };
  const handleAnnouncementmore = () => {
    navigate("/Announcement");
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Header>
        <Row style={{ marginBottom: store.xys12, justifyContent: "center" }}>
          <Col>
            <Text
              style={{ color: "white", fontSize: "30px", overflow: "hidden" }}
            >
              My Dashboard 我的仪表盘
            </Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: "20px", justifyContent: "center" }}>
          <Card
            titleStyle={{
              height: store.TitleHeight,
              fontSize: store.xys36,
              fontWeight: 700,
            }}
            bodyStyle={{
              display: "flex",
              height: store.TitleHeight,
              width: "1000px",
              justifyContent: "center",
              padding: store.xys12,
              fontSize: store.xys36,
              fontWeight: 700,
              border: true,
            }}
            title={
              <span>
                <DollarOutlined />
                <span> </span>
                <span>Payment management</span>
              </span>
            }
          >
            <LittlePayment />
          </Card>
        </Row>
        <Row gutter={16} style={{ justifyContent: "center" }}>
          <Col>
            <Card
              style={{ width: 500 }}
              titleStyle={{
                height: store.TitleHeight,
                fontSize: store.xys36,
                fontWeight: 700,
              }}
              bodyStyle={{
                display: "flex",
                height: "300px",
                justifyContent: "center",
                padding: store.xys12,
                fontSize: store.xys36,
                fontWeight: 700,
                border: true,
              }}
              title={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>
                    <CarryOutOutlined />
                    <span> </span>
                    <span>Recent Events</span>
                  </span>
                  <Button type="text" size="small" onClick={handleCalendarmore}>
                    <span style={{ textDecoration: "underline" }}>more...</span>
                  </Button>
                </div>
              }
            >
              <div className="little-calendar-container">
                <LittleCalendar />
              </div>
            </Card>
          </Col>
          <Col>
            <Card
              titleStyle={{
                height: store.TitleHeight,
                fontSize: store.xys36,
                fontWeight: 700,
              }}
              bodyStyle={{
                display: "flex",
                height: store.TitleHeight,
                width: "500px",
                justifyContent: "left",
                padding: store.xys12,
                fontSize: store.xys36,
                fontWeight: 700,
                border: true,
              }}
              title={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>
                    <NotificationOutlined />
                    <span> </span>
                    <span>Announcements</span>
                  </span>
                  <Button
                    type="text"
                    size="small"
                    onClick={handleAnnouncementmore}
                  >
                    <span style={{ textDecoration: "underline" }}>more...</span>
                  </Button>
                </div>
              }
            >
              <LittleAnnouncement />
            </Card>
          </Col>
        </Row>
      </Header>
    </Layout>
  );
}
export default Home;
