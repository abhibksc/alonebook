import axios from "axios";
import { DbUrl } from "../Constants/URLs";
import GetOperation from "./GetOperation";



const UpdateProfile = async (payload)=>{

  const {Name,UserName, userId, ragistered,imgFile} =  payload;
  console.log(Name);
  console.log(UserName);
  console.log(userId);
  console.log(ragistered);
  console.log(imgFile);






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
          return data
    
    
    
    
    
      
         
         }
         else if(!imgFile && UserName && Name){
          console.log(imgFile);
          console.log(UserName);
          console.log(Name);

    
    
    
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
      console.log(imgFile);
      const uploadUrl = `https://firebasestorage.googleapis.com/v0/b/social-media-6a985.appspot.com/o?name=${userId}/Profile/imgFile`;
    const response = await axios.post(uploadUrl, imgFile, {
      headers: {
        'Content-Type': imgFile.type,
      },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        // setUploadProgress(progress);
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
    // const data = await fetch(`https://social-media-6a985-default-rtdb.firebaseio.com/UBXKuSsR93XfjH79TPWdIa5vJHD2/createpost/-Nzf-jT5qN9jR6cqxxHL/LikedBy/alone._abhiji.json`,


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