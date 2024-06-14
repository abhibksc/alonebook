
import { useRef } from "react";
import { DbUrl } from "../Constants/URLs";
import { GetOperation } from "./GetOperation";
import axios from 'axios'


export const CreatePostOperation = async (payload) => {
  console.log("ghuss gayaaa");












  const updatePost_Id = async ({ PostId, Imgtoken, imgName, userName, Caption, userId }) => {

    console.log(PostId.name);
    console.log(Imgtoken);
    console.log(imgName);
    console.log(userName);
    console.log(Caption);
    console.log(userId);


    let response = await fetch(`${DbUrl}${userId}/createpost/${PostId.name}.json`,
      {
        method: "PUT",
        body: JSON.stringify({


          PostedImgtoken: Imgtoken,
          PostImgename: imgName,
          Caption: Caption,
          UserDetails: {
            Profileimage: Profileimage,
            UserName: userName,
            userId: userId
          },

          Total_Like: "not Assigned",
          LikedBy : "not Assigned",
          PostId: PostId.name,

        })
      }
    );


    console.log("yeha tak aabhi gaya");

    let data = await response.json();
    console.log(data);

    if (data) {
      alert("Jai Ho!!!!")
    }

    console.log("success hua hoga");
  }



  const { userName, Profileimage, userId, HandlePostedImages, Caption } = payload;
  console.log(HandlePostedImages);



  const CaptionPost = async ({ Imgtoken, imgName, userName, Caption, userId }) => {


    console.log(Imgtoken);
    console.log(userName);
    console.log(Caption);
    console.log(userId);

    let response = await fetch(`${DbUrl}${userId}/createpost/.json`,
      {
        method: "POST",
        body: JSON.stringify({
          PostedImgtoken: Imgtoken,
          PostImgename: imgName,
          Caption: Caption,
          UserDetails: {
            Profileimage: Profileimage,
            UserName: userName,
            userId: userId
          },
       
          Total_Like: "not Assigned",
          LikedBy : "not Assigned",
          PostId: "not Assigned",

        })
      }
    );

    let data = await response.json();

    return data


    console.log(data);

    if (data.error) {
      return alert(data.err.message);
    }
    else {
      alert("Posted");
      //    GetOperation(userId)

    }


  }





  if (HandlePostedImages) {
    try {
      const uploadUrl = `https://firebasestorage.googleapis.com/v0/b/social-media-6a985.appspot.com/o?name=${userId}/posted/${HandlePostedImages.name}`;
      const response = await axios.post(uploadUrl, HandlePostedImages, {
        headers: {
          'Content-Type': HandlePostedImages.type,
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          // setUploadProgress(progress);
        },
      });
      console.log('Upload successful', response);

      console.log('Upload successful', response.data.downloadTokens);
      console.log(response.config.data.name);




      const PostId = await CaptionPost({ Imgtoken: response.data.downloadTokens, imgName: response.config.data.name, userName, Caption, userId })

      await updatePost_Id({ PostId, Imgtoken: response.data.downloadTokens, imgName: response.config.data.name, userName, Caption, userId })




      return data



    } catch (error) {
      console.error('Upload failed:', error);
    }
  } else {
    console.log('No file selected');
  }






}







export const PostComment = async ({ Commenter_Profile_Pic, Commenter_UserName,   Commenter_UserId, Comment, Total_Like_OnComment, My_Like, time, Comment_ID, post_userId, post_postId , }) => {
  console.log(Comment);
  console.log(post_userId);
  console.log(post_postId);
  console.log(Commenter_UserId);



  const updateCommentId = async ({ Commenter_Profile_Pic, Commenter_UserName,Commenter_UserId, Comment, Total_Like_OnComment, My_Like, time, Comment_ID, post_userId, post_postId }) => {

    const data = await fetch(`${DbUrl}${post_userId}/createpost/${post_postId}/Comment/${Comment_ID}.json`,

      {
        method: "PUT",
        body: JSON.stringify(
          {
            Commenter_Profile_Pic: Commenter_Profile_Pic,
            Commenter_UserName: Commenter_UserName,
            Commenter_UserId : Commenter_UserId,
            Comment: Comment,
            Total_Like_OnComment: Total_Like_OnComment,
            My_Like: My_Like,
            time: time,
            Comment_ID: Comment_ID
          })
      })

      let res = await data.json();

      return res;







  }






  const data = await fetch(`${DbUrl}${post_userId}/createpost/${post_postId}/Comment.json`,

    {
      method: "POST",
      body: JSON.stringify(
        {
          Commenter_Profile_Pic: Commenter_Profile_Pic,
          Commenter_UserName: Commenter_UserName,
          Commenter_UserId : Commenter_UserId,
          Comment: Comment,
          Total_Like_OnComment: Total_Like_OnComment,
          My_Like: My_Like,
          time: time,
          Comment_ID: Comment_ID
        })
    }

  );


  let res = await data.json();

  console.log(res);

  const data_ = updateCommentId({ Commenter_Profile_Pic, Commenter_UserName, Commenter_UserId, Comment, Total_Like_OnComment, My_Like, time, Comment_ID : res.name , post_userId, post_postId })

  return data_



}






export const PostReply = async ({Reply, Replier_Profile_Pic, Replier_UserName,   Replier_UserId,  Comment_ID,
  Likes_On_Reply , My_Like, ReplyTime , Reply_ID, post_userId, post_postId , }) => {
  console.log(post_userId);
  console.log(post_postId);



  const updateReplyId = async ({ Reply, Replier_Profile_Pic, Replier_UserName,   Replier_UserId,  Comment_ID,
    Likes_On_Reply , My_Like, ReplyTime , Reply_ID, post_userId, post_postId , }) => {

      console.log(Reply_ID);


      // https://social-media-6a985-default-rtdb.firebaseio.com/UBXKuSsR93XfjH79TPWdIa5vJHD2/createpost/-Nzc7shnfzf6qYXEce07/Comment/-Nzc8-oWGZTPec4wbeoc/Replies/-Nzc8B6FEBw23enTAxVH


    const data = await fetch(`${DbUrl}${post_userId}/createpost/${post_postId}/Comment/${Comment_ID}/Replies/${Reply_ID}.json`,

      {
        method: "PUT",
        body: JSON.stringify(
          {
            Reply: Reply,
            Replier_Profile_Pic: Replier_Profile_Pic,
            Replier_UserName : Replier_UserName,
            Replier_UserId: Replier_UserId,
            Likes_On_Reply: Likes_On_Reply,
            My_Like: My_Like,
            ReplyTime: ReplyTime,
            Reply_ID : Reply_ID
          })
      })

      let res = await data.json();

      return res;







  }






  const data = await fetch(`${DbUrl}${post_userId}/createpost/${post_postId}/Comment/${Comment_ID}/Replies.json`,

    {
      method: "POST",
      body: JSON.stringify(
        {
          Reply: Reply,
          Replier_Profile_Pic: Replier_Profile_Pic,
          Replier_UserName : Replier_UserName,
          Replier_UserId: Replier_UserId,
          Likes_On_Reply: Likes_On_Reply,
          My_Like: My_Like,
          ReplyTime: ReplyTime,
          Reply_ID : Reply_ID
        })
    }

  );


  let res = await data.json();

  console.log(res);

  const data_ = await updateReplyId({ Reply, Replier_Profile_Pic, Replier_UserName,   Replier_UserId,  Comment_ID,
    Likes_On_Reply , My_Like, ReplyTime , Reply_ID : res.name, post_userId, post_postId  })


  return data_



}













