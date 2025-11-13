import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import AuthProvider from "./AuthProvider.jsx";
import UpdateProfile from "./UpdateProfile.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import MyProfile from "./MyProfile.jsx";
import ForgetPassword from "./ForgotPassword.jsx";
import Invalid from "./Invalid.jsx";
import Services from "./Services.jsx";
import ServiceDetails from "./ServiceDetails.jsx";
import AddService from "./AddService.jsx";
import MyBookings from "./MyBookings.jsx";
import MyServices from "./MyServices.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "update", element: <UpdateProfile /> },
      { path: "services", element: <Services /> },
      { path: "myservices", element: <MyServices /> },
      {
        path: "services/:id",
        element: (
          <PrivateRoute>
            <ServiceDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "serviceAdd",
        element: <AddService />,
      },
      {
        path: "mybookings",
        element: <MyBookings />,
      },
      { path: "myprofile", element: <MyProfile /> },
      { path: "forget-password", element: <ForgetPassword /> },
      { path: "*", element: <Invalid /> },
      {path:"service/:id", element:<PrivateRoute><ServiceDetails /></PrivateRoute>},
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
