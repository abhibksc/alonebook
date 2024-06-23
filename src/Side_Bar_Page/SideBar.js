
import { FiAlignJustify } from "react-icons/fi";
import { HiOutlinePencil } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa";
import { IoMdStarOutline } from "react-icons/io";
import { VscSend } from "react-icons/vsc";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHome } from "react-icons/fa";
import HeaderIndex from "../Components/Header/HeaderIndex";
import MobleProfile from "../Components/Pages/Profile/MobleProfile";
import { MdOutlineCreate } from "react-icons/md";
import { RiUserFollowLine } from "react-icons/ri";
import { FaRegMessage } from "react-icons/fa6";
import { Profile_Img_URL } from "../Constants/URLs";




const SideBar = () => {
  const navigate = useNavigate();


  let userId = useSelector((state) => state.auth.userId);
  let Profileimage = useSelector((state) => state.auth.Profileimage)




  const [check, setCheck] = useState(false);
  const [hover, setHover] = useState(false);
  const [popup, setpopup] = useState(false);
  const dispatch = useDispatch();
  const login = useSelector((state) => state.IsLogin.login);





  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 50, x: "-70%" },
  }

  const handlemenu = () => {
    if (check == false) {
      setCheck(true);
      dispatch(toggleExpendation(true))
    }
    else if (check == true) {
      setCheck(false);
      dispatch(toggleExpendation(false))
    }
  }




  const HandleOut = () => {
    if (hover == true) {


      setHover(false)
      setCheck(false);



    }





  }

  const handleEnter = () => {
    if (check == false) {


      setTimeout(() => {
        setHover(true);
        setCheck(true);
      }, 300);



    }
    else if (check == true) {


      setTimeout(() => setCheck(true), 300);

    }

  }


  const handleEnterImg = () => {

    setTimeout(() => {

      setpopup(true);
    }, 300);

    setpopup(true);
  }

  const HandleOutImg = () => {
    setTimeout(() => {

      setpopup(false);
    }, 300);
  }



  const handleInbox = () => {
    console.log("clied");
  }




  return <div>


    {/*This is for laptop */}


    {<div className={`hidden m-0  bg-gradient-to-r from-white border-r  fixed  duration-10000 md:flex flex-col h-screen     gap-5  w-[200px] `} >

      {/* <div className="flex gap-2   "> */}
      <h1 className="font-bold text-[10px] md:text-[25px] font-serif mt-10 ml-5">alonebook</h1>
      {/* </div> */}




      <span onClick={() => navigate("/dashboard/Home")} className={`active:scale-95  flex gap-2  ml-2 pl-3   w-[110px]     pt-1 pb-1  text-[14px]`}>

        <FaHome className="rounded-md  p-2 w-[120px] h-[60px] shadow-lg shadow-violet-400" />
        <label className="text-[16px] relative top-5 hover:text-blue-400">Home</label>

      </span>


      <span className="flex flex-col gap-6   " >



        <span className={`flex justify-between text-[15px] active:scale-95   rounded-xl hover:bg-green-200 pl-5 w-full`}>

          <Link to={"/Dashboard/Create"}>
            <span className="flex  gap-5">
              <span className=" ">
                <MdOutlineCreate className={`  w-[30px] h-[30px] rounded-md p-1  `} />
              </span>

              <div className="flex ">
                <label className="text-[16px] mt-[2px]   " htmlFor="">Create</label>
              </div>
            </span>
          </Link>

        </span>



        <span className={`flex justify-between text-[15px] active:scale-95   rounded-xl hover:bg-green-200 pl-5 w-full`}>

          <Link to={"/Dashboard/Messages"}>
            <span className="flex  gap-5">
              <span className=" ">
                <FaRegMessage className={`  w-[30px] h-[30px] rounded-md p-1  `} />
              </span>

              <div className="flex ">
                <label className="text-[16px] mt-[2px]   " htmlFor="">Message</label>
              </div>
            </span>
          </Link>

        </span>




      







        <span className={`flex justify-between text-[15px] active:scale-95 rounded-xl hover:bg-green-200 pl-5 w-full `}>
          <Link to={"/Dashboard/Notificaitons"}>



            <span className={`flex gap-5 my-auto rounded-md   text-[14px] `}>



              <FaRegHeart className={` w-[30px] h-[30px]  rounded-md p-1 `} />


              <label className="text-[16px] mt-[2px]   " htmlFor="">Notificaitons</label>




            </span>
          </Link>
        </span>












        <span className={`flex justify-between text-[15px] active:scale-95  rounded-xl hover:bg-green-200 pl-5 w-full`}>

          <Link to={"/Dashboard/LaptopProfile"}>
            <div className="flex gap-5">

              <span>
                <img className={` rounded-full w-[30px] h-[30px] p-1 object-cover `}
                      src={Profileimage !== "not Assigned " ? ` ${Profile_Img_URL}${userId}%2FProfile%2FimgFile?alt=media&token=${Profileimage}` : "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png"}

                  alt="img" />
              </span>


              <div className="flex ">

                <label className="text-[16px] mt-[2px] " htmlFor="">Profile</label>
              </div>

            </div>
          </Link>


        </span>


      </span>

    </div>}






  </div>



}

export default SideBar;