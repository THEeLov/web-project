import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import "./applayout.css";

function AppLayout() {
  return (
    <div className="app-layout">
      <div className="app-layout-container">
        <div className="app-layout__nav">
          <Navigation />
        </div>
        <div className="app-layout__page">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
