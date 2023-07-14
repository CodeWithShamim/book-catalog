import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
