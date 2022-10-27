import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <NavLink to="/home" style={{ marginRight: 8 }}>Home</NavLink>
      <NavLink to="/happinessmindfulness">Happiness &#38; Mindfulness</NavLink>
    </nav>
  );
}

export default Navigation;