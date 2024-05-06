import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import "./applayout.css";

function AppLayout() {
  return (
    <div className="app-layout-container">
      <div className="app-layout">
        <Navigation />
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
