import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { LeftOutlined } from "@ant-design/icons";
import { getTitle } from "../../store/header";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const title = useSelector(getTitle);

  return (
    <div className="layout-header-box">
      {location.pathname !== "/" &&
        <button onClick={() => navigate(-1)}>
          <LeftOutlined />
        </button>
      }
      <span className="title">{ title }</span>
    </div>
  )
}

export default Header;