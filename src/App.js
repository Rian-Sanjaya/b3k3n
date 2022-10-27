import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./views/Home";
import HappinessAndMindfulness from "./views/HappinessAndMindfulness";

function App() {
  return (
    <div className="App">
      <Routes >
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="happinessmindfulness" element={<HappinessAndMindfulness />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
