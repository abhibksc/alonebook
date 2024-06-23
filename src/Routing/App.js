
import Effects from '../../Effects'
import { Outlet } from "react-router-dom";
import SideBar from '../Side_Bar_Page/SideBar';
import FrontPage from '../Components/Pages/FrontPage';
import { useDispatch, useSelector } from 'react-redux';
import Profile from '../Components/Pages/Profile/ToUpdateProfile';
import { useEffect } from 'react';
import HeaderIndex from '../Components/Header/HeaderIndex';
import { signIn, update, updateName } from '../Store/LoginSignUpSlice';
import { GetProfileImage, GetUserName, Get_Likes_AllPostId } from '../CrudOperations/GetOperation';
import { SetUpLikes } from '../Store/MenuBarSlices';




const App = () => {

  const dispatch = useDispatch();
  // const Profileimage = useSelector((state) => state.auth.Profileimage);


  useEffect(()=>{

    console.log("cheking");
    if (localStorage.length = 1) {
      const data = localStorage.getItem("user");
      if (data) {
        try {
          let response = JSON.parse(data);
          console.log(response);
  
  
  
          const fun = async() =>{
  
  
            dispatch(signIn({ 
              token : response.token,
              userId : response.userId,
              email : response.email,
              ragistered : response.registered,
              userName : response.userName,
              Profileimage : response.Profileimage
  
            }))
  
          }
  
          fun();
  
       
        } catch (e) {
          console.error("Failed to parse JSON:", e);
        }
      } else {
        console.log("No data found for key 'user'.");
      }
    }

  },[])


  

  

  Effects();


  const ragistered = useSelector((state) => state.auth.ragistered);
  console.log(ragistered);
  const userId = useSelector((state) => state.auth.userId);


  useEffect(() => {

    console.log("1st");

    const fun = async()=>{
    console.log("1st");


      if (userId) {
    console.log("1st");
    console.log(userId);



        const UserProfile = await GetUserName({ userId });
        const all_Likes =  await Get_Likes_AllPostId({MyuserId: userId})
        console.log(all_Likes);

        console.log(UserProfile && UserProfile[0].UserName);

        if (UserProfile && UserProfile[0].UserName) {
          dispatch(update({
            userName: UserProfile[0].UserName,
            Profileimage: UserProfile[0].ProfileImageToken
          }))

        
       
    
          dispatch(SetUpLikes(all_Likes));



          if (UserProfile[0].Name) {
            dispatch(updateName({
              name: UserProfile[0].Name,
            }))

          }


        }
        else {

            console.log("not working");
          


        }
      }
      else {
        console.log("Please signin");
      }



    }

    fun();
    

  }, [ragistered])



  





  return (
    <div className=''>
       
      {
        ragistered && <div>
          <SideBar />
          <HeaderIndex />
          <Outlet />
        </div>
      }

    </div>
  );
}



export default App;















