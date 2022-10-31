import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./views/Home";
import Category from "./views/Category";
import Favourite from "./views/Favourite";

function App() {
  return (
    <div className="App">
      <Routes >
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="category" element={<Category />} />
          <Route path="favourite" element={<Favourite />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
