import { useEffect, useState } from "react";
import { DbUrl } from "../Constants/URLs";
import Profile from "../Components/Pages/Profile/ToUpdateProfile";
import { Update_Like, handle_Like } from "./Update&Edit";
import { ref, onValue, push, serverTimestamp } from 'firebase/database';
import { db } from "../firebase/firebaseConfig";
export const GetAllData = async () => {



    let url = `${DbUrl}.json`;

    const data = await fetch(`${DbUrl}.json`,

        {
            method: "GET",
        }

    );


    let response = await data.json();



    if (response !== null && response !== undefined) {


        let DataArray = {
            CreatedPost: [],
            Profile: {
                UserName: '',
                Profileimage: ''
            },

        };


        for (let key in response) {
            response[key].id = key;


            if (response[key].createpost) {



                const obje = Object.values(response[key].createpost)
                obje.forEach((ele) => {




                    DataArray.CreatedPost.push({
                        Caption: ele.Caption,
                        PostImgename: ele.PostImgename,
                        PostedImgtoken: ele.PostedImgtoken,
                        UserName: ele.UserName,
                        UserProfile: ele.Profileimage
                    })




                })



            }

            if (response[key].message) {

                let arr = []
                const obje = Object.values(response[key].message)
                obje.forEach((ele) => {


                    arr.push({
                        UserName: ele.UserName,
                        UserProfile: ele.UserProfile,
                        chats: ele.chat
                    })
                })


                DataArray.push({ arr })




            }

            if (response[key].Profile) {



                const obje = Object.values(response[key].Profile)
                obje.forEach((ele) => {




                    DataArray.Profile = {
                        UserName: response[key].Profile.UserName,
                        Profileimage: response[key].Profile.Profileimage,


                    }

                })






            }

            
        }


        return DataArray
    }
    else {
        alert("Please SignUp")

    }

};


export const GetTotalPost = async () => {


    let url = `${DbUrl}.json`;

    const data = await fetch(`${DbUrl}.json`,

        {
            method: "GET",
        }

    );


    let response = await data.json();




    if (response !== null) {
        let arr = [];
        for (let key in response) {


            response[key].id = key;
            if (response[key].createpost) {



                const createposttt = Object.values(response[key].createpost)

                const keys = Object.keys(createposttt);







                const createpost = Object.values(response[key].createpost)
                const Profile = Object.values(response[key].Profile)




                createpost.forEach((ele) => {




                    arr.push({

                        PostedImgtoken: ele.PostedImgtoken,
                        PostImgename: ele.PostImgename,
                        Caption: ele.Caption,
                        UserDetails: {
                            Profileimage: ele.UserDetails.Profileimage,
                            UserName: ele.UserDetails.UserName,
                            userId: ele.UserDetails.userId
                        },


                        Total_Like: ele.Total_Like,
                        My_Like: ele.My_Like,
                        PostId: ele.PostId,
                    })















                })
            }
        }


        return arr
    }
    else {
        return arr = [];
    }
};

export const GetComment = async ({ Commentie_PostId, Commentie_UserId }) => {

    const commentsPath = `${Commentie_UserId}/createpost/${Commentie_PostId}/Comment`;
    const commentsRef = ref(db, commentsPath);

    return new Promise((resolve, reject) => {
        const unsubscribe = onValue(commentsRef, (snapshot) => {
            const commentsData = [];
            snapshot.forEach(childSnapshot => {
                const comment = childSnapshot.val();
                commentsData.push({ id: childSnapshot.key, ...comment });
            });

            resolve(commentsData);
        }, (error) => {
            reject(error);
        });
    });
};




// Get all likes postid using userId


export const Get_Likes_AllPostId = async ({MyuserId}) => {

    const data = await fetch(`${DbUrl}.json`,

        {
            method: "GET",
        }

    );

    let response = await data.json();

    let arr = [];
    for (let key in response) {
        if (response[key].createpost) {
            for (let keys in response[key].createpost) {
                for (let keyss in response[key].createpost[keys].LikedBy) {
                    if(keyss === MyuserId && response[key].createpost[keys].LikedBy[keyss].status){
                        arr.push(keys);
                    }
                }
            }















        }

    }




    return arr
}



