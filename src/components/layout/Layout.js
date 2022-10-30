import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import HeaderLayoout from "./Header";

function AppLayout() {
  const { Header, Content } = Layout;
  
  return (
    <Layout>
      <Header
        style={{ position: "fixed", zIndex: 1, width: "100%", background: "#fff" }}
      >
        <HeaderLayoout />
      </Header>
      <Content className="content-layout-wrapper">
        <Outlet />
      </Content>
    </Layout>
  );
}

export default AppLayout;