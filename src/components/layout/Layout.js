import { Outlet, useLocation } from "react-router-dom";
import { Layout } from "antd";
import HeaderLayoout from "./Header";

function AppLayout() {
  const { Header, Content } = Layout;
  const location = useLocation();
  
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
      <Content className="content-layout-wrapper" style={{ marginTop: location.pathname === "/" ? "16px" : null }}>
        <Outlet />
      </Content>
    </Layout>
  );
}

export default AppLayout;