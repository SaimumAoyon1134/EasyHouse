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
import Order from "./Order.jsx";
import MyProfile from "./MyProfile.jsx";
import AllCourse from "./AllCourse.jsx";
import SkillDetails from "./SkillDetails.jsx";
import ForgetPassword from "./ForgotPassword.jsx";
import Loading from "./Loading.jsx";
import Invalid from "./Invalid.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "update", element: <UpdateProfile /> },
      { path: "allcourse", element: <AllCourse /> },
      {
        path: "allcourse/:id",
        element: (
          <PrivateRoute>
            <SkillDetails />
          </PrivateRoute>
        ),
      },
      { path: "myprofile", element: <MyProfile /> },
      { path: "forget-password", element: <ForgetPassword /> },
      { path: "*", element: <Invalid/>},
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
