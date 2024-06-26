import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import UserPage from "./pages/UserPage";
import AnimalPage from "./pages/AnimalPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      {
        path: "users",
        Component: UserPage,
      },
      {
        path: "animals",
        Component: AnimalPage,
      },
    ],
  },
]);
