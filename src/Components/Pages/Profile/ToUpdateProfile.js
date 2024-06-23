import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup, update } from "../../../Store/LoginSignUpSlice";
import UpdateProfile, {
  UpdateProfileImage,
} from "../../../CrudOperations/Update&Edit";
import {
  GetProfileImage,
  userIdChecker,
} from "../../../CrudOperations/GetOperation";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Profile_Img_URL } from "../../../Constants/URLs";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // useSelector Hooks
  const UserName = useSelector((state) => state.auth.userName);
  const email = useSelector((state) => state.auth.email);
  let userId = useSelector((state) => state.auth.userId);
  let Profileimage = useSelector((state) => state.auth.Profileimage);
  const ragistered = useSelector((state) => state.auth.ragistered);
  const profileName = useSelector((state) => state.auth.name);

  // useState HOOK

  const [userName, setName] = useState(UserName);
  const [imgFile, setImageFile] = useState("");
  const [toggle, setToggle] = useState(false);
  const [UserNameToggle, setUserNameToggle] = useState(false);

  // useEffect Hook

  useEffect(() => {
    console.log("checking");

    // Check if "user" exists in localStorage
    const data = localStorage.getItem("user");
    console.log(data);
    if (data) {
      try {
        let response = JSON.parse(data);
        console.log(response);

        dispatch(
          signup({
            token: response.token,
            userId: response.userId,
            email: response.email,
            ragistered: response.registered,
            userName: response.userName,
          })
        );
      } catch (e) {
        console.error("Failed to parse JSON:", e);
      }
    } else {
      console.log("No data found for key 'user'.");
    }
  }, []);

  useEffect(() => {
    console.log(UserNameToggle);

    if (UserNameToggle) {
      console.log(UserNameToggle);

      const fun = async () => {
        let ProfileImg = await GetProfileImage({ userId });
        if (ProfileImg && UserName && userId) {
          const data = await UpdateProfile({
            Name: profileName,
            UserName,
            userId,
            ragistered,
            imgFile: ProfileImg,
          });
          dispatch(
            update({
              userName: data.UserName,
              Profileimage: data.ProfileImageToken,
            })
          );
        }
      };
      fun();
    }
  }, [UserNameToggle]);

  useEffect(() => {
    const UpdateImg = async () => {
      if (toggle) {
        if (imgFile !== null && imgFile && userId && UserName && ragistered) {
          const data = await UpdateProfileImage({
            Name: profileName,
            userId,
            UserName,
            imgFile,
            ragistered,
          });
          if (data.error) {
            console.log(data.error);
          } else {
            dispatch(
              update({
                userName: data.UserName,
                Profileimage: data.ProfileImageToken,
              })
            );
          }
        }
      }
    };
    UpdateImg();
  }, [toggle]);

  const onchangeImage = async (e) => {
    setImageFile(e.target.files[0]);
    setToggle(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const fun = async () => {
      if (UserName !== userName) {
        const check = await userIdChecker({ UserName: userName });
        if (check) {
          dispatch(
            update({
              userName: userName.toLowerCase(),
            })
          );

          setUserNameToggle(true);
        } else {
          alert("This UserName Already Exist!!⚠️");
        }
      } else {
        alert("Updated!!");
      }
    };
    fun();
  };

  return (
    <div className="div_14 relative z-30">
      {/* for Laptop */}
      <CloseOutlinedIcon
        className=" relative  md:top-9 md:left-[1300px]  top-5"
        onClick={(e) => navigate("/Dashboard/Home")}
      />

      <div className=" hidden flex-col  md:flex ">
        {/* <CloseOutlinedIcon className='relative top-9 left-[1300px]' onClick={(e) => navigate("/Dashboard/Home")} /> */}

        <form onSubmit={handleFormSubmit} className="">
          <div className="flex justify-around">
            <div className="div_16">
              <h1 className="text-xl font-bold ">Profile</h1>
              <div className="flex flex-col justify-around mx-4 gap-2">
                {/* <label htmlFor="">UserName</label> */}
                <input
                  className="px-9 text-center text-black bg-white  rounded border-b shadow-green-300 shadow-md  focus:border-none focus:outline-none "
                  type="text"
                  value={userName}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col justify-around gap-2">
                {/* <label htmlFor="">Email</label> */}
                <input
                  className="px-9 text-center text-black bg-white  rounded border-b shadow-green-300 shadow-md  focus:border-none focus:outline-none "
                  type="email"
                  placeholder={email}
                  readOnly
                />
              </div>
              <div className="flex justify-around text-right">
                <button className="updateBtn" type="submit">
                  Update
                </button>
              </div>
            </div>
            <div className="mt-20 flex flex-col">
              {
                <input
                  ref={fileInputRef}
                  onChange={(e) => onchangeImage(e)}
                  className="relative top-48 rounded-full w-24 mx-auto left-2 hidden"
                  type="file"
                  name="imageUpload"
                  accept="image/*"
                />
              }
              <img
                src={` ${Profile_Img_URL}${userId}%2FProfile%2FimgFile?alt=media&token=${Profileimage}`}
                className={`${
                  Profileimage
                    ? "imge2 object-cover md:w-[350px] rounded-full h-[350px] shadow-lg shadow-green-300"
                    : "imge2 object-cover md:w-[350px] rounded-full h-[350px] shadow-lg  bg-gray-400 shadow-green-300"
                }`}
                onClick={() => fileInputRef.current.click()}
              />
              {userName && (
                <h1 className="mx-auto text-center mt-6 text-black">
                  {UserName}
                </h1>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* for Mobile */}
      <form
        onSubmit={handleFormSubmit}
        className=" md:hidden  z-3 h-screen w-screen  flex  flex-col  gap-10  bg-white "
      >
        <div className="  flex flex-col text-black pt-10    gap-2 ">
          {
            <input
              ref={fileInputRef}
              onChange={(e) => onchangeImage(e)}
              className=" rounded-full w-40 h-40 mx-auto  hidden"
              type="file"
              name="imageUpload"
              accept="image/*"
              // placeholder='abhi'
            />
          }
          <img
            src={`${Profile_Img_URL}${userId}%2FProfile%2FimgFile?alt=media&token=${Profileimage}`}
            className={`${
              Profileimage
                ? "mx-auto w-40 object-cover rounded-full h-40 shadow-lg shadow-green-300 "
                : "mx-auto w-40 object-cover rounded-full h-40 shadow-lg    bg-gray-400 shadow-green-300"
            }`}
            onClick={() => fileInputRef.current.click()}
          />

          {/* {userName && <h1 className="mx-auto text-black">{UserName}</h1>} */}
        </div>

        <div className="gap-10   text-white  flex flex-col  p-4  text-center      rounded-3xl">
          <div className="flex flex-col justify-around mx-4 gap-2">
            <input
              className="px-9 h-5 text-center text-black flex justify-center items-center bg-white  rounded border-b shadow-green-300 shadow-lg border-black focus:border-none focus:outline-none "
              type="text"
              value={userName}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-around gap-2 p-3">
            <input
              className=" x-9 h-5 text-center text-black flex justify-center items-center bg-white  rounded border-b shadow-green-300 shadow-lg border-black focus:border-none focus:outline-none "
              type="email"
              placeholder={email}
              readOnly
            />
          </div>
        </div>

        <button
          className="border-2 rounded-lg text-black  mx-auto w-28 h-10  hover:text-white hover:bg-green-500"
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Profile;
