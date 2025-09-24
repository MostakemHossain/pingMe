import { createBrowserRouter,  } from "react-router-dom";
import App from "../App";
import ChatPage from "../pages/ChatPage";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";


const router = createBrowserRouter([
    {
      path: "/",
      element: <ChatPage/>
      
    },
    {
      path: "login",
      element: <Login/>
    },
    {
        path: "sign-up",
        element: <SignUp/>
      },
  ]);

export default router;