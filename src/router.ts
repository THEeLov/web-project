import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import UserPage from "./pages/UserPage/UserPage";
import AnimalPage from "./pages/AnimalPage/AnimalPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: UserPage,
      },
      {
        path: "animals",
        Component: AnimalPage,
      }
    ],
  },
]);
