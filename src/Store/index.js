import { loginreducer, LoginSignUpSlicee } from "./LoginSignUpSlice";
import { configureStore  } from "@reduxjs/toolkit";
import { TotalPosts, msge, Follower, Notificaiton, HandlePostedImages, HandleAllTogle, TotalComment, AllLikes } from "./MenuBarSlices";




const Store = configureStore({
    reducer: {
        auth: LoginSignUpSlicee,
        IsLogin: loginreducer,
        TotalPosts: TotalPosts,
        TotalComment : TotalComment,
        msge: msge,
        Follower: Follower,
        Notificaiton: Notificaiton,
        HandlePostedImages : HandlePostedImages,
        HandleAllTogle : HandleAllTogle,
        AllLikes : AllLikes

    }
})

export default Store;


