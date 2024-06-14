import { createSlice } from "@reduxjs/toolkit";


import { createSlice } from '@reduxjs/toolkit';


const HandlePostedImage = createSlice({
    name: "Create",
    initialState: {
        img: ''
    },
    reducers: {
        HandleImg(state, action) {
            console.log(action);
            // state.CreatedPosts = action.payload;
            state.img = action.payload
        },




    }
})

export const HandlePostedImages = HandlePostedImage.reducer;
export const { HandleImg } = HandlePostedImage.actions;


const HandleAllTogles = createSlice({
    name: "toggles",
    initialState: {
        CommentToggle: false
    },
    reducers: {
        HandleCommentToggle(state, action) {
            state.CommentToggle = action.payload
        },




    }
})

export const HandleAllTogle = HandleAllTogles.reducer;
export const { HandleCommentToggle } = HandleAllTogles.actions;




const AllPost = createSlice({
    name: "Create",
    initialState: {
        posts: [
            {
                Caption: "not Assigned",
                PostImgename: "not Assigned",
                PostedImgtoken: "not Assigned",
                UserDetails: {
                    Profileimage: "not Assigned",
                    UserName: "not Assigned",
                    userId: "not Assigned"
                },
                Comment: [
                    // {
                    //     Commented_UserProfile: "not Assigned",
                    //     Commented_UserName: "not Assigned",
                    //     Comment: "not Assigned",
                    //     Reply: [{
                    //         Reply_UserProfile: "not Assigned",
                    //         Reply_UserName: "not Assigned",
                    //         Reply: "not Assigned",
                    //         time: "not Assigned",
                    //     }],

                    //     Commented_Time: "not Assigned",
                    //     Total_Like: 0,
                    //     My_Like: false


                    // }
                ],
                Total_Like: 0,
                My_Like: false,
                PostId: "not Assigned"
            }
        ],
        Likes : {}


    },
    reducers: {
        addCreatedPost(state, action) {
            console.log(action);

            state.posts = action.payload

        },
        dltCreatedPost(state, action) {
            // state.CreatedPosts = state.CreatedPosts.filter((exe) => exe.id != action.payload);
        },
        AddTemporalPostImg(state, action) {
            // state.temporary = action.payload
        },
       



    }
})

export const TotalPosts = AllPost.reducer;
export const { addCreatedPost, dltCreatedPost, AddTemporalPostImg } = AllPost.actions;










const allLikes = createSlice({
    name: "Create",
    initialState: {
        Likes : {}
    },
    reducers: {
      
        UpdateLikes(state,action){

            const { PostId, updatedLikeStatus } = action.payload;
            state.Likes[PostId] = updatedLikeStatus;

        },

        SetUpLikes(state,action){
            console.log(action);
            action.payload.map((ele)=>{
                state.Likes[ele] = true
            })

            // state.Likes[action.payload] = true;
        }



    }
})

export const AllLikes = allLikes.reducer;
export const { UpdateLikes,SetUpLikes } = allLikes.actions;

























// const AllComment = createSlice({
//     name: Comments,
//     initialState: {
//         Comment: []
//     },

    const AllComment = createSlice(
        {
            name : "Comments",
            initialState : {
                Comment : [],
                Reply : []
            },
            reducers : {
                addComment(state, action){
                    console.log(action);
                    state.Comment = action.payload
                },
                addReply(state, action){
                    console.log(action);
                    state.Reply = action.payload
                }

            }
        }
    )




export const TotalComment = AllComment.reducer;
export const { addComment,addReply } = AllComment.actions;






// starred


const Messages = createSlice({
    name: "Messages",
    initialState: {
        MessagesBox: [],
        Updated_Id: "Empty",
        updation: "Empty"
    },
    reducers: {
        addMessages(state, action) {
            state.MessagesBox = action.payload;
        },
        dltMessages(state, action) {
            state.MessagesBox = state.MessagesBox.filter((exe) => exe.id != action.payload);
        },
    }
})

export const msge = Messages.reducer;
export const { addMessages, dltMessages } = Messages.actions;


// send




const Followers = createSlice({
    name: "Followers",
    initialState: {
        Followers: [],
        Updated_Id: "Empty",
        updation: "Empty"
    },
    reducers: {
        addFollowers(state, action) {
            state.Followers = action.payload;
        },
        dltFollowers(state, action) {
            state.Followers = state.Followers.filter((exe) => exe.id != action.payload);
        },
    }
})

export const Follower = Followers.reducer;
export const { addFollowers, dltFollowers } = Followers.actions;


// notificationn


const Notificaitons = createSlice({
    name: "Notificaiton",
    initialState: {
        Notificaiton: [],
        Updated_Id: "Empty",
        updation: "Empty"
    },
    reducers: {
        AddNotificaiton(state, action) {
            state.Followers = action.payload;
        },
        DltNotificaiton(state, action) {
            state.Followers = state.Notificaiton.filter((exe) => exe.id != action.payload);
        },
    }
})

export const Notificaiton = Notificaitons.reducer;
export const { AddNotificaiton, DltNotificaiton } = Notificaitons.actions;


