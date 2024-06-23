import axios from "axios";
import { DbUrl } from "../Constants/URLs";
import GetOperation from "./GetOperation";



const UpdateProfile = async (payload)=>{

  const {Name,UserName, userId, ragistered,imgFile} =  payload;

    try {
      if(ragistered && userId){
        if(imgFile && UserName && Name){
          let response = await fetch(
            `${DbUrl}${userId}/Profile.json`,
            {
              method: "PUT",
              body: JSON.stringify({
                UserName :  UserName,
                ProfileImageToken : imgFile,
                Name : Name
              })
            }
          );
          let data = await response.json();
          return data;
         }
         else if(!imgFile && UserName && Name){
          let response = await fetch(
            `${DbUrl}${userId}/Profile.json`,
            {
              method: "PUT",
              body: JSON.stringify({
                UserName :  UserName,
                ProfileImageToken : "not Assigned",
                Name : Name
              })
            }
          );
          let data = await response.json();
          return data
  
         }
         else if(imgFile && UserName && !Name){
  
          let response = await fetch(
            `${DbUrl}${userId}/Profile.json`,
            {
              method: "PUT",
              body: JSON.stringify({
                UserName :  UserName,
                ProfileImageToken : imgFile,
                Name : "not Assigned"
              })
            }
          );
          let data = await response.json();
    
          return data
      
         }
         else if(!imgFile && UserName && !Name){
    
          let response = await fetch(
            `${DbUrl}${userId}/Profile.json`,
            {
              method: "POST",
              body: JSON.stringify({
                UserName :  UserName,
                ProfileImageToken : "not Assigned",
                Name : "not Assigned"
              })
            }
          );
          let data = await response.json();
    
          return data
  
         }
         else{
          console.log("imgFile && UserName && Name nothing you have");
         }
      }
      else{
        console.log("You are not ragistered!!");
      }
   
    } catch (err) {
      console.log(err);
    }
}



export const UpdateProfileImage = async({Name,userId,UserName, imgFile,ragistered})=>{
  try {
    if(ragistered  && (userId !== '' || userId !== undefined) && imgFile && UserName){
      const uploadUrl = `https://firebasestorage.googleapis.com/v0/b/social-media-6a985.appspot.com/o?name=${userId}/Profile/imgFile`;
    const response = await axios.post(uploadUrl, imgFile, {
      headers: {
        'Content-Type': imgFile.type,
      },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      },
    });
    console.log('Upload successful', response);

   const data = await UpdateProfile({Name,UserName, userId, ragistered , imgFile : response.data.downloadTokens})

    alert("Photo Updated")
    return data;

    }
    else{
      console.log("you are not ragistered");
    }

  } catch (error) {
    console.error('Upload failed:', error);
  }


}



export const Update_Like = async({userId, PostId, MyuserId , LikeStatus})=>{
  const data = await fetch(`${DbUrl}${userId}/createpost/${PostId}/LikedBy/${MyuserId}.json`,

        {
            method: "PUT",
            body: JSON.stringify({
                status : LikeStatus
            })
        }

    );
    const response = await data.json();
    return response
}



export default UpdateProfile;