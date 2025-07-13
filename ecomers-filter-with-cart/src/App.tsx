import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Applayout from "./Layout/Applayout";
import Home from "./Pages/Home";
import { EcomersProvider } from "./Context/context";

const router = createBrowserRouter([
  {
    element: <Applayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <EcomersProvider>
        <RouterProvider router={router} />
      </EcomersProvider>
    </>
  );
}

export default App;
