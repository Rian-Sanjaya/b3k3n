import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import HeaderLayoout from "./Header";

function AppLayout() {
  const { Header, Content } = Layout;
  
  return (
    <Layout>
      <Header
        style={{ 
          position: "fixed", 
          zIndex: 1, 
          width: "100%", 
          background: "#f0f2f5", 
          height: "initial", 
          lineHeight: "initial",
          padding: "0 16px"
        }}
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