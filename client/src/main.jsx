import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'

// Bootstrap CSS and JS imports
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import CreateLamp from "./components/CreateLamp.jsx";
import UpdateLamp from "./components/UpdateLamp.jsx";
import ShowLampDetails from "./components/ShowLampDetails.jsx";
import ShowLampList from "./components/ShowLampList.jsx";
import CreateUser from "./components/CreateUser.jsx";
import UpdateUser from "./components/UpdateUser.jsx";
import CreateComment from "./components/CreateComment.jsx";
import UpdateComment from "./components/UpdateComment.jsx";

// Routes
const router = createBrowserRouter([
  { path: "/", element: <ShowLampList /> },
  { path: "/create-lamp", element: <CreateLamp /> },
  { path: "/show-lamp/:id", element: <ShowLampDetails /> },
  { path: "/edit-lamp/:id", element: <UpdateLamp /> },
  { path: "/create-user", element: <CreateUser />},
  { path: "/edit-user/:id", element: <UpdateUser />},
  { path: "/create-comment/:id", element: <CreateComment />},
  { path: "/edit-comment/:id", element: <UpdateComment />},
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
