import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Films from "./pages/Films/Films";
import Sidebar from "./layout/Sidebar";

const App = () => {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/about" Component={About} />
        <Route path="/films" Component={Films} />
      </Routes>
    </Router>
  );
};

export default App;
