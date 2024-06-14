import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";
import Profile from "./ToUpdateProfile";
import { Link, useNavigate } from "react-router-dom";
import { Profile_Img_URL } from "../../../Constants/URLs";
import { useEffect, useState } from "react";
import { updateName } from "../../../Store/LoginSignUpSlice";
import UpdateProfile from "../../../CrudOperations/Update&Edit";


const LaptopProfile = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let userId = useSelector((state) => state.auth.userId);
  let Profileimage = useSelector((state) => state.auth.Profileimage)
  const userNames = useSelector((state) => state.auth.userName);
  const name = useSelector((state) => state.auth.name);
  const UserName = useSelector((state) => state.auth.userName);
  const ragistered = useSelector((state) => state.auth.ragistered);







  const [Name, setName] = useState(name);

  useEffect(()=>{
    const fun = async ()=>{


      if(Name && Profileimage && UserName){


    
        const data = await UpdateProfile({Name,UserName, userId, ragistered,imgFile : Profileimage})
    
    
        dispatch(updateName({
          name : Name
        }))
       }
    }
    fun();
    },[Name])




  return (


    <div className={` hidden md:block `}>


      {/* for Laptop uses______________________________ */}

      <div className="hidden md:flex flex-col gap-3 w-[500px] mx-auto ml-[440px] justify-center  border-b absolute z-50 ">



<nav className=" flex gap-5  m-0 p-6  border-b shadow-md">
  <div className="flex w-full justify-between">
    <div className="flex gap-5">
      <img 
      className="rounded-full h-16 w-16 object-cover"
      src={Profileimage !== "not Assigned " ? ` ${Profile_Img_URL}${userId}%2FProfile%2FimgFile?alt=media&token=${Profileimage}` : "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png"}
        alt="img" />

      <div className="flex flex-col">
      <input type="text" className=" text-black bg-white  rounded border-gray-400 focus:border-none focus:outline-none w-[200px]" 
      placeholder="Name"
       value={Name === 'not Assigned' ? "Name" : Name} 
       onChange={(e)=>setName(e.target.value)} />
        <span>
          {UserName}
        </span>
      </div>



    </div>

    <span className="mt-5 rounded-full border-1 bg-gray-300 h-10 w-10 pt-3 pl-3">

      <Link to={"/Dashboard/ToUpdateProfile"}> <IoIosArrowForward /> </Link>
    </span>


  </div>

</nav>


{/* Body Parts */}

<body data-aos="fade-up" className="flex flex-col mt-5 mb-5" >

  {/* followers Part */}

  <div className="flex w-full justify-around text-center">
    <div className="flex flex-col border-2 p-3 shadow-md rounded-md">
      <span>
        {527}
      </span>
      <span>
        "Post"
      </span>
    </div>

    <div className="flex flex-col border-2 p-3 shadow-md rounded-md ">
      <span>
        {527}
      </span>
      <span>
        "Followers"
      </span>
    </div>

    <div className="flex flex-col border-2 p-3 shadow-md rounded-md ">
      <span>
        {527}
      </span>
      <span>
        "Following"
      </span>
    </div>


  </div>

  {/* Noticficaiton and all Part */}

  <div className="flex flex-col gap-3  mt-10">

    {/* Home Part */}







    {/* friends details */}
    <div className="flex flex-row w-full   justify-between">

      <div className="flex flex-col w-full ">
        <h1 className="font-bold">
          Friends
        </h1>

        <p className="text-gray-600">
          Friendlist totals
        </p>

      </div>

      <div className="flex flex-row gap-3">
        {/* <span className="mt-2 bg-green-400 rounded-full h-7 p-1 text-white">
          {36}
        </span> */}


        <span className=" rounded-full border-1 bg-gray-300 h-10 w-10 pt-3 pl-3">
          <IoIosArrowForward onClick={() => alert("No Friends")} />
        </span>

      </div>

      <div>

      </div>


    </div>


    {/* Message details */}

    <div className="flex flex-row w-full   justify-between">

      <div className="flex flex-col w-full">
        <h1 className="font-bold">
          Messages
        </h1>

        <p className="text-gray-600">
          Message your friends
        </p>

      </div>

      <div className="flex flex-row gap-3">
        {/* <span className="mt-2 bg-green-400 rounded-full h-7 p-1 text-white">
          {36}
        </span> */}


        <span className=" rounded-full border-1 bg-gray-300 h-10 w-10 pt-3 pl-3">
          <IoIosArrowForward onClick={() => alert("No Messages")} />
        </span>

      </div>

      <div>

      </div>


    </div>

    {/* Albums details */}

    <div className="flex flex-row w-full   justify-between">

      <div className="flex flex-col w-full ">
        <h1 className="font-bold">
          Albums
        </h1>

        <p className="text-gray-600">
          Save or post your albums
        </p>

      </div>

      <div className="flex flex-row gap-3">
        {/* <span className="mt-2 bg-green-400 rounded-full h-7 p-1 text-white">
          {36}
        </span> */}


        <span className=" rounded-full border-1 bg-gray-300 h-10 w-10 pt-3 pl-3">
          <IoIosArrowForward onClick={() => alert("No Albums")} />
        </span>

      </div>

      <div>

      </div>


    </div>


    {/* favourite details */}


    <div className="flex flex-row w-full  justify-between ">

      <div className="flex flex-col w-full ">
        <h1 className="font-bold">
          Favorites
        </h1>

        <p className="text-gray-600">
          Friends you love
        </p>

      </div>

      <div className="flex flex-row gap-3">
        {/* <span className="mt-2 bg-green-400 rounded-full h-7 p-1 text-white">
          {36}
        </span> */}


        <span className=" rounded-full border-1 bg-gray-300 h-10 w-10 pt-3 pl-3">
          <IoIosArrowForward onClick={() => alert("add your fav")} />
        </span>

      </div>

      <div>

      </div>


    </div>


  </div>



  {/* Notificaiton Policy Privacy and Logout */}

  <div className="mt-4 ">
    {/* Policy Part */}
    <div className="flex flex-row w-full justify-between">
      {/* Privacry Policy */}
      <div className="flex flex-col">
        <span className="font-bold">
          Privacy Policy
        </span>
        <span className="text-gray-500">
          protect your privacy
        </span>
      </div>

      {/* Arrow part */}
      <span className=" rounded-full border-1 bg-gray-300 h-10 w-10 pt-3 pl-3">
        <IoIosArrowForward onClick={() => alert("working on..")} />
      </span>
    </div>


    {/* Logout */}

    <button
    onClick={
      ()=>{localStorage.clear()
        navigate("/");
      }
    }
     className="border w-full mt-3 rounded-md bg-[#C9FFD5] text-[#28CD56] hover:text-[#C9FFD5] hover:bg-[#28CD56] p-2 mx-auto ">Logout</button>



  </div>



</body>





</div>





    </div>

  );
};

export default LaptopProfile;
