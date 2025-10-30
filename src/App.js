// import Certifications from './components/Certifications.jsx';
// import Headline from './components/Headline.jsx';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from "react";
import "./css/navbar.css";

import HomeModal from "./components/Headline";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Experience from "./components/Experience";

function App() {
  const [active, setActive] = useState("Home");

  const navItems = [
    { name: "Home", icon: "fa-solid fa-house" },
    { name: "Learnings", icon: "fa-solid fa-file-lines" },
    { name: "Work", icon: "fa-solid fa-briefcase" },
    { name: "Projects", icon: "fa-solid fa-address-card" },
  ];

  const getContentForActive = () => {
    switch (active) {
      case "Home":
        return <HomeModal />;
      case "Learnings":
        return <Education />;
      case "Work":
        return <Experience />;
      case "Projects":
        return <Projects />;
      default:
        return <HomeModal />;
    }
  };
  return (
    <div className="App">
      <div className="container-fluid align-items-center bg-light">
        <div className="row w-100 mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-center mt-4">
              <div className="navbar-header container-fluid p-2 rounded-4 bg-light">
                <div className="navbar-container justify-content-end d-flex flex-wrap">
                  {navItems.map((item) => (
                    <div
                      key={item.name}
                      onClick={() => setActive(item.name)}
                      className="navbar-icons d-flex flex-column align-items-center rounded-4 p-3"
                      style={{
                        background:
                          active === item.name
                            ? "linear-gradient(135deg, #fcde19, #ff3d00)"
                            : "#f1f5f9",
                        color: active === item.name ? "white" : "#555",
                      }}
                    >
                      <i className={item.icon} style={{ fontSize: "15px" }}></i>
                      <small
                        className="fw-semibold"
                        style={{ fontSize: "10px" }}
                      >
                        {item.name}
                      </small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row w-100">
          <LeftPanel />
          <RightPanel content={getContentForActive()} />
        </div>
      </div>
    </div>
  );
}

export default App;
