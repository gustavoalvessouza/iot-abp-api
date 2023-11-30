import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/home/index";

function Routes() {
    const router = createBrowserRouter([
        {
          path: "/",
          element: <Home />,
        }
      ]);

  return <RouterProvider router={router} />;
}

export default Routes;
