import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { titleChanged } from "../store/header";
import Navigation from "../components/Navigation";

function Home() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(titleChanged("Home"));
  }, [dispatch])

  return (
    <div className="content-layout-container">
      <Navigation />
      <div>Home Page</div>
    </div>
  );
}

export default Home;