export const GetUserName = async ({ userId }) => {

    let url = `${DbUrl}/${userId}.json`;


    const data = await fetch(`${DbUrl}${userId}.json`,


        {
            method: "GET",
        }
        

    );


    let response = await data.json();
    console.log(response);

    if (response !== null) {
        let arr = [];
        for (let key in response) {
            response[key].id = key;
            arr.push(response[key]);
        }
        arr = arr.reverse();

        const userNameFilter = arr.filter((ele) => ele.UserName);


        return userNameFilter
    }

};


export const GetProfileImage = async ({ userId }) => {


    const data = await fetch(`${DbUrl}${userId}.json`,


        {
            method: "GET",
            
        }

    );


    let response = await data.json();

    if(response.error){
        console.log(response.error);
        return "not Assigned";
    }
    else{

        if (response !== null) {
            if (response.Profile.ProfileImageToken) {
    
    
    
                return response.Profile.ProfileImageToken
    
            }
            else {
                return "Please set profile pic";
                alert("Please Set Profile Pic")
            }
    
    
        }
        else {
            alert("Please Signup")
        }


    }

  



}



export const userIdChecker = async ({ UserName }) => {

    console.log(UserName);


    let userId = await fetch(`${DbUrl}.json`);
    let userIddata = await userId.json();



    let flag = false;

    if (userIddata != null) {

        if (userIddata !== null && UserName !== undefined) {


            let arr = [];
            for (let key in userIddata) {
                userIddata[key].id = key;
                arr.push(userIddata[key]);
            }
            arr = arr.reverse();





            const mydata = arr.filter((ele) => ele.Profile.UserName === UserName)


            if (mydata.length === 0) {
                return flag = true;
            }
            else {
                alert("UserName Already Exits")
                console.log("UserName Already Exits");

            }



            return flag;

        }
    }
    else {
        return flag = true;
    }
}




export const userDetails = async ({ userName }) => {


    let url = `${DbUrl}.json`;

    const data = await fetch(`${DbUrl}.json`,

        {
            method: "GET",
        }

    );


    let response = await data.json();

    let arr = [];

    for (let key in response) {
        response[key].id = key;
        arr.push({
            profile: response[key].Profile
        })

    }


    let filterData = arr.filter((ele) => ele.profile.UserName === userName);


    return filterData



}



// GetReply


export const GetReply = async ({ Post_userId, Post_PostId, Post_CommentId }) => {



    const data = await fetch(`${DbUrl}${Post_userId}/createpost/${Post_PostId}/Comment/${Post_CommentId}/Replies.json`,

        {
            method: "GET",
        }

    );


    let response = await data.json();

    let arr = [];

    for (let key in response) {
        response[key].id = key;
        arr.push({
            Likes_On_Reply: response[key].Likes_On_Reply,
            My_Like: response[key].My_Like,
            Replier_Profile_Pic: response[key].Replier_Profile_Pic,
            Replier_UserId: response[key].Replier_UserId,
            Replier_UserName: response[key].Replier_UserName,
            Reply: response[key].Reply,
            ReplyTime: response[key].ReplyTime,
            Reply_ID: response[key].Reply_ID,
            id: response[key].id
        })

    }

    return arr;





}


export const LikeChecker = async ({ userId, PostId, MyuserId }) => {






    const data = await fetch(`${DbUrl}${userId}/createpost/${PostId}/LikedBy/${MyuserId}/status.json`,

        {
            method: "GET",

        }

    );


    let response = await data.json();



    if (response === true || response === false) {

        return response;


    }

    else {

        const updateLike = await Update_Like({ userId, PostId, MyuserId, LikeStatus: false })

    }





}




