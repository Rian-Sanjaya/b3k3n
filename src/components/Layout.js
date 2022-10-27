import { Outlet, useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();

  return (
    <>
      <h1>
        <button onClick={() => navigate(-1)} style={{ marginRight: 4 }}>back</button>
        Title
      </h1>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;