import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Films from "./pages/Films/components/Films/Films";
import Sidebar from "./layout/Sidebar";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col sm:flex-row min-h-screen">
        <Sidebar />
        <div className="flex flex-grow">
          <Routes>
            <Route path="/" element={<Films />} />
            <Route path="/about" element={<About />} />
            <Route path="/films" element={<Films />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
