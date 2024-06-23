import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import {
  GetUserName,
  userId,
  GetTotalPost,
  GetAllData,
  LikeChecker,
  Get_Likes_AllPostId,
} from "../../CrudOperations/GetOperation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as solidHeart,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";
import { DbUrl, Profile_Img_URL, imgUrl } from "../../Constants/URLs";
import {
  HandleCommentToggle,
  UpdateLikes,
  addComment,
  addCreatedPost,
} from "../../Store/MenuBarSlices";
import Comment from "../Modals/CommentPage/Comment";
import UserCard from "../ShimmerEffects/UserCard";
import { PostComment } from "../../CrudOperations/PostOperation";
import TimeAgo from "javascript-time-ago";
import DateFormator from "../Hooks/DateFormator";
import { Update_Like, handle_Like } from "../../CrudOperations/Update&Edit";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetching state from Redux store
  const userId = useSelector((state) => state.auth.userId);
  const MyuserId = useSelector((state) => state.auth.userId);
  const Profileimage = useSelector((state) => state.auth.Profileimage);
  const userNames = useSelector((state) => state.auth.userName);
  const ragistered = useSelector((state) => state.auth.ragistered);
  const AllPosts = useSelector((state) => state.TotalPosts.posts);
  const AllLikes = useSelector((state) => state.AllLikes.Likes);

  // UseState HOOks

  const [Commentt, setCommentt] = useState({});
  const [liked, setLiked] = useState({});
  const [Ctoggle, setToggle] = useState(false);
  const [CommentChanges, setCommentChanges] = useState("");
  const [Id, setId] = useState("");
  const [Post_Comment_Home, set_Post_Comment_Home] = useState(false);

  // useEffect Hook

  useEffect(() => {
    let GetAllData = async () => {
      let data = await GetUserName({ userId });
      let allPost = await GetTotalPost();
      dispatch(addCreatedPost(allPost));
    };

    GetAllData();
  }, []);

  useEffect(() => {
    if (Ctoggle) {
      document.body.classList.add("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [Ctoggle]);

  useEffect(() => {
    if (Post_Comment_Home && CommentChanges) {
      const fun = async () => {
        const date = DateFormator(new Date());
        const data = await PostComment({
          Commenter_Profile_Pic: Profileimage,
          Commenter_UserName: userNames,
          Commenter_UserId: CommentChanges.Commenter_UserId,
          Comment: CommentChanges.Comment,
          Total_Like_OnComment: 0,
          My_Like: false,
          time: date,
          Comment_ID: "Not assigned",
          post_userId: CommentChanges.Post_userId,
          post_postId: CommentChanges.Post_PostId,
        });

        if (Post_Comment_Home) {
          set_Post_Comment_Home(false);
          setCommentChanges({ Comment: "" });
        }
      };
      fun();
    } else {
      console.log("not  worked");
    }
  }, [Post_Comment_Home]);

  // Some functions

  const toggleLike = (index, Post_UserID) => {
    setLiked({
      index: index,
      Post_UserId: Post_UserID,
    });
  };

  const handleCommentForm = (e) => {
    e.preventDefault();
    if (!Post_Comment_Home) {
      set_Post_Comment_Home(true);
    } else {
      console.log("already true hai");
    }
  };

  const HandleLike = async (PostId, userId, userNames) => {
    const isLiked = AllLikes[PostId] || false; // Get the current like status or default to false
    const updatedLikeStatus = !isLiked; // Toggle the like status
    const response = await Update_Like({
      userId,
      PostId,
      MyuserId,
      LikeStatus: updatedLikeStatus,
    });
    dispatch(
      UpdateLikes({ PostId: PostId, updatedLikeStatus: updatedLikeStatus })
    );
  };

  return (
    <div className="custom-scroll">
      {/* Mobile View */}
      {ragistered && (
        <div className="md:hidden absolute z-50 w-full bg-white h-full">
          <nav className="border-b p-4 flex w-full justify-between shadow-md">
            <span className="font-bold text-xl">Social Media</span>
            <img
              onClick={() => navigate("/Dashboard/MobleProfile")}
              src={
                Profileimage !== "not Assigned "
                  ? ` ${Profile_Img_URL}${userId}%2FProfile%2FimgFile?alt=media&token=${Profileimage}`
                  : "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png"
              }
              alt="M"
              className="border object-cover rounded-full size-10 shadow-md shadow-violet-600"
            />
          </nav>

          {AllPosts.length >= 1 ? (
            AllPosts.map((ele) => (
              <li
                key={ele.PostId}
                className="flex flex-col gap-3 mt-5 justify-center border-b"
              >
                <div className="flex justify-between px-3 w-full">
                  <div className="flex gap-4">
                    <img
                      className="w-7 h-7 rounded-full object-cover"
                      src={
                        ele.UserDetails.Profileimage !== "not Assigned"
                          ? `${Profile_Img_URL}${ele.UserDetails.userId}%2FProfile%2FimgFile?alt=media&token=${ele.UserDetails.Profileimage}`
                          : "https://tse1.mm.bing.net/th?id=OIP.f3DM2upCo-p_NPRwBAwbKQHaHa&pid=Api&P=0&h=180"
                      }
                      alt="img"
                    />
                    <span>{ele.UserDetails.UserName}</span>
                  </div>
                  <button>...</button>
                </div>
                <img
                  src={`${Profile_Img_URL}${ele.UserDetails.userId}%2Fposted%2f${ele.PostImgename}?alt=media&token=${ele.PostedImgtoken}`}
                  className="w-full h-96 object-cover rounded-md shadow-md"
                  alt="img"
                />
                <div className="flex gap-3 px-3">
                  <FontAwesomeIcon
                    icon={faCoffee}
                    className={`h-6 w-6 cursor-pointer transition-transform duration-300 ${
                      AllLikes[ele.PostId]
                        ? "text-green-500 transform scale-125"
                        : ""
                    }`}
                    onClick={() =>
                      HandleLike(ele.PostId, ele.UserDetails.userId)
                    }
                  />
                  <FaComments
                    className="h-6 w-6"
                    onClick={() => {
                      setId(ele.PostId);
                      setToggle(true);
                      setCommentt({
                        Commentie_PostId: ele.PostId,
                        Commentie_UserId: ele.UserDetails.userId,
                        Commentie_UserName: ele.UserDetails.UserName,
                        Commentie_Profileimage: ele.UserDetails.Profileimage,
                      });
                    }}
                  />
                </div>
                <span className="ml-3">{ele.Caption}</span>
                <form
                  className="flex justify-between p-2"
                  onSubmit={handleCommentForm}
                >
                  <input
                    type="text"
                    className="w-96 focus:border-none focus:outline-none"
                    placeholder="Add a Comment..."
                    // value={CommentChanges.Comment}
                    onChange={(e) =>
                      setCommentChanges({
                        Comment: e.target.value,
                        Post_userId: ele.UserDetails.userId,
                        Post_PostId: ele.PostId,
                        MyUserId: userId,
                        Commenter_UserId: ele.UserDetails.userId,
                      })
                    }
                  />
                  <button>Post</button>
                </form>

                {Ctoggle && (
                  <Comment props={Commentt} onClose={() => setToggle(false)} />
                )}
              </li>
            ))
          ) : (
            <UserCard />
          )}
        </div>
      )}

      {/* Laptop View */}

      {ragistered && (
        <div className="hidden md:flex flex-col gap-3 w-[500px] mx-auto ml-[440px] justify-center  border-b absolute z-50 ">
          {AllPosts.length >= 1 ? (
            AllPosts.map((ele) => (
              <li key={ele.PostId} className="flex flex-col gap-3 border-b">
                <div className="flex justify-between h-full w-full">
                  <div className="flex gap-4">
                    <img
                      className="w-7 h-7 active:scale-95 rounded-full object-cover"
                      src={
                        Profileimage
                          ? ` ${Profile_Img_URL}${userId}%2FProfile%2FimgFile?alt=media&token=${Profileimage}`
                          : "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png"
                      }
                      alt="img"
                    />
                    <span>{ele.UserDetails.UserName}</span>
                  </div>
                  <button>...</button>
                </div>
                <img
                  src={`${Profile_Img_URL}${ele.UserDetails.userId}%2Fposted%2f${ele.PostImgename}?alt=media&token=${ele.PostedImgtoken}`}
                  className="w-full h-96 object-cover rounded-md shadow-md"
                  alt="img"
                />

                <div className="flex gap-3">
                  <FontAwesomeIcon
                    icon={faCoffee}
                    className={`h-6 w-6 cursor-pointer transition-transform duration-300 ${
                      AllLikes[ele.PostId]
                        ? "text-green-500 active:scale-95 transform scale-125"
                        : "text-black"
                    }`}
                    onClick={() =>
                      HandleLike(ele.PostId, ele.UserDetails.userId)
                    }
                  />

                  <FaComments
                    className="h-6 w-6 active:scale-90 "
                    onClick={() => {
                      setId(ele.PostId);
                      setToggle(true);
                      setCommentt({
                        Commentie_PostId: ele.PostId,
                        Commentie_UserId: ele.UserDetails.userId,
                        Commentie_UserName: ele.UserDetails.UserName,
                        Commentie_Profileimage: ele.UserDetails.Profileimage,
                      });
                    }}
                  />
                </div>
                <div className="flex gap-3">{ele.Caption}</div>
                <form
                  className="flex justify-between p-2"
                  onSubmit={handleCommentForm}
                >
                  <input
                    type="text"
                    className="w-96 focus:border-none focus:outline-none"
                    placeholder="Add a Comment..."
                    value={CommentChanges.Comment}
                    onChange={(e) =>
                      setCommentChanges({
                        Comment: e.target.value,
                        Post_userId: ele.UserDetails.userId,
                        Post_PostId: ele.PostId,
                        MyUserId: userId,
                        Commenter_UserId: ele.UserDetails.userId,
                      })
                    }
                  />

                  <button className="active:scale-95">Post</button>
                </form>
                {Ctoggle && (
                  <Comment props={Commentt} onClose={() => setToggle(false)} />
                )}
              </li>
            ))
          ) : (
            <UserCard />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
