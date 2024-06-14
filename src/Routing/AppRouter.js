import { Outlet, createBrowserRouter, useNavigate } from "react-router-dom";
import ErrorComponent from "../Components/ErrorComponent/ErrorComponent";
import ForgotPassword from "../Components/ForgotPassword";
import LoginModal from "../Components/Modals/LoginModal";
import SignupModal from "../Components/Modals/SignupModal";
import FrontPage from "../Components/Pages/FrontPage";
import App from "./App";
import MobleProfile from "../Components/Pages/Profile/MobleProfile";
import Messages from "../Components/Pages/Messages";
import Notification from "../Components/Pages/Notification";
import Home from "../Components/Pages/Home";
import Followers from "../Components/Pages/Followers";
import Create from "../Components/Pages/Create";
import Starred from "../Components/Pages/Starred";
import Friends from "../Components/Pages/Friends";
import Albums from "../Components/Pages/Albums";
import Privacy_Policy from "../Components/Pages/Privacy_Policy";
import Profile from "../Components/Pages/Profile/ToUpdateProfile";
import LaptopProfile from "../Components/Pages/Profile/LaptopProfile";
import WriteCaption_Modal from "../Components/Modals/CreatePost/WriteCaption_Modal";
import { signup } from "../Store/LoginSignUpSlice";


const AppRouter = createBrowserRouter([

    // navigate("/Dashboard/Home");


    {
        path: "/",
        element: <FrontPage />
    },


    
    {
        path: "/updateprofile",
        element: <Profile/>
    },
    {
        path: "/Dashboard/ToUpdateProfile",
        element: <Profile />
    },






 
    {
        path: "/Dashboard",
        element: <App  />,
        children: [

            {
                path: "/Dashboard/Home",
                element: <Home />
            },

            {
                path: "/Dashboard/Messages",
                element: <Messages />
            },
            {
                path: "/Dashboard/Profile",
                element: <MobleProfile/>
            },
            {
                path: "/Dashboard/Create",
                element: <Create/>
            },

            {
                path: "/Dashboard/WriteCaption_Modal",
                element: <WriteCaption_Modal/>
            },

            {
                path: "/Dashboard/Followers",
                element: <Followers/>
            },
            {
                path: "/Dashboard/Notificaitons",
                element: <Notification/>
            },
            {
                path: "/Dashboard/Starred",
                element: <Starred/>
            },
            {
                path: "/Dashboard/Friends",
                element: <Friends/>
            },
            {
                path: "/Dashboard/Albums",
                element: <Albums/>
            },
            {
                path: "/Dashboard/Privacy",
                element: <Privacy_Policy/>
            },
        
            {
                path: "/Dashboard/LaptopProfile",
                element: <LaptopProfile />
            },
           
          





        ],
        errorElement: <ErrorComponent />
    },


    {
        path: "/Dashboard/MobleProfile",
        element: <MobleProfile />
    },






    {
        path: "/forget",
        element: <ForgotPassword />
    },


    {
        path: "/login",
        element: <LoginModal />
    },
    {
        path: "/signup",
        element: <SignupModal />
    },


   




])



export default AppRouter;