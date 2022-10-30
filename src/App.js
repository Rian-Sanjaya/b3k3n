import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./views/Home";
import Category from "./views/Category";

function App() {
  return (
    <div className="App">
      <Routes >
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="category" element={<Category />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
