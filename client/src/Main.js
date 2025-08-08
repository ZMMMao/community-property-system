import { useState } from "react";
import { Button, Col, Layout, Menu } from "antd";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  CarryOutOutlined,
  CommentOutlined,
  DashboardOutlined,
  NotificationOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import LoginPage from "./pages/LoginPage";

const { Header, Sider, Content } = Layout;
function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathToKey = {
    "/Home": "1",
    "/Calendar": "2",
    "/Chat": "3",
    "/Announcement": "4",
    "/Payment": "5",
    "/AdminHome": "6",
    "/AdminAnnouncement": "7",
  };
  const [state, setState] = useState({
    authed: false,
    asHost: false,
  });

  const handleClickMenuItem = (e) => {
    const path = e.item.props.path;
    if (path) {
      navigate(path);
    }
  };
  const handleLoginSuccess = (asHost) => {
    setState({ authed: true, asHost: asHost });
    if (asHost) {
      navigate("/AdminHome");
    } else {
      navigate("/Home");
    }
  };
  const handleLogout = () => {
    setState({ authed: false, asHost: false });
    alert("goodbye!");
  };
  if (state.authed === false) {
    return (
      <Layout>
        <Header style={{ padding: 0, display: "flex", height: "75px" }}>
          <div
            style={{
              marginLeft: "20px",
              color: "white",
              fontSize: "40px",
            }}
          >
            Community Management System
          </div>
        </Header>
        <LoginPage handleLoginSuccess={handleLoginSuccess} />
      </Layout>
    );
  }
  if (!state.asHost) {
    return (
      <Layout>
        <Header
          style={{
            padding: 0,
            display: "flex",
            height: "75px",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              marginLeft: "20px",
              color: "white",
              fontSize: "40px",
            }}
          >
            Community Management System
          </div>
          <Col style={{ padding: 5, marginRight: "10px" }}>
            <Button shape="round" onClick={handleLogout}>
              Logout
            </Button>
          </Col>
        </Header>
        <Layout
          style={{
            minHeight: "100vh",
          }}
        >
          <Sider
            style={{ backgroundColor: "white" }}
            width={256}
            className="site-layout-background"
          >
            <Menu
              theme="white"
              onClick={handleClickMenuItem}
              mode="inline"
              style={{ width: 256 }}
              selectedKeys={[pathToKey[location.pathname]]}
              items={[
                {
                  key: "1",
                  icon: <DashboardOutlined />,
                  label: "Dashboard",
                  path: "/Home",
                },
                {
                  key: "2",
                  icon: <CarryOutOutlined />,
                  label: "Calendar",
                  path: "/Calendar",
                },
                {
                  key: "3",
                  icon: <CommentOutlined />,
                  label: "Chat",
                  path: "/Chat",
                },
                {
                  key: "4",
                  icon: <NotificationOutlined />,
                  label: "Announcement",
                  path: "/Announcement",
                },
                {
                  key: "5",
                  icon: <DollarOutlined />,
                  label: "Payments",
                  path: "/Payment",
                },
              ]}
            />
          </Sider>
          <Content
            style={{
              margin: "10px 10px",
              padding: 0,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    );
  }
  return (
    <Layout>
      <Header
        style={{
          padding: 0,
          display: "flex",
          height: "75px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            marginLeft: "20px",
            color: "white",
            fontSize: "40px",
          }}
        >
          Community Management System
        </div>
        <Col span={300} style={{ padding: 5, marginRight: "20px" }}>
          <Button shape="round" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Header>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          style={{ backgroundColor: "white" }}
          width={256}
          className="site-layout-background"
        >
          <Menu
            theme="white"
            onClick={handleClickMenuItem}
            mode="inline"
            style={{ width: 256 }}
            selectedKeys={[pathToKey[location.pathname]]}
            items={[
              {
                key: "6",
                icon: <DashboardOutlined />,
                label: "Dashboard",
                path: "/AdminHome",
              },
              {
                key: "7",
                icon: <NotificationOutlined />,
                label: "Announcement",
                path: "/AdminAnnouncement",
              },
              {
                key: "2",
                icon: <CarryOutOutlined />,
                label: "Calendar",
                path: "/Calendar",
              },
            ]}
          />
        </Sider>
        <Content
          style={{
            margin: "10px 10px",
            padding: 0,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Main;